"use client"
import {Form} from "react-daisyui";
import M_Button from "@/components/component/M_Button";
import M_Avatar from "@/components/component/M_Avatar";
import TextareaAutosize from "react-textarea-autosize";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Send} from "react-feather";

export default function ResponseForm({userSessionData, messageParent}){
    const [responseContent, setResponseContent] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post("/api/new/response", {responseContent: responseContent, ownerId: userSessionData.id, fromMessageId: messageParent.id})
            .then((response) => {
                setIsLoading(false);
                setResponseContent("");
                router.refresh();
            });
    }

    return(
        <div className={"w-full p-4 justify-center flex bg-base-100 rounded-xl shadow-md"}>
            <Form onSubmit={handleSubmit} className={"flex flex-col w-full gap-3"}>
                <div className={"flex gap-3 h-full items-center"}>
                    <M_Avatar src={userSessionData.image} size={"sm"}/>
                    <TextareaAutosize placeholder={`Que voulez vous répondre à ${messageParent.owner.name} ?`} className={"input w-full h-fit resize-none p-3 input-bordered"} required disabled={isLoading} value={responseContent} onChange={(e) => setResponseContent(e.target.value)}></TextareaAutosize>
                </div>
                <div className={"w-full flex justify-center"}>
                    <M_Button className={"w-fit"} color={"primary"} loading={isLoading} disabled={isLoading} size={"md"} startIcon={<Send/>} text={"Répondre"}/>
                </div>
            </Form>
        </div>
    );
}