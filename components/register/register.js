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
  Image
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Container, Header, Content, Button, Text, Spinner } from 'native-base';
import axios from 'axios';


class Register extends Component {
    constructor(props) {
        super(props)
        this.state={
            email:"",
            password:"",
            first_name:"",
            last_name:"",
            loading:false
        }
        this.register = this.register.bind(this)
    }

    async register(){

        let registerForm = new FormData();
        registerForm.append("email",this.state.email);
        registerForm.append("password",this.state.password)
        registerForm.append("first_name",this.state.first_name)
        registerForm.append("last_name",this.state.last_name)
  
        this.setState({
          loading:true
        })
        const options = {
          method: "POST",
          headers: {"content-type": "multipart/form-data"},
          data: registerForm,
          url: "https://footubi.com/dev/speedcourier/accounts/register.php",
        };
        try {
          const response = await axios(options);
          console.log(response)
          if (response.data.status === 201) {
            this.setState({
                loading:false
            })
            
            console.log(response);
            alert("Account created");
            this.props.navigation.navigate("Login")
          } else if (response.data.status === 400) {
            alert('Wrong credentials')
            this.setState({
              loading:false
            })
          } else {
            alert('Network Error! Please try again')
            this.setState({
              loading:false
            })
          }
        } catch (e) {
          alert(e);
          this.setState({
            loading: false,
          });
        }
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
                <View style={{height:30}} />
                <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Email" 
                    placeholderTextColor="#ffffff"
                    onChangeText={text => this.setState({email:text})}/>
                </View>
                <View style={styles.inputView} >
                <TextInput  
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password" 
                    placeholderTextColor="#ffffff"
                    onChangeText={text => this.setState({password:text})}/>
                </View>
                <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="First Name" 
                    placeholderTextColor="#ffffff"
                    onChangeText={text => this.setState({first_name:text})}/>
                </View>
                <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Last Name" 
                    placeholderTextColor="#ffffff"
                    onChangeText={text => this.setState({last_name:text})}/>
                </View>
                {this.state.loading?
                    <TouchableOpacity style={styles.loginBtn} onPress={()=>this.register()}>
                    <Spinner animation="border" variant="primary" />
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={styles.loginBtn} onPress={()=>this.register()}>
                    <Text style={styles.loginText}>REGISTER</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("Login")}>
                    <Text style={styles.loginText}>Got an account? Click here to login</Text>
                </TouchableOpacity>
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

export default Register;
