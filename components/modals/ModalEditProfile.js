"use client"
import {Modal, Input, Alert} from "react-daisyui";
import M_Button from "@/components/component/M_Button";
import {useState} from "react";
import {Info} from "react-feather";
import TextareaAutosize from "react-textarea-autosize";
import axios from "axios";
import {useRouter} from "next/navigation";

export default function ModalEditProfile({userSessionData, modalEditProfileVisible, toggleModalEditProfileVisible}){
    const router = useRouter();
    const [othername, setOthername] = useState(userSessionData.othername);
    const [about, setAbout] = useState(userSessionData.about);
    const [isLoading, setIsLoading] = useState(false);

    const saveProfil = () => {
        setIsLoading(true);
        axios.post("/api/edit/profile", {othername: othername, about: about, userId: userSessionData.id})
            .then((response) => {
                setIsLoading(false);
                toggleModalEditProfileVisible();
                router.refresh();
            });
    }

    return(
        <Modal.Legacy open={modalEditProfileVisible} onClickBackdrop={toggleModalEditProfileVisible}>
            <Modal.Header className="font-bold">Éditer votre profil</Modal.Header>
            <Modal.Body>
                <div className={"flex flex-col items-center w-full gap-4"}>
                    <Alert icon={<Info/>} status={"info"}>L'avatar de profil est, pour le moment, synchronisé avec votre compte Discord.</Alert>
                    <div className={"flex flex-col w-full"}>
                        <h2>Nom</h2>
                        <Input placeholder={"Le gentleman"} value={othername} disabled={isLoading} maxLength={15}
                               onChange={(e) => setOthername(e.target.value)}/>
                    </div>
                    <div className={"flex flex-col w-full"}>
                        <h2>Bio</h2>
                        <TextareaAutosize disabled={isLoading} placeholder={"Une petite bio ?"} maxLength={100}
                                          className={"input input-bordered w-full h-fit resize-none p-3 whitespace-break-spaces text-center"}
                                          value={about} onChange={(e) => setAbout(e.target.value)}></TextareaAutosize>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Actions>
                <M_Button onClick={toggleModalEditProfileVisible} disabled={isLoading} text={"Fermer"} />
                <M_Button color={"primary"} disabled={isLoading} loading={isLoading} onClick={saveProfil} text={"Enregistrer"} />
            </Modal.Actions>
        </Modal.Legacy>
    );
}