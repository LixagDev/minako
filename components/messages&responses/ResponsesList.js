"use client"
import {useRef} from "react";
import PhoneNavbar from "@/components/main/PhoneNavbar";
import ResponseForm from "@/components/forms/ResponseForm";
import dynamic from "next/dynamic";
import BackBar from "@/components/main/BackBar";
import MessageLoader from "@/components/messages&responses/MessageLoader";
const Messages = dynamic(() => import("@/components/messages&responses/Messages"), { ssr: false });
import NoMessage from "@/components/messages&responses/NoMessage";
const MessageParent = dynamic(() => import("@/components/messages&responses/MessageParent"), { ssr: false });


export default function ResponsesList({messageParent, responses, userSessionData, skip}){
    const responseListDiv = useRef();

    return(
        <div ref={responseListDiv} className={"flex flex-col gap-3 w-full overflow-x-hidden overflow-y-scroll h-full pl-3 pr-3 pb-3"}>
            <PhoneNavbar userSessionData={userSessionData}/>
            <BackBar content={`Messsage de ${messageParent.owner.name}`}/>
            <MessageParent messageParent={messageParent} userSessionData={userSessionData}/>
            {
                messageParent.owner.settings[0].wantResponse ?
                    <>
                        <ResponseForm userSessionData={userSessionData} messageParent={messageParent}/>
                        <Messages messageParent={messageParent} userSessionData={userSessionData} messages={responses} skip={skip}
                                  messageListDiv={responseListDiv}></Messages>
                        <div className={"flex justify-center"}>
                            <MessageLoader messages={responses} messageListDiv={responseListDiv}/>
                        </div>
                    </>
                    : <NoMessage username={messageParent.owner.name}/>
            }
        </div>
    );
}