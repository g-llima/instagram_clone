import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import { db } from "../firebaseDB/firebase";
import ImageUpload from "../components/ImageUpload";
import { auth } from "../firebaseDB/firebase";

function FrontPage() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [username] = useState("");

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);
        if (authUser.displayName) {
        } else {
          return authUser.updateProfile({
            displayName: username,
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => {
      //cleanup actions
      unsubscribe();
    };
  }, [user, username]);

  return (
    <div>
      <Header />

      {posts.map(({ id, post }) => (
        <Post
          key={id}
          postId={id}
          user={user}
          username={post.username}
          usernameAvatar={post.usernameAvatar}
          caption={post.caption}
          mediaUrl={post.mediaUrl}
        />
      ))}
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry, you need to login.</h3>
      )}
    </div>
  );
}

export default FrontPage;
