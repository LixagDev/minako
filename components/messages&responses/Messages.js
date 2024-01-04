import {Avatar, Button, Dropdown, Link} from "react-daisyui";
import {useRouter} from "next/navigation";
import {MessageSquare, MoreVertical} from "react-feather";
import axios from "axios";
import Markdown from "react-markdown";
import {Suspense} from "react";
import LoadingMessagesSkeleton from "@/components/loadings/LoadingMessagesSkeleton";
import DateChangerMessage from "@/functions/DateChangerMessage";
import PremiumBadge from "@/components/main/PremiumBadge";

export default function Messages({messages, userSessionData, skip, messageListDiv}) {
    const router = useRouter();

    const getMessageDataFromApi = (messageId) => {
        return axios.get(`/api/get/message?id=${messageId}`)
            .then((response) => {
                return response.data;
            });
    }

    const deleteMessage = (messageId) => {
        axios.post("/api/delete/message", {messageId: messageId, ownerId: userSessionData.id})
            .then((response) => {
                router.refresh();
            });
    }

    const loadMore = () => {
        router.push(`?skip=${Number(skip)+10}`);
        messageListDiv.current.scrollTo({top: 0, behavior: 'smooth' });
    }

    const backUp = () => {
        router.push("?");
        messageListDiv.current.scrollTo({top: 0, behavior: 'smooth' });
    }

    return (
        <Suspense fallback={<LoadingMessagesSkeleton/>}>
            {
                messages.map(async (message) => {
                    const messageData = await getMessageDataFromApi(message.id);
                    return (
                        <div key={message.id} className={"w-full bg-base-200 border-b border-neutral flex gap-3 p-4"}>
                            <Avatar onClick={() => router.push(`/user/${message.owner.name}`)} className={"cursor-pointer"} shape={"circle"}
                                    src={message.owner.image} border borderColor={"neutral"}
                                    size={"sm"}/>
                            <div className={"flex flex-col justify-center w-fit basis-full"}>
                                <div className={"flex gap-2 items-center"}>
                                    {
                                        message.owner.othername ?
                                            <>
                                                <Link onClick={() => router.push(`/user/${message.owner.name}`)} className={"font-bold"}>{message.owner.othername} </Link>
                                                <Link onClick={() => router.push(`/user/${message.owner.name}`)} className={"font-bold text-neutral-content"}>@{message.owner.name} </Link>
                                            </>
                                            : <Link onClick={() => router.push(`/user/${message.owner.name}`)} className={"font-bold"}>@{message.owner.name} </Link>
                                    }
                                    {message.owner.isPremium ? <PremiumBadge mini={true} size={"sm"} username={message.owner.name} /> : null}
                                    <h3 className={"text-xs"}>{DateChangerMessage(message.created_at)}</h3>
                                </div>
                                <h3 className={"cursor-pointer"} onClick={() => router.push(`/message/${message.id}`)}><Markdown className={"whitespace-break-spaces"}>{message.content}</Markdown></h3>
                                <div className={"flex gap-1 items-center"}>
                                    <h4 className={"text-sm"}>{messageData.responses}</h4>
                                    <MessageSquare size={15}/>
                                </div>
                            </div>
                            <div className={"flex items-center flex-row-reverse "}>
                                {
                                    userSessionData.id === message.owner.id ?
                                        <Dropdown horizontal={"left"}>
                                            <Dropdown.Toggle size={"sm"}><MoreVertical /></Dropdown.Toggle>
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
            <div className={"flex justify-center m-5"}>
                {
                    messages.length < 10 ? <Button onClick={backUp} color={"secondary"} className={"w-1/3"}>Revenir au début</Button> : <Button onClick={loadMore} color={"secondary"} className={"w-1/3"}>Charger plus</Button>
                }
            </div>
        </Suspense>
    );
}