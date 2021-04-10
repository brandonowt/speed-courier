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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Header, Content, Button, Text, Tabs, ScrollableTab, Tab, Spinner, Badge, Grid, Col, Icon, Form, Item, Picker } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';


class Order extends Component {
    constructor(props) {
        super(props)
    
        this.state={
            order_id:"",
            user_id:"",
            role:"",
            orders:[],
            status:"Default value",
            loading:true
        }
        // this.calculate = this.calculate.bind(this)
        this.getData = this.getData.bind(this)
        this.handleStatusForm = this.handleStatusForm.bind(this)
    }
    
    async componentDidMount(){
        var user_id = await AsyncStorage.getItem('user_id')
        var role = await AsyncStorage.getItem('role')

        this.setState({
            user_id:user_id,
            role:role
        })
        this.getData();
    }

    async updateStatus(){

        if(this.state.status == "Default value"){
            alert("Please select a status");
        }
        else{
            let updateForm = new FormData();
            updateForm.append("user_id",this.state.user_id);
            updateForm.append("order_id",this.state.order_id);
            updateForm.append("status",this.state.status);
    
            const options = {
              method: "POST",
              headers: {"content-type": "multipart/form-data"},
              data: updateForm,
              url: "https://footubi.com/dev/speedcourier/order/updateStatus.php",
            };
            try {
              const response = await axios(options);
              console.log(response)
              if (response.data.status === 201) {
                alert("Status updated");
                this.getData()
              } else if (response.data.status === 400) {
                alert('Error occurred')
              } else {
                alert('Network Error! Please try again')
              }
            } catch (e) {
              alert(e);
            }
        }

        
    }

    async getData(){

        this.setState({
            order_id:this.props.route.params.order_id
        })
        let orderForm = new FormData();
        orderForm.append("order_id",this.props.route.params.order_id);

        this.setState({
            loading:true
        })
        const options = {
            method: "POST",
            headers: {"content-type": "multipart/form-data"},
            data: orderForm,
            url: "https://footubi.com/dev/speedcourier/order/getSingleOrder.php",
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

    handleStatusForm(text){
        this.setState({
            status:text
        })
    }

    render() {
        return (
            <View>
                <Text style={{alignSelf:'center',fontSize:25,padding:20,fontWeight:'bold'}}>Order #{this.state.order_id}</Text>
                <Content style={{borderTopColor:'black',borderTopWidth:1,marginTop:-5}}></Content>
                <ScrollView style={{padding:10}}>
                    {this.state.loading?
                        
                            <Spinner animation="border" variant="primary"  />

                    :
                        <View>
                            <View style={{padding:10, borderWidth:1, borderColor:'#d3d3d3'}}>
                                <Text style={{textAlign:'center'}}>{this.state.orders.staff_name}</Text>
                            </View>
                            <Text style={{marginTop:15}}>{this.state.orders.datetime}</Text>
                            <Badge warning style={{marginTop:5}}>
                                <Text>{this.state.orders.status}</Text>
                            </Badge>
                            <View style={{marginTop:25}}>
                            <Grid>
                                <Col style={{ width:30, textAlign:'center' }}>
                                <Text style={{ textAlign:'center',marginTop:5 }}><Icon type="FontAwesome5" name="circle" style={{fontSize:20,color:'orange'}} /></Text>
                                <Text style={{ textAlign:'center',marginTop:58 }}><Icon type="FontAwesome5" name="map-marker-alt" style={{fontSize:20,color:'orange'}} /></Text>
                                </Col>
                                <Col style={{ paddingLeft:10 }}>
                                <Text style={{fontSize:20}}>{this.state.orders.sender_address}</Text>
                                <Text style={{fontSize:16,color:'#808080'}}>{this.state.orders.sender_name}</Text>
                                <Text style={{fontSize:16,color:'#808080'}}>{this.state.orders.sender_phone}</Text>
                                <Text style={{ marginTop:8,fontSize:20 }}>{this.state.orders.receiver_address}</Text>
                                <Text style={{fontSize:16,color:'#808080'}}>{this.state.orders.receiver_name}</Text>
                                <Text style={{fontSize:16,color:'#808080'}}>{this.state.orders.receiver_phone}</Text>
                                </Col>
                            </Grid>
                            </View>
                            <View style={{marginTop:25}}>
                                <Text style={{fontSize:25}}><Icon type="FontAwesome5" name="truck" style={{fontSize:30,color:'black'}} />  {this.state.orders.postage}</Text>
                                <Text style={{fontSize:25,marginTop:5}}><Icon type="FontAwesome5" name="money-bill-alt" style={{fontSize:30,color:'black'}} />  {this.state.orders.payment}</Text>
                            </View>
                            <View style={{marginTop:20,flexDirection:'row'}}>
                                <Text style={{fontSize:24}}>Total : </Text><Text style={{fontWeight:'bold',fontSize:24}}>RM {this.state.orders.total}</Text>   
                            </View>
                            {this.state.role == "company"?
                            <View style={{marginTop:10}}>
                                <Form>
                                    <Item picker>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={<Icon name="arrow-down" />}
                                        style={{ width: undefined }}
                                        placeholder="Select status"
                                        placeholderStyle={{ color: "#bfc6ea" }}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.status}
                                        onValueChange={(e)=>this.handleStatusForm(e)}
                                    >
                                        <Picker.Item label="Select a status" value="Default value" />
                                        <Picker.Item label="Waiting for pickup" value="Waiting for pickup" />
                                        <Picker.Item label="Item picked up" value="Item picked up" />
                                        <Picker.Item label="Arrived at postage hub" value="Arrived at postage hub" />
                                        <Picker.Item label="Out for delivery" value="Out for delivery" />
                                        <Picker.Item label="Delivered" value="Delivered" />
                                    </Picker>
                                    </Item>
                                    <Button block style={{borderRadius:10}} onPress={()=>this.updateStatus()}>
                                        <Text>Update Status</Text>
                                    </Button>
                                </Form>
                            </View>
                            :
                            <View></View>
                            }
                            
                        </View>
                    }
                </ScrollView>
                <View style={{height:20}} />
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

export default Order;
