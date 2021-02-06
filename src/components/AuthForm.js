import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

/**
 * COMPONENT
 */
const AuthForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onPress,
  formType,
}) => {
  return (
    <View>
      <Text>Log In </Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={onEmailChange}
        placeholder="enter email"
      />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={onPasswordChange}
        placeholder="enter password"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => onPress(email, password, formType)}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#9F1BEE",
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});

export default AuthForm;
