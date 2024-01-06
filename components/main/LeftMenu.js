"use client"
import MinakoTitle from "@/components/main/MinakoTitle";
import SessionUserProfil from "@/components/main/SessionUserProfil";
import LeftMenuButtons from "@/components/main/LeftMenuButtons";

export default function LeftMenu({userSessionData}){
    return (
        <div className={"basis-1/4 hidden lg:flex flex-col p-3"}>
            <div className={"flex h-1/2 justify-center"}>
                <MinakoTitle/>
            </div>
            <div className={"w-3/4 m-auto"}>
                <LeftMenuButtons userSessionData={userSessionData}/>
            </div>
            <div className={"flex justify-center items-end h-1/2"}>
                <SessionUserProfil userSessionData={userSessionData}/>
            </div>
        </div>
    );
}