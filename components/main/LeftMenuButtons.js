"use client"
import {Button} from "react-daisyui";
import {User, Send, Star, GitHub} from "react-feather";
import {useRouter} from "next/navigation";
import {useState} from "react";
import ModalMessageForm from "@/components/modals/ModalMessageForm";

export default function LeftMenuButtons({userSessionData, isDrawer}){
    const router = useRouter();

    const buttons = [
        {name: "Profil", href: `/user/${userSessionData.name}`, icon: <User/>, disabled: false},
        {name: "Premium", href: "/premium", icon: <Star/>, disabled: true},
        {name: "GitHub", href: "https://github.com/LixagDev/Minako", icon: <GitHub/>, disabled: false}
    ];

    const [modalMessageFormVisible, setModalMessageFormVisible] = useState(false);
    const toggleModalMessageForm = () => {
        setModalMessageFormVisible(!modalMessageFormVisible);
    }

    return(
        <>
            <ModalMessageForm userSessionData={userSessionData} modalMessageFormVisible={modalMessageFormVisible} toggleModalMessageForm={toggleModalMessageForm}/>
            <div className={"flex flex-col gap-3"}>
                {
                    buttons.map((button) => {
                        return (
                            <Button className={"w-full"}
                                    onClick={() => router.push(button.href)} disabled={button.disabled}>{button.icon}{button.name}</Button>
                        );
                    })
                }
                {!isDrawer ? <Button className={"w-full"} color={"primary"} onClick={() => toggleModalMessageForm()}><Send/>Poster</Button> : null}
            </div>
        </>
    );
}