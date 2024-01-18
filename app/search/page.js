import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";
import {PrismaClient} from '@prisma/client';
import LeftMenu from "@/components/main/LeftMenu";
import RightMenu from "@/components/main/RightMenu";
import SearchList from "@/components/search/SearchList";
const prisma = new PrismaClient();

export default async function Search({searchParams}){
    const session = await getServerSession(authOptions);
    var query = searchParams.q;
    var recent = searchParams.r;

    if(!session){
        redirect("/");
    }
    else{
        if (recent !== "desc" && recent !== "asc") recent = "desc";

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

        const searchResult = await prisma.message.findMany({
            where:{
                OR:[
                    {
                        content:{
                            contains: query
                        }
                    },
                    {
                        owner:{
                            name:{
                                contains: query
                            }
                        }
                    },
                    {
                        owner:{
                            othername:{
                                contains: query
                            }
                        }
                    }
                ],
                isResponse: false,
            },
            select:{
                id: true,
                content: true,
                owner: true,
                created_at: true,
            },
            orderBy:{
                created_at: recent
            },
        })

        return(
            <div className={"flex justify-center h-full"}>
                <LeftMenu userSessionData={userSessionData}/>
                <div className={"w-full lg:basis-1/2"}>
                    <SearchList isAfterSearch={true} query={query} recent={recent} searchResult={searchResult} userSessionData={userSessionData} />
                </div>
                <RightMenu query={query} isAfterSearch={true}/>
            </div>
        );
    }
}