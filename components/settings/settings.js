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
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Header, Content, Text, ListItem, Left, Button, Form, Item, Row, Input, Picker, Label, Icon, Body, Right, Switch, Grid, Col } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class Settings extends Component {
    constructor(props) {
        super(props)
    
        console.log(AsyncStorage)

        this.state={
            user_id:"",
            email:"",
            first_name:"",
            last_name:"",
            address:"",
            phone:"",
            postage:"",
            role:"",
            editView:false,
            loading:false,
            value:"Test vlaue"
        }
        this.logout = this.logout.bind(this)
        this.edit = this.edit.bind(this)
        this.handleFirstNameForm = this.handleFirstNameForm.bind(this)
        this.handleLastNameForm = this.handleLastNameForm.bind(this)
        this.handleAddressForm = this.handleAddressForm.bind(this)
        this.handlePhoneForm = this.handlePhoneForm.bind(this)
        this.handlePostageForm = this.handlePostageForm.bind(this)
        this.saveEdit = this.saveEdit.bind(this)
    }

    async componentDidMount(){
        var user_id = await AsyncStorage.getItem('user_id')
        var email = await AsyncStorage.getItem('email')
        var first_name = await AsyncStorage.getItem('first_name')
        var last_name = await AsyncStorage.getItem('last_name')
        var address = await AsyncStorage.getItem('address')
        var phone = await AsyncStorage.getItem('phone')
        var postage = await AsyncStorage.getItem('postage')
        var role = await AsyncStorage.getItem('role')

        this.setState({
            user_id,
            email,
            first_name,
            last_name,
            address,
            phone,
            postage,
            role
        })
    }
    
    async saveEdit(){
      let editForm = new FormData();
      editForm.append("first_name",this.state.first_name);
      editForm.append("last_name",this.state.last_name)
      editForm.append("address",this.state.address)
      editForm.append("phone",this.state.phone)
      editForm.append("postage",this.state.postage)
      editForm.append("user_id",this.state.user_id)

      this.setState({
        loading:true
      })
      const options = {
        method: "POST",
        headers: {"content-type": "multipart/form-data"},
        data: editForm,
        url: "https://footubi.com/dev/speedcourier/accounts/editProfile.php",
      };
      try {
        const response = await axios(options);
        console.log(response)
        if (response.data.status === 201) {
          await AsyncStorage.setItem('first_name', this.state.first_name)
          await AsyncStorage.setItem('last_name', this.state.last_name)
          await AsyncStorage.setItem('address', this.state.address)
          await AsyncStorage.setItem('phone', this.state.phone)
          await AsyncStorage.setItem('postage', this.state.postage)
          await AsyncStorage.setItem('role', this.state.role)
          this.setState({
              loading:false,
              editView:false
          })
        } else if (response.data.status === 400) {
          alert('Error')
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

    edit(){
      this.setState({
        editView:true
      })
    }

    handleFirstNameForm(text){
      this.setState({
        first_name:text
      })
    }
    handleLastNameForm(text){
      this.setState({
        last_name:text
      })
    }
    handleAddressForm(text){
      this.setState({
        address:text
      })
    }
    handlePhoneForm(text){
      this.setState({
        phone:text
      })
    }
    handlePostageForm(text){
      this.setState({
        postage:text
      })
    }

    async logout(){
        await AsyncStorage.removeItem('user_id')
        await AsyncStorage.removeItem('email')
        await AsyncStorage.removeItem('first_name')
        await AsyncStorage.removeItem('last_name')
        await AsyncStorage.removeItem('phone')
        await AsyncStorage.removeItem('address')
        await AsyncStorage.removeItem('postage')
        await AsyncStorage.setItem('log_in','false')
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      }

    render() {
    return (
        <View style={styles.container}>
            
            
            {this.state.editView === false?
              <View style={{flex:1}}>
                <View style={styles.header}></View>
            <Image style={styles.avatar} source={{uri: 'https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg'}}/>
                  <View style={styles.body}>
                
                  <View style={styles.bodyContent}>
                      <Text style={styles.name}>{this.state.first_name} {this.state.last_name}</Text>
                      </View>
                  <View
                      style={{
                          borderBottomColor: 'gray',
                          borderBottomWidth: 1,
                          marginTop:20
                      }}
                  />
                  {this.state.role==="user"?
                  <View>
                  <View style={{marginTop:10,paddingLeft:15,paddingTop:5}}>
                      <Text style={{fontSize:20,fontWeight:'bold'}}>Address:</Text>
                      <Text>{this.state.address}</Text>
                  </View>
                  <View style={{marginTop:10,paddingLeft:15,paddingTop:5}}>
                      <Text style={{fontSize:20,fontWeight:'bold'}}>Phone:</Text>
                      <Text>{this.state.phone}</Text>
                  </View> 
                  <View style={{marginTop:10,paddingLeft:15,paddingTop:5}}>
                      <Text style={{fontSize:20,fontWeight:'bold'}}>Preferred Postage:</Text>
                      <Text>{this.state.postage}</Text>
                  </View>
                  </View>
                  :
                  <View>
                  </View>
                  }
                  
              </View>
              {this.state.role==="user"?
              <View style={styles.bottom}>
                  <Button transparent style={styles.editButton} onPress={()=>this.edit()}><Text style={{color:'black'}}>Edit</Text></Button>
                  <Button danger style={styles.button} onPress={()=>this.logout()}><Text style={{color:'white'}}> Logout </Text></Button>
              </View>
              :
              <View style={styles.bottom}>
                  <Button danger style={styles.button} onPress={()=>this.logout()}><Text style={{color:'white'}}> Logout </Text></Button>
              </View>
              }
              
              </View>
            :
                <View style={{flex:1}}>  
                  <ScrollView>
                  <View style={styles.body}>
                  <View>
                    <Text style={{textAlign:'center',fontWeight:'bold',fontSize:30, marginBottom:20}}>Edit Profile</Text>
                  <Form style={{padding:20}}>
                    <Text>First Name</Text>
                    <TextInput
                      style={styles.text_input}
                      onChangeText={(e)=>this.handleFirstNameForm(e)} 
                      value={this.state.first_name}
                    />
                    <Text>Last Name</Text>
                    <TextInput
                      style={styles.text_input}
                      onChangeText={(e)=>this.handleLastNameForm(e)} 
                      value={this.state.last_name}
                    />
                    <Text>Address</Text>
                    <TextInput
                      style={styles.text_input}
                      onChangeText={(e)=>this.handleAddressForm(e)} 
                      placeholder='USJ 12' 
                      value={this.state.address}
                    />
                    <Text>Phone</Text>
                    <TextInput
                      style={styles.text_input}
                      onChangeText={(e)=>this.handlePhoneForm(e)} 
                      placeholder='0123456789' 
                      value={this.state.phone}
                    />
                    <Text>Preferred Postage</Text>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{marginLeft:10}}
                      placeholder="Select one"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      placeholderIconColor="#000000"
                      selectedValue={this.state.postage}
                      onValueChange={(e)=>this.handlePostageForm(e)}
                    >
                      <Picker.Item label="DHL Express" value="DHL Express" />
                      <Picker.Item label="GDex" value="GDex" />
                      <Picker.Item label="J&T Express" value="J&T Express" />
                      <Picker.Item label="Ninja Van" value="Ninja Van" />
                      <Picker.Item label="Pos Laju" value="Pos Laju" />
                    </Picker>
                    {/* <Grid>
                      <Row>
                      <Col>
                      <Text style={{fontSize:20,fontWeight:'bold'}}>First Name:</Text>
                      <Item floatingLabel>
                      <Label>Username</Label>
                        <Input onChangeText={(e)=>this.handleFirstNameForm(e)} value={this.state.first_name}/>
                      </Item>
                      </Col>
                      <Col>
                      <Text style={{fontSize:20,fontWeight:'bold'}}>Last Name:</Text>
                      <Item style={{width:150}}>
                        <Input onChangeText={(e)=>this.handleLastNameForm(e)} value={this.state.last_name}/>
                      </Item>
                      </Col>
                      </Row>
                      <Row style={{marginTop:20}}>
                        <Col>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>Address:</Text>
                        <Item style={{width:350}}>
                          <Input onChangeText={(e)=>this.handleAddressForm(e)} placeholder='USJ 12' value={this.state.address}/>
                        </Item>
                        </Col>
                      </Row>
                      <Row style={{marginTop:20}}>
                        <Col>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>Phone Number:</Text>
                        <Item style={{width:350}}>
                          <Input onChangeText={(e)=>this.handlePhoneForm(e)} placeholder='0123456789' value={this.state.phone}/>
                        </Item>
                        </Col>
                      </Row>
                      <Row style={{marginTop:20}}>
                        <Col>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>Preferred Postage:</Text>
                        <Item picker>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{marginLeft:10}}
                            placeholder="Select one"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#000000"
                            selectedValue={this.state.postage}
                            onValueChange={(e)=>this.handlePostageForm(e)}
                          >
                            <Picker.Item label="DHL Express" value="DHL Express" />
                            <Picker.Item label="GDex" value="GDex" />
                            <Picker.Item label="J&T Express" value="J&T Express" />
                            <Picker.Item label="Ninja Van" value="Ninja Van" />
                            <Picker.Item label="Pos Laju" value="Pos Laju" />
                          </Picker>
                        </Item>
                        </Col>
                      </Row>
                    </Grid> */}
                    </Form>
                  </View>
                  
              </View>
              </ScrollView>
              <View style={styles.bottom}>
                  <Button primary style={styles.button} onPress={()=>this.saveEdit()}><Text style={{color:'white'}}> Save </Text></Button>
              </View>
              
              </View>
            }
            
        </View>
    );
  }
};

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    editButton: {
      borderRadius:20,
      width:350,
      bottom:0,
      justifyContent:'center'
    },
    button: {
        borderRadius:20,
        width:350,
        bottom:0,
        justifyContent:'center',
        color:'#ffffff'
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 15,
        alignSelf:'center'
    },
    header:{
      backgroundColor: "#d3d3d3",
      height:100,
    },
    text_input:{
      padding:3,
      height: 40, 
      borderColor: '#adadad', 
      borderWidth: 1,
      borderWidth:0,
      borderBottomWidth:1,
      marginBottom:20
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:30
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#00BFFF",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#696969",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
  });

export default Settings;
