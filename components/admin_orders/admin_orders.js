/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Container, Content, Card, CardItem, Text, Body, List, ListItem, Icon, Grid, Col, Badge, H1, H2, H3, Fab } from "native-base";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  ImageBackgroundComponent,
  Alert,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

class AdminOrders extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      user_id:"",
      company:"",
      orders:[],
      loading:true,
      isRefresh:false
    }
    this.getData = this.getData.bind(this)
    this.confirmOrder = this.confirmOrder.bind(this)
  }

  async componentDidMount(){
    var company = await AsyncStorage.getItem('company')
    var user_id = await AsyncStorage.getItem('user_id')

    this.setState({
        company:company,
        user_id:user_id
    })
    await this.getData(user_id);
  }

  confirmOrder(id){
    Alert.alert(
        'Confirmation',
        'Accept order',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'Confirm', onPress: () => this.confirm1(id) }
        ],
        { cancelable: false }
    );
  }

  async confirm1(id){
    let submitForm = new FormData();
    submitForm.append("order_id",id);
    submitForm.append("user_id",this.state.user_id);

    const options = {
        method: "POST",
        headers: {"content-type": "multipart/form-data"},
        data: submitForm,
        url: "https://footubi.com/dev/speedcourier/admin/acceptOrder.php",
    };
    try {
    const response = await axios(options);
    console.log(response)
    if (response.data.status === 201) {
        alert("Order accepted");
    } else if (response.data.status === 400) {
        alert('Error occurred')
    } else {
        alert('Network Error! Please try again')
    }
    } catch (e) {
        alert(e);
    }
  }

  async getData(user_id){
    let orderForm = new FormData();
    orderForm.append("user_id",user_id);

    this.setState({
      loading:true
    })
    const options = {
      method: "POST",
      headers: {"content-type": "multipart/form-data"},
      data: orderForm,
      url: "https://footubi.com/dev/speedcourier/admin/getAccepted.php",
    };
    try {
      const response = await axios(options);
      console.log(response)
      if (response.data.status === 201) {
        console.log(response);
        this.setState({
          orders:response.data.orders,
          isRefresh:false,
          loading:false
        })
        // alert("Account created");
        // this.props.navigation.navigate("Login")
      } else if (response.data.status === 400) {
        alert('Error occured')
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
    console.log(this.props)
    const renderOrders = this.state.orders.map((order,i)=>{
      return(
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Order",{order_id:order.id})}>
            <List>
                <ListItem>
                    <Body>
                    <Text>Order #{order.id}</Text>
                    <Text note numberOfLines={1}>{order.status}</Text>
                    </Body>
                    
                </ListItem>
            </List>
            </TouchableOpacity>
      )
    })

    return (
      <View>
        <Text style={{alignSelf:'center',fontSize:25,padding:20,fontWeight:'bold'}}>My Orders</Text>
        <Content style={{borderTopColor:'black',borderTopWidth:1,marginTop:-5}}></Content>
        
          <ScrollView style={{padding:10}}>
              {
                this.state.orders.length===0?
                <Text style={{justifyContent:'center',textAlign:'center'}}>No available history</Text>:
                renderOrders
              }
          </ScrollView>
          <View style={{height:20}} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
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

export default AdminOrders;
