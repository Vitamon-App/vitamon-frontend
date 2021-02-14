import React, { useState } from "react";

import { StyleSheet, View, Alert, Dimensions} from "react-native";
import { Text, Card, Block, Icon, Button, Input } from "galio-framework";

import AddGoalForm from "../components/AddGoalForm";
import { connect } from "react-redux";
import { addGoalToUser, fetchGoals } from "../store/allTheUsersGoals";
import SelectBox from "react-native-multi-selectbox";
import { Entypo, Fontisto } from "@expo/vector-icons";
// Galio components

import theme from '../theme';

const width = Dimensions.get("window").width;


function AddGoalScreen({ navigation, user, addGoal, setGoals }) {
  const [type, setType] = useState("Steps");
  const [quantity, setQuantity] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [selected, setSelected] = useState("Steps");
  const [descriptionOfQty, setDescriptionOfQty] = useState(
    "How many steps do you want to walk daily?"
  );
  const goalTypes = [
    {
      item: "Steps",
      id: 2,
    },
    {
      item: "Water",
      id: 1,
    },
  ];

  const goalChanger = () => {
    return (val) => {
      if (val.item === "Steps") {
        setType("Steps");
        setSelected(val.item);
        setDescriptionOfQty("How many steps do you want to walk daily?");
      } else {
        setType("Water");
        setSelected(val.item);
        setDescriptionOfQty(
          "How many water bottles do you want to drink daily?"
        );
      }
    };
  };
  const onAddGoalButtonPress = async () => {
    try {
      let newGoal = {
        userId: user.id,
        type: type,
        quantity: Number(quantity),
        numberOfDays: Number(numberOfDays),
        completedDays: 0,
      };

      if (
        (newGoal.quantity === 0 && newGoal.numberOfDays === 0) ||
        (isNaN(newGoal.quantity) && isNaN(newGoal.numberOfDays))
      ) {
        return Alert.alert(
          "Invalid Amount For Both Quantity And Number Of Days"
        );
      } else if (newGoal.quantity === 0 || isNaN(newGoal.quantity)) {
        return Alert.alert("Invalid Amount for Quantity ");
      } else if (newGoal.numberOfDays === 0 || isNaN(newGoal.numberOfDays)) {
        return Alert.alert("Invalid Amount for Number Of Days ");
      }
      await addGoal(newGoal);
      // navigation.navigate("Goals");
      navigation.navigate("Home");
      return Alert.alert("Goal Added!");
      await setGoals(this.props.user.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>

      <Text style={styles.subHead1}>Add Your Goal</Text>
      <View style={styles.inputandText}>
        <Text style={styles.subHead2}>Select Your Goal</Text>

        <SelectBox
          label={selected}
          options={goalTypes}
          value={type}
          onChange={goalChanger()}
          hideInputFilter={false}
        />
        {/* <View style={{ height: 40 }} /> */}
      </View>
      <AddGoalForm
        descriptionOfQty={descriptionOfQty}
        quantity={quantity}
        numberOfDays={numberOfDays}
        onQuantityChange={(newQuantity) => setQuantity(newQuantity)}
        onNumberOfDaysChange={(newNumberOfDays) =>
          setNumberOfDays(newNumberOfDays)
        }
        onPress={() => onAddGoalButtonPress()}
      />
    </View>
  );
}
const mapState = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatch = (dispatch) => {
  return {
    addGoal: (newGoal) => {
      dispatch(addGoalToUser(newGoal));
    },
    setGoals: (userId) => {
      dispatch(fetchGoals(userId));
    },
  };
};

const styles = StyleSheet.create({
  subHead1: {
    textAlign: "center",
    fontSize: 34,
    color: "#2C148B",
    fontWeight: "bold",
  },
  subHead2: {
    fontSize: 22,
    color: "#2C148B",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 19,
    fontSize: 16,
    paddingBottom: 10,
  },
  buttonText: {
    color: "#5539AA",
    fontSize: 18,
  },
  inputandText: {
    margin: 30,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default connect(mapState, mapDispatch)(AddGoalScreen);
