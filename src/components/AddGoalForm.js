import { Button, Input, Block } from "galio-framework";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

const AddGoalForm = ({
  descriptionOfQty,
  quantity,
  numberOfDays,
  onQuantityChange,
  onNumberOfDaysChange,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.subHead2}>{descriptionOfQty}</Text>
      <Input
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={quantity}
        onChangeText={onQuantityChange}
        placeholder="enter quantity"
      />

      <View>
        <Text style={styles.subHead2}>{`Duration of Goal (Days)`}</Text>
        <Input
          style={styles.input}
          //style={{ borderColor: "#5539AA" }}
          autoCapitalize="none"
          autoCorrect={false}
          value={numberOfDays}
          onChangeText={onNumberOfDaysChange}
          placeholder="enter number of days"
        />
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <Button small round color="#2C148B" onPress={() => onPress()}>
            <Text style={styles.buttonText}>Submit</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    //height: 30,
    // width: 10,
    //marginHorizontal: 10,
    // backgroundColor: "#5539AA",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  input: {
    borderColor: "#5539AA",
    borderWidth: 1,
    width: 200,
    backgroundColor: "#FFF",
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
  subHead2: {
    fontSize: 22,
    color: "#2C148B",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 19,
    fontSize: 16,
    paddingBottom: 10,
  },

  container: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddGoalForm;
