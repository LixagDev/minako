"use client"
import {Dropdown, Link} from "react-daisyui";
import M_Avatar from "@/components/component/M_Avatar";
import {useRouter} from "next/navigation";
import {MessageSquare, MoreVertical, CornerRightDown, CornerLeftUp} from "react-feather";
import Markdown from "react-markdown";
import {Suspense} from "react";
import LoadingMessagesSkeleton from "@/components/loadings/LoadingMessagesSkeleton";
import DateChangerMessage from "@/functions/DateChangerMessage";
import DeleteMessage from "@/functions/DeleteMessage";
import GetMessageDataFromApi from "@/functions/GetMessageDataFromApi";

export default function Responses({messages, userSessionData}) {
    const router = useRouter();

    return (
        <Suspense fallback={<LoadingMessagesSkeleton/>}>
            {
                messages.map(async (message) => {
                    const messageParentData = await GetMessageDataFromApi(message.responseFromId);
                    const responseData = await GetMessageDataFromApi(message.id);

                    return (
                        <div key={message.responseFromId} className={"flex flex-col bg-base-100 rounded-xl shadow-md"}>
                            {
                                !messageParentData.id ?
                                    <div className={"w-full bg-base-100 flex justify-center p-4 rounded-t-xl"}>
                                        <h2>Le message parent à été supprimé.</h2>
                                    </div>
                                    :
                                    <div className={"w-full bg-base-100 flex gap-3 p-4 rounded-t-xl"}>
                                        <M_Avatar onClick={async () => router.push(`/user/${messageParentData.owner.name}`)} className={"cursor-pointer"} src={messageParentData.owner.image} size={"sm"}/>
                                        <div className={"flex flex-col justify-center w-fit basis-full"}>
                                            <div className={"flex gap-x-2 flex-wrap items-center"}>
                                                {
                                                    messageParentData.owner.othername ?
                                                        <>
                                                            <Link
                                                                onClick={() => router.push(`/user/${messageParentData.owner.name}`)}
                                                                className={"font-bold"}>{messageParentData.owner.othername} </Link>
                                                            <Link
                                                                onClick={() => router.push(`/user/${messageParentData.owner.name}`)}
                                                                className={"font-bold text-neutral"}>@{messageParentData.owner.name}</Link>
                                                        </>
                                                        : <Link
                                                            onClick={() => router.push(`/user/${messageParentData.owner.name}`)}
                                                            className={"font-bold"}>@{messageParentData.owner.name}</Link>
                                                }
                                                <h3 className={"text-xs"}>{DateChangerMessage(messageParentData.created_at)}</h3>
                                            </div>
                                            <h3 className={"cursor-pointer whitespace-break-spaces"}
                                                onClick={() => router.push(`/message/${message.responseFromId}`)}><Markdown>{messageParentData.messageContent}</Markdown></h3>
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
                                                                           onClick={() => DeleteMessage(message.responseFromId, userSessionData).then(response => {router.refresh();})}>Supprimer</Dropdown.Item>
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
                            <div className={"w-full bg-base-200 flex gap-3 p-4 rounded-b-xl"}>
                                <M_Avatar onClick={() => router.push(`/user/${message.owner.name}`)} className={"cursor-pointer"} src={message.owner.image} size={"sm"}/>
                                <div className={"flex flex-col justify-center w-fit basis-full"}>
                                    <div className={"flex gap-x-2 flex-wrap items-center"}>
                                        {
                                            message.owner.othername ?
                                                <>
                                                    <Link onClick={() => router.push(`/user/${message.owner.name}`)}
                                                          className={"font-bold"}>{message.owner.othername} </Link>
                                                    <Link onClick={() => router.push(`/user/${message.owner.name}`)}
                                                          className={"font-bold text-neutral"}>@{message.owner.name} </Link>
                                                </>
                                                : <Link onClick={() => router.push(`/user/${message.owner.name}`)}
                                                        className={"font-bold"}>@{message.owner.name} </Link>
                                        }
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
                                                                   onClick={() => DeleteMessage(message.id, userSessionData).then(() => {router.refresh();})}>Supprimer</Dropdown.Item>
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
        </Suspense>
    );
}