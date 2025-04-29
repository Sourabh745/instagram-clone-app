// import {
//   StyleSheet,
//   View,
//   Text,
//   SafeAreaView,
//   Keyboard,
//   TouchableWithoutFeedback,
//   Animated,
//   Platform,
//   StatusBar,
//   KeyboardAvoidingView,
//   ActivityIndicator,
// } from "react-native";
// import React, { useEffect, useState } from "react";
// import LoginForm from "../components/login/LoginForm";
// import Footer from "../components/login/Footer";
// import { Image } from "expo-image";

// const LoginScreen = ({ navigation }) => {
//   const [messageModalVisible, setMessageModalVisible] = useState(false);
//   const [loading, setLoading] = useState(false)


//   useEffect(() => {
//     setTimeout(() => {
//       setMessageModalVisible(true);
//     }, 500);
//     setTimeout(() => {
//       setMessageModalVisible(false);
//     }, 3500);
//   }, []);

//   return !loading ?(
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <SafeAreaView style={styles.container}>
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === "ios" ? "padding" : "height"}
//         >
//           <View style={styles.mainContainer}>
//             <View>
//               <Animated.View style={styles.logoContainer}>
//                 <Image
//                   source={require("../../assets/images/header-logo.png")}
//                   style={styles.logo}
//                 />
//               </Animated.View>

//               <LoginForm navigation={navigation} setLoading={setLoading} />
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//         <Footer navigation={navigation} />
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   ): (
//     <View style={styles.container}>
//       <View style = {styles.mainContainer}>
//         <ActivityIndicator size={"large"} color={"dodgerblue"}/>
//       </View>
//     </View>
//   )
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//     paddingHorizontal: 20,
//     alignContent: "space-between",
//     paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
//   },
//   mainContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   logoContainer: {
//     alignItems: "center",
//   },
//   logo: {
//     height: Platform.OS === "android" ? 70 : 60,
//     width: 200,
//     contentFit: "cover",
//   },
//   text: {
//     fontSize: 24,
//     color: 'white'
//   }
// });
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { BlurView } from 'expo-blur';
import LoginForm from "../components/login/LoginForm";
import Footer from "../components/login/Footer";

const LoginScreen = ({ navigation }) => {
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMessageModalVisible(true);
    }, 500);
    setTimeout(() => {
      setMessageModalVisible(false);
    }, 3500);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.mainContainer}>
            <View>
              <Animated.View style={styles.logoContainer}>
                <Image
                  source={require("../../assets/images/header-logo.png")}
                  style={styles.logo}
                />
              </Animated.View>

              <LoginForm navigation={navigation} setLoading={setLoading} />
            </View>
          </View>
        </KeyboardAvoidingView>
        <Footer navigation={navigation} />

        {loading && (
          <View style={StyleSheet.absoluteFillObject}>
            <BlurView intensity={135} tint="dark" style={StyleSheet.absoluteFill} />
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="dodgerblue" />
            </View>
          </View>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
    alignContent: "space-between",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: Platform.OS === "android" ? 70 : 60,
    width: 200,
    contentFit: "cover",
  },
  text: {
    fontSize: 24,
    color: 'white'
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',

  }
});
