"use client"
import {Avatar, Input, Form, Button, Textarea, Loading} from "react-daisyui";
import TextareaAutosize from "react-textarea-autosize";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Send} from "react-feather";

export default function MessageForm({userSessionData}){
    const [messageContent, setMessageContent] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post("/api/new/message", {messageContent: messageContent, ownerId: userSessionData.id})
            .then((response) => {
                setIsLoading(false);
                setMessageContent("");
                router.refresh();
            });
    }

    return(
        <div className={"bg-base-300 w-full p-3 md:flex justify-center hidden border-b border-neutral"}>
            <Form onSubmit={handleSubmit} className={"flex flex-col w-full gap-3"}>
                <div className={"flex gap-3 h-full items-center"}>
                    <Avatar border borderColor={"neutral"} shape={"circle"}
                            src={userSessionData.image}
                            size={"sm"}/>
                    <TextareaAutosize placeholder={"Est ce que pour vous, tout est bon ?"} className={"input w-full h-fit resize-none p-3"} required disabled={isLoading} value={messageContent} onChange={(e) => setMessageContent(e.target.value)}></TextareaAutosize>
                </div>
                <div className={"w-full flex justify-center"}>
                    <Button className={"w-fit"} color={"secondary"} loading={isLoading} disabled={isLoading} size={"md"}><Send/>Poster</Button>
                </div>
            </Form>
        </div>
    );
}