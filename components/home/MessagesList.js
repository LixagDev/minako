"use client"
import MessageForm from "@/components/home/MessageForm";
import Messages from "@/components/home/Messages";
import PhoneMessageFormButton from "@/components/home/PhoneMessageFormButton";
import PhoneNavbar from "@/components/main/PhoneNavbar";

export default function MessagesList({userSessionData, messages, modalMessageFormVisible, setModalMessageFormVisible}){
    return(
        <div className={"bg-base-200 w-full overflow-x-hidden overflow-y-scroll h-full border-l border-r border-neutral"}>
            <PhoneMessageFormButton userSessionData={userSessionData}  modalMessageFormVisible={modalMessageFormVisible} setModalMessageFormVisible={setModalMessageFormVisible}/>
            <PhoneNavbar userSessionData={userSessionData}/>
            <MessageForm userSessionData={userSessionData}/>
            <Messages messages={messages} userSessionData={userSessionData}/>
        </div>
    );
}