"use client"
import PhoneNavbar from "@/components/main/PhoneNavbar";
import UserInfo from "@/components/user/UserInfo";
import BackBar from "@/components/main/BackBar";
const Messages = dynamic(() => import("@/components/messages&responses/Messages"), { ssr: false });
import {Suspense, useRef} from "react";
import LoadingMessagesSkeleton from "@/components/loadings/LoadingMessagesSkeleton";
import dynamic from "next/dynamic";
import Divider from "@/components/main/Divider";

export default function UserProfile({userRequestData, userSessionData, skip}){
    const messageListDiv = useRef();
    return(
        <div ref={messageListDiv} className={"bg-base-200 w-full overflow-x-hidden overflow-y-scroll h-full border-l border-r border-neutral"}>
            <PhoneNavbar userSessionData={userSessionData}/>
            <BackBar content={userRequestData.name} other={`${userRequestData.messages.length} message(s)`} />
            <UserInfo userRequestData={userRequestData} />
            <Divider content={`Message de ${userRequestData.name}`} />
            <Suspense fallback={<LoadingMessagesSkeleton />}>
                <Messages userSessionData={userSessionData} messages={userRequestData.messages} skip={skip} messageListDiv={messageListDiv}/>
            </Suspense>
        </div>
    );
}