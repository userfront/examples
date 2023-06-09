import * as React from "react";
import Userfront from "@userfront/core";
import {
  Text,
  SafeAreaView,
  TextInput,
  View,
  Button,
  StyleSheet,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import Alert from "./Alert";

const SignupForm = () => {
  const [email, setEmail] = React.useState(null);
  const [accountName, setAccountName] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [passwordVerify, setPasswordVerify] = React.useState(null);
  const [alert, setAlert] = React.useState();

  const handleSuccess = async (res) => {
    setEmail(null);
    setAccountName(null);
    setPassword(null);
    setPasswordVerify(null);
    console.log(res);

    // Set the access token
    await SecureStore.setItemAsync(`access_demo1234`, res.tokens.access.value);

    // To read the access token (in the future)
    // await SecureStore.getItemAsync(`access_demo1234`);

    // Redirect as desired, see https://reactnative.dev/docs/navigation#react-navigation
  };

  // Handle the form submission by calling Userfront.signup()
  const handleSubmit = async () => {
    // Reset the alert to empty
    setAlert(null);
    // Verify that the passwords match
    if (password !== passwordVerify) {
      return setAlert("Passwords must match");
    }

    try {
      // Call Userfront.signup()
      const res = await Userfront.signup({
        method: "password",
        email,
        password,
        data: {
          accountName,
        },
        redirect: false,
      });
      handleSuccess(res);
    } catch (error) {
      console.log(error);
      setAlert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Sign up!</Text>
      <SafeAreaView>
        <Alert message={alert} />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email address"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          onChangeText={setAccountName}
          value={accountName}
          placeholder="Account name (custom field)"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          textContentType="password"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPasswordVerify}
          value={passwordVerify}
          textContentType="password"
          placeholder="Re-type password"
        />
        <Button
          style={styles.button}
          onPress={handleSubmit}
          title="Sign up"
          accessibilityLabel="Sign up"
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  paragraph: {
    marginBottom: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 40,
    marginBottom: 12,
    padding: 8,
    borderWidth: 1,
  },
  button: {
    marginBottom: 12,
    padding: 8,
  },
});

export default SignupForm;
