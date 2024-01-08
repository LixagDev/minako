"use client"
import PhoneNavbar from "@/components/main/PhoneNavbar";
import UserInfo from "@/components/user/UserInfo";
import BackBar from "@/components/main/BackBar";
import {useRef, useState} from "react";
import dynamic from "next/dynamic";
import Divider from "@/components/main/Divider";
import M_Button from "@/components/component/M_Button";
import DateChangerProfil from "@/functions/DateChangerProfil";
import MessageLoader from "@/components/messages&responses/MessageLoader";
import M_Avatar from "@/components/component/M_Avatar";
const Responses = dynamic(() => import("@/components/messages&responses/Responses"), { ssr: false,  });
const Messages = dynamic(() => import("@/components/messages&responses/Messages"), { ssr: false });

export default function UserProfile({userRequestData, userSessionData, userRequestResponse, skip}){
    const messageListDiv = useRef();
    const [wantSeeMessage, setWantSeeMessage] = useState(true);

    return(
        <div ref={messageListDiv} className={"flex flex-col gap-3 w-full overflow-x-hidden overflow-y-scroll h-full pl-3 pr-3 pb-3"}>
            <PhoneNavbar userSessionData={userSessionData}/>
            <BackBar content={userRequestData.name} other={`À rejoint minako en ${DateChangerProfil(userRequestData.created_at)}`}/>
            <UserInfo userRequestData={userRequestData} userSessionData={userSessionData}/>
            <div className={"flex w-full join"}>
                <M_Button className={"join-item w-1/2"} active={wantSeeMessage} onClick={() => setWantSeeMessage(true)} text={"Message"} />
                <M_Button className={"join-item w-1/2"} active={!wantSeeMessage} onClick={() => setWantSeeMessage(false)} text={"Réponse"} />
            </div>
            {
                wantSeeMessage ?
                    <>
                        <Divider content={`Message(s) de ${userRequestData.name}`}/>
                        <Messages userSessionData={userSessionData} messages={userRequestData.messages}/>
                        <div className={"flex justify-center"}>
                            <MessageLoader messages={userRequestData.messages} messageListDiv={messageListDiv}/>
                        </div>
                    </>
                    :
                    <>
                        <Divider content={`Réponse(s) de ${userRequestData.name}`}/>
                        <Responses userSessionData={userSessionData} messages={userRequestResponse}/>
                        <div className={"flex justify-center"}>
                            <MessageLoader messages={userRequestResponse} messageListDiv={messageListDiv}/>
                        </div>
                    </>
            }
        </div>
    );
}