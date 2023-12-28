"use client"
import MessageParent from "@/components/messages&responses/MessageParent";
import LoadingResponsesListSkeleton  from "@/components/loadings/LoadingResponsesListSkeleton"
import {Suspense, useRef} from "react";
import PhoneNavbar from "@/components/main/PhoneNavbar";
import ResponseForm from "@/components/forms/ResponseForm";
import Responses from "@/components/messages&responses/Responses";

export default function ResponsesList({messageParent, responses, userSessionData, skip}){
    const responseListDiv = useRef();
    return(
        <div ref={responseListDiv} className={"bg-base-200 w-full overflow-x-hidden overflow-y-scroll h-full border-l border-r border-neutral"}>
            <PhoneNavbar userSessionData={userSessionData}/>
            <MessageParent messageParent={messageParent} userSessionData={userSessionData}/>
            <Suspense fallback={<LoadingResponsesListSkeleton/>}>
                <ResponseForm userSessionData={userSessionData} messageParent={messageParent}/>
                <Responses messageParent={messageParent} userSessionData={userSessionData} responses={responses} skip={skip} responseListDiv={responseListDiv}></Responses>
            </Suspense>
        </div>
    );
}