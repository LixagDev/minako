import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export default async function handle(req, res){
    const body = req.body;
    if(req.method === "POST"){
        const userExist = await prisma.user.findUnique({
            where:{
                id: body.userId,
            }
        });
        if (userExist){
            const updateUserOthername = await prisma.user.update({
                where:{
                    id: body.userId,
                },
                data:{
                    othername: body.othername,
                }
            });
            const updateUserAbout = await prisma.user.update({
                where:{
                    id: body.userId,
                },
                data:{
                    about: body.about,
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