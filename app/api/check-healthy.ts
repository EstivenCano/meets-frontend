import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/check-running"
  );

  res.status(response.status).json(response.json());
}
