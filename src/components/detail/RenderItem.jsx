import { StyleSheet, View, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Divider } from "react-native-elements";
import PostImage from "./PostImage";
import Footer from "./Footer";
import Likes from "../home/posts/Likes";
import Caption from "../home/posts/Caption";
import Date from "../home/posts/Date";
import Comments from "./Comments";
import { SIZES } from "../../constants";
import Animated from "react-native-reanimated";

const RenderItem = ({
  navigation,
  post,
  currentUser,
  bottomSheetRefComments,
  bottomSheetRefComment,
  bottomSheetRefOptions,
  setBottomSheetIndex,
  sharedIndex,
  setLayoutHeight,
}) => {
  const findHeight = (layout) => {
    let { x, y, width, height } = layout;
    setLayoutHeight(height);
  };

  const [localLiked, setLocalLiked] = useState(post?.likes_by_users?.length || 0);
  const [isLiked, setIsLiked] = useState(post?.likes_by_users?.includes(currentUser?.email));
  const [doubleTapStatus, setDoubleTapStatus] = useState(isLiked);
  

  //===========================================

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        findHeight(event.nativeEvent.layout);
      }}
    >
      <Divider width={0.5} color="#222" />
      <Header
        navigation={navigation}
        post={post}
        currentUser={currentUser}
        bottomSheetRef={bottomSheetRefOptions}
        setBottomSheetIndex={setBottomSheetIndex}
        sharedIndex={sharedIndex}
      />
      {Platform.OS === "ios" && sharedIndex === 0 && (
        <Animated.Image
          source={{ uri: post?.imageUrl }}
          style={styles.imageContainer}
          sharedTransitionTag={post?.id.toString()}
        />
      )}
      <PostImage post={post} currentUser={currentUser} setLocalLiked={setLocalLiked} 
      isLiked={isLiked} 
      setIsLiked={setIsLiked} 
      setDoubleTapStatus={setDoubleTapStatus} 
      doubleTapStatus={doubleTapStatus} />
      
      <Footer
        post={post}
        currentUser={currentUser}
        bottomSheetRef={bottomSheetRefComments}
        setBottomSheetIndex={setBottomSheetIndex}
        sharedIndex={sharedIndex}
        localLiked={localLiked} 
        setLocalLiked={setLocalLiked} 
        isLiked={isLiked} 
        setIsLiked={setIsLiked} 
        setDoubleTapStatus={setDoubleTapStatus} doubleTapStatus={doubleTapStatus}
      />

      <Likes post={post} navigation={navigation} localLiked={localLiked}  />

      <Caption post={post} />
      <Comments
        post={post}
        currentUser={currentUser}
        bottomSheetRef={bottomSheetRefComments}
        bottomSheetRefComment={bottomSheetRefComment}
        setBottomSheetIndex={setBottomSheetIndex}
        sharedIndex={sharedIndex}
      />
      <Date post={post} />
      <View style={{ height: 10 }}></View>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 600,
  },
  imageContainer: {
    top: 60,
    position: "absolute",
    minHeight: SIZES.Width,
    minWidth: SIZES.Width,
    zIndex: -1,
  },
  Image: {
    marginVertical: 12,
    height: SIZES.Width,
    width: SIZES.Width,
  },
});
