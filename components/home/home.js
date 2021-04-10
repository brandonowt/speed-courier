/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { Container, Content, Card, CardItem, Text, Body, Icon, Grid, Col, Badge, H1, H2, H3, Fab } from "native-base";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  ImageBackgroundComponent,
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


class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state={
      user_id:"",
      orders:[],
      loading:true,
      isRefresh:false
    }
    this.getData = this.getData.bind(this)
  }

  async componentDidMount(){
    var user_id = await AsyncStorage.getItem('user_id')

    this.setState({
        user_id:user_id
    })
    await this.getData(user_id);
  }

  // async componentDidUpdate(prevProps,prevState) {
  //   console.log(prevState)
  //   console.log(this.props)
  //   if(prevState.isRefresh === this.props.route.params?.isRefresh) 
  //   { 
  //     await this.getData(this.state.user_id)
  //   } 
    
  // }

  
  async getData(uid){
    let orderForm = new FormData();
    orderForm.append("user_id",uid);

    this.setState({
      loading:true
    })
    const options = {
      method: "POST",
      headers: {"content-type": "multipart/form-data"},
      data: orderForm,
      url: "https://footubi.com/dev/speedcourier/order/getOrder.php",
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

    this.loop();
  }

  loop(){
    setInterval(() => {
      this.getData2()
    }, 2000);
  }
    
  async getData2(){
    let orderForm = new FormData();
    orderForm.append("user_id",this.state.user_id);

    this.setState({
      loading:true
    })
    const options = {
      method: "POST",
      headers: {"content-type": "multipart/form-data"},
      data: orderForm,
      url: "https://footubi.com/dev/speedcourier/order/getOrder.php",
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
        <Card>
          <CardItem header bordered>
            <H1>Order #{order.id}</H1>
            <H3>   {order.postage}</H3>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Grid>
                <Col style={{ width:30, textAlign:'center' }}>
                  <Text style={{ textAlign:'center',marginTop:5 }}><Icon type="FontAwesome5" name="circle" style={{fontSize:14,color:'orange'}} /></Text>
                  <Text style={{ textAlign:'center',marginTop:10 }}><Icon type="FontAwesome5" name="map-marker-alt" style={{fontSize:20,color:'orange'}} /></Text>
                </Col>
                <Col style={{ paddingLeft:10 }}>
                  <Text>{order.sender_address}</Text>
                  <Text style={{ marginTop:8 }}>{order.receiver_address}</Text>
                </Col>
              </Grid>
              <Badge warning style={{marginTop:20}}>
                <Text>{order.status}</Text>
              </Badge>
            </Body>
          </CardItem>
          <CardItem footer bordered>
            <Text>{order.datetime}</Text>
          </CardItem>
        </Card>
        </TouchableOpacity>
      )
    })

    return (
      <Container>
        <Text style={{alignSelf:'center',fontSize:25,padding:20,fontWeight:'bold'}}>Home</Text>
        <Content style={{borderTopColor:'black',borderTopWidth:1,marginTop:-5}}></Content>
          <ScrollView style={{padding:10}}>
              {
                this.state.orders.length===0?
                <Text style={{justifyContent:'center',textAlign:'center'}}>No available history</Text>:
                renderOrders
              }
          </ScrollView>
          <View style={{height:20}} />
        <Fab
            active="true"
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#dfdfdf', color:'black' }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('Add Order')}>
            <Icon type="FontAwesome5" name="plus" style={{color:'black'}} />
          </Fab>
      </Container>
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

export default Home;
