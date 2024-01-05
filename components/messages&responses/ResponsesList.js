"use client"
import MessageParent from "@/components/messages&responses/MessageParent";
import {useRef} from "react";
import PhoneNavbar from "@/components/main/PhoneNavbar";
import ResponseForm from "@/components/forms/ResponseForm";
import dynamic from "next/dynamic";
import BackBar from "@/components/main/BackBar";
import {useRouter} from "next/navigation";
import MessageLoader from "@/components/messages&responses/MessageLoader";
const Messages = dynamic(() => import("@/components/messages&responses/Messages"), { ssr: false });


export default function ResponsesList({messageParent, responses, userSessionData, skip}){
    const responseListDiv = useRef();
    const router = useRouter();

    const loadMore = () => {
        router.push(`?skip=${Number(skip)+10}`);
        responseListDiv.current.scrollTo({top: 0, behavior: 'smooth' });
    }

    const backUp = () => {
        router.push("?");
        responseListDiv.current.scrollTo({top: 0, behavior: 'smooth' });
    }

    return(
        <div ref={responseListDiv}
             className={"bg-base-200 w-full overflow-x-hidden overflow-y-scroll h-full border-l border-r border-neutral"}>
            <PhoneNavbar userSessionData={userSessionData}/>
            <BackBar content={`Messsage de ${messageParent.owner.name}`}/>
            <MessageParent messageParent={messageParent} userSessionData={userSessionData}/>
            <ResponseForm userSessionData={userSessionData} messageParent={messageParent}/>
            <Messages messageParent={messageParent} userSessionData={userSessionData} messages={responses} skip={skip}
                      messageListDiv={responseListDiv}></Messages>
            <div className={"flex justify-center m-5"}>
                <MessageLoader messages={responses} backUp={backUp} loadMore={loadMore}/>
            </div>
        </div>
    );
}