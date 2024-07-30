import * as base64 from 'https://denopkg.com/chiefbiiko/base64/mod.ts';

const accountSid = 'AC1066a9ff6351838bc0379810a1ac97be';
const authToken = '936a9cf3238a56e05f4f6b3314f44ad0';

const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

const encodedCredentials: string = base64.fromUint8Array(
    new TextEncoder().encode(`${accountSid}:${authToken}`)
);

const sendTwilioMessage = async ({
    fromNumber,
    toNumber,
    message,
    mediaURL
}: {
    fromNumber: string;
    toNumber: string;
    message: string;
    mediaURL: string;
}) => {

    let body: URLSearchParams;
    if (mediaURL) {
        body = new URLSearchParams({
            To: toNumber,
            From: fromNumber,
            Body: message,
            MediaUrl: mediaURL
        });
    } else {
        body = new URLSearchParams({
            To: toNumber,
            From: fromNumber,
            Body: message,
        });
    }


    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${encodedCredentials}`,
        },
        body,
    });
    return response
};

export {
    sendTwilioMessage
}
