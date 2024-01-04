"use client"
import MessageParent from "@/components/messages&responses/MessageParent";
import LoadingResponsesListSkeleton  from "@/components/loadings/LoadingResponsesListSkeleton"
import {Suspense, useRef} from "react";
import PhoneNavbar from "@/components/main/PhoneNavbar";
import ResponseForm from "@/components/forms/ResponseForm";
import dynamic from "next/dynamic";
const Messages = dynamic(() => import("@/components/messages&responses/Messages"), { ssr: false });


export default function ResponsesList({messageParent, responses, userSessionData, skip}){
    const responseListDiv = useRef();
    return(
        <div ref={responseListDiv} className={"bg-base-200 w-full overflow-x-hidden overflow-y-scroll h-full border-l border-r border-neutral"}>
            <PhoneNavbar userSessionData={userSessionData}/>
            <MessageParent messageParent={messageParent} userSessionData={userSessionData}/>
            <ResponseForm userSessionData={userSessionData} messageParent={messageParent}/>
            <Suspense fallback={<LoadingResponsesListSkeleton/>}>
                <Messages messageParent={messageParent} userSessionData={userSessionData} messages={responses} skip={skip} messageListDiv={responseListDiv}></Messages>
            </Suspense>
        </div>
    );
}