"use client"
import MessageForm from "@/components/forms/MessageForm";
import PhoneMessageFormButton from "@/components/forms/PhoneMessageFormButton";
import PhoneNavbar from "@/components/main/PhoneNavbar";
import dynamic from "next/dynamic";
import {useRef} from "react";
import {useRouter} from "next/navigation";
import MessageLoader from "@/components/messages&responses/MessageLoader";
const Messages = dynamic(() => import("@/components/messages&responses/Messages"), { ssr: false });

export default function MessagesList({userSessionData, messages, modalMessageFormVisible, setModalMessageFormVisible, skip}){
    const router = useRouter();
    const messageListDiv = useRef();

    const loadMore = () => {
        router.push(`?skip=${Number(skip)+10}`);
        messageListDiv.current.scrollTo({top: 0, behavior: 'smooth' });
    }

    const backUp = () => {
        router.push("?");
        messageListDiv.current.scrollTo({top: 0, behavior: 'smooth' });
    }

    return(
        <div ref={messageListDiv} className={"bg-base-200 w-full overflow-x-hidden overflow-y-scroll h-full border-l border-r border-neutral"}>
            <PhoneMessageFormButton userSessionData={userSessionData}  modalMessageFormVisible={modalMessageFormVisible} setModalMessageFormVisible={setModalMessageFormVisible} messageListDiv={messageListDiv}/>
            <PhoneNavbar userSessionData={userSessionData}/>
            <MessageForm userSessionData={userSessionData}/>
            <Messages messages={messages} userSessionData={userSessionData} messageListDiv={messageListDiv} skip={skip}/>
            <div className={"flex justify-center m-5"}>
                <MessageLoader messages={messages} backUp={backUp} loadMore={loadMore} />
            </div>
        </div>
    );
}