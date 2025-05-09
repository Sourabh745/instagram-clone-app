import { useState } from 'react'
import {
    useSharedValue,
    useAnimatedStyle,
    withSequence,
    withTiming,
    withDelay,
    Easing,
    runOnJS,
  } from "react-native-reanimated";
import { Gesture } from "react-native-gesture-handler";
import useHandleLike from '../hooks/useHandleLike';

const useLikeAnimation = (post, currentUser, setLocalLiked, setIsLiked, isLiked, setDoubleTapStatus, doubleTapStatus) => {
    const { handlePostLike } = useHandleLike();
    const opacityAnimation = useSharedValue(0);
    const scaleAnimation = useSharedValue(0);
    const rotationAnimation = useSharedValue(0);
    const translateXAnimation = useSharedValue(0);
    const translateYAnimation = useSharedValue(0);
    const [randomNumber, setRandomNumber] = useState(1);


    const getRandomNumber = () => {
      let random = Math.random();
      random = random < 0.5 ? 1 : -1;
      setRandomNumber(random);
    };
  
    const doubleTapHandleLike = () => {
      // if (isDoubleTapDisabled) {
      //   console.log("Double tap disabled after first like");
      //   return;  
      // }
  
      // if (!post?.likes_by_users.includes(currentUser?.email)) {
      //   handlePostLike(post, currentUser, setLocalLiked, setIsLiked, isLiked);
      //   setIsDoubleTapDisabled(true); 
      // } else {
      //   console.log("Already liked");
      //   setIsDoubleTapDisabled(false);  
      // }
      console.log("double :::: ", {doubleTapStatus});
      
      if (!doubleTapStatus) {
        console.log("Not liked yet ");
        handlePostLike(post, currentUser, setLocalLiked, setIsLiked, isLiked, setDoubleTapStatus);
        setDoubleTapStatus(true);
      }
      else{
          console.log("already like it");
          return
      }
    
      
    };

    const handleDoubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart((event) => {
            runOnJS(doubleTapHandleLike)();
            runOnJS(getRandomNumber)();

            opacityAnimation.value = withSequence(
            withTiming(1, { duration: 300 }),
            withDelay(800, withTiming(0, { duration: 0 }))
            );
            scaleAnimation.value = withSequence(
            withTiming(1.3, { duration: 300 }),
            withTiming(1, { duration: 300 })
            );
            rotationAnimation.value = withSequence(
            withTiming(15 * randomNumber, {
                duration: 300,
                easing: Easing.elastic(1.5),
            }),
            withTiming(5 * randomNumber, {
                duration: 300,
                easing: Easing.elastic(1.5),
            }),
            withDelay(800, withTiming(0, { duration: 0 }))
            );
            translateXAnimation.value = withSequence(
            withTiming(event.y - 200, { duration: 0 }),
            withDelay(550, withTiming(event.y - 800, { duration: 550 }))
            );
            translateYAnimation.value = withSequence(
            withTiming(event.x - 200, { duration: 0 })
            );
        });
    
    const animatedStyles = useAnimatedStyle(() => ({
        opacity: opacityAnimation.value,
        transform: [
          { scale: scaleAnimation.value },
          { rotateZ: `${rotationAnimation.value}deg` },
          { translateY: translateXAnimation.value },
          { translateX: translateYAnimation.value },
        ],
    }));

    return { handleDoubleTap, animatedStyles };
}

export default useLikeAnimation;