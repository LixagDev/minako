import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res){
    const body = req.body
    if(req.method === "POST"){
        const userExist = await prisma.user.findUnique({
            where:{
                id: body.ownerId,
            }
        });
        if (userExist){
            const newResponse = await prisma.message.create({
                data:{
                    content: body.responseContent,
                    ownerId: body.ownerId,
                    created_at: ((new Date().getTime())/1000).toFixed(0),
                    isResponse: true,
                    responseFromId: Number(body.fromMessageId),
                }
            })
            res.json(newResponse);
        }
        else{
            res.status(400).end();
        }
    }
    else{
        res.status(405).end();
    }
}