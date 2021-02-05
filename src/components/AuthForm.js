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
      <TouchableOpacity onPress={() => onPress(email, password, formType)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthForm;
