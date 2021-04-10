/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  TextInput
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Container, Header, Content, Button, Text } from 'native-base';


class Calculator extends Component {
    constructor(props) {
        super(props)
    
        this.state={
            weight:"",
            password:"",
            loading:false,
            mainLoading:false
        }
        // this.calculate = this.calculate.bind(this)
        this.handleWeightForm = this.handleWeightForm.bind(this)
    }

    handleWeightForm(text){
        this.setState({
            weight: text
        })
    }

    render() {
        return (
            <View style={{padding:15}}>
                <Text></Text>
                <TextInput  
                    keyboardType="number-pad"
                    style={{borderWidth:1,width:200}}
                    placeholder="Weight" 
                    placeholderTextColor="#000000"
                    onChangeText={(e)=>this.handleWeightForm(e)}/>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        padding:20
    },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default Calculator;
