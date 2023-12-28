"use client"
import {Avatar, Button, Dropdown, Link} from "react-daisyui";
import {useRouter} from "next/navigation";
import {MessageSquare, MoreVertical, Star} from "react-feather";
import axios from "axios";
import Markdown from "react-markdown";
import {Suspense} from "react";
import LoadingMessagesSkeleton from "@/components/loadings/LoadingMessagesSkeleton";
import DateChanger from "@/functions/DateChanger";

export default function Responses({responses, userSessionData, skip, responseListDiv, messageParent}) {
    const router = useRouter();
    const getResponse = (responseId) => {
        return axios.get(`/api/get/message?id=${responseId}`)
            .then((response) => {
                return response.data.responses;
            });
    }

    const deleteMessage = (responseId) => {
        axios.post("/api/delete/message", {messageId: responseId, ownerId: userSessionData.id})
            .then((response) => {
                router.refresh();
            });
    }

    const loadMore = () => {
        router.push(`/home?skip=${Number(skip)+10}`);
        responseListDiv.current.scrollTo({top: 0, behavior: 'smooth' });
    }

    const backUp = () => {
        router.push(`/message/${messageParent.id}`);
        responseListDiv.current.scrollTo({top: 0, behavior: 'smooth' });
    }

    return (
        <Suspense fallback={<LoadingMessagesSkeleton/>}>
            {
                responses.map((response) => {
                    return (
                        <div key={response.id} className={"w-full bg-base-200 border-b border-neutral flex gap-3 p-4"}>
                            <Avatar onClick={() => router.push(`/user/${response.owner.name}`)} className={"cursor-pointer"} shape={"circle"}
                                    src={response.owner.image} border borderColor={"neutral"}
                                    size={"sm"}/>
                            <div className={"flex flex-col justify-center w-fit basis-full"}>
                                <div className={"flex gap-2 items-center"}>
                                    <Link onClick={() => router.push(`/user/${response.owner.name}`)}
                                          className={"font-bold"}>@{response.owner.name} </Link>
                                    {response.owner.isPremium ? <Star width={15} strokeWidth={4}/> : null}
                                    <h3 className={"text-xs"}>{DateChanger(response.created_at)}</h3>
                                </div>
                                <h3 className={"cursor-pointer"} onClick={() => router.push(`/message/${response.id}`)}><Markdown className={"whitespace-break-spaces"}>{response.content}</Markdown></h3>
                                <div className={"flex gap-1 items-center"}>
                                    <h4 className={"text-sm"}>{getResponse(response.id)}</h4>
                                    <MessageSquare size={15}/>
                                </div>
                            </div>
                            <div className={"flex items-center flex-row-reverse "}>
                                {
                                    userSessionData.id === response.owner.id ?
                                        <Dropdown horizontal={"left"}>
                                            <Dropdown.Toggle size={"sm"}><MoreVertical /></Dropdown.Toggle>
                                            <Dropdown.Menu className="w-52">
                                                <Dropdown.Item color={"primary"} onClick={() => deleteMessage(response.id)}>Supprimer</Dropdown.Item>
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
                    responses.length < 10 ? <Button onClick={backUp} color={"secondary"} className={"w-1/3"}>Revenir au début</Button> : <Button onClick={loadMore} color={"secondary"} className={"w-1/3"}>Charger plus</Button>
                }
            </div>
        </Suspense>
    );
}