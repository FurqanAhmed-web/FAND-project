import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { isCampaignManager } from "../_shared/utils.ts";
import { sendTwilioMessage } from "../_shared/twilio.ts"
import { supabase, update_last_message_received } from "../_shared/supabaseClient.ts";

const getAthleteByPhone = async (mobile_number: string) => {
  if (!mobile_number) {
    return null;
  }
  try {
    const { data, error } = await supabase
      .from("athletes")
      .select()
      .eq("mobile_number", mobile_number);
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
  console.log("Request");
  if (req.method == "POST") {
    const { fromNumber, toNumber, message, mediaURL, fileSize, fileName } = await req.json();

    console.log(fromNumber, toNumber, message, mediaURL)

    if (isCampaignManager(fromNumber)) {
      try {
        console.log("From Campaign Manager");
        const response = await sendTwilioMessage({ fromNumber, toNumber, message, mediaURL })
        const data = await response.json()

        console.log(data);

        if (!data?.body) {
          return new Response(JSON.stringify({
            type: "validation_error",
            message: data.message
          }), {
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }

        const datetime = new Date().toUTCString()

        const athlete = await getAthleteByPhone(toNumber || "");
        if (athlete) {
          if (mediaURL) {
            await supabase.from("messages").insert([
              {
                athlete_id: athlete.id,
                organization_id: null,
                isdeleted: false,
                isgenerativeai: false,
                receiver_is: 1,
                sender_is: 3,
                message_text: data.body,
                created_at: datetime,
                twilio_sms_sid: data.sid,
                media_url: mediaURL,
                file_name: fileName,
                file_size: fileSize
              },
            ]);
          } else {
            await supabase.from("messages").insert([
              {
                athlete_id: athlete.id,
                organization_id: null,
                isdeleted: false,
                isgenerativeai: false,
                receiver_is: 1,
                sender_is: 3,
                message_text: data.body,
                created_at: datetime,
                twilio_sms_sid: data.sid,
              },
            ]);
          }


          // Update last_message_received in an athlete
          await update_last_message_received(datetime, athlete.id)
        }

        return new Response(JSON.stringify(data.body), {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (error) {
        return new Response(JSON.stringify(error), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }
    // else if (isCampaignManager(toNumber)) {
    //   console.log("From Athlete");
    //   const athlete = await getAthleteByPhone(fromNumber || "");
    //   if (athlete) {
    //     await supabase.from("messages").insert([
    //       {
    //         athlete_id: athlete.id,
    //         organization_id: null,
    //         isdeleted: false,
    //         isgenerativeai: false,
    //         receiver_is: 3,
    //         sender_is: 1,
    //         message_text: message,
    //         created_at: new Date().toUTCString(),
    //         twilio_sms_sid: uuid.v1.generate(),
    //         media_url: mediaURL || ''
    //       },
    //     ]);
    //     // TODO Update last_message_sent, last_message_received in an athlete
    //   }
    //   return new Response(JSON.stringify(message), {
    //     status: 200,
    //     headers: { ...corsHeaders, "Content-Type": "application/json" },
    //   });
    // }

    return new Response("Invalid request", {
      status: 400,
      headers: corsHeaders,
    });
  } else {
    return new Response("Invalid request", {
      status: 400,
      headers: corsHeaders,
    });
  }
});