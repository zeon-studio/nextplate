import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../sanity/sanity.client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    // Process post request
    const { name, email, message } = req.body;

    try {
      const result = await client.create({
        _type: "user",
        name,
        email,
        message,
      });
      console.log("Result: ", result);
      res.status(200).json({ message: "User updated sucessfully!" });
    } catch (err) {
      res.status(500).json({ message: "Failed to upload user" });
    }
  } else {
    // handle other HTTP method
  }
}
