import { cookies } from "next/headers";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.body.token || "";
  // pass all the checking
  const cookies = req.headers.cookie;

  return cookies;
}
