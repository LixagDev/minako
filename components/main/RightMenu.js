"use client"
import SearchForm from "@/components/forms/SearchForm";
import Filter from "@/components/search/Filter";

export default function RightMenu({isAfterSearch, query}){
    return(
        <div className={"basis-1/4 hidden lg:flex flex-col gap-3 p-3"}>
            {
                !isAfterSearch ? <SearchForm isAfterSearch={isAfterSearch}/> : <Filter query={query} />
            }
        </div>
    );
}