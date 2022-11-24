// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
import * as crypto from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const str =
    typeof req.body === "string" ? req.body : JSON.stringify(req.body);
  const hash = crypto
    .createHmac("sha256", "1234567890")
    .update(str)
    .digest("base64");

  res.status(200).json({
    match: hash === req.headers["x-api-signature-sha256"],
    hash,
    body: req.body,
    headers: req.headers,
  });
}
