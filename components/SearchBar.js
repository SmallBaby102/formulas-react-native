import { Button, Alert } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
export default function Index({ result }) {
  const [isopen, setIsOpen] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsOpen(!isopen)}>
        <View style={styles.searchcontainer}>
          <View style={styles.searchicon}>
            <MaterialIcon name="function-variant" size={25} color="black" />
          </View>
          <View style={styles.searchbar}>
            <Text>=</Text>
            {result}
            {/* <Text
              style={{
                fontSize: 21,
                color: "#00b33c",
                letterSpacing: 1,
                fontWeight: "700",
              }}
            >
              ={result}
            </Text> */}
          </View>
        </View>
        {isopen ? (
          <View style={styles.detail}>
            <Text> </Text>
            {result}
            {/* <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
              {result}
            </Text> */}
          </View>
        ) : (
          <></>
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    zIndex: 100,
  },

  searchcontainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    marginBottom: 50,
  },
  searchicon: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    fontSize: 40,
    width: "15%",
    padding: 10,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#3366ff",
  },
  searchbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "82%",
    height: 50,
    borderWidth: 1,
    borderColor: "#3366ff",
    borderRadius: 5,
    padding: 10,
    overflow: "scroll",
    backgroundColor: "white",
  },
  detail: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    top: 50,
    marginTop: 3,
    marginLeft: "18%",
    width: "82%",
    borderRadius: 5,
    borderColor: "#3366ff",
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
  },
});
