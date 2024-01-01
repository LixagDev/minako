"use client"
import {Avatar} from "react-daisyui";
import DateChangerProfil from "@/functions/DateChangerProfil";
import {Star} from "react-feather";

export default function UserInfo({userRequestData}){
    return (
        <div className={"flex flex-col w-full p-4 justify-center border-b border-neutral bg-base-300 gap-4 items-center"}>
            <div className={"flex gap-3 items-center justify-center"}>
                <Avatar src={userRequestData.image} shape={"circle"} className={"hidden lg:flex"} size={"lg"} border
                        borderColor={"neutral"}/>
                <Avatar src={userRequestData.image} shape={"circle"} className={"lg:hidden flex"} size={"md"} border
                        borderColor={"neutral"}/>
                <div className={"flex flex-col"}>
                    <div className={"flex gap-2 items-center"}>
                        <h2 className={"font-bold lg:text-3xl text-2xl"}>@{userRequestData.name}</h2>
                        {userRequestData.isPremium ? <Star width={25} strokeWidth={4}></Star> : null}
                    </div>
                    <h3 className={"text-neutral-content lg:text-base text-sm"}>À rejoint Minako
                        le {DateChangerProfil(userRequestData.created_at)}</h3>
                </div>
            </div>
            {
                userRequestData.about ?
                    <div className={"bg-base-100 w-4/5 p-4 rounded-xl"}>
                        <h3 className={"lg:text-base text-sm"}>{userRequestData.about}</h3>
                    </div>
                    : null
            }
        </div>
    );
}