import { useState } from 'react';
import firebase from 'firebase/compat';

const useHandleLike = () => {
    const [loader, setLoader] = useState(false);

    const handlePostLike = (post, currentUser, setLocalLiked, setIsLiked, isLiked, setDoubleTapStatus) => {
        setLoader(false);
        if (!loader) {
            // const currentLikeStatus = !post?.likes_by_users.includes(currentUser?.email);
            // setLocalLiked((prev) => { return currentLikeStatus ? prev + 1 : prev - 1});
            // setIsLiked(currentLikeStatus)
            setLocalLiked((prev) => isLiked ? prev - 1 : prev + 1);
            setIsLiked((prev) => !prev); 
            setDoubleTapStatus(!isLiked);
            
            const newLikeStatus = !isLiked;
            
            try {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(post?.owner_email)
                    .collection("posts")
                    .doc(post?.id)
                    .update({
                        likes_by_users: newLikeStatus
                            ? firebase.firestore.FieldValue.arrayUnion(currentUser?.email)
                            : firebase.firestore.FieldValue.arrayRemove(currentUser?.email),
                        new_likes: newLikeStatus
                            ? [currentUser?.username, currentUser?.profile_picture]
                            : [],
                    }
                );

                firebase
                        .firestore()
                        .collection("users")
                        .doc(post?.owner_email)
                        .update({
                            event_notification: newLikeStatus
                            ? firebase.firestore.FieldValue.increment(1)
                            : firebase.firestore.FieldValue.increment(-1)
                        });
            }
            catch (error) {
                console.error("Error updating document:", error);
                setLocalLiked(prev => prev) 
            } finally {
                setLoader(false);
            };
        }

    };
  
    const handleStoryLike = (story, currentUser) => {
        setLoader(true);
        if (!loader) {
            const currentLikeStatus = !story.likes_by_users.includes(currentUser?.email);
            try {
                firebase
                    .firestore()
                    .collection("users")
                    .doc(story.owner_email)
                    .collection("stories")
                    .doc(story.id)
                    .update({
                    likes_by_users: currentLikeStatus
                        ? firebase.firestore.FieldValue.arrayUnion(currentUser?.email)
                        : firebase.firestore.FieldValue.arrayRemove(currentUser?.email),
                    });
            } catch (error) {
                console.log(error);
            } finally {
                setLoader(false);
            }
        }
    };

    return {
    handleStoryLike,
    handlePostLike
    }
}

export default useHandleLike;