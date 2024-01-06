"use client"
import {Avatar, Button, Link} from "react-daisyui";
import {LogOut} from "react-feather";
import {signOut} from "next-auth/react";
import PremiumBadge from "@/components/main/PremiumBadge";
import M_Button from "@/components/component/M_Button";
import M_Avatar from "@/components/component/M_Avatar";

export default function SessionUserProfil({userSessionData}){
    return(
        <div class={"flex gap-3 items-center p-5 rounded-xl bg-base-100 shadow-md w-full"}>
            <M_Avatar src={userSessionData.image} size={"sm"}/>
            {
                userSessionData.othername ?
                    <div class={"flex flex-col"}>
                        <div className={"flex gap-2 items-center"}>
                            <Link href={`/user/${userSessionData.name}`} className={"font-bold text-lg"}>{userSessionData.othername}</Link>
                            { userSessionData.isPremium ? <PremiumBadge mini={true} size={"sm"} username={userSessionData.name}/> : null}
                        </div>
                        <Link href={`/user/${userSessionData.name}`} className={"font-bold text-md text-neutral"}>@{userSessionData.name}</Link>
                    </div>
                    :
                    <div className={"flex gap-1 items-center"}>
                        <Link href={`/user/${userSessionData.name}`} className={"font-bold text-lg"}>@{userSessionData.name}</Link>
                        { userSessionData.isPremium ? <PremiumBadge mini={true} size={"sm"} username={userSessionData.name}/> : null}
                    </div>
            }
            <div class={"flex w-full flex-row-reverse"}>
                <M_Button className={""} onClick={() => signOut()} size={"sm"} startIcon={<LogOut width={17}/>} />
            </div>
        </div>
    );
}