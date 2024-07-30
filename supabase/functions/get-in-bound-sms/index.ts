import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { supabase, update_last_message_sent } from "../_shared/supabaseClient.ts";

const phone_code = "+1";

const campaign_manager_phone = "4158001337";

interface TwilioRequestData {
  ToCountry?: string;
  ToState?: string;
  SmsMessageSid?: string;
  NumMedia?: string;
  ToCity?: string;
  FromZip?: string;
  SmsSid?: string;
  FromState?: string;
  SmsStatus?: string;
  FromCity?: string;
  Body?: string;
  FromCountry?: string;
  To?: string;
  ToZip?: string;
  NumSegments?: string;
  MessageSid?: string;
  AccountSid?: string;
  From?: string;
  ApiVersion?: string;
  MediaUrl0?: string
  // deno-lint-ignore no-explicit-any
  [key: string]: any
}

interface Message {
  athlete_id: number | null;
  organization_id: number | null;
  isdeleted: boolean;
  isgenerativeai: boolean;
  receiver_is: number;
  sender_is: number;
  message_text: string;
  created_at: string;
  twilio_sms_sid: string;
}

const getTwilioMessageObject = (data: string): TwilioRequestData => {
  let message: TwilioRequestData = {};

  const fields = data.split("&");

  fields.forEach((e) => {
    const [key, value] = e.split("=");
    message = { ...message, [key]: value };
  });

  console.log(fields);

  return message;
};

const isCampaignManager = (num: string): boolean =>
  num == campaign_manager_phone;

const getAthleteByPhone = async (num: string) => {
  if (!num) {
    return null;
  }
  try {
    const { data, error } = await supabase
      .from("athletes")
      .select()
      .eq("mobile_number", `${phone_code}${num}`);
    if (!error) {
      return data[0];
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

serve(async (req: Request) => {
  console.log("Event triggered");
  if (req.method == "POST") {
    const stringData = await req.text(); // Get the raw body of the request
    console.log(stringData);
    const { SmsMessageSid, Body, To, From, SmsStatus, MediaUrl0, MediaContentType0 } =
      getTwilioMessageObject(stringData)


    if (SmsStatus == "received") {
      if (isCampaignManager(To || "")) {
        // Athlete to Campaign Manager via SMS
        console.log("Athlete to Campaign Manager via SMS");
        const athlete = await getAthleteByPhone(From || "");

        const datetime = new Date().toUTCString()

        if (athlete) {
          await supabase.from("messages").insert([
            {
              athlete_id: athlete.id,
              organization_id: null,
              isdeleted: false,
              isgenerativeai: false,
              receiver_is: 3,
              sender_is: 1,
              message_text: Body,
              created_at: datetime,
              twilio_sms_sid: SmsMessageSid,
              // media_url: MediaUrl0
            },
          ]);
        }

        // Update last_message_sent
        await update_last_message_sent(datetime, athlete.id)
      }
      // else if (isCampaignManager(From || "")) {
      //   // Campaign Manager to Athlete via web app
      //   console.log("Campaign Manager to Athlete via web app");
      //   const athlete = await getAthleteByPhone(To || "");

      //   if (athlete) {
      //     await supabase.from("messages").insert([
      //       {
      //         athlete_id: athlete.id,
      //         organization_id: null,
      //         isdeleted: false,
      //         isgenerativeai: false,
      //         receiver_is: 1,
      //         sender_is: 3,
      //         message_text: Body,
      //         created_at: new Date().toUTCString(),
      //         twilio_sms_sid: SmsMessageSid,
      //         media_url: MediaUrl0
      //       },
      //     ]);
      //   }
      // }
    }
  }
  return new Response("", { status: 200 });
});
