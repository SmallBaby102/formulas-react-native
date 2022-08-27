import { Button, Alert } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <MaterialIcon name="calculator" size={22} color="white"></MaterialIcon>
        <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
          JSON FORMULA EDITOR
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6600ff",
    width: "100%",
    padding: 10,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
