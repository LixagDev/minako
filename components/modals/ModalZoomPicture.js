"use client"
import {Modal} from "react-daisyui";

export default function ModalZoomPicture({modalZoomPictureVisible, toggleModalZoomPictureVisible, src}){
    return(
        <Modal.Legacy open={modalZoomPictureVisible} onClickBackdrop={toggleModalZoomPictureVisible}>
            <Modal.Body>
                <img className={"rounded-xl w-full h-auto"} src={src}/>
            </Modal.Body>
        </Modal.Legacy>
    );
}