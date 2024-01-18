"use client"
import {Modal} from "react-daisyui";
import Filter from "@/components/search/Filter"
import SearchForm from "@/components/forms/SearchForm";

export default function ModalSearch({searchModalVisible, toggleSearchModal, isAfterSearch, query}){
    return(
        <Modal.Legacy open={searchModalVisible} onClickBackdrop={toggleSearchModal}>
            <Modal.Header className="font-bold">{
                !isAfterSearch ? "Effectuer une recherche" : "Option de recherche"
            }</Modal.Header>
            <Modal.Body>
                {
                    !isAfterSearch ? <SearchForm isAfterSearch={false} /> : <Filter query={query} />
                }
            </Modal.Body>
            <Modal.Actions></Modal.Actions>
        </Modal.Legacy>
    );
}