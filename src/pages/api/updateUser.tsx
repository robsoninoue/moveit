import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse} from 'next'


const prisma = new PrismaClient()

export default async function CheckEmail(request: NextApiRequest, response: NextApiResponse){

    const data  = request.body

    const emailQuery = await prisma.user.findUnique({
        where: {
            email: data.email
        }
    })

    const updateName = await prisma.user.update({
        where: {
            id: Number(emailQuery.id)
        },
        data: {
            name: String(data.name)
        }
    })
    response.json(updateName)

    prisma.$disconnect
}