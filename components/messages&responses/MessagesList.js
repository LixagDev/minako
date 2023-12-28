"use client"
import MessageForm from "@/components/forms/MessageForm";
import PhoneMessageFormButton from "@/components/forms/PhoneMessageFormButton";
import PhoneNavbar from "@/components/main/PhoneNavbar";
import dynamic from "next/dynamic";
import {useRef} from "react";
const Messages = dynamic(() => import("@/components/messages&responses/Messages"), { ssr: false });

export default function MessagesList({userSessionData, messages, modalMessageFormVisible, setModalMessageFormVisible, skip}){
    const messageListDiv = useRef();
    return(
        <div ref={messageListDiv} className={"bg-base-200 w-full overflow-x-hidden overflow-y-scroll h-full border-l border-r border-neutral"}>
            <PhoneMessageFormButton userSessionData={userSessionData}  modalMessageFormVisible={modalMessageFormVisible} setModalMessageFormVisible={setModalMessageFormVisible} messageListDiv={messageListDiv}/>
            <PhoneNavbar userSessionData={userSessionData}/>
            <MessageForm userSessionData={userSessionData}/>
            <Messages messages={messages} userSessionData={userSessionData} messageListDiv={messageListDiv} skip={skip}/>
        </div>
    );
}