"use client"
import MinakoTitle from "@/components/main/MinakoTitle";
import SessionUserProfil from "@/components/home/SessionUserProfil";
import LeftMenuButtons from "@/components/main/LeftMenuButtons";
import {useState} from "react";

export default function LeftMenu({userSessionData}){
    return (
        <>
            <div className={"flex h-1/2 justify-center"}>
                <MinakoTitle/>
            </div>
            <div className={"w-3/4 m-auto"}>
                <LeftMenuButtons userSessionData={userSessionData} />
            </div>
            <div className={"flex justify-center items-end h-1/2"}>
                <SessionUserProfil userSessionData={userSessionData}/>
            </div>
        </>
    );
}