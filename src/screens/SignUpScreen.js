import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import SignUpForm from "../components/SignUpForm";
import { connect } from "react-redux";
import { signup } from "../store/user";
import {
  Block,
  Checkbox,
  Text,
  Button,
  Icon,
  Input,
  Image,
} from "galio-framework";

import theme from "../theme.js";

const { width, height } = Dimensions.get("screen");

function SignUp({ navigation, signupUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSignUpButtonPress = async () => {
    try {
      let newUser = {
        name: name,
        email: email,
        password: password,
      };
      await signupUser(newUser);
      navigation.navigate("Welcome");
    } catch (error) {
      console.log(error);
    }
  };

  const backToLogin = () => {
    navigation.navigate("Home");
  };

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={require("../../assets/register-bg.png")}
        style={{ width, height, zIndex: 1 }}
      >
        <Block flex middle>
          <Block style={styles.registerContainer}>
            <Block flex={0.25} middle style={styles.socialConnect}>
              <Text color="#8898AA" size={12}>
                Sign up with
              </Text>
              <Block row style={{ marginTop: theme.SIZES.BASE }}>
                <Button style={{ ...styles.socialButtons, marginRight: 30 }}>
                  <Block row>
                    <Icon
                      name="logo-github"
                      family="Ionicon"
                      size={14}
                      color={"black"}
                      style={{ marginTop: 2, marginRight: 5 }}
                    />
                    <Text style={styles.socialTextButtons}>GITHUB</Text>
                  </Block>
                </Button>
                <Button style={styles.socialButtons}>
                  <Block row>
                    <Icon
                      name="logo-google"
                      family="Ionicon"
                      size={14}
                      color={"black"}
                      style={{ marginTop: 2, marginRight: 5 }}
                    />
                    <Text style={styles.socialTextButtons}>GOOGLE</Text>
                  </Block>
                </Button>
              </Block>
            </Block>
            <Block flex>
              <Block flex={0.17} middle>
                <Text color="#8898AA" size={12}>
                  Or sign up the classic way
                </Text>
              </Block>
              <Block flex middle>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block width={width * 0.8}>
                    <SignUpForm
                      name={name}
                      email={email}
                      password={password}
                      onEmailChange={(newEmail) => setEmail(newEmail)}
                      onPasswordChange={(newPassword) =>
                        setPassword(newPassword)
                      }
                      onNameChange={(newName) => setName(newName)}
                      backToLogin={() => backToLogin()}
                    />
                    <Block row style={styles.passwordCheck}>
                      <Text size={12} color={theme.COLORS.MUTED}>
                        password strength:
                      </Text>
                      <Text bold size={12} color={theme.COLORS.SUCCESS}>
                        {" "}
                        strong
                      </Text>
                    </Block>
                  </Block>
                  <Block row width={width * 0.75}>
                    <Checkbox
                      checkboxStyle={{
                        borderWidth: 3,
                      }}
                      color={theme.COLORS.PRIMARY}
                      label="I agree with the"
                    />
                    <Button
                      style={{ width: 100 }}
                      color="transparent"
                      textStyle={{
                        color: theme.COLORS.PRIMARY,
                        fontSize: 14,
                      }}
                    >
                      Privacy Policy
                    </Button>
                  </Block>
                  <Block middle>
                    <Button
                      color={theme.COLORS.PRIMARY}
                      style={styles.createButton}
                      onPress={() => onSignUpButtonPress(name, email, password)}
                    >
                      <Text bold size={14} color={theme.COLORS.WHITE}>
                        CREATE ACCOUNT
                      </Text>
                    </Button>

                    <Button
                      color="transparent"
                      shadowless
                      onPress={backToLogin}
                    >
                      <Text
                        center
                        color={theme.COLORS.PRIMARY}
                        size={theme.SIZES.FONT * 0.75}
                      >
                        Already have an account? Sign In
                      </Text>
                    </Button>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
}
const mapDispatch = (dispatch) => {
  return {
    signupUser: (newUser) => {
      dispatch(signup(newUser));
    },
  };
};

const styles = StyleSheet.create({
  buttonText: {
    color: "#333333",
    fontSize: 18,
  },
  registerContainer: {
    width: width * 0.9,
    height: height * 0.78,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  socialConnect: {
    backgroundColor: theme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: theme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
});

export default connect(null, mapDispatch)(SignUp);
