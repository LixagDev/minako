import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export default async function UserPage({params}){
    const username = params.username;
    const userdata = await prisma.user.findUnique({
        where:{
            name: username
        }
    });

    if(userdata){
        return(
            <div className={"flex flex-col"}>
                <h1>{userdata.name}</h1>
                <h1>{userdata.id}</h1>
                <img height={100} width={100} className={"rounded-full"} src={userdata.image} alt=""/>
            </div>
        );
    }
    else {
        return(
            <h1>y'a rien frrr</h1>
        );
    }
}