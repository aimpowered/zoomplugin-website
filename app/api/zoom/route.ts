// zoom api endpoint for generating signature
const KJUR = require("jsrsasign");

export const POST = async (req: Request, res: Response) => {
    
    //receiving meetingNumber and role
    const body = await req.json();

    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;

    const Header = { alg: "HS256", typ: "JWT" };

    const Payload = {
        sdkKey: process.env.SDK_KEY,
        mn: body.meetingNumber,
        role: body.role,
        iat: iat,
        exp: exp,
        appKey: process.env.SDK_KEY,
        tokenExp: iat + 60 * 60 * 2,
    };

    const sHeader = JSON.stringify(Header);
    const sPayload = JSON.stringify(Payload);
    const meetingSignature = KJUR.KJUR.jws.JWS.sign(
        "HS256",
        sHeader,
        sPayload,
        process.env.SDK_SECRET
    );
    
    return new Response(
        JSON.stringify({
            signature: meetingSignature,
            sdkKey: process.env.SDK_KEY,
        })
    );
};
