import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import * as jose from "jose";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface TokenPayload {
  email: string;
  exp: number;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const bearerToken = req.headers["authorization"] as string;

    if (!bearerToken) {
      return res.status(401).json({ errorMessage: "Unauthorized request" });
    }

    const token = bearerToken.split(" ")[1];

    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized request" });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
      await jose.jwtVerify(token, secret);
    } catch (error) {
      return res.status(401).json({ errorMessage: "Unauthorized request" });
    }

    const payload = jwt.decode(token) as TokenPayload;

    if (!payload.email) {
      return res.status(401).json({ errorMessage: "Unauthorized request" });
    }

    const user = prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        city: true,
        phone: true,
      },
    });

    return res.status(200).json({
      user,
    });
  }

  return res.status(404).json("Unknown endpoint");
}

export default handler;
