"use client"
import M_Button from "@/components/component/M_Button";
import {User, Send, GitHub, Settings} from "react-feather";
import {useRouter} from "next/navigation";
import {useState} from "react";
import ModalMessageForm from "@/components/modals/ModalMessageForm";
import ModalSettings from "@/components/modals/ModalSettings"

export default function LeftMenuButtons({userSessionData, isDrawer}){
    const router = useRouter();

    const buttons = [
        {name: "Profil", href: `/user/${userSessionData.name}`, icon: <User/>, disabled: false},
        {name: "GitHub", href: "https://github.com/LixagDev/Minako", icon: <GitHub/>, disabled: false},
    ];

    const [modalMessageFormVisible, setModalMessageFormVisible] = useState(false);
    const toggleModalMessageForm = () => {
        setModalMessageFormVisible(!modalMessageFormVisible);
    }

    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    const toggleModalSettings = () => {
        setSettingsModalVisible(!settingsModalVisible);
    }

    return(
        <>
            <ModalMessageForm userSessionData={userSessionData} modalMessageFormVisible={modalMessageFormVisible} toggleModalMessageForm={toggleModalMessageForm}/>
            <ModalSettings userSessionData={userSessionData} settingsModalVisible={settingsModalVisible} toggleModalSettings={toggleModalSettings} />
            <div className={"flex flex-col gap-3"}>
                {
                    buttons.map((button) => {
                        return (
                            <M_Button className={"w-full"} onClick={() => router.push(button.href)} disabled={button.disabled} startIcon={button.icon} text={button.name}/>
                        );
                    })
                }
                <M_Button disabled={true} onClick={toggleModalSettings} className={"w-full"} startIcon={<Settings/>} text={"Paramètres"}/>
                {!isDrawer ? <M_Button className={"w-full"} color={"primary"} onClick={() => toggleModalMessageForm()} startIcon={<Send/>} text={"Poster"}/> : null}
            </div>
        </>
    );
}