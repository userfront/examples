import * as React from "react";
import Userfront from "@userfront/core";
import { View, StyleSheet } from "react-native";

Userfront.init("demo1234", { domain: "example.com" });

import SignupForm from "./components/Signup";

export default function App() {
  return (
    <View style={styles.container}>
      <SignupForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
