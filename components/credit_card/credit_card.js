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
  Alert,
  Image
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Container, Header, Content, Button, Text, Tabs, ScrollableTab, Tab, Spinner } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';


class CreditCard extends Component {
    constructor(props) {
        super(props)
    
        this.state={
            weight:0,
            total:0,
            name:"",
            address:"",
            phone:"",
            receiver_name:"",
            receiver_address:"",
            receiver_phone:"",
            postage:"",
            user_id:0,
            loading:false,
            card_name:"",
            card_number:"",
            expiry_date:"",
            security_code:""
        }
        // this.calculate = this.calculate.bind(this)
        this.getData = this.getData.bind(this)
        this.submitCard = this.submitCard.bind(this)
        this.handleCardNameForm = this.handleCardNameForm.bind(this)
        this.handleCardNumberForm = this.handleCardNumberForm.bind(this)
        this.handleExpiryDateForm = this.handleExpiryDateForm.bind(this)
        this.handleSecurityCodeForm = this.handleSecurityCodeForm.bind(this)
    }
    
    getData(){
        this.setState({
            weight:this.props.route.params.weight,
            total:this.props.route.params.total,
            name:this.props.route.params.name,
            address:this.props.route.params.address,
            phone:this.props.route.params.phone,
            postage:this.props.route.params.postage,
            user_id:this.props.route.params.user_id,
            receiver_name:this.props.route.params.receiver_name,
            receiver_address:this.props.route.params.receiver_address,
            receiver_phone:this.props.route.params.receiver_phone,
        })
    }

    componentDidMount(){
        this.getData();
    }

    handleCardNameForm(text){
        this.setState({
          card_name:text
        })
    }

    handleCardNumberForm(text){
        this.setState({
          card_number:text
        })
    }

    handleExpiryDateForm(text){
        this.setState({
          expiry_date:text
        })
    }

    handleSecurityCodeForm(text){
        this.setState({
          security_code:text
        })
    }

    async submitCard(){
        let submitForm = new FormData();
        submitForm.append("user_id",this.state.user_id);
        submitForm.append("weight",this.state.weight);
        submitForm.append("total",this.state.total);
        submitForm.append("name",this.state.name);
        submitForm.append("address",this.state.address);
        submitForm.append("phone",this.state.phone);
        submitForm.append("receiver_name",this.state.receiver_name);
        submitForm.append("receiver_address",this.state.receiver_address);
        submitForm.append("receiver_phone",this.state.receiver_phone);
        submitForm.append("postage",this.state.postage);
        submitForm.append("payment","credit card");
        submitForm.append("card_name",this.state.card_name);
        submitForm.append("card_number",this.state.card_number);
        submitForm.append("expiry_date",this.state.expiry_date);
        submitForm.append("security_code",this.state.security_code);
        
        this.setState({
          loading:true
        })
        const options = {
          method: "POST",
          headers: {"content-type": "multipart/form-data"},
          data: submitForm,
          url: "https://footubi.com/dev/speedcourier/order/addCardOrder.php",
        };
        try {
          const response = await axios(options);
          console.log(response)
          if (response.data.status === 201) {
            this.setState({
                loading:false
            })
            alert("Order is placed");
            this.props.navigation.navigate("Home")
          } else if (response.data.status === 400) {
            alert('Error occurred')
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
            loading2: false,
          });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image style={{width:300,height:180,alignItems:'center'}} source={require('../../assets/img/credit_card.png')}></Image>
                    <View style={{marginTop:30}}>
                        <Text>Card Number</Text>
                        <TextInput style={{height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            padding:10,
                            marginTop:5}}
                            onChangeText={(e)=>this.handleCardNumberForm(e)}
                            ></TextInput>
                        <Text style={{marginTop:10}}>Name on Card</Text>
                        <TextInput style={{height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            padding:10,
                            marginTop:5}}
                            onChangeText={(e)=>this.handleCardNameForm(e)}
                            ></TextInput>
                        <Text style={{marginTop:10}}>Expiry Date</Text>
                        <TextInput style={{height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            padding:10,
                            marginTop:5}}
                            onChangeText={(e)=>this.handleExpiryDateForm(e)}
                            ></TextInput>
                        <Text style={{marginTop:10}}>Security Code</Text>
                        <TextInput style={{height: 40,
                            borderColor: 'gray',
                            borderWidth: 1,
                            padding:10,
                            marginTop:5}}
                            onChangeText={(e)=>this.handleSecurityCodeForm(e)}
                            ></TextInput>
                    </View>
                    <View style={{alignSelf:'center',marginTop:15}}>
                        {this.state.loading?
                            <Button primary><Spinner animation="border" variant="primary"  /></Button>
                        :
                            <Button primary onPress={()=>this.submitCard()}><Text>Submit</Text></Button>
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignContent:'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding:20
    },
    box:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        borderWidth:1,
        borderColor:'#adadad',
        width:250,
        height:120,
        margin:10,
        alignItems:'center',
        justifyContent:'center'
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

export default CreditCard;
