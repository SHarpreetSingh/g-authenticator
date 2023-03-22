import express from "express";
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("app is listening on port:", 3000);
});

app.post('/verify',
  async (req, res) => {
    console.log(req.body)

    const verified = speakeasy.totp.verify({
      secret: req.body.secret,
      encoding: 'base32',
      token: req.body.token,
    });

    console.log(verified)

    return res.json({ "status": verified })
  })

app.get('/',
  async (req, res) => {

    // generate authanticator secret
    const secretCode: any = speakeasy.generateSecret({
      name: "asdfqwery11234",
    });

    console.log("secretCode", secretCode)
    // MU5HMYJ7JMZUCSB7FYYDA32JKJLVKYJROYYD6MDCOZMGMIZDPJHQ

    const qrCodeForSecret = await new Promise(resolve => {
      resolve(qrcode.toDataURL(secretCode.otpauth_url));
    });

    console.log(qrCodeForSecret)

    return res.json({ "qrCodeForSecret": qrCodeForSecret })
  })
