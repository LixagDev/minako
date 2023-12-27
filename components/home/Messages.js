"use client"
import {Avatar, Link, Dropdown} from "react-daisyui";
import {useRouter} from "next/navigation";
import {MoreVertical, Star, MessageSquare} from "react-feather";
import axios from "axios";
import Markdown from "react-markdown";

export default function Messages({messages, userSessionData}) {
    const router = useRouter();

    const dateChanger = (messageDate) => {
        const today = ((new Date().getTime())/1000).toFixed(0);
        const resultMessageDate = messageDate;
        const minutesBetween = (today/60)-(resultMessageDate/60);
        const hoursBetween = (today/3600)-(resultMessageDate/3600);
        const secondsBetween = (today-resultMessageDate);
        if (secondsBetween.toFixed(0) < 0){
            const fullDate = new Date(new Number(resultMessageDate)*1000);
            return `${fullDate.getDate()}/${fullDate.getMonth()}/${fullDate.getFullYear()}`;
        }
        else if (secondsBetween.toFixed(0) <= 15){
            return "À l'instant";
        }
        else if (minutesBetween.toFixed(1) < 1){
            return `Il y a moins d'une minute`;
        }
        else if (minutesBetween.toFixed(0) < 60){
            return `Il y a ${minutesBetween.toFixed(0)} min`;
        }
        else if (hoursBetween.toFixed(0) < 24){
            return `Il y a ${hoursBetween.toFixed(0)}h`;
        }
        else{
            const fullDate = new Date(new Number(resultMessageDate)*1000);
            return `${fullDate.getDate()}/${fullDate.getMonth()}/${fullDate.getFullYear()}`;
        }
    }

    const deleteMessage = (messageId) => {
        axios.post("/api/delete/message", {messageId: messageId, ownerId: userSessionData.id})
            .then((response) => {
                router.refresh();
            });
    }

    return (
        <>
            {
                messages.map((message) => {
                    return (
                        <div key={message.id} className={"w-full bg-base-200 border-b border-neutral flex gap-3 p-4 cursor-pointer"}>
                            <Avatar onClick={() => router.push(`/user/${message.owner.name}`)} className={"cursor-pointer"} shape={"circle"}
                                    src={message.owner.image} border borderColor={"neutral"}
                                    size={"sm"}/>
                            <div className={"flex flex-col justify-center w-fit basis-full"}>
                                <div className={"flex gap-2 items-center"}>
                                    <Link onClick={() => router.push(`/user/${message.owner.name}`)}
                                          className={"font-bold"}>@{message.owner.name} </Link>
                                    {message.owner.isPremium ? <Star width={15} strokeWidth={4}></Star> : null}
                                    <h3 className={"text-xs"}
                                        suppressHydrationWarning>{dateChanger(message.created_at)}</h3>
                                </div>
                                <h3><Markdown className={"whitespace-break-spaces"}>{message.content}</Markdown></h3>
                                <div className={"flex gap-1 items-center"}>
                                    <h4 className={"text-sm"}>{message.responses.length}</h4>
                                    <MessageSquare size={15}/>
                                </div>
                            </div>
                            <div className={"flex items-center flex-row-reverse "}>
                                {
                                    userSessionData.id === message.owner.id ?
                                        <Dropdown horizontal={"left"}>
                                            <Dropdown.Toggle size={"sm"}><MoreVertical></MoreVertical></Dropdown.Toggle>
                                            <Dropdown.Menu className="w-52">
                                                <Dropdown.Item color={"primary"} onClick={() => deleteMessage(message.id)}>Supprimer</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        : null
                                }
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
}