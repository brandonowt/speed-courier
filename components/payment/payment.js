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
  Alert
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


class Payment extends Component {
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
            loading1:false,
            loading2:false
        }
        // this.calculate = this.calculate.bind(this)
        this.getData = this.getData.bind(this)
        this.alert1 = this.alert1.bind(this)
        this.alert2 = this.alert2.bind(this)
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

    alert1(){
        Alert.alert(
            'Confirmation',
            'You are about to choose "Cash on pick-up"',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              { text: 'Confirm', onPress: () => this.confirm1() }
            ],
            { cancelable: false }
        );
    }

    async confirm1(){

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
        submitForm.append("payment","cash on pickup");
        
        this.setState({
          loading1:true
        })
        const options = {
          method: "POST",
          headers: {"content-type": "multipart/form-data"},
          data: submitForm,
          url: "https://footubi.com/dev/speedcourier/order/addOrder.php",
        };
        try {
          const response = await axios(options);
          console.log(response)
          if (response.data.status === 201) {
            this.setState({
                loading2:false
            })
            alert("Order is placed");
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          } else if (response.data.status === 400) {
            alert('Error occurred')
            this.setState({
              loading1:false
            })
          } else {
            alert('Network Error! Please try again')
            this.setState({
              loading1:false
            })
          }
        } catch (e) {
          alert(e);
          this.setState({
            loading1: false,
          });
        }
    }

    alert2(){
        Alert.alert(
            'Confirmation',
            'You are about to choose "Cash on delivery"',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              },
              { text: 'Confirm', onPress: () => this.confirm2() }
            ],
            { cancelable: false }
        );
    }

    async confirm2(){

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
        submitForm.append("payment","cash on delivery");
        
        this.setState({
          loading2:true
        })
        const options = {
          method: "POST",
          headers: {"content-type": "multipart/form-data"},
          data: submitForm,
          url: "https://footubi.com/dev/speedcourier/order/addOrder.php",
        };
        try {
          const response = await axios(options);
          console.log(response)
          if (response.data.status === 201) {
            this.setState({
                loading2:false
            })
            alert("Order is placed");
            this.props.navigation.navigate("Home")
          } else if (response.data.status === 400) {
            alert('Error occurred')
            this.setState({
              loading2:false
            })
          } else {
            alert('Network Error! Please try again')
            this.setState({
              loading2:false
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
                <TouchableOpacity onPress={() =>       this.props.navigation.navigate("Credit Card",{weight:this.state.weight,total:this.state.total,name:this.state.name,address:this.state.address,phone:this.state.phone,postage:this.state.postage,user_id:this.state.user_id,receiver_name:this.state.receiver_name,receiver_address:this.state.receiver_address,receiver_phone:this.state.receiver_phone})}>
                <View style={styles.box}>
                    <Text>Credit Card</Text>
                </View>
                </TouchableOpacity>
                {this.state.loading1?
                <View style={styles.box}>
                    <Spinner animation="border" variant="primary"  />
                </View>
                :
                <TouchableOpacity onPress={()=>this.alert1()}>
                <View style={styles.box}>
                    
                    <Text>Cash on pick-up</Text>
                    <Text style={{fontSize:14,color:'#adadad'}}>Person sending the item pays</Text>
                </View>
                </TouchableOpacity>
                }
                
                {this.state.loading2?
                <View style={styles.box}>
                    <Spinner animation="border" variant="primary"  />
                </View>
                :
                <TouchableOpacity onPress={()=>this.alert2()}>
                <View style={styles.box}>
                    <Text>Cash on delivery</Text>
                    <Text style={{fontSize:14,color:'#adadad'}}>Person receiving the item pays</Text>
                </View>
                </TouchableOpacity>
                }
                
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

export default Payment;
