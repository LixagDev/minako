import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res){
    if (req.method === "GET"){
        if (req.query.id){
            const messageId = req.query.id;
            if (/^\d+$/.test(messageId)){
                const message = await prisma.message.findUnique({
                    where:{
                        id: Number(messageId),
                    },
                    select:{
                        owner: true,
                        content: true,
                    }
                });
                if (message){
                    const responses = await prisma.message.findMany({
                        where:{
                            responseFromId: Number(messageId),
                        }
                    });
                    res.json({ownerName: message.owner.name, messageContent: message.content, responses: responses.length})
                }
                else{
                    res.json("Message introuvable.");
                }
            }
            else{
                res.json("L'ID du message ne peut contenir des lettres.")
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