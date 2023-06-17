import jwt from "jsonwebtoken";
import { type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { body } = req;
  return {
    status: 200,
    body: { message: "Hello World", body },
  };
}
