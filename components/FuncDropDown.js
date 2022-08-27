import { Button, Alert } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import jp from "jsonpath";
import { ScrollView } from "react-native-web";
const customData = require("../constant/formulas.json");
export default function Index({ funcName, onChangeFunction, category }) {
  const math_temp = ["Sum", "Subtract", "Multiply", "Divide", "Pow"];
  const text_temp = ["Len", "Upper", "Trim"];
  const array_temp = ["Max", "Min", "Sort"];
  const logistics_temp = ["Trim"];
  const stastics_temp = ["Average", "Max", "Min"];
  const custom_temp = [];
  const [functionList, setFunctionList] = useState([]);
  const [functionName, setFunctionName] = useState("");
  useEffect(() => {
    console.log("cat", category)
    setFunctionName(funcName);
  }, [funcName]);
  useEffect(() => {
    switch (category) {
      case "Math":
        setFunctionList(math_temp);
        break;
      case "Text":
        setFunctionList(text_temp);
        break;
      case "Array":
        setFunctionList(array_temp);
        break;
      case "Logistics":
        setFunctionList(logistics_temp);
        break;
      case "Statistic":
        setFunctionList(stastics_temp);
        break;
      case "Custom":
        setFunctionList(custom_temp);
        break;
    }
  }, [category]);
  return (
    <View style={styles.funcDropdown}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 5,
          color: "#3333ff",
        }}
      >
        Function Name
      </Text>
      {functionList && (
        <SelectDropdown
          statusBarTranslucent={false}
          data={functionList}
          disableAutoScroll={false}
          // defaultValueByIndex={1}
          defaultValue={functionName}
          onSelect={(selectedItem, index) => {
            onChangeFunction(selectedItem);
          }}
          defaultButtonText={functionName}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <Icon
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#444"}
                size={18}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown1DropdownStyle}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  funcDropdown: {
    // marginLeft: "18%",
    width: "50%",
    alignItems: "center",
    marginBottom: 30,
  },
  dropdown1BtnStyle: {
    width: "90%",
    height: 45,
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdown1RowStyle: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },
});
