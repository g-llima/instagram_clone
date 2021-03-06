import React, { useState, useEffect } from "react";
import "./styles/Post.css";
import { db } from "../firebaseDB/firebase.js";
import firebase from "firebase/compat/app";
import Avatar from "@mui/material/Avatar";

function Post({ username, user, usernameAvatar, caption, mediaUrl, postId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt={username} src={usernameAvatar} />
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={mediaUrl} alt={username} />

      <h4 className="post__text">
        <strong>{username}</strong> {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment, key) => (
          <p key={key}>
            <strong>{comment.username} </strong>
            {comment.text}
          </p>
        ))}
      </div>

      {user && (
        <form className="post__commentBox">
          <input
            className="post__input"
            type="text"
            placeholder="Adicione um comentário..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={!comment}
            className="post__btn"
            type="submit"
            onClick={postComment}
          >
            Postar
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
