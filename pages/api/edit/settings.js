import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export default async function handle(req, res){
    const body = req.body;
    if (req.method === "POST"){
        const userExist = await prisma.user.findUnique({
            where:{
                id: body.userId,
            }
        });
        if (userExist){
            const updateSettings =  await prisma.settings.updateMany({
                where:{
                    userId: body.userId
                },
                data:{
                    wantResponse: body.wantResponse,
                }
            });
            res.json(userExist);
        }
        else{
            res.status(400).end();
        }
    }
    else{
        res.status(405).end();
    }
}