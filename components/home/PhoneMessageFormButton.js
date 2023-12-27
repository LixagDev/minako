"use client"
import {Button} from "react-daisyui";
import {Plus} from "react-feather";
import {useState} from "react";
import ModalMessageForm from "@/components/main/modals/ModalMessageForm";

export default function PhoneMessageFormButton({userSessionData}){
    const [modalMessageFormVisible, setModalMessageFormVisible] = useState(false);
    const toggleModalMessageForm = () => {
        setModalMessageFormVisible(!modalMessageFormVisible);
    }
    return(
        <div className={"absolute bottom-3 right-3 md:hidden flex z-10"}>
            <Button color={"secondary"} onClick={setModalMessageFormVisible}><Plus/></Button>
            <ModalMessageForm userSessionData={userSessionData} modalMessageFormVisible={modalMessageFormVisible} toggleModalMessageForm={toggleModalMessageForm} />
        </div>
    );
}