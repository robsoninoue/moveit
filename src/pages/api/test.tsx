import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Test(request: NextApiRequest, response: NextApiResponse) {
    const prisma = new PrismaClient

    const showUsers = await prisma.user.findMany()

    response.json({showUsers})

    // response.json({'message': 'Hello'})

    // const heyOh = 'heyOh!!'

    // response.json(heyOh)
}