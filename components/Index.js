import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Button, Alert } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { registerfunc } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
export default function Index(props) {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.auth.username);
  const [value, setValue] = useState("");
  const [name, setName] = useState("Jobhn");
  const handleClick = () => {
    dispatch(registerfunc("Hello"));
  };
  useEffect(() => {
    setValue(props.title1);
  }, []);

  return (
    <View>
      <Text>{value}</Text>
      <Text>{name}</Text>
      <Button title="eee" onPress={(e) => handleClick()}></Button>
    </View>
  );
}
