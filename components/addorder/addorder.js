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
} from 'react-native';

import {
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Picker, Icon, Fab } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';


class AddOrder extends Component {
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
        rate:0
    }
    // this.calculate = this.calculate.bind(this)
    this.handleWeightForm = this.handleWeightForm.bind(this)
    this.handleNameForm = this.handleNameForm.bind(this)
    this.handlePhoneForm = this.handlePhoneForm.bind(this)
    this.handleAddressForm = this.handleAddressForm.bind(this)
    this.handlePostageForm = this.handlePostageForm.bind(this)
    this.calculateRate = this.calculateRate.bind(this)
    this.getData = this.getData.bind(this)
  }

  async getData(){
    const user_id = await AsyncStorage.getItem("user_id")
    const first_name = await AsyncStorage.getItem("first_name")
    const last_name = await AsyncStorage.getItem("last_name")
    const name = first_name + " " + last_name
    const address = await AsyncStorage.getItem("address")
    const phone = await AsyncStorage.getItem("phone")
    const postage = await AsyncStorage.getItem("postage")
    this.setState({
      user_id:user_id,
      address:address,
      phone:phone,
      postage:postage,
      name:name
    })
  }

  componentDidMount(){
    this.getData();
  }

  handleReceiverNameForm(text){
    this.setState({
      receiver_name:text
    })
  }
  
  handleReceiverAddressForm(text){
    this.setState({
      receiver_address:text
    })
  }

  handleReceiverPhoneForm(text){
    this.setState({
      receiver_phone:text
    })
  }

  handleNameForm(text){
    this.setState({
      name:text
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

  async handlePostageForm(text){
    await this.setState({
      postage:text
    })
    await this.calculateRate();
  }

  calculateRate(){
    var rate = 0;
    console.log(this.state.postage)
    if(this.state.postage == ""){
      return;
    }
    else if(this.state.postage == "DHL Express"){
      rate = 8;
    }
    else if(this.state.postage == "GDex"){
      rate = 7.5;
    }
    else if(this.state.postage == "J&T Express"){
      rate = 7;
    }
    else if(this.state.postage == "Ninja Van"){
      rate = 9;
    }
    else if(this.state.postage == "Pos Laju"){
      rate = 10;
    }
    console.log(this.state.weight);
    var total = 0;
    if(this.state.weight < 2){
      total = rate;
    }
    else{
      var extra = this.state.weight - 2;
      var extraAmount = (extra) * 2;
      total = (rate) + (extraAmount);
    }
    this.setState({
        total: total
    })
  }

  async handleWeightForm(text){

    await this.setState({
      weight: text
    })
    console.log(this.state.weight)
    await this.calculateRate();
  }

  async purchase(){
    if(this.state.weight!=0 && this.state.name!="" && this.state.address != "" && this.state.phone != "" && this.state.postage != "" && this.state.receiver_name!="" && this.state.receiver_address!="" && this.state.receiver_phone!=""){
      this.props.navigation.navigate("Payment",{weight:this.state.weight,total:this.state.total,name:this.state.name,address:this.state.address,phone:this.state.phone,postage:this.state.postage,user_id:this.state.user_id,receiver_name:this.state.receiver_name,receiver_address:this.state.receiver_address,receiver_phone:this.state.receiver_phone})
    }
    else{
      alert("Please fill up all required information")
    }
  }

  render() {
    return (
        <Container style={{flex:1}}>
          <ScrollView>
            <Content style={{padding:20}}>
              <View style={{marginTop:40}}>
                <Text style={{textAlign:'center',fontWeight:'bold',fontSize:30}}>Order a pick-up</Text>
              </View>
              <View style={{marginTop:30}}>
                <Text>{`Place an order for a pick-up of any item. Below are the breakdown of pricing:

Weight: Up to 2kg = RM7. For over 2kg, addtional RM2 per kg
Distance: No additional charges
                `}</Text>
              </View>
              <Form>
                  <Item inlineLabel>
                    <Label style={{fontSize:24}}>Weight (kg) :</Label>
                    <Input keyboardType="decimal-pad" onChangeText={(e)=>this.handleWeightForm(e)} style={{fontSize:24}} />
                  </Item>
              </Form>
              <View style={{ marginTop:30,borderBottomColor: 'black',borderBottomWidth: 1 }} />
              <View style={{marginTop:20}}>
                <Text style={{fontSize:20}}>Receiver Details</Text>
                <Form>
                  <Item inlineLabel>
                    <Label>Name :</Label>
                    <Input onChangeText={(e)=>this.handleReceiverNameForm(e)}  />
                  </Item>
                  <Item inlineLabel>
                    <Label>Address :</Label>
                    <Input onChangeText={(e)=>this.handleReceiverAddressForm(e)}  />
                  </Item>
                  <Item inlineLabel>
                    <Label>Phone Number :</Label>
                    <Input keyboardType="number-pad" onChangeText={(e)=>this.handleReceiverPhoneForm(e)}  />
                  </Item>
                </Form>
              </View>
              <View style={{marginTop:30}}>
                <Text style={{fontSize:20}}>Sender Details</Text>
                <Form>
                    <Item inlineLabel>
                      <Label>Name :</Label>
                      <Input value={this.state.name} onChangeText={(e)=>this.handleNameForm(e)}  />
                    </Item>
                    <Item inlineLabel>
                      <Label>Address :</Label>
                      <Input value={this.state.address} onChangeText={(e)=>this.handleAddressForm(e)}  />
                    </Item>
                    <Item inlineLabel>
                      <Label>Phone Number :</Label>
                      <Input keyboardType="number-pad" value={this.state.phone} onChangeText={(e)=>this.handlePhoneForm(e)}  />
                    </Item>
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
                </Form>
              </View>
              <View>
                <Text style={{color:'#adadad',fontSize:12,marginTop:15}}>Note: For quicker process, save all the details at the settings page</Text>
              </View>
              <View style={{marginLeft:10,marginTop:20}}>
                <Text style={{fontWeight:'bold',fontSize:28}}>Grand Total : RM{this.state.total}</Text>
              </View>
              <View style={{marginTop:40}}>
                  <Button primary style={styles.button} onPress={()=>this.purchase()}><Text> Place Order </Text></Button>
              </View>
            </Content>
          </ScrollView>
          <Fab
            active="true"
            containerStyle={{ }}
            style={{ backgroundColor: '#dfdfdf', color:'black' }}
            position="topLeft"
            onPress={() => this.props.navigation.goBack()}>
            <Icon type="FontAwesome5" name="arrow-left" style={{color:'black'}} />
          </Fab>
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
  },
  button: {
    borderRadius:20,
    width:350,
    bottom:0,
    justifyContent:'center'
},
bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15,
    alignSelf:'center'
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

export default AddOrder;
