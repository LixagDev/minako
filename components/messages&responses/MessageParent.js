"use client"
import DateChangerMessage from "@/functions/DateChangerMessage";
import {Dropdown, Link} from "react-daisyui";
import M_Avatar from "@/components/component/M_Avatar";
import {MoreVertical} from "react-feather";
import Markdown from "react-markdown";
import {useRouter} from "next/navigation";
import DeleteMessage from "@/functions/DeleteMessage";

export default function MessageParent({messageParent, userSessionData}){
    const router = useRouter();

    return(
        <div className={"flex flex-col"}>
            <div className={"w-full bg-base-100 rounded-xl shadow-md flex gap-3 p-4"}>
                <M_Avatar onClick={() => router.push(`/user/${messageParent.owner.name}`)} className={"cursor-pointer"} src={messageParent.owner.image} size={"sm"}/>
                <div className={"flex flex-col justify-center w-fit basis-full"}>
                    <div className={"flex gap-x-2 flex-wrap items-center"}>
                        {
                            messageParent.owner.othername ?
                                <>
                                    <Link onClick={() => router.push(`/user/${messageParent.owner.name}`)} className={"font-bold text-lg"}>{messageParent.owner.othername} </Link>
                                    <Link onClick={() => router.push(`/user/${messageParent.owner.name}`)} className={"font-bold text-neutral text-lg"}>@{messageParent.owner.name} </Link>
                                </>
                                : <Link onClick={() => router.push(`/user/${messageParent.owner.name}`)} className={"font-bold text-lg"}>@{messageParent.owner.name} </Link>
                        }
                        <h3 className={"text-xs"}>{DateChangerMessage(messageParent.created_at)}</h3>
                    </div>
                    <h3 className={"cursor-pointer text-lg"} onClick={() => router.push(`/message/${messageParent.id}`)}>
                        <Markdown className={"whitespace-break-spaces"}>{messageParent.content}</Markdown></h3>
                </div>
                <div className={"flex items-center flex-row-reverse "}>
                    {
                        userSessionData.id === messageParent.owner.id ?
                            <Dropdown horizontal={"left"}>
                                <Dropdown.Toggle size={"sm"}><MoreVertical/></Dropdown.Toggle>
                                <Dropdown.Menu className="w-52">
                                    <Dropdown.Item color={"primary"}
                                                   onClick={() => DeleteMessage(messageParent.id, userSessionData).then(() => router.push("/home"))}>Supprimer</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            : null
                    }
                </div>
            </div>
        </div>
    );
}