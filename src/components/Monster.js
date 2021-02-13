import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { withNavigation } from "@react-navigation/compat";
import PropTypes from "prop-types";
import { Block, Text, theme } from "galio-framework";

import { render } from "react-dom";
import WaterMonster from "./WaterMonster";
import StepsMonster from "./StepsMonster";

const { width } = Dimensions.get("screen");

class Monster extends React.Component {
  render() {
    const {
      monsterType,
      monsterStatus,
      navigation,
      goalId,
      product,
      horizontal,
      full,
      style,
      priceColor,
      ctaColor,
      item,
      imageStyle,
    } = this.props;
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle,
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow,
    ];
    return (
      <View>
        <Block row={horizontal} card flex style={cardContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("SingleGoal", { id: goalId })}
          >
            <Block flex style={imgContainer}>
              {monsterType === "Water" && (
                <WaterMonster monsterStatus={monsterStatus} />
              )}
              {monsterType === "Steps" && (
                <StepsMonster monsterStatus={monsterStatus} />
              )}
            </Block>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => navigation.navigate("Pro")}>
            <Block flex space="between" style={styles.cardDescription}>
              {/* <Text size={14} style={styles.cardTitle}>{monsterType}</Text>
            <Text size={12} muted={!ctaColor} color={ctaColor || theme.COLORS.ACTIVE} bold>{monsterStatus}</Text> */}
            </Block>
          </TouchableWithoutFeedback>
        </Block>
      </View>
    );
  }
}
Monster.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  backgroundStyle: {
    marginTop: 10,
    backgroundColor: "#F0EEEE",
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: "row",
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyles: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
  },
  mediumLogo: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  product: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16,
  },
  productTitle: {
    flex: 1,
    flexWrap: "wrap",
    paddingBottom: 6,
  },
  productDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: "hidden",
  },
  image: {
    // borderRadius: 3,
    // marginHorizontal: theme.SIZES.BASE / 2,
    // marginTop: -16,
  },
  horizontalImage: {
    height: 122,
    width: "auto",
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
    // width: width - theme.SIZES.BASE * 3,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Monster);
