"use client"
import MessageForm from "@/components/forms/MessageForm";
import PhoneMessageFormButton from "@/components/forms/PhoneMessageFormButton";
import PhoneNavbar from "@/components/main/PhoneNavbar";
import dynamic from "next/dynamic";
import {useRef} from "react";
import MessageLoader from "@/components/messages&responses/MessageLoader";
const Messages = dynamic(() => import("@/components/messages&responses/Messages"), { ssr: false });

export default function MessagesList({userSessionData, messages, modalMessageFormVisible, setModalMessageFormVisible, skip}){
    const messageListDiv = useRef();

    return(
        <div ref={messageListDiv} className={"flex flex-col gap-3 w-full overflow-x-hidden overflow-y-scroll h-full pl-3 pr-3 pb-3"}>
            <PhoneNavbar userSessionData={userSessionData}/>
            <MessageForm userSessionData={userSessionData}/>
            <Messages messages={messages} userSessionData={userSessionData} messageListDiv={messageListDiv} skip={skip}/>
            <div className={"flex justify-center"}>
                <MessageLoader messages={messages} messageListDiv={messageListDiv}/>
            </div>
            <PhoneMessageFormButton userSessionData={userSessionData}  modalMessageFormVisible={modalMessageFormVisible} setModalMessageFormVisible={setModalMessageFormVisible} messageListDiv={messageListDiv}/>
        </div>
    );
}