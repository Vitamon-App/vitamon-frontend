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
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Block, Checkbox, Text, theme, Button, NavBar, Icon, Input, Image} from "galio-framework";

const { width, height } = Dimensions.get("screen");

/**
 * COMPONENT
 */
const SignUpForm = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onPress,
  navigation
}) => {
  return (
    
    <View>
       <Input
       rounded
        style={{width: width * 0.9}}
        autoCapitalize="none"
        autoCorrect={false}
        // value={name}
        // onChangeText={onNameChange}
        placeholder="first name"
      />
      <Input
      rounded
        style={{width: width * 0.9}}
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={onEmailChange}
        placeholder="enter email"
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
      />
      <View>
      <Button
       round
      color="primary"
    onPress={() => onPress(email, password)}
              >
                Sign up
              </Button>
    
          <Button color="transparent" shadowless onPress={() => navigation.navigate('Login')}>
                <Text center color={theme.COLORS.ERROR} size={theme.SIZES.FONT * 0.75}>
                  Already have an account? Sign In
                </Text>
              </Button>
    
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
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: theme.SIZES.BASE * 0.3,
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: theme.COLORS.WHITE,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
});

export default SignUpForm;
