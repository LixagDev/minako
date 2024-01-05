"use client"
import {Avatar, Form, Button} from "react-daisyui";
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
        <div className={"w-full p-4 justify-center flex border-b border-neutral"}>
            <Form onSubmit={handleSubmit} className={"flex flex-col w-full gap-3"}>
                <div className={"flex gap-3 h-full items-center"}>
                    <Avatar border borderColor={"neutral"} shape={"circle"}
                            src={userSessionData.image}
                            size={"sm"}/>
                    <TextareaAutosize placeholder={`Que voulez vous répondre à ${messageParent.owner.name} ?`} className={"input w-full h-fit resize-none p-3"} required disabled={isLoading} value={responseContent} onChange={(e) => setResponseContent(e.target.value)}></TextareaAutosize>
                </div>
                <div className={"w-full flex justify-center"}>
                    <Button className={"w-fit"} color={"primary"} loading={isLoading} disabled={isLoading} size={"md"}><Send/>Répondre</Button>
                </div>
            </Form>
        </div>
    );
}