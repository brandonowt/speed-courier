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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Container, Header, Content, Button, Text, List, ListItem, Left, Body, Right, Thumbnail, Spinner } from 'native-base';
import axios from 'axios';

class Calculator extends Component {
    constructor(props) {
        super(props)
    
        this.state={
            loading:true,
            notification:[],
            user_id:""
        }
        this.getNotification = this.getNotification.bind(this)
    }

    async componentDidMount(){
      var user_id = await AsyncStorage.getItem('user_id')
  
      this.setState({
          user_id:user_id
      })
      await this.getNotification(user_id);
    }

    async getNotification(user_id){
        let notificationForm = new FormData();
        notificationForm.append("user_id",user_id);

        this.setState({
            loading:true
        })
        const options = {
            method: "POST",
            headers: {"content-type": "multipart/form-data"},
            data: notificationForm,
            url: "https://footubi.com/dev/speedcourier/accounts/getNotification.php",
        };
        try {
            const response = await axios(options);
            console.log(response)
            if (response.data.status === 201) {
                console.log(response);
                this.setState({
                    notification:response.data.notifications,
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

    render() {
      const renderNotifications = this.state.notification.map((notificationArr,i)=>{
        return(
          <List>
              <ListItem thumbnail>
              <Body>
                  <Text style={{fontWeight:'bold'}}>Order ID : #{notificationArr.order_id}</Text>
                  <Text note numberOfLines={2}>{notificationArr.message}</Text>
              </Body>
              <Right>
                  <Text note style={{paddingRight:5}}>{notificationArr.date}</Text>
                  <Text note style={{paddingRight:5}}>{notificationArr.time}</Text>
              </Right>
              </ListItem>
          </List>
        )
      })
        return (
            <Container>
                <Text style={{alignSelf:'center',fontSize:25,padding:20,fontWeight:'bold'}}>Notification</Text>
                <Content style={{borderTopColor:'black',borderTopWidth:1}}>
                {this.state.loading?
                  <Spinner/>
                :
                  renderNotifications
                }
                </Content>
            </Container>
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
