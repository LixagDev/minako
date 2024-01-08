import {Dropdown, Link} from "react-daisyui";
import {useRouter} from "next/navigation";
import {MessageSquare, MoreVertical} from "react-feather";
import Markdown from "react-markdown";
import {Suspense} from "react";
import LoadingMessagesSkeleton from "@/components/loadings/LoadingMessagesSkeleton";
import DateChangerMessage from "@/functions/DateChangerMessage";
import PremiumBadge from "@/components/main/PremiumBadge";
import DeleteMessage from "@/functions/DeleteMessage";
import GetMessageDataFromApi from "@/functions/GetMessageDataFromApi";
import M_Avatar from "@/components/component/M_Avatar";

export default function Messages({messages, userSessionData}) {
    const router = useRouter();

    return (
        <Suspense fallback={<LoadingMessagesSkeleton/>}>
            {
                messages.map(async (message) => {
                    const messageData = await GetMessageDataFromApi(message.id);
                    return (
                        <div key={message.id} className={"w-full bg-base-100 shadow-md flex  gap-3 p-4 rounded-xl"}>
                            <M_Avatar onClick={() => router.push(`/user/${message.owner.name}`)} className={"cursor-pointer"} src={message.owner.image} size={"sm"}/>
                            <div className={"flex flex-col justify-center w-fit basis-full"}>
                                <div className={"flex gap-x-2 flex-wrap items-center"}>
                                    {
                                        message.owner.othername ?
                                            <>
                                                <Link onClick={() => router.push(`/user/${message.owner.name}`)} className={"font-bold"}>{message.owner.othername} </Link>
                                                <Link onClick={() => router.push(`/user/${message.owner.name}`)} className={"font-bold text-neutral"}>@{message.owner.name} </Link>
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
                            <div className={"flex items-center flex-row-reverse"}>
                                {
                                    userSessionData.id === message.owner.id ?
                                        <Dropdown horizontal={"left"}>
                                            <Dropdown.Toggle size={"sm"}><MoreVertical /></Dropdown.Toggle>
                                            <Dropdown.Menu className="w-52">
                                                <Dropdown.Item color={"primary"} onClick={() => DeleteMessage(message.id, userSessionData).then(response => {router.refresh();})}>Supprimer</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        : null
                                }
                            </div>
                        </div>
                    );
                })
            }
        </Suspense>
    );
}