import prisma from './clientPrisma'
import { NextApiRequest, NextApiResponse } from "next";

export default async function Test(request: NextApiRequest, response: NextApiResponse) {

    const showUsers = await prisma.user.findMany()
    response.json(showUsers)
}