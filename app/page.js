import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import AuthComponent from "@/components/auth/AuthComponent";
import {useRouter} from "next/navigation";
import WelcomeText from "@/components/welcome/WelcomeText";
import {getProviders} from "next-auth/react";

export default async function Welcome(){
    const session = await getServerSession(authOptions)
    const providers = await getProviders()

    return (
        <div className={"h-full"}>
            <div className={"flex lg:flex-row flex-col h-full items-center justify-center"}>
                <div className={"flex lg:h-full justify-center items-center lg:basis-1/2 flex-col"}>
                    <WelcomeText session={session}></WelcomeText>
                </div>
                <div className={"flex lg:h-full justify-center items-center lg:basis-1/2 flex-col lg:m-0 mt-8"}>
                    <AuthComponent session={session} providers={providers}></AuthComponent>
                </div>
            </div>
        </div>
    )
}