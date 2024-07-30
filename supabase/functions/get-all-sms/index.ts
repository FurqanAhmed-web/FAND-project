import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";

const accountSid = "AC1066a9ff6351838bc0379810a1ac97be";
const authToken = "936a9cf3238a56e05f4f6b3314f44ad0";

const encodedCredentials: string = base64.fromUint8Array(
  new TextEncoder().encode(`${accountSid}:${authToken}`)
);

serve(async (req: Request) => {
  if (req.method == "GET") {
    const _url = new URL(req.url);
    const queryParams = _url.searchParams;
    // Access the 'fromNumber' query parameter
    let fromNumber = queryParams.get("fromNumber");

    if (fromNumber?.charAt(0) !== "-") {
      fromNumber = "+" + fromNumber;
    }

    const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json?From=${fromNumber}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encodedCredentials}`,
        },
      });
      const { messages } = await response.json();
      return new Response(JSON.stringify({ messages }), {
        status: response.status,
      });
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify(error), {
        status: 500,
      });
    }
  } else {
    return new Response("Invalid request", {
      status: 400,
    });
  }
});
