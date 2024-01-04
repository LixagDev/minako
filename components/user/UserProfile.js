"use client"
import PhoneNavbar from "@/components/main/PhoneNavbar";
import UserInfo from "@/components/user/UserInfo";
import BackBar from "@/components/main/BackBar";
import {useRef, useState} from "react";
import dynamic from "next/dynamic";
import Divider from "@/components/main/Divider";
import {Pagination, Button} from "react-daisyui";
const Responses = dynamic(() => import("@/components/messages&responses/Responses"), { ssr: false,  });
const Messages = dynamic(() => import("@/components/messages&responses/Messages"), { ssr: false });

export default function UserProfile({userRequestData, userSessionData, userRequestResponse, skip}){
    const messageListDiv = useRef();
    const [wantSeeMessage, setWantSeeMessage] = useState(true);

    return(
        <div ref={messageListDiv} className={"bg-base-200 w-full overflow-x-hidden overflow-y-scroll h-full border-l border-r border-neutral"}>
            <PhoneNavbar userSessionData={userSessionData}/>
            <BackBar content={userRequestData.name} other={`${userRequestData.messages.length} message(s)`} />
            <UserInfo userRequestData={userRequestData} userSessionData={userSessionData} />
            <div className={"flex border-b border-neutral p-4"}>
                <Pagination className={"w-1/2 flex"}>
                    <Button className={"join-item w-full"} variant={"outline"} color={"secondary"} onClick={() => setWantSeeMessage(true)}>Message</Button>
                    <Button className={"join-item w-full"} variant={"outline"} color={"secondary"} onClick={() => setWantSeeMessage(false)}>Réponse</Button>
                </Pagination>
            </div>
            {
                wantSeeMessage ?
                    <>
                        <Divider content={`Message(s) de ${userRequestData.name}`}/>
                        <Messages userSessionData={userSessionData} messages={userRequestData.messages} skip={skip} messageListDiv={messageListDiv}/>
                    </>
                    :
                    <>
                        <Divider content={`Réponse(s) de ${userRequestData.name}`}/>
                        <Responses userSessionData={userSessionData} messages={userRequestResponse} skip={skip} messageListDiv={messageListDiv}/>
                    </>
            }
        </div>
    );
}