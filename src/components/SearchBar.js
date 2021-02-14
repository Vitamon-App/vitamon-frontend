import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Input } from "galio-framework";
import { Feather } from "@expo/vector-icons";

function SearchBar({ term, onTermChange, onTermSubmit }) {
  return (
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyles} />
      <Input
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search"
        style={styles.inputStyle}
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: "#7E5EC8",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
    //borderColor: "#5539AA",
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
    borderColor: "#5539AA",
    width: 300,
  },
  iconStyles: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
    color: "white",
  },
  input: {
    borderColor: "#5539AA",
    borderWidth: 1,
    width: 500,
    backgroundColor: "#FFF",
    //padding: 8,
    // margin: 10,
  },
});

export default SearchBar;
