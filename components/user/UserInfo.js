"use client"
import M_Avatar from "@/components/component/M_Avatar";
import M_Button from "@/components/component/M_Button";
import DateChangerProfil from "@/functions/DateChangerProfil";
import PremiumBadge from "@/components/main/PremiumBadge";
import {Edit} from "react-feather";
import {useState} from "react";
import ModalEditProfile from "@/components/modals/ModalEditProfile";
import ModalZoomPicture from "@/components/modals/ModalZoomPicture";

export default function UserInfo({userRequestData, userSessionData}){
    const [modalEditProfileVisible, setModalEditProfileVisible] = useState(false);
    const toggleModalEditProfileVisible = () => {
        setModalEditProfileVisible(!modalEditProfileVisible);
    }

    const [modalZoomPictureVisible, setModalZoomPictureVisible] = useState(false);
    const toggleModalZoomPictureVisible = () => {
        setModalZoomPictureVisible(!modalZoomPictureVisible);
    }

    return (
        <>
            <ModalEditProfile toggleModalEditProfileVisible={toggleModalEditProfileVisible} modalEditProfileVisible={modalEditProfileVisible} userSessionData={userRequestData}/>
            <ModalZoomPicture src={userRequestData.image} modalZoomPictureVisible={modalZoomPictureVisible} toggleModalZoomPictureVisible={toggleModalZoomPictureVisible}/>
            <div className={"flex flex-col w-full p-4 justify-center bg-base-100 rounded-xl shadow-md gap-4 items-center relative"}>
                <div className={"flex gap-3 items-center justify-center flex-col sm:flex-row"}>
                    <M_Avatar onClick={toggleModalZoomPictureVisible} src={userRequestData.image} className={"hidden lg:flex animate-none cursor-pointer"} size={"lg"}/>
                    <M_Avatar onClick={toggleModalZoomPictureVisible} src={userRequestData.image} className={"lg:hidden flex cursor-pointer"} size={"md"}/>
                    <div className={"flex flex-col"}>
                        <div className={"flex gap-2"}>
                            {
                                userRequestData.othername ?
                                    <div className={"flex flex-col items-center sm:items-start"}>
                                        <div className={"flex items-center gap-2 items-center sm:items-start"}>
                                            <h2 className={"font-bold lg:text-3xl text-2xl"}>{userRequestData.othername}</h2>
                                            {userRequestData.isPremium ?
                                                <PremiumBadge size={"md"} username={userRequestData.name}/> : null}
                                        </div>
                                        <h2 className={"font-bold lg:text-2xl text-2xl text-neutral"}>@{userRequestData.name}</h2>
                                    </div>
                                    :
                                    <div className={"flex items-center gap-2 items-center sm:items-start"}>
                                        <h2 className={"font-bold lg:text-3xl text-2xl"}>@{userRequestData.name}</h2>
                                        {userRequestData.isPremium ?
                                            <PremiumBadge size={"md"} username={userRequestData.name}/> : null}
                                    </div>
                            }
                        </div>
                        <h3 className={"text-neutral lg:text-base text-sm"}>À rejoint minako
                            en {DateChangerProfil(userRequestData.created_at)}</h3>
                    </div>
                </div>
                {
                    userRequestData.about ?
                        <div className={"bg-base-100 w-4/5 p-4 rounded-xl shadow-md text-center"}>
                            <h3 className={"lg:text-base text-sm whitespace-break-spaces"}>{userRequestData.about}</h3>
                        </div>
                        : null
                }
                {
                    userSessionData.name === userRequestData.name ?
                        <M_Button color={"primary"} onClick={toggleModalEditProfileVisible} startIcon={<Edit/>} text={"Éditer mon profil"}/>
                        : null
                }
            </div>
        </>
    );
}