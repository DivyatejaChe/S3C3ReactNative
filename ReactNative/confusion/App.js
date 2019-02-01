import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

/* React Native App doesn't use indet.html as it's not a WEB APP but a native device app */

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello Teja! Open up App.js to start working on your app.</Text>
        <Text>Good luck Coding!</Text>
      </View>
    );
  }
}

/* <View> & <Text> are React Native-specific components used as a CONTAINER for a set of info and to display string text respectively */

/* React Native uses INLINE JS-BASED STYLES instead of CSS */
/* Constructing a stylesheet */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/* FLEX is a property defining area of screen to occupy by this object */