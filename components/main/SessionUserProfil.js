"use client"
import {Avatar, Button, Link} from "react-daisyui";
import {LogOut} from "react-feather";
import {signOut} from "next-auth/react";
import PremiumBadge from "@/components/main/PremiumBadge";

export default function SessionUserProfil({userSessionData}){
    return(
        <div class={"flex gap-3 items-center p-5 rounded-xl bg-base-200"}>
            <Avatar border borderColor={"neutral"} shape={"circle"} src={userSessionData.image} size={"sm"}/>
            {
                userSessionData.othername ?
                    <div class={"flex flex-col"}>
                        <div className={"flex gap-2 items-center"}>
                            <Link href={`/user/${userSessionData.name}`} className={"font-bold text-lg"}>{userSessionData.othername}</Link>
                            { userSessionData.isPremium ? <PremiumBadge mini={true} size={"sm"} username={userSessionData.name}/> : null}
                        </div>
                        <Link href={`/user/${userSessionData.name}`} className={"font-bold text-md text-neutral-content"}>@{userSessionData.name}</Link>
                    </div>
                    :
                    <div className={"flex gap-1 items-center"}>
                        <Link href={`/user/${userSessionData.name}`} className={"font-bold text-lg"}>@{userSessionData.name}</Link>
                        { userSessionData.isPremium ? <PremiumBadge mini={true} size={"sm"} username={userSessionData.name}/> : null}
                    </div>
            }
            <Button onClick={() => signOut()} size={"sm"}><LogOut width={17}/></Button>
        </div>
    );
}