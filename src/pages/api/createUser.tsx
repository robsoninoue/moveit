import prisma from './clientPrisma'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function CreateUser(request: NextApiRequest, response: NextApiResponse){

    const data = request.body

    const createUser = await prisma.user.create({
        data: {
            email: data.email
        }
    })
    response.json(createUser)
}