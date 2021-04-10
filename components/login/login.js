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

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state={
            email:"",
            password:"",
            loading:false,
            mainLoading:false
        }
        this.login = this.login.bind(this)
        this.handleLoginEmailForm = this.handleLoginEmailForm.bind(this)
        this.handleLoginPasswordForm = this.handleLoginPasswordForm.bind(this)
    }

    // async componentDidMount(){
      
    //   const temp = await AsyncStorage.getItem('log_in')
    //   console.log(temp)
    //   if(temp==='true'){
    //       this.props.navigation.navigate('Home')
    //   }
    // }

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

    async login(){

      let loginForm = new FormData();
      loginForm.append("email",this.state.email);
      loginForm.append("password",this.state.password)

      this.setState({
        loading:true
      })
      const options = {
        method: "POST",
        headers: {"content-type": "multipart/form-data"},
        data: loginForm,
        url: "https://footubi.com/dev/speedcourier/accounts/login.php",
      };
      try {
        const response = await axios(options);
        console.log(response)
        if (response.data.status === 201 && response.data.user.role === "user") {
          this.setState({
              loading:false
          })
          await AsyncStorage.setItem('user_id', response.data.user.id)
          await AsyncStorage.setItem('email', response.data.user.email)
          await AsyncStorage.setItem('first_name', response.data.user.first_name)
          await AsyncStorage.setItem('last_name', response.data.user.last_name)
          await AsyncStorage.setItem('address', response.data.user.address)
          await AsyncStorage.setItem('phone', response.data.user.phone)
          await AsyncStorage.setItem('postage', response.data.user.postage)
          await AsyncStorage.setItem('role', response.data.user.role)
          await AsyncStorage.setItem('log_in', 'true')

          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        }
        else if(response.data.status === 201 && response.data.user.role === "company"){
          this.setState({
            loading:false
          })
          await AsyncStorage.setItem('user_id', response.data.user.id)
          await AsyncStorage.setItem('email', response.data.user.email)
          await AsyncStorage.setItem('first_name', response.data.user.first_name)
          await AsyncStorage.setItem('last_name', response.data.user.last_name)
          await AsyncStorage.setItem('postage', response.data.user.postage)
          await AsyncStorage.setItem('company', response.data.user.company)
          await AsyncStorage.setItem('role', response.data.user.role)
          await AsyncStorage.setItem('log_in', 'true')

          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Admin Home' }],
          })
        } 
        else if(response.data.status === 201 && response.data.user.role === "driver"){
          this.setState({
            loading:false
          })
          await AsyncStorage.setItem('user_id', response.data.user.id)
          await AsyncStorage.setItem('email', response.data.user.email)
          await AsyncStorage.setItem('first_name', response.data.user.first_name)
          await AsyncStorage.setItem('last_name', response.data.user.last_name)
          await AsyncStorage.setItem('postage', response.data.user.postage)
          await AsyncStorage.setItem('company', response.data.user.company)
          await AsyncStorage.setItem('role', response.data.user.role)
          await AsyncStorage.setItem('log_in', 'true')

          this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Driver Home' }],
          })
        } 
        else if (response.data.status === 400) {
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
                    style={{width:100,height:100}}
                    source={require('./../../assets/img/truck-solid.png')}
                />
                <Text style={{ fontSize:30,fontWeight:'bold',color:'white' }} >Speed Courier</Text>
                <View style={{height:30}} />
                <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Email" 
                    placeholderTextColor="#ffffff"
                    value={this.state.email}
                    onChangeText={(e)=>this.handleLoginEmailForm(e)}/>
                </View>
                <View style={styles.inputView} >
                <TextInput  
                    secureTextEntry
                    style={styles.inputText}
                    placeholder="Password" 
                    placeholderTextColor="#ffffff"
                    value={this.state.password}
                    onChangeText={(e)=>this.handleLoginPasswordForm(e)}/>
                </View>
                {/* <TouchableOpacity>
                <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity> */}
                {this.state.loading?
                    <TouchableOpacity style={styles.loginBtn} onPress={()=>this.login()} >
                    <Spinner animation="border" variant="primary"  />
                    </TouchableOpacity>
                :
                    <TouchableOpacity style={styles.loginBtn} onPress={()=>this.login()}>
                    <Text style={styles.loginText}>LOGIN</Text>
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register')}>
                <Text style={styles.loginText}>Signup</Text>
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

export default Login;
