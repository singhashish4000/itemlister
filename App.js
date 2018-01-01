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
  ListView,
  TouchableHighlight,
  Modal,
  TextInput,
} from 'react-native';

import Toolbar from './app/components/Toolbar/Toolbar';
import Addbutton from './app/components/Addbutton/Addbutton';
const styles = require('./app/style');

import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAoly-b7IGyiGGDUBQ8uuibDdBpqvZSASQ",
  authDomain: "itemlist-3d81a.firebaseapp.com",
  databaseURL: "https://itemlist-3d81a.firebaseio.com",
  storageBucket: "itemlist-3d81a.appspot.com"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class App extends Component<{}> {

  constructor(){
    super();
    let ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      text: '',
      itemDataSource: ds,
      modalVisible: false
    }
    this.itemsRef = this.getRef().child('items');
    this.renderRow = this.renderRow.bind(this);
    this.pressRow = this.pressRow.bind(this);
  }

  setModalVisible(visible){
    this.setState({modalVisible:visible});
  }

  componentWillMount(){
    this.getItems(this.itemsRef);
  }

  componentDidMount(){
    this.getItems(this.itemsRef);
    console.log(this.getItems(this.itemsRef));
  }

  getRef(){
    return firebaseApp.database().ref();
  }

  getItems(itemsRef){
    //let items = [{title:'Item One'},{title:'Item Two'}];
    itemsRef.on('value',(snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });
      this.setState({
        itemDataSource: this.state.itemDataSource.cloneWithRows(items)
      });
    });
  }

  pressRow(item) {
    this.itemsRef.child(item._key).remove();
  }

  renderRow(item){
    return (
      <TouchableHighlight onPress={() => {
        this.pressRow(item);
      }}>
      <View style={styles.li}>
         <Text style={styles.liText}>
           {item.title}
         </Text>
      </View>
      </TouchableHighlight>
    );
  }

  addItem(){
    console.log('ok');
    this.setModalVisible(true);
  }

  render() {
    return (
      <View style={styles.container}>
       <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={()=> {}}
       >
       <View style={{margin: 22}}>
        <View>
          <Toolbar title="Add ToDo" />
          <TextInput
            value = {this.state.text}
            placeholder = "Add Item"
            onChangeText = {(value)=>this.setState({text:value})}
          />
            <TouchableHighlight onPress={()=> {
              this.itemsRef.push({title: this.state.text});
              this.setModalVisible(!this.state.modalVisible)
              }}>
              <Text>Save Item</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={()=> {
              this.setModalVisible(!this.state.modalVisible)
              }}>
              <Text>Cancel</Text>
            </TouchableHighlight>
          </View>
          </View>
        </Modal>
        <Toolbar title="ItemLister" />
        <ListView
           dataSource= { this.state.itemDataSource }
           renderRow= {this.renderRow}
        />
        <Addbutton onPress={this.addItem.bind(this)} title="Add Item" />
      </View>
    );
  }
}
