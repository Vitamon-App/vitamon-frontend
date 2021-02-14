import React from "react";
import { Image, StyleSheet } from "react-native";
import { Block } from "galio-framework";

function WaterMonster({ monsterStatus }) {
  return (
    <Block>
      {monsterStatus === "start" && (
        <Image
          style={styles.startImage}
          source={require("../../assets/waterstart.png")}
        />
      )}
      {monsterStatus === "middle" && (
        <Image
          style={styles.middleImage}
          source={require("../../assets/watermiddle.png")}
        />
      )}
      {monsterStatus === "warning" && (
        <Image
          styles={styles.middleImage}
          source={require("../../assets/waterwarning.png")}
        />
      )}
      {monsterStatus === "complete" && (
        <Image
          style={styles.completeImage}
          source={require("../../assets/watercomplete.png")}
        />
      )}
    </Block>
  );
}

const styles = StyleSheet.create({
  startImage: { flex: 1, height: 100, width: 100 },
  middleImage: { flex: 1, height: 150, width: 150 },
  completeImage: { flex: 1, height: 200, width: 200 },
});

export default WaterMonster;
