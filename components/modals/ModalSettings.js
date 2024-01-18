"use client"
import {Modal, Toggle} from "react-daisyui";
import {useState} from "react";

export default function ModalSearch({settingsModalVisible, toggleModalSettings, userSessionData}){
    const [wantResponse, setWantResponse] = useState(userSessionData.settings.wantResponse);
    console.log(userSessionData.settings)
    return(
        <Modal.Legacy open={settingsModalVisible} onClickBackdrop={toggleModalSettings}>
            <Modal.Header className="font-bold">
                Tête
            </Modal.Header>
            <Modal.Body>
                <div className={"flex"}>
                    <h2>Recevoir des réponses</h2>
                    <Toggle checked={wantResponse} onClick={()=> setWantResponse(!wantResponse)} />
                </div>
            </Modal.Body>
            <Modal.Actions></Modal.Actions>
        </Modal.Legacy>
    );
}