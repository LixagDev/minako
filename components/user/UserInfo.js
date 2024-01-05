"use client"
import {Avatar, Button} from "react-daisyui";
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
            <div
                className={"flex flex-col w-full p-4 justify-center border-b border-neutral bg-base-300 gap-4 items-center relative"}>
                <div className={"flex gap-3 items-center justify-center"}>
                    <Avatar onClick={toggleModalZoomPictureVisible} src={userRequestData.image} shape={"circle"} className={"hidden lg:flex animate-none cursor-pointer"} size={"lg"} border
                            borderColor={"neutral"}/>
                    <Avatar onClick={toggleModalZoomPictureVisible} src={userRequestData.image} shape={"circle"} className={"lg:hidden flex cursor-pointer"} size={"md"} border
                            borderColor={"neutral"}/>
                    <div className={"flex flex-col"}>
                        <div className={"flex gap-2"}>
                            {
                                userRequestData.othername ?
                                    <div className={"flex flex-col"}>
                                        <div className={"flex items-center gap-2"}>
                                            <h2 className={"font-bold lg:text-3xl text-2xl"}>{userRequestData.othername}</h2>
                                            {userRequestData.isPremium ?
                                                <PremiumBadge size={"md"} username={userRequestData.name}/> : null}
                                        </div>
                                        <h2 className={"font-bold lg:text-2xl text-2xl text-neutral"}>@{userRequestData.name}</h2>
                                    </div>
                                    :
                                    <div className={"flex items-center gap-2"}>
                                        <h2 className={"font-bold lg:text-3xl text-2xl"}>@{userRequestData.name}</h2>
                                        {userRequestData.isPremium ?
                                            <PremiumBadge size={"md"} username={userRequestData.name}/> : null}
                                    </div>
                            }
                        </div>
                        <h3 className={"text-neutral lg:text-base text-sm"}>À rejoint Minako
                            le {DateChangerProfil(userRequestData.created_at)}</h3>
                    </div>
                </div>
                {
                    userRequestData.about ?
                        <div className={"bg-base-100 w-4/5 p-4 rounded-xl text-center"}>
                            <h3 className={"lg:text-base text-sm whitespace-break-spaces"}>{userRequestData.about}</h3>
                        </div>
                        : null
                }
                {
                    userSessionData.name === userRequestData.name ?
                        <Button color={"primary"} onClick={toggleModalEditProfileVisible}><Edit/>Éditer le profil</Button>
                        : null
                }
            </div>
        </>
    );
}