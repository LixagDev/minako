"use client"
import {Form} from "react-daisyui";
import TextareaAutosize from "react-textarea-autosize";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import {Send} from "react-feather";
import M_Button from "@/components/component/M_Button";
import M_Avatar from "@/components/component/M_Avatar";

export default function MessageForm({userSessionData}){
    const [messageContent, setMessageContent] = useState();
    const [isLoading, setIsLoading] = useState(false);
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

    const input = (e) =>{
        setMessageContent(e.target.value.replace("!img", "![img](LIEN_IMG)"));
    }

    return(
        <div className={"bg-base-100 w-full p-4 lg:flex justify-center hidden rounded-xl shadow-md"}>
            <Form onSubmit={handleSubmit} className={"flex flex-col w-full gap-3"}>
                <div className={"flex gap-3 h-full items-center"}>
                    <M_Avatar src={userSessionData.image} size={"sm"} />
                    <TextareaAutosize placeholder={"Est ce que pour vous, tout est bon ?"} className={"input w-full h-fit resize-none p-3 input-bordered"} required disabled={isLoading} value={messageContent} onChange={(e) => input(e)}></TextareaAutosize>
                </div>
                <div className={"w-full flex justify-center"}>
                    <M_Button className={"w-fit"} size={"md"} color={"primary"} loading={isLoading} disabled={isLoading} text={"Poster"} startIcon={<Send/>}/>
                </div>
            </Form>
        </div>
    );
}