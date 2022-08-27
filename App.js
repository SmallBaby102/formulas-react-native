import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Button, Alert } from "react-native";
import Head from "./components/Index";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Header from "./components/Header";
import HomeScreen from "./screen";
import { ethers } from "ethers";
import { useWalletConnect, withWalletConnect } from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import WalletConnectProvider, { useWalletConnect } from "react-native-walletconnect";
const contractABI = require('./abi.json')
const shortenAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
}
export function App() {
  // const {
  //   createSession,
  //   killSession,
  //   session,
  //   signTransaction,
  // } = useWalletConnect();
  // const hasWallet = !!session.length;
  const connector = useWalletConnect();

  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    console.log("connector", connector)
    return connector.killSession();
  }, [connector]);

  useEffect(() => {
    // async function fetchData() {
    //   let provider =  new ethers.providers.Web3Provider(window.ethereum);
    //   const contractAddress="0x9fedc35554a648085c7cf90f073c9514a40c5e55907ab9a75f604dc4ca61dc7f";
    //   window.contract = new ethers.Contract(contractABI, contractAddress);
    // }
    // fetchData();
  }, []);

    return (
      // <WalletConnectProvider>
        <Provider store={store}>
          <ScrollView>

            {/* <Header /> */}
            {!connector.connected && (
              <TouchableOpacity onPress={connectWallet} style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>Connect a Wallet</Text>
              </TouchableOpacity>
            )}
            {connector.connected && (
              <>
                <Text>{shortenAddress(connector.accounts[0])}</Text>
                <TouchableOpacity onPress={killSession} style={styles.buttonStyle}>
                  <Text style={styles.buttonTextStyle}>Log out</Text>
                </TouchableOpacity>
              </>
            )}
            {/* {!hasWallet && (
              <Button title="Connect" onPress={createSession} />
            )}
            {!!hasWallet && (
              <Button
                title="Sign Transaction"
                onPress={() => signTransaction({
                  from: "0xbc28Ea04101F03aA7a94C1379bc3AB32E65e62d3",
                  to: "0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359",
                  data: "0x",
                  gasPrice: "0x02540be400",
                  gas: "0x9c40",
                  value: "0x00", 
                  nonce: "0x0114",
                })}
              />
            )}
            {!!hasWallet && (
              <Button
                title="Disconnect"
                onPress={killSession}
              />
            )} */}
            <View style={styles.container}>
              {/* <StatusBar style="auto" /> */}
              <HomeScreen />
            </View>
          </ScrollView>
        </Provider>
      //  </WalletConnectProvider>
    );
  }
  export default withWalletConnect(App, {
    clientMeta: {
      description: 'Connect with WalletConnect',
    },
    redirectUrl: Platform.OS === 'web' ? window.location.origin : 'yourappscheme://',
    storageOptions: {
      asyncStorage: AsyncStorage,
    },
  });
const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: "#f2f2f2",
  },
  buttonStyle: {
    backgroundColor: "#3399FF",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#3399FF",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});
