import { NextApiRequest, NextApiResponse } from "next";

export default async function TestIndex(request: NextApiRequest, response: NextApiResponse) {
    response.status(200).json({up: true})
    
}