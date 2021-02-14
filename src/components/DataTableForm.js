import React from 'react'
import {
    StyleSheet,
    // Text,
    StatusBar,
    // Image,
    View,
    TouchableOpacity,
    Dimensions,
    ScrollView,
  } from "react-native";
  import GifMonster from './GifMonster'
  import Constants from 'expo-constants';
  
  const { statusBarHeight } = Constants;
  // galio components
  import {
    Block, Card, Text, Icon, NavBar, Image, Button
  } from 'galio-framework';
  import theme from '../theme';
  import Monster from "./Monster";
  import { connect } from "react-redux";
  import { DataTable } from "react-native-paper";
  import { AnimatedCircularProgress } from "react-native-circular-progress";
  import { setGoal, updateGoal } from "../store/goal";
  import { Entypo } from "@expo/vector-icons";
  
  
  import { isFuture } from "date-fns";
  
  const { width, height } = Dimensions.get('screen');

export default function DataTableForm() {
    return (
        <DataTable>
        <DataTable.Header>
          <DataTable.Title>Day</DataTable.Title>
          <DataTable.Title>Date</DataTable.Title>
          <DataTable.Title>Goal Completed?</DataTable.Title>
          <DataTable.Title></DataTable.Title>
        </DataTable.Header>
        {this.props.days.map((day, i) => {
          return (
            <DataTable.Row key={i}>
              <DataTable.Cell>{i + 1}</DataTable.Cell>
              <DataTable.Cell>
                {day.date.toLocaleDateString()}
              </DataTable.Cell>
              <DataTable.Cell>
                {day.status && (
                  <Entypo name="check" size={24} color="black" />
                )}
              </DataTable.Cell>
              <DataTable.Cell>
                {!day.status && !isFuture(day.date) && (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.handleUpdate();
                    }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>Complete</Text>
                  </TouchableOpacity>
                )}
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
}
