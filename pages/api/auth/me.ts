import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface TokenPayload {
  email: string;
  exp: number;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const bearerToken = req.headers["authorization"] as string;
    const token = bearerToken.split(" ")[1];
    const payload = jwt.decode(token) as TokenPayload;

    if (!payload.email) {
      return res.status(401).json({ errorMessage: "Unauthorized request" });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        city: true,
        phone: true,
      },
    });

    if (!user) {
      return res.status(401).json({ errorMessage: "User not found" });
    }

    return res.status(200).json({
      firstName: user.first_name,
      lastName: user.last_name,
      city: user.city,
      phone: user.phone,
      email: user.email,
    });
  }

  return res.status(404).json("Unknown endpoint");
}

export default handler;
