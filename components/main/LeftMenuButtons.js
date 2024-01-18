"use client"
import M_Button from "@/components/component/M_Button";
import {User, Send, GitHub} from "react-feather";
import {useRouter} from "next/navigation";
import {useState} from "react";
import ModalMessageForm from "@/components/modals/ModalMessageForm";

export default function LeftMenuButtons({userSessionData, isDrawer}){
    const router = useRouter();

    const buttons = [
        {name: "Profil", href: `/user/${userSessionData.name}`, icon: <User/>, disabled: false},
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
                            <M_Button className={"w-full"} onClick={() => router.push(button.href)} disabled={button.disabled} startIcon={button.icon} text={button.name}/>
                        );
                    })
                }
                {!isDrawer ? <M_Button className={"w-full"} color={"primary"} onClick={() => toggleModalMessageForm()} startIcon={<Send/>} text={"Poster"}/> : null}
            </div>
        </>
    );
}