import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchBar from "../components/SearchBar";
import Library from "../components/Library";
import Category from "../components/Category";
import FuncDropDown from "../components/FuncDropDown";
import CategoryDropDown from "../components/CategoryDropDown";
import OperatorDropDown from "../components/OperatorDropDown";
import { Button, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import JsonDataDialog from "../components/JsonDataDialog";
import jp from "jsonpath";
import { createIconSetFromFontello } from "react-native-vector-icons";
import { Dimensions } from "react-native";
const customData = require("../constant/formulas.json");

import Web3 from 'web3';

const web3 = new Web3(new Web3.providers.HttpProvider("https://matic-mumbai.chainstacklabs.com"));
import contract_abi from "../constant/abi";
const contract_address = "0x2e29cf6c881d4a7e1296d67ee7b7d9f429c4b67f";
const NameContract = new web3.eth.Contract(contract_abi, contract_address);
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
export default function Index() {
  const [tvisible, setTVisible] = useState(false);
  const [library, setLibrary] = useState("Standard");
  const [index, setIndex] = useState(0);
  const [nindex, setNodeIndex] = useState("");
  const [query, setQuery] = useState("$");
  const [root, setRoot] = useState({
    category: "Math",
    name: "Sum",
    params: ["", ""],
    type: "numeric",
    id: 0,
  });
  const [data, setData] = useState({
    category: "Math",
    name: "Sum",
    params: ["", ""],
    type: "numeric",
    id: 0,
  });
 const getLibrary = (lib) => {
   setLibrary(lib);
   if (lib  === "Standard")
       getCategory("Math");
    else 
      setData({...data, category: "Custom", name: " "})
 
 }
  const getCategory = (result) => {
    const tempObj = jp.query(customData, `$.Category.${result}`)[0];
    if (query === "$") {
      let temp = data;
      temp.category = result;
      temp.name = tempObj[0].name;
      temp.params = tempObj[0].params;
      temp.type = tempObj[0].type;
      setRoot(JSON.parse(JSON.stringify(temp)));
    } else {
      jp.apply(root, query, (value) => {
        console.log(".....", tempObj[0]);
        value = { ...tempObj[0] };
        value.category = result;
        return value;
      });
      const tempData = jp.query(root, query);
      setData(JSON.parse(JSON.stringify(tempData[0])));
    }
  };

  const showTDialog = (i) => {
    setNodeIndex(i);
    setTVisible(true);
  };
  const onChangeTVisible = (data) => {
    setTVisible(data);
  };
  const onChangeFunction = (func) => {
    
    if (query === "$") {
      let temp = data;
      temp.name = func;
      setRoot(JSON.parse(JSON.stringify(temp)));
    } else {
      jp.apply(root, query, (value) => {
        value.name = func;
        return value;
      });
      const tempData = jp.query(root, query);
      setData(JSON.parse(JSON.stringify(tempData[0])));
    }
  };

  const editChild = (i) => {
    let temp = index + 1;
    setIndex(temp);
    let tempQuery = query + `.params[${i}]`;
    jp.apply(root, tempQuery, (value) => {
      return {
        category: "Math",
        name: "Sum",
        params: ["", ""],
        type: "numeric",
        id: temp,
      };
    });
    const tempData = jp.query(root, tempQuery);
    console.log("tempData", tempData);
    setData(JSON.parse(JSON.stringify(tempData[0])));
    setQuery(tempQuery);
  };

  const handleChangeText = (event, i) => {
    let temp = data;
    temp.params[i] = event;
    if (query != "$") {
      jp.apply(root, query, (value) => {
        value = { ...temp };
        return value;
      });
      const tempData = jp.query(root, query);
      setData(JSON.parse(JSON.stringify(tempData[0])));
    } else {
      let temp = data;
      temp.params[i] = event;
      setRoot({ ...JSON.parse(JSON.stringify(temp)) });
    }
  };

  const saveNodes = (nodes) => {
    if (query != "$") {
      let temp = data;
      temp.params[nindex] = nodes;
      jp.apply(root, query, (value) => {
        value = { ...temp };
        return value;
      });
      const tempData = jp.query(root, query);
      setData(tempData[0]);
    } else {
      let tempQuery = query + `.params[${nindex}]`;
      jp.apply(root, tempQuery, (value) => {
        value = nodes;
        return value;
      });
      setData(root);
    }
  };
  const operation = (operator, param1, param2) => {
    switch(operator) {
      case "Sum":
        return NameContract.methods.add(param1,param2).call((err, res) => {
          if (err) {
            console.log("An error occured", err)
            return "";
          }
          return res;
        });

      case "Subtract":
        return NameContract.methods.sub(param1,param2).call((err, res) => {
          if (err) {
            console.log("An error occured", err)
            return "";
          }
          return res;
        });
      case "Multiply":
        return NameContract.methods.mul(param1,param2).call((err, res) => {
          if (err) {
            console.log("An error occured", err)
            return "";
          }
          return res;
        });
      case "Divide":
        return NameContract.methods.div(param1,param2).call((err, res) => {
          if (err) {
            console.log("An error occured", err)
            return "";
          }
          return res;
        });
      case "Pow":
        return NameContract.methods.pow(param1,param2).call((err, res) => {
          if (err) {
            console.log("An error occured", err)
            return "";
          }
          return res;
        });
      case "Len":
        return NameContract.methods.len(param1).call((err, res) => {
          if (err) {
            console.log("An error occured", err)
            return "";
          }
          return res;
        });
      case "Upper":
        return NameContract.methods.toUpper(param1).call((err, res) => {
          if (err) {
            console.log("An error occured", err)
            return "";
          }
          return res;
        });
      case "Average":
        return NameContract.methods.avg(param1, param2).call((err, res) => {
          if (err) {
            console.log("An error occured", err)
            return "";
          }
          return res;
        });
      case "Max":
        return NameContract.methods.max(param1, param2).call((err, res) => {
          if (err) {
            console.log("An error occured", err)
            return "";
          }
          return res;
        });
      case "Min":
        return NameContract.methods.min(param1, param2).call((err, res) => {
          if (err) {
            console.log("An error occured", err)
            return "";
          }
          return res;
        });

      }
  }
  
  const calculate = async (item) => {
    
    if(typeof item !== "object") return (item);
    if (item.name === "Len" || item.name === "Upper" || item.name === "Trim")
    {
      return operation(item.name, await calculate(item.params[0]), "Text"); 
    }
    else
      return operation(item.name, await calculate(item.params[0]), await calculate(item.params[1])); 
  }
  const saveFunction = async () => {
    
    let dd = await web3.eth.getStorageAt("0x2e29cf6c881d4a7e1296d67ee7b7d9f429c4b67f", 2);
    console.log("dd", dd)
    if (query != "$") {
        const newQuery = query.split(".");
        let tempList = [];
        for (let i = 0; i < newQuery.length - 1; i++) {
          tempList.push(newQuery[i]);
        }
        const newTemp = tempList.join(".");
        setQuery(newTemp);
        const temproot = jp.query(root, newTemp);
        setData(temproot[0]);
    } else {
    
    }  
    console.log("data", root)
    let res = await calculate(root);
     alert(res);
    //  await window.ethereum.enable();
     const accounts = await web3.eth.getAccounts();
     console.log("accounts",accounts)
     NameContract.methods.pushFormula(root).send({from: "0x7cbeaa70fa87622cc20a54ac7cd88bd008492e47"})
     .then(res => {
       console.log("sucess", res)
     })
     .catch(err => {
       console.log("err", err)
     });
  };
  const cancelFunction = () => {
    if (query != "$") {
      const newQuery = query.split(".");
      let tempList = [];
      for (let i = 0; i < newQuery.length - 1; i++) {
        tempList.push(newQuery[i]);
      }
      const newTemp = tempList.join(".");
      const temproot = jp.query(root, newTemp);
      setData(temproot[0]);
      setQuery(newTemp);
    } else {
    }
  };

  const toshow = (item) => {
    if (item === null) {
      return "";
    } else if (item != null && item.name) {
      const params = item.params.map((param) => {
        if (typeof param === "object") {
          return toshow(param);
        } else {
          return <Text>{param}</Text>;
        }
      });

      const result = params.map((ele, i) => {
        if (i < params.length - 1) {
          return <Text key={i}>{ele},</Text>;
        } else {
          return <Text key={i}>{ele}</Text>;
        }
      });
      return (
        <Text
          style={item.id === data.id ? [styles.flex, styles.red] : styles.flex}
        >
          {item.name}({result})
        </Text>
      );
    } else {
      return item;
    }
  };

  const getFormula = (item) => {
    if (item === null) {
      return "";
    } else if (item != null && item.name) {
      const params = item.params.map((param) => {
        if (typeof param === "object") {
          return getFormula(param);
        } else {
          return param;
        }
      });
      return `${item.name}(` + params.join(",") + ")";
    } else {
      return item;
    }
  };
  console.log("******");
  return (
    <View style={styles.screen}>
      <SearchBar result={toshow(root)} />
      <Library sellibrary={library} getLibrary={getLibrary} />
      <View style={styles.category}>

        <CategoryDropDown
          library ={library}
          onChangeCategory={getCategory}
        />
        <FuncDropDown
          funcName={data.name}
          onChangeFunction={onChangeFunction}
          category={data.category}
        />
      </View>

      <View style={styles.parameters}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 2,
            color: "#3333ff",
          }}
        >
          Parameters
        </Text>
        <View style={styles.parameter}>
          {data &&
            data.params &&
            data.params.map((item, i) => {
              return (
                <View style={styles.inputBar} key={i}>
                  <Text style={{ fontSize: 18, fontWeight: "700" }}>X{i}=</Text>
                  <TextInput
                    mode="outlined"
                    style={styles.inputElement}
                    onChangeText={(event) => {
                      handleChangeText(event, i);
                    }}
                    value={getFormula(item)}
                    keyboardType={data.type}
                  />
                  <MaterialIcon
                    name="function-variant"
                    size={20}
                    color="white"
                    style={styles.funcButton}
                    onPress={() => editChild(i)}
                  />
                  <Icon
                    name="search"
                    size={18}
                    color="white"
                    style={styles.searchButton}
                    onPress={() => showTDialog(i)}
                  />
                </View>
              );
            })}
        </View>
      </View>

      {query === "$" ? (
        <View style={styles.publishfooter}>
          <Button
            mode="contained"
            onPress={() => saveFunction()}
            buttonColor="#3333ff"
            style={styles.publishButton}
          >
            Publish
          </Button>
        </View>
      ) : (
        <View style={styles.footer}>
          <View style={styles.actionButton}>
            <Button
              mode="contained"
              onPress={() => saveFunction()}
              buttonColor="#3333ff"
            >
              Save
            </Button>
          </View>
          <View style={styles.actionButton}>
            <Button
              mode="outlined"
              onPress={() => cancelFunction()}
              buttonColor="white"
              textColor="#3333ff"
              style={styles.blueBorder}
            >
              Back
            </Button>
          </View>
        </View>
      )}
      <JsonDataDialog
        tvisible={tvisible}
        onChangeTVisible={onChangeTVisible}
        saveNodes={saveNodes}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    display: "flex",
    height: "100%",
  },
  category: {
    display: "flex",
    flexDirection: "row",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  parameters: {
    backgroundColor: "white",
    padding: 7,
    borderRadius: 10,
  },

  parameter: {
    borderRadius: 15,
    borderColor: "#3333ff",
    borderWidth: 2,
    padding: 7,
    marginBottom: 40,
    marginTop: 10,
    borderStyle: "dashed",
  },
  inputBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  label: {
    width: "15%",
    alignSelf: "center",
  },
  inputElement: {
    width: "55%",
    height: 45,
    backgroundColor: "white",
  },
  funcButton: {
    padding: 0,
    backgroundColor: "#3333ff",
    padding: 6,
    borderRadius: 5,
  },
  searchButton: {
    padding: 0,
    backgroundColor: "#3333ff",
    padding: 8,
    borderRadius: 5,
  },
  operatorDropdown: {
    marginLeft: "12%",
  },
  dropdown1BtnStyle: {
    width: "50%",
    height: 50,
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
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  publishfooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    width: "50%",
    padding: 20,
  },
  publishButton: {
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  blueBorder: {
    borderColor: "#3333ff",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    fontSize: 20,
    fontWeight: "bold",
  },
  red: {
    color: "red",
    fontWeight: "bold",
    fontSize: 20,
  },
});
