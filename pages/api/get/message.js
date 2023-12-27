import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res){
    if (req.method === "GET"){
        if (req.query.id){
            const messageId = req.query.id;
            const message = await prisma.message.findUnique({
                where:{
                    id: Number(messageId),
                },
                select:{
                    owner: true,
                    content: true,
                }
            });
            const responses = await prisma.message.findMany({
                where:{
                    responseFromId: Number(messageId),
                }
            });
            res.json({responses: responses.length})
        }
        else{
            res.status(400).end();
        }
    }
    else{
        res.status(405).end();
    }
}