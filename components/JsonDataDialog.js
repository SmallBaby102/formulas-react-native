import React, { useEffect, useMemo, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Paragraph, Dialog } from "react-native-paper";
import TreeView from "react-native-final-tree-view";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Index(props) {
  const [visible, setVisible] = useState(false);
  const [nodes, setNode] = useState("");
  const [level, setLevel] = useState("");
  const showDialog = () => setVisible(true);
  const hideDialog = () => {
    setNode("");
    setVisible(false);
    props.onChangeTVisible(false);
  };
  const family = [
    {
      id: "Exports",
      name: "Exports",
      age: 78,
      path: "@Exports",
      children: [
        {
          id: "Electronics",
          name: "Electronics",
          age: 30,
          path: "@Exports.Electronics",
          children: [
            {
              id: "Computer",
              name: "Computer",
              age: 10,
              path: "@Exports.Electronics.Computer",
            },
            {
              id: "Phone",
              name: "Phone",
              age: 12,
              path: "@Exports.Electronics.Phone",
            },
          ],
        },
      ],
    },
  ];
  const getIndicator = (isExpanded, hasChildrenNodes) => {
    if (!hasChildrenNodes) {
      return "-";
    } else if (isExpanded) {
      return "+";
    } else {
      return "+";
    }
  };

  const saveNodes = () => {
    props.saveNodes(nodes);
    hideDialog();
  };

  useEffect(() => {
    if (props.tvisible) {
      showDialog();
    } else {
      hideDialog();
    }
  }, [props.tvisible]);

  const treeView = useMemo(() => {
    return (
      <TreeView
        data={family} // defined above
        onNodePress={({ node, level }) => {
          setNode(node.path);
        }}
        renderNode={({ node, level, isExpanded, hasChildrenNodes }) => {
          return (
            <View>
              <Text
                style={{
                  marginLeft: 10 * level,
                  fontSize: 16,
                }}
              >
                {getIndicator(isExpanded, hasChildrenNodes)} {node.name}
              </Text>
            </View>
          );
        }}
      />
    );
  }, []);

  return (
    <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialog}>
      <Dialog.Content>
        <View style={styles.searchBarElement}>
          <View style={styles.searchIcon}>
            <Icon name="search" size={18} color="white" />
          </View>
          <View style={styles.searchElement}>
            <Text>{nodes}</Text>
          </View>
        </View>
        {treeView}
      </Dialog.Content>
      <Dialog.Actions style={styles.footer}>
        <Button onPress={saveNodes}>Ok</Button>
        <Button onPress={hideDialog}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  );
}
const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
    borderRadius: 5,
    height: "80%",
  },
  searchBarElement: {
    width: "100%",
    height: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchIcon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "15%",
    backgroundColor: "#6600ff",
    padding: 10,
    height: 40,
  },
  searchElement: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "85%",
    borderColor: "#6600ff",
    borderWidth: 1,
    padding: 8,
    backgroundColor: "white",
    height: 40,
  },
  footer: {
    display: "flex",
    justifyContent: "space-around",
  },
});
