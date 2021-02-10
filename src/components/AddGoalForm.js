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
    <View>
      <Text>{descriptionOfQty}</Text>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        value={quantity}
        onChangeText={onQuantityChange}
        placeholder="enter quantity"
      />

      <View>
        <Text>{`Duration of Goal (Days)`}</Text>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          value={numberOfDays}
          onChangeText={onNumberOfDaysChange}
          placeholder="enter number of days"
        />
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => onPress()}>
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

export default AddGoalForm;
