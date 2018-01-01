/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
const styles = require('../../style');

export default class Toolbar extends Component<{}> {
  render() {
    return (
      <View>
        <StatusBar
          backgroundColor="coral"
          barStyle="dark-content"
        />
       <View style={styles.navbar} >
          <Text style={styles.navbarTitle}>
            {this.props.title}
          </Text>
       </View>
      </View>
    );
  }
}
