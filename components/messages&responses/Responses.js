"use client"
import {Avatar, Button, Dropdown, Link} from "react-daisyui";
import {useRouter} from "next/navigation";
import {MessageSquare, MoreVertical, CornerRightDown, CornerLeftUp} from "react-feather";
import axios from "axios";
import Markdown from "react-markdown";
import {Suspense} from "react";
import LoadingMessagesSkeleton from "@/components/loadings/LoadingMessagesSkeleton";
import DateChangerMessage from "@/functions/DateChangerMessage";
import PremiumBadge from "@/components/main/PremiumBadge";

export default function Responses({messages, userSessionData, skip, messageListDiv}) {
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
                    const messageParentData = await getMessageDataFromApi(message.responseFromId);
                    const responseData = await getMessageDataFromApi(message.id);

                    return (
                        <div key={message.responseFromId} className={"flex flex-col border-b border-neutral"}>
                            {
                                !messageParentData.id ?
                                    <div className={"w-full bg-base-200 flex justify-center p-4"}>
                                        <h2>Le message parent à été supprimé.</h2>
                                    </div>
                                    :
                                    <div className={"w-full bg-base-200 flex gap-3 p-4"}>
                                        <Avatar
                                            onClick={async () => router.push(`/user/${messageParentData.owner.name}`)}
                                            className={"cursor-pointer"} shape={"circle"}
                                            src={messageParentData.owner.image} border borderColor={"neutral"}
                                            size={"sm"}/>
                                        <div className={"flex flex-col justify-center w-fit basis-full"}>
                                            <div className={"flex gap-2 items-center"}>
                                                {
                                                    messageParentData.owner.othername ?
                                                        <>
                                                            <Link
                                                                onClick={() => router.push(`/user/${messageParentData.owner.name}`)}
                                                                className={"font-bold"}>{messageParentData.owner.othername} </Link>
                                                            <Link
                                                                onClick={() => router.push(`/user/${messageParentData.owner.name}`)}
                                                                className={"font-bold text-neutral-content"}>@{messageParentData.owner.name}</Link>
                                                        </>
                                                        : <Link
                                                            onClick={() => router.push(`/user/${messageParentData.owner.name}`)}
                                                            className={"font-bold"}>@{messageParentData.owner.name}</Link>
                                                }
                                                {messageParentData.owner.isPremium ?
                                                    <PremiumBadge mini={true} size={"sm"}
                                                                  username={messageParentData.owner.name}/> : null}
                                                <h3 className={"text-xs"}>{DateChangerMessage(messageParentData.created_at)}</h3>
                                            </div>
                                            <h3 className={"cursor-pointer whitespace-break-spaces"}
                                                onClick={() => router.push(`/message/${message.responseFromId}`)}>{messageParentData.messageContent}</h3>
                                            <div className={"flex gap-1 items-center"}>
                                                <h4 className={"text-sm"}>{messageParentData.responses}</h4>
                                                <MessageSquare size={15}/>
                                            </div>
                                        </div>
                                        <div className={"flex items-center flex-row-reverse"}>
                                            {
                                                userSessionData.id === messageParentData.owner.id ?
                                                    <Dropdown horizontal={"left"}>
                                                        <Dropdown.Toggle size={"sm"}><MoreVertical/></Dropdown.Toggle>
                                                        <Dropdown.Menu className="w-52">
                                                            <Dropdown.Item color={"primary"}
                                                                           onClick={() => deleteMessage(message.responseFromId)}>Supprimer</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    : null
                                            }
                                        </div>
                                    </div>
                            }
                            <div className={"flex justify-center items-center"}>
                                <CornerLeftUp/>
                                <CornerRightDown/>
                            </div>
                            <div className={"w-full bg-base-200 flex gap-3 p-4"}>
                                <Avatar onClick={() => router.push(`/user/${message.owner.name}`)}
                                        className={"cursor-pointer"} shape={"circle"}
                                        src={message.owner.image} border borderColor={"neutral"}
                                        size={"sm"}/>
                                <div className={"flex flex-col justify-center w-fit basis-full"}>
                                    <div className={"flex gap-2 items-center"}>
                                        {
                                            message.owner.othername ?
                                                <>
                                                    <Link onClick={() => router.push(`/user/${message.owner.name}`)}
                                                          className={"font-bold"}>{message.owner.othername} </Link>
                                                    <Link onClick={() => router.push(`/user/${message.owner.name}`)}
                                                          className={"font-bold text-neutral-content"}>@{message.owner.name} </Link>
                                                </>
                                                : <Link onClick={() => router.push(`/user/${message.owner.name}`)}
                                                        className={"font-bold"}>@{message.owner.name} </Link>
                                        }
                                        {message.owner.isPremium ? <PremiumBadge mini={true} size={"sm"}
                                                                                 username={message.owner.name}/> : null}
                                        <h3 className={"text-xs"}>{DateChangerMessage(message.created_at)}</h3>
                                    </div>
                                    <h3 className={"cursor-pointer"}
                                        onClick={() => router.push(`/message/${message.id}`)}><Markdown
                                        className={"whitespace-break-spaces"}>{message.content}</Markdown></h3>
                                    <div className={"flex gap-1 items-center"}>
                                        <h4 className={"text-sm"}>{responseData.responses}</h4>
                                        <MessageSquare size={15}/>
                                    </div>
                                </div>
                                <div className={"flex items-center flex-row-reverse "}>
                                    {
                                        userSessionData.id === message.owner.id ?
                                            <Dropdown horizontal={"left"}>
                                                <Dropdown.Toggle size={"sm"}><MoreVertical/></Dropdown.Toggle>
                                                <Dropdown.Menu className="w-52">
                                                    <Dropdown.Item color={"primary"}
                                                                   onClick={() => deleteMessage(message.id)}>Supprimer</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            : null
                                    }
                                </div>
                            </div>
                        </div>
                    );
                })
            }
            <div className={"flex justify-center m-5"}>
                {
                    messages.length < 10 ?
                            <Button onClick={backUp} color={"secondary"} className={"w-1/3"}>Revenir au début</Button> :
                            <Button onClick={loadMore} color={"secondary"} className={"w-1/3"}>Charger plus</Button>
                }
            </div>
        </Suspense>
    );
}