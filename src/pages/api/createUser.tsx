import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function CheckEmail(request: NextApiRequest, response: NextApiResponse){

    const data = request.body

    const prisma = new PrismaClient

    const createUser = await prisma.user.create({
        data: {
            email: data.email
        }
    })
    response.json(createUser)

    prisma.$disconnect

}