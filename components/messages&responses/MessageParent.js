"use client"
import DateChangerMessage from "@/functions/DateChangerMessage";
import {Avatar, Dropdown, Link} from "react-daisyui";
import {MoreVertical, Star, ArrowLeft} from "react-feather";
import Markdown from "react-markdown";
import {useRouter} from "next/navigation";
import axios from "axios";
import BackBar from "@/components/main/BackBar";

export default function MessageParent({messageParent, userSessionData}){
    const router = useRouter();

    const deleteMessage = (messageId) => {
        axios.post("/api/delete/message", {messageId: messageId, ownerId: userSessionData.id})
            .then((response) => {
                router.push("/home");
            });
    }

    return(
        <div className={"flex flex-col"}>
            <BackBar content={`Messsage de ${messageParent.owner.name}`}/>
            <div className={"w-full bg-base-300 border-b border-neutral flex gap-3 p-4"}>
                <Avatar onClick={() => router.push(`/user/${messageParent.owner.name}`)} className={"cursor-pointer"}
                        shape={"circle"}
                        src={messageParent.owner.image} border borderColor={"neutral"}
                        size={"sm"}/>
                <div className={"flex flex-col justify-center w-fit basis-full"}>
                    <div className={"flex gap-2 items-center"}>
                        <Link onClick={() => router.push(`/user/${messageParent.owner.name}`)}
                              className={"font-bold text-xl"}>@{messageParent.owner.name} </Link>
                        {messageParent.owner.isPremium ? <Star width={15} strokeWidth={4}/> : null}
                        <h3 className={"text-xs"}>{DateChangerMessage(messageParent.created_at)}</h3>
                    </div>
                    <h3 className={"cursor-pointer text-lg"} onClick={() => router.push(`/message/${messageParent.id}`)}>
                        <Markdown
                            className={"whitespace-break-spaces"}>{messageParent.content}</Markdown></h3>
                </div>
                <div className={"flex items-center flex-row-reverse "}>
                    {
                        userSessionData.id === messageParent.owner.id ?
                            <Dropdown horizontal={"left"}>
                                <Dropdown.Toggle size={"sm"}><MoreVertical/></Dropdown.Toggle>
                                <Dropdown.Menu className="w-52">
                                    <Dropdown.Item color={"primary"}
                                                   onClick={() => deleteMessage(messageParent.id)}>Supprimer</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            : null
                    }
                </div>
            </div>
        </div>
    );
}