import LeftMenu from "@/components/main/LeftMenu";
import RightMenu from "@/components/main/RightMenu";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";
import ResponsesList from "@/components/messages&responses/ResponsesList";
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export default async function MessagePage({params, searchParams}){
    const requestMessageId = params.messageId;
    const session = await getServerSession(authOptions);
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
        const messageParent = await prisma.message.findUnique({
            where:{
                id: Number(requestMessageId),
            },
            select:{
                id: true,
                content: true,
                created_at: true,
                owner: true,
            }
        });
        if (messageParent){
            const responses = await prisma.message.findMany({
                where:{
                    isResponse: true,
                    responseFromId: Number(requestMessageId),
                },
                select:{
                    id: true,
                    content: true,
                    created_at: true,
                    owner: true,
                },
                take: 10,
                skip: skip,
            });

            return(
                <div className={"flex justify-center h-full"}>
                    <div className={"basis-1/4 hidden md:flex flex-col p-5"}>
                        <LeftMenu userSessionData={userSessionData}/>
                    </div>
                    <div className={"w-full md:basis-1/2"}>
                        <ResponsesList messageParent={messageParent} responses={responses} userSessionData={userSessionData} skip={skip}/>
                    </div>
                    <div className={"basis-1/4 hidden md:flex"}>
                        <RightMenu/>
                    </div>
                </div>
            );
        }
        else{
            redirect("/home");
        }
    }
}