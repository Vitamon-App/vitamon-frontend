import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions, KeyboardAvoidingView, Platform,
  Keyboard,
  Alert,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AuthForm from "../components/AuthForm";
import { connect } from "react-redux";
import { auth } from "../store/user";
// galio component
import {
  Block, Button, Input, NavBar, Text,
} from 'galio-framework';
import theme from '../theme';

const { height, width } = Dimensions.get('window');

function HomeScreen({ navigation, login, user, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formType, setFormType] = useState("login");

  useEffect(() => {
    if (user.id) {
      navigation.navigate("Welcome");
    } else if (error) {
      Alert.alert("Log in attempt failed. Please try again.");
    }
  }, [user, error]);

  const onButtonPress = async () => {
    Keyboard.dismiss();
    try {
      await login(email, password, "login");
      setEmail("");
      setPassword("");
    
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
  
    <NavBar
      title="Sign In"
      onLeftPress={() => navigation.openDrawer()}
      style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
    />
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <Block flex center style={{ marginTop: theme.SIZES.BASE * 2.875, marginBottom: height * 0.1, color: theme.COLORS.PRIMARY}}>
        <Text>Loading...</Text>
        <Block row center space="between" style={{ marginVertical: theme.SIZES.BASE * 0.5 }}>
          <Block flex middle right>
          
          </Block>
          <Block flex middle center>
         
              <Image
          style={styles.largeLogo}
          source={require("../../assets/icon2.png")}
        />
          </Block>
          <Block flex middle left>
         
          </Block>
        </Block>
        <Text muted center size={theme.SIZES.FONT * 0.875} color={theme.COLORS.PRIMARY}>
          The once a day way to achieve your goals
        </Text>
      </Block>

      <Block flex={2} center space="evenly">
        <Block flex={2}>
        {!user.id && (
          <AuthForm
            formType={formType}
            email={email}
            password={password}
            onEmailChange={(newEmail) => setEmail(newEmail)}
            onPasswordChange={(newPassword) => setPassword(newPassword)}
            onPress={() => onButtonPress()}
          />)}
        
        
        </Block>
        {!user.id && (<Block flex middle>
        <Button color="transparent" shadowless onPress={() => navigation.navigate('SignUp')}>
            <Text center color={theme.COLORS.PRIMARY} size={theme.SIZES.FONT * 0.75}>
              {"Don't have an account? Sign Up"}
            </Text>
          </Button>
        </Block> )}
        {user.id && (
          <Button
            color={theme.COLORS.PRIMARY}
            onPress={() => {
              navigation.navigate("Welcome");
            }}
          >
            <Text style={styles.buttonText}> Back to DashBoard</Text>
          </Button>
        )}
         <Button
         round
            color={theme.COLORS.PRIMARY}
            onPress={() => {
              navigation.navigate("Welcome");
            }}
          >
            <Text style={styles.buttonText}> Back to DashBoard</Text>
          </Button>
      </Block>
    </KeyboardAvoidingView>
  </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mediumLogo: {
    width: 100,
    height: 100,
  },
  largeLogo: {
    width: 300,
    height: 300,
    top: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f114af",
  },
  button: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#9F1BEE",
    paddingVertical: 10,
    borderRadius: 10,
    bottom: 20,
  },
  button: {
    marginLeft: 10,
    marginTop: 20,
    backgroundColor: "#f114af",
    paddingVertical: 10,
    borderRadius: 10,
    bottom: 20,
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  bottomText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "red",
    top: 10,
  },
});

const mapState = (state) => {
  return {
    user: state.user,
    error: state.user.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    login: (email, password, formType) => {
      dispatch(auth(email, password, formType));
    },
  };
};

export default connect(mapState, mapDispatch)(HomeScreen);
