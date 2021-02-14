import React from "react";
import {
  StyleSheet,
  // Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block, Checkbox, Text, Button, Icon, Input, Image} from "galio-framework";
import theme from '../theme';
const { width, height } = Dimensions.get("screen");
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
  navigation
}) => {
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>

  
      {/* <View style={styles.loginBox}> */}
      {/* <Text style={styles.loginText}>Please Log In</Text> */}
      <Block flex={2} center space="evenly">
        <Block flex={2}>
      <Input
         rounded
         style={{width: width * 0.9}}
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={onEmailChange}
        placeholder="enter email"
        // style={styles.input}
      />
      <Input
       rounded
       password
       viewPass
       style={{width: width * 0.9}}
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={onPasswordChange}
        placeholder="enter password"
        // style={styles.input}
      />
        </Block>
  
      <Block flex middle>
          <Button
            round
            color={theme.COLORS.PRIMARY}
            onPress={() => onPress(email, password, formType)}
          >
            Sign in
          </Button>
        
          </Block>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => onPress(email, password, formType)}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity> */}
    </Block>
  
    </KeyboardAvoidingView>
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
  loginBox: {
justifyContent: 'center',
alignItems: 'stretch',
  },
  input: {
    borderWidth: 1,
    backgroundColor: "#F2F2F2",
    padding: 8,
    margin: 10,
  },
  loginText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#9F1BEE",
    textAlign: "center",
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: theme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: theme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }

});

export default AuthForm;
