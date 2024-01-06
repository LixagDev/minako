"use client"
import SearchForm from "@/components/forms/SearchForm";

export default function RightMenu(){
    return(
        <div className={"basis-1/4 hidden lg:flex flex-col gap-3 p-3"}>
            <SearchForm isAfterSearch={false}/>
        </div>
    );
}