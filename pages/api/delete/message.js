import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res){
    const body = req.body
    if(req.method === "POST"){
        const findUser = await prisma.user.findUnique({
            where:{
                id: body.ownerId,
            }
        });
        if (findUser){
            const findMessage = await prisma.message.findUnique({
                where:{
                    ownerId: body.ownerId,
                    id: body.messageId,
                }
            });
            if (findMessage){
                const deleteMessage = await prisma.message.delete({
                    where:{
                        ownerId: body.ownerId,
                        id: body.messageId,
                    }
                });
                const deleteResponse = await prisma.message.deleteMany({
                    where:{
                        responseFromId: body.messageId,
                    }
                });
                res.json(deleteMessage);
            }
            else{
                res.status(400).end();
            }
        }
        else{
            res.status(400).end();
        }
    }
    else{
        res.status(405).end();
    }
}