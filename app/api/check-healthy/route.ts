import { get } from "@/services/api/serviceClient";
import { NextApiRequest } from "next";
import http from "http";

export async function GET(req: NextApiRequest) {
  const response = await http.get(
    process.env.NEXT_PUBLIC_API_URL + "/check-running",
    (res) => res
  );

  if (!response) {
    return new Response("Error", {
      status: 500,
    });
  }

  return new Response("Healthy checked", {
    status: 200,
  });
}
