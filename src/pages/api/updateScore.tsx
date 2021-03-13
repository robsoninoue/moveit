import prisma from './clientPrisma'
import { NextApiRequest, NextApiResponse} from 'next'

export default async function UpdateScore(request: NextApiRequest, response: NextApiResponse){

    const data  = request.body

    if(data != null) {
        const emailQuery = await prisma.user.findUnique({
            where: {
                email: data.email
            }
        })
    
        const updateScore = await prisma.user.update({
            where: {
                id: Number(emailQuery.id)
            },
            data: {
                level: Number(data.level),
                experienceAmount: Number(data.experienceAmount),
                challengesCompleted: Number(data.challengesCompleted)
            }
        })
        response.json(updateScore)
    } else {
        response.status(500)
    }
}