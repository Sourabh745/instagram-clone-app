import {
  StyleSheet,
  View,
  SafeAreaView,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import SignupForm from "../components/signup/SignupForm";
import Footer from "../components/signup/Footer";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { SIZES } from "../constants";
import { BlurView } from 'expo-blur'; 
import { useState } from "react";


const Signup = ({ navigation }) => {

  const [loading, setLoading] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.mainContainer}>
            <View style={{ height: 56 }} />
            <View>
              <Animated.View style={styles.logoContainer}>
                <Image
                  source={require("../../assets/images/header-logo.png")}
                  style={styles.logo}
                />
              </Animated.View>

              <SignupForm navigation={navigation}  setLoading={setLoading}/>
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

export default Signup;

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
    marginTop: -SIZES.Width * 0.15,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    height: Platform.OS === "android" ? 70 : 60,
    width: 200,
    contentFit: "cover",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',

  }
});
