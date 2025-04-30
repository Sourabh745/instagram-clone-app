import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Divider } from "react-native-elements";
import Header from "./posts/Header";
import PostImage from "./posts/PostImage";
import Footer from "./posts/Footer";
import Likes from "./posts/Likes";
import Caption from "./posts/Caption";
import Comments from "./posts/Comments";
import Date from "./posts/Date";

const Posts = ({ navigation, post, currentUser, key }) => {

  const [localLiked, setLocalLiked] = useState(post?.likes_by_users.length || 0);
  const [isLiked, setIsLiked] = useState(post?.likes_by_users.includes(currentUser?.email));//false
  const [doubleTapStatus, setDoubleTapStatus] = useState(isLiked);


  return (
    <View key={key} style={{ marginTop: 10 }}>
      <Divider width={0.7} color="#222" />
      <Header navigation={navigation} post={post} currentUser={currentUser} />
      <PostImage post={post} currentUser={currentUser} setLocalLiked={setLocalLiked} isLiked={isLiked} setIsLiked={setIsLiked} setDoubleTapStatus={setDoubleTapStatus} doubleTapStatus={doubleTapStatus} />
      <Footer post={post} currentUser={currentUser} navigation={navigation} localLiked={localLiked} setLocalLiked={setLocalLiked} isLiked={isLiked} setIsLiked={setIsLiked} setDoubleTapStatus={setDoubleTapStatus} doubleTapStatus={doubleTapStatus} />
      <Likes post={post} navigation={navigation} localLiked={localLiked} />
      <Caption post={post} />
      <Comments post={post} currentUser={currentUser} navigation={navigation} />
      <Date post={post} />
    </View>
  );
};

export default Posts;
