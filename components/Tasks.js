import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { AppRegistry, View, Text, StyleSheet, Platform, Keyboard, KeyboardAvoidingView, TouchableOpacity, TextInput, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class Time extends Component {

  constructor(props) {
    super();

    this.state = { 
      currentDate: null,

      currentTime: null, 
      currentDay: null,
    }
    
    this.daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    this.props = props

  }

  UNSAFE_componentWillMount() {
    this.getCurrentTime();
  }

  getCurrentTime = () => {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let today = new Date();
    let date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+today.getFullYear();

    
    if (hour < 10) {
      hour = '0' + hour;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }
  
    this.setState({ currentTime: hour + ':' + minutes + ':' + seconds });
    this.setState({currentDate: date})

    if (hour == '0' + 0 && minutes == '0' + 0 && seconds == '0' + 0) {
      console.log("tick tock")
      return this.props.newResetTodos()
    }

    this.daysArray.map((item, key) => {
      if (key == new Date().getDay()) {
        this.setState({ currentDay: item.toUpperCase() });
      }
    })

  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  }


  render() {

    return (
      <View style={styles.container}>
        {/* The Date and Time */}
        <View style={styles.header}>
          <Text style={styles.daysText}>{this.state.currentDay}                              {this.state.currentDate}</Text>
          <Text style={styles.timeText}>{this.state.currentTime}</Text>
        </View>

      </View>
    );
  }
}




const styles = StyleSheet.create(
  {
    container: {
      marginTop: 50,
    },
    header: {
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    timeText: {
      fontSize: 25,
      color: '#fff',
      fontWeight: 'bold',
    },
    daysText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      
    },
    
  });