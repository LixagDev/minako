import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";
import MessagesList from "@/components/messages&responses/MessagesList";
import LeftMenu from "@/components/main/LeftMenu";
import RightMenu from "@/components/main/RightMenu";

import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export default async function Home({searchParams}){
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
            },
            select:{
                id: true,
                name: true,
                othername: true,
                settings: true,
                image: true,
                about: true,
                created_at: true,
                messages: true,
            }
        });

        if (!userSessionData.settings){
            const createSetting = await prisma.settings.create({
                data:{
                    userId: userSessionData.id
                }
            })
        }

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
                <LeftMenu userSessionData={userSessionData}/>
                <div className={"w-full lg:basis-1/2"}>
                    <MessagesList userSessionData={userSessionData} messages={messages} skip={skip}/>
                </div>
                <RightMenu/>
            </div>
        );
    }
}