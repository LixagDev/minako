"use client"
import {Avatar, Button, Link} from "react-daisyui";
import {LogOut, Star} from "react-feather";
import {signOut} from "next-auth/react";

export default function SessionUserProfil({userSessionData}){
    return(
        <div class={"flex gap-3 items-center"}>
            <Avatar border borderColor={"neutral"} shape={"circle"}
                    src={userSessionData.image}
                    size={"sm"}/>
            <div class={"flex gap-1 items-center"}>
                <Link href={`/user/${userSessionData.name}`} className={"font-bold text-lg"}>@{userSessionData.name}</Link>
                {userSessionData.isPremium ? <Star width={15} strokeWidth={4}></Star> : null}
            </div>
            <Button onClick={() => signOut()} size={"sm"}><LogOut width={17}/></Button>
        </div>
    );
}