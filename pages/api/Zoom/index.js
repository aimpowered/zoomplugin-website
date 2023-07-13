const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')
const KJUR = require('jsrsasign')
const { ZOOM } = require('../../../Constants/Zoom');

export default function handler(req, res) {
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2

    const Header = { alg: 'HS256', typ: 'JWT' };

    const Payload = {
        sdkKey: ZOOM.SDK.KEY,
        mn: req.body.meetingNumber,
        role: req.body.role,
        iat: iat,
        exp: exp,
        appKey: ZOOM.SDK.KEY,
        tokenExp: iat + 60 * 60 * 2
    };

    const sHeader = JSON.stringify(Header);
    const sPayload = JSON.stringify(Payload);
    const meetingSignature = KJUR.KJUR.jws.JWS.sign('HS256', sHeader, sPayload, ZOOM.SDK.SECRET);

    return res.json({
        signature: meetingSignature,
        sdkKey: ZOOM.SDK.KEY
    });
}
