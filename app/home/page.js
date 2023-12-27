import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";
import MessagesList from "@/components/home/MessagesList";
import LeftMenu from "@/components/main/LeftMenu";
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export default async function Home({searchParams}){
    const session = await getServerSession(authOptions)
    var skip = searchParams.skip;
    if(!session){
        redirect("/");
    }
    else{
        if (skip){
            skip = Number(skip);
        }
        else{
            skip = 0;
        }

        const userSessionData = await prisma.user.findUnique({
            where:{
                name: session.user.name,
            }
        });
        const messages = await prisma.message.findMany({
            where:{
                isResponse: false
            },
            select:{
                id: true,
                content: true,
                owner: true,
                created_at: true,
            },
            orderBy:{
                created_at: "desc"
            },
            skip: skip,
            take: 10,
        });

        return(
            <div className={"flex justify-center h-full"}>
                <div className={"basis-1/4 hidden md:flex flex-col p-5"}>
                    <LeftMenu userSessionData={userSessionData}/>
                </div>
                <div className={"w-full md:basis-1/2"}>
                    <MessagesList userSessionData={userSessionData} messages={messages} skip={skip}/>
                </div>
                <div className={"basis-1/4 hidden md:flex"}>

                </div>
            </div>
        );
    }

}