import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res){
    if (req.method === "GET"){
        if (req.query.name){
            const username = req.query.name
            const user = await prisma.user.findUnique({
                where:{
                    name: username
                }
            })
            if (user){
                res.json(user)
            }
            else{
                res.json("Aucun utilisateur trouvé.")
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