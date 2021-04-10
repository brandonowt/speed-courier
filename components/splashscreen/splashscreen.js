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
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Container, Header, Content, Button, Text, Spinner } from 'native-base';
import axios from 'axios';

class Splashscreen extends Component {
    constructor(props) {
        super(props)
    
        this.state={
            email:"",
            password:"",
            loading:false,
            mainLoading:false
        }
    }

    async componentDidMount(){
        setTimeout(() => {}, 1000);
      const temp = await AsyncStorage.getItem('log_in')
      const role = await AsyncStorage.getItem('role')
      console.log(role)
      if(temp==='true' ){
        if(role==="user"){
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        }
        else if(role==="company"){
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Admin Home' }],
            })
        }
        else if(role==="driver"){
          this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'Driver Home' }],
          })
        }
      }
      else{
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        })
      }
    }

    handleLoginEmailForm(text){
      this.setState({
          email: text
      })

    }
    handleLoginPasswordForm(text){
        this.setState({
            password: text
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <Text style={styles.logo}>Speed Courier</Text> */}
                <Image
                    style={{width:100,height:50}}
                    source={require('./../../assets/img/logo.png')}
                />
                <Text style={{ fontSize:30,fontWeight:'bold',color:'white' }} >Speed Courier</Text>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
      },
      logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40
      },
      inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
      },
      inputText:{
        height:50,
        color:"white"
      },
      forgot:{
        color:"white",
        fontSize:11
      },
      loginBtn:{
        width:"80%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
      },
      loginText:{
        color:"white"
      }
});

export default Splashscreen;
