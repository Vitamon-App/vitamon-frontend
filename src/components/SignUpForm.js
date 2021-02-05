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
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={onEmailChange}
        placeholder="enter email"
      />
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={onPasswordChange}
        placeholder="enter password"
      />
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            
            onPress={() => onPress(email, password)}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    height: 30,
    marginHorizontal: 10,
    backgroundColor: "#97A5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#F2F2F2",
    padding: 8,
    margin: 10,
  },
  button: {
    marginLeft: 0,
    marginTop: 20,
    backgroundColor: "#000000",
    paddingVertical: 12,
    borderRadius: 10,
  },
});

export default SignUpForm;
