import { useState, useEffect } from 'react'
import firebase from "firebase/compat";

const useFetchReels = () => {
    const [videos, setVideos] = useState([]);
    const [videoUrls, setVideoUrls] = useState(
      ["https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"])
  
    useEffect(() => {
        const unsubscribe = firebase
          .firestore()
          .collectionGroup("reels")
          .onSnapshot((snapshot) => {
            const videos = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log("VIDEOS::::", videos);
            videos.map((item,i)=>{
              item.videoUrl = videoUrls[i];
            })
            setVideos(videos);
          });
    
        return () => unsubscribe;
      }, []);

    return { 
        videos
    }
}

export default useFetchReels