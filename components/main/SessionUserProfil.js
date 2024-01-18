"use client"
import {Link} from "react-daisyui";
import {LogOut} from "react-feather";
import {signOut} from "next-auth/react";
import M_Button from "@/components/component/M_Button";
import M_Avatar from "@/components/component/M_Avatar";

export default function SessionUserProfil({userSessionData}){
    return(
        <div class={"flex gap-3 items-center p-5 rounded-xl bg-base-100 shadow-md w-full flex-wrap lg:flex-nowrap "}>
            <M_Avatar src={userSessionData.image} size={"sm"}/>
            {
                userSessionData.othername ?
                    <div class={"flex flex-col"}>
                        <div className={"flex gap-2 items-center"}>
                            <Link href={`/user/${userSessionData.name}`} className={"font-bold text-lg"}>{userSessionData.othername}</Link>
                        </div>
                        <Link href={`/user/${userSessionData.name}`} className={"font-bold text-md text-neutral"}>@{userSessionData.name}</Link>
                    </div>
                    :
                    <div className={"flex gap-1 items-center"}>
                        <Link href={`/user/${userSessionData.name}`} className={"font-bold text-lg"}>@{userSessionData.name}</Link>
                    </div>
            }
            <div class={"flex w-full flex-row-reverse"}>
                <M_Button onClick={() => signOut()} size={"sm"} startIcon={<LogOut width={17}/>} />
            </div>
        </div>
    );
}