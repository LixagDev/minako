import LeftMenu from "@/components/main/LeftMenu";
import RightMenu from "@/components/main/RightMenu";
import UserProfile from "@/components/user/UserProfile";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {PrismaClient} from '@prisma/client'
import BackBar from "@/components/main/BackBar";
const prisma = new PrismaClient()

export default async function UserPage({params, searchParams}){
    const session = await getServerSession(authOptions);
    const userRequest = params.username;
    var skip = searchParams.skip;

    if(session){
        if (skip){
            skip = Number(skip);
        }
        else{
            skip = 0;
        }

        const userRequestData = await prisma.user.findUnique({
            where:{
                name: userRequest
            },
            select:{
                id: true,
                name: true,
                othername: true,
                image: true,
                isPremium: true,
                about: true,
                created_at: true,
                messages:{
                    where:{
                        isResponse: false,
                    },
                    select:{
                        id: true,
                        content: true,
                        owner: true,
                        created_at: true,
                        isResponse: true,
                        ownerId: true,
                        responseFromId: true,
                    },
                    orderBy:{
                        created_at: "desc"
                    },
                    skip: skip,
                    take: 10,
                }
            }
        });

        if (userRequestData){
            const userRequestResponses = await prisma.message.findMany({
                where:{
                    ownerId: userRequestData.id,
                    isResponse: true,
                },
                select:{
                    id: true,
                    ownerId: true,
                    owner: true,
                    content: true,
                    responseFromId: true,
                    created_at: true,
                },
                orderBy:{
                    created_at: "desc"
                },
                skip: skip,
                take: 10,
            });

            const userSessionData = await prisma.user.findUnique({
                where:{
                    name: session.user.name,
                }
            });

            return(
                <div className={"flex justify-center h-full"}>
                    <LeftMenu userSessionData={userSessionData}/>
                    <div className={"w-full lg:basis-1/2"}>
                        <UserProfile userRequestData={userRequestData} userSessionData={userSessionData} userRequestResponse={userRequestResponses} skip={skip}/>
                    </div>
                    <RightMenu/>
                </div>
            );
        }
        else{
            redirect("/home");
        }
    }
    else{
        redirect("/");
    }
}