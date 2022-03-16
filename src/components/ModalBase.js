import React, { useState } from "react";
import { db, firebaseApp } from "../firebaseDB/firebase.js";
import firebase from "firebase/compat/app";
import Modal from "@mui/material/Modal";
import "./styles/ModalBase.css";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";

export default function ModalBase({ openModal, closeModal, username }) {
  const [image, setImage] = useState(null);
  const [active, setActive] = useState(true);
  const [imgPreviewSrc, setImgPreviewSrc] = useState(true);
  const [captionLength, setCaptionLength] = useState(0);
  const [caption, setCaption] = useState("");
  const [sucessOpen, setSucessOpen] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setActive(false);
      setImgPreviewSrc(URL.createObjectURL(e.target.files[0]));
    }
  };
  const resetImg = () => {
    setImage(null);
    setCaption("");
    setActive(true);
    setCaptionLength(0);
  };
  const handleUpload = async () => {
    let d = new Date();

    const storageRef = firebaseApp.storage().ref();
    const fileRef = storageRef.child(image.name + d.getTime());
    await fileRef.put(image);
    const imageUrl = await fileRef.getDownloadURL();

    db.collection("posts").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      caption: caption,
      mediaUrl: imageUrl,
      username: username,
    });
    setSucessOpen(true);
    resetImg();
  };

  return (
    <div>
      {active && (
        <Modal open={openModal} onClose={closeModal} className="modal">
          <div className="modal__content">
            <div className="modal__content__title">
              <h3 className="modal__content__title__text">
                Criar nova publicação
              </h3>
            </div>
            <div className="modal__content__body">
              <svg
                aria-label="Icon to represent media such as images or videos"
                color="#262626"
                fill="#262626"
                height="77"
                role="img"
                viewBox="0 0 97.6 77.3"
                width="96"
              >
                <path
                  d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                  fill="currentColor"
                ></path>
                <path
                  d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                  fill="currentColor"
                ></path>
                <path
                  d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                  fill="currentColor"
                ></path>
              </svg>
              <p className="modal__content__body__mediaText">
                Arraste as fotos e os vídeos aqui
              </p>
              <input
                type="file"
                id="modalFileInput"
                accept="image/*"
                onChange={handleChange}
              />
              <label
                htmlFor="modalFileInput"
                className="modal__content__body__fileInput"
              >
                Selecionar do computador
              </label>
            </div>
            {sucessOpen && (
              <Alert
                className="modal__sucess"
                onClose={() => {
                  setSucessOpen(false);
                }}
              >
                Imagem postada!
              </Alert>
            )}
          </div>
        </Modal>
      )}
      {!active && (
        <Modal open={openModal} onClose={() => resetImg()} className="modal">
          <div className="modal__content__active">
            <div className="modal__content__active__title">
              <button
                className="modal__content__active__title__backBtn"
                onClick={resetImg}
              >
                <svg
                  aria-label="Back"
                  color="#262626"
                  fill="#262626"
                  height="24"
                  width="24"
                >
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="2.909"
                    x2="22.001"
                    y1="12.004"
                    y2="12.004"
                  ></line>
                  <polyline
                    fill="none"
                    points="9.276 4.726 2.001 12.004 9.276 19.274"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></polyline>
                </svg>
              </button>
              <h3 className="modal__content__active__title__text">
                Criar nova publicação
              </h3>
              <button
                className="modal__content__active__title__shareBtn"
                onClick={handleUpload}
              >
                Compartilhar
              </button>
            </div>
            <div className="modal__content__active__body">
              <div className="modal__content__active__bodyImg__imgPreview">
                <img src={imgPreviewSrc} id="imgPreview" alt={username} />
              </div>
              <div className="modal__content__active__sideInfo">
                <div className="modal__content__active__sideInfo__user">
                  <Avatar
                    className="modal__content__active__sideInfo__avatar"
                    alt="gab__rtx"
                  />
                  <h4 className="modal__content__active__sideInfo__username">
                    {username}
                  </h4>
                </div>
                <textarea
                  className="modal__content__active__sideInfo__caption"
                  placeholder="Escreva uma legenda..."
                  maxLength="2200"
                  onChange={(e) => {
                    setCaptionLength(
                      e.target.textLength
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    );
                    setCaption(e.target.value);
                  }}
                />
                <p className="modal__content__active__sideInfo__length">
                  <span>{captionLength}</span>/2,200
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
