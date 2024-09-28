import axios from "axios";
import { StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";

function WelcomeScreen() {
  const [fetchedData, setFetchedData] = useState("");
  const {token} = useContext(AuthContext);
  useEffect(() => {
    axios
      .get(
        "https://react-native-project-965b0-default-rtdb.firebaseio.com/message.json?auth="+token
      )
      .then((response) => {
        setFetchedData(response.data);
      });
  }, []);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedData}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});


// In Firebase if we set rules like below, then only authenticated users are suppose to read and write the data on Welcome Screen

// {
//     "rules": {
//       ".read": "auth.uid != null",
//       ".write": "auth.uid != null",
//     }
//   }


// Here api key will check if user is authenticated or not if authenticated then gets the response

// const [fetchedData, setFetchedData] = useState("");
//   const {token} = useContext(AuthContext);
//   useEffect(() => {
//     axios
//       .get(
//         "https://react-native-project-965b0-default-rtdb.firebaseio.com/message.json?auth="+token
//       )
//       .then((response) => {
//         setFetchedData(response.data);
//       });
//   }, []);



// In Firebase if we set rules like below, then only all users are suppose to read and write the data on Welcome Screen as this 
// rules are public

// {
//     "rules": {
//       ".read": true,
//       ".write": false,
//     }
//   }


// If we are using public rules

// const [fetchedData, setFetchedData] = useState("");
// useEffect(() => {
//   axios
//     .get(
//       "https://react-native-project-965b0-default-rtdb.firebaseio.com/message.json"
//     )
//     .then((response) => {
//       setFetchedData(response.data);
//     });
// }, []);
