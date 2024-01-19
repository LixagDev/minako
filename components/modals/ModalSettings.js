"use client"
import {Modal, Toggle} from "react-daisyui";
import {useState} from "react";
import M_Button from "@/components/component/M_Button";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function ModalSearch({settingsModalVisible, toggleModalSettings, userSessionData}){
    const [isLoading, setIsLoading] = useState(false);
    const [wantResponse, setWantResponse] = useState(userSessionData.settings[0].wantResponse);
    const router = useRouter();

    const saveSettings = () => {
        setIsLoading(true);
        axios.post("/api/edit/settings", {userId: userSessionData.id, wantResponse: wantResponse})
            .then((response) => {
                setIsLoading(false)
                router.refresh();
                toggleModalSettings()
            });
    }

    return(
        <Modal.Legacy open={settingsModalVisible} onClickBackdrop={toggleModalSettings}>
            <Modal.Header className="font-bold">
                <h2>Paramètres</h2>
            </Modal.Header>
            <Modal.Body>
                <div className={"flex flex-col"}>
                    <div className={"flex"}>
                        <h2 className={"basis-1/2"}>Recevoir des réponses</h2>
                        <div className={"flex flex-row-reverse basis-1/2"}>
                            <Toggle checked={wantResponse} onClick={() => setWantResponse(!wantResponse)}/>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Actions>
                <M_Button onClick={toggleModalSettings} text={"Fermer"}/>
                <M_Button loading={isLoading} onClick={saveSettings} text={"Enregistrer"} color={"primary"} />
            </Modal.Actions>
        </Modal.Legacy>
    );
}