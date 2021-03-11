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

    if (emailQuery != null) {
        response.status(200).json({user: emailQuery})
    } else {
        const createUser = await prisma.user.create({
            data: {
                    email: data.email
                }
            })
        response.status(200).json({user: emailQuery})
    }

    prisma.$disconnect
    
}