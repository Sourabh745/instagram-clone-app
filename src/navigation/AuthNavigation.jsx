import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import SignedOutStack from "./SignedOutStack";
import SignedInStack from "./SignedInStack";
import firebase from "../services/firebase";

const AuthNavigation = () => {
  const [currentUser, setcurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setcurrentUser(user) : setcurrentUser(null);

  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => userHandler(user)),
    []
  );

  return (
    <View style={styles.container}>
      {currentUser ? <SignedInStack /> : <SignedOutStack />}
    </View>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
