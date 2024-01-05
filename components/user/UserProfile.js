"use client"
import PhoneNavbar from "@/components/main/PhoneNavbar";
import UserInfo from "@/components/user/UserInfo";
import BackBar from "@/components/main/BackBar";
import {useRef, useState} from "react";
import dynamic from "next/dynamic";
import Divider from "@/components/main/Divider";
import {Pagination, Button} from "react-daisyui";
import DateChangerProfil from "@/functions/DateChangerProfil";
import {useRouter} from "next/navigation";
import MessageLoader from "@/components/messages&responses/MessageLoader";
const Responses = dynamic(() => import("@/components/messages&responses/Responses"), { ssr: false,  });
const Messages = dynamic(() => import("@/components/messages&responses/Messages"), { ssr: false });

export default function UserProfile({userRequestData, userSessionData, userRequestResponse, skip}){
    const router = useRouter();
    const messageListDiv = useRef();
    const [wantSeeMessage, setWantSeeMessage] = useState(true);

    const loadMore = () => {
        router.push(`?skip=${Number(skip)+10}`);
        messageListDiv.current.scrollTo({top: 0, behavior: 'smooth' });
    }

    const backUp = () => {
        router.push("?");
        messageListDiv.current.scrollTo({top: 0, behavior: 'smooth' });
    }

    return(
        <div ref={messageListDiv}
             className={"bg-base-200 w-full overflow-x-hidden overflow-y-scroll h-full border-l border-r border-neutral"}>
            <PhoneNavbar userSessionData={userSessionData}/>
            <BackBar content={userRequestData.name}
                     other={`À rejoint Minako le ${DateChangerProfil(userRequestData.created_at)}`}/>
            <UserInfo userRequestData={userRequestData} userSessionData={userSessionData}/>
            <div className={"flex border-b border-neutral p-4"}>
                <Pagination className={"w-1/2 flex"}>
                    <Button className={"join-item w-full"} active={wantSeeMessage}
                            onClick={() => setWantSeeMessage(true)}>Message</Button>
                    <Button className={"join-item w-full"} active={!wantSeeMessage}
                            onClick={() => setWantSeeMessage(false)}>Réponse</Button>
                </Pagination>
            </div>
            {
                wantSeeMessage ?
                    <>
                        <Divider content={`Message(s) de ${userRequestData.name}`}/>
                        <Messages userSessionData={userSessionData} messages={userRequestData.messages} skip={skip}
                                  messageListDiv={messageListDiv}/>
                        <div className={"flex justify-center m-5"}>
                            <MessageLoader messages={userRequestData.messages} backUp={backUp} loadMore={loadMore}/>
                        </div>
                    </>
                    :
                    <>
                        <Divider content={`Réponse(s) de ${userRequestData.name}`}/>
                        <Responses userSessionData={userSessionData} messages={userRequestResponse} skip={skip}
                                   messageListDiv={messageListDiv}/>
                        <div className={"flex justify-center m-5"}>
                            <MessageLoader messages={userRequestResponse} backUp={backUp} loadMore={loadMore}/>
                        </div>
                    </>
            }
        </div>
    );
}