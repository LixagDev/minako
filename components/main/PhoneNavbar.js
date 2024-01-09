"use client"
import M_Avatar from "@/components/component/M_Avatar";
import MinakoTitle from "@/components/main/MinakoTitle";
import {useState} from "react";
import PhoneDrawer from "@/components/main/PhoneDrawer";
import {Search, Filter} from "react-feather";
import M_Button from "@/components/component/M_Button";
import ModalSearch from "@/components/modals/ModalSearch";

export default function PhoneNavbar({userSessionData, isAfterSearch, query}){
    const [drawerVisible, setDrawerVisible] = useState(false);
    const toggleDrawer = () => {
        setDrawerVisible(!drawerVisible);
    }

    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const toggleSearchModal = () => {
        setSearchModalVisible(!searchModalVisible);
    }

    return(
        <>
            <PhoneDrawer drawerVisible={drawerVisible} toggleDrawer={toggleDrawer} userSessionData={userSessionData}/>
            <ModalSearch searchModalVisible={searchModalVisible} toggleSearchModal={toggleSearchModal} isAfterSearch={isAfterSearch} query={query}/>
            <div className={"flex bg-base-100 p-4 flex lg:hidden items-center sticky top-3 z-10 shadow-lg rounded-xl"}>
                <div className={"flex basis-1/3"}>
                    <M_Avatar onClick={toggleDrawer} className={"cursor-pointer "} src={userSessionData.image} size={"sm"}/>
                </div>
                <div className={"flex justify-center basis-1/3"}>
                    <MinakoTitle/>
                </div>
                <div className={"flex basis-1/3 flex-row-reverse"}>
                    <M_Button color={"primary"} startIcon={!isAfterSearch ? <Search /> : <Filter />} onClick={toggleSearchModal}/>
                </div>
            </div>
        </>
    );
}