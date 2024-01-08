"use client"
const Messages = dynamic(() => import("@/components/messages&responses/Messages"), { ssr: false });
import dynamic from "next/dynamic";
import PhoneNavbar from "@/components/main/PhoneNavbar";
import SearchForm from "@/components/forms/SearchForm";

export default function SearchList({searchResult, userSessionData, query, recent}){
    return(
        <div className={"flex flex-col overflow-x-hidden overflow-y-scroll gap-3 pl-3 pr-3 pb-3 h-full"}>
            <PhoneNavbar userSessionData={userSessionData} />
            <SearchForm isAfterSearch={true} query={query} recent={recent}/>
            <Messages messages={searchResult} userSessionData={userSessionData} />
        </div>
    );
}