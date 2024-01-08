"use client"
import {Plus} from "react-feather";
import {useState} from "react";
import ModalMessageForm from "@/components/modals/ModalMessageForm";
import M_Button from "@/components/component/M_Button";

export default function PhoneMessageFormButton({userSessionData, messageListDiv}){
    const [modalMessageFormVisible, setModalMessageFormVisible] = useState(false);
    const toggleModalMessageForm = () => {
        setModalMessageFormVisible(!modalMessageFormVisible);
    }

    return(
        <div className={"absolute bottom-3 right-3 lg:hidden flex z-10"}>
            <M_Button color={"primary"} onClick={setModalMessageFormVisible} startIcon={<Plus/>} />
            <ModalMessageForm userSessionData={userSessionData} modalMessageFormVisible={modalMessageFormVisible} toggleModalMessageForm={toggleModalMessageForm} messageListDiv={messageListDiv}/>
        </div>
    );
}