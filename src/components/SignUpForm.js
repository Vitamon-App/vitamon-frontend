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
const SignUpForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onPress,
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
      <TouchableOpacity onPress={() => onPress(email, password)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpForm;
