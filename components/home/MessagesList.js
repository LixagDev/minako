"use client"
import MessageForm from "@/components/home/MessageForm";
//import Messages from "@/components/home/Messages";
import PhoneMessageFormButton from "@/components/home/PhoneMessageFormButton";
import PhoneNavbar from "@/components/main/PhoneNavbar";
import dynamic from "next/dynamic";
import {Button} from "react-daisyui";
import {useRouter} from "next/navigation";
import {useRef} from "react";
const Messages = dynamic(() => import("@/components/home/Messages"), { ssr: false });

export default function MessagesList({userSessionData, messages, modalMessageFormVisible, setModalMessageFormVisible, skip}){
    const router = useRouter()
    const messageListDiv = useRef()
    return(
        <div ref={messageListDiv} className={"bg-base-200 w-full overflow-x-hidden overflow-y-scroll h-full border-l border-r border-neutral"}>
            <PhoneMessageFormButton userSessionData={userSessionData}  modalMessageFormVisible={modalMessageFormVisible} setModalMessageFormVisible={setModalMessageFormVisible}/>
            <PhoneNavbar userSessionData={userSessionData}/>
            <MessageForm userSessionData={userSessionData}/>
            <Messages messages={messages} userSessionData={userSessionData} messageListDiv={messageListDiv} skip={skip}/>
        </div>
    );
}