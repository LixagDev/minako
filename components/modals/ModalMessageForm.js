"use client"
import {Modal, Form, Button} from "react-daisyui";
import M_Avatar from "@/components/component/M_Avatar";
import M_Button from "@/components/component/M_Button";
import {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import {Send, X} from "react-feather";

export default function ModalMessageForm({userSessionData, modalMessageFormVisible, toggleModalMessageForm, messageListDiv}){
    const [messageContent, setMessageContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        axios.post("/api/new/message", {messageContent: messageContent, ownerId: userSessionData.id})
            .then((response) => {
                setIsLoading(false);
                setMessageContent("");
                router.push("/home");
                toggleModalMessageForm()
                if (messageListDiv){
                    messageListDiv.current.scrollTo({top: 0, behavior: 'smooth' });
                }
                router.refresh();
            });
    }

    return(
        <Modal.Legacy open={modalMessageFormVisible} onClickBackdrop={toggleModalMessageForm}>
            <Button size="sm" color="ghost" shape="circle" className="absolute right-2 top-2" onClick={toggleModalMessageForm}>
                <X/>
            </Button>
            <Modal.Header className="font-bold">Poster un nouveau message</Modal.Header>
            <Modal.Body>
                <div className={"w-full md:flex justify-center"}>
                    <Form onSubmit={handleSubmit} className={"flex flex-col w-full gap-3"}>
                        <div className={"flex gap-3 h-full items-center"}>
                            <M_Avatar src={userSessionData.image} size={"sm"}/>
                            <TextareaAutosize placeholder={"Est ce que pour vous, tout est bon ?"}
                                              className={"input w-full h-fit resize-none p-3 bg-base-100 input-bordered"} required
                                              disabled={isLoading} value={messageContent}
                                              onChange={(e) => setMessageContent(e.target.value)}></TextareaAutosize>
                        </div>
                        <div className={"w-full flex justify-center"}>
                            <M_Button className={"w-fit"} color={"primary"} loading={isLoading} disabled={isLoading} size={"md"} startIcon={<Send/>} text={"Poster"} />
                        </div>
                    </Form>
                </div>
            </Modal.Body>
        </Modal.Legacy>
    );
}