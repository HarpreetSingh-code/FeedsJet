import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card } from 'native-base';
import { Image, Linking, TouchableOpacity, View } from 'react-native';
import Styles from '../../Components/Styles';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
const ApiKey = "b18c8935f8cc4fd3b0e665f7cf22c7ed"
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
export default class Dashboard extends Component {

    state = {
        data: [],
        UID: "",
        UserName:""
    }
    async componentDidMount() {
        try {
            const value = await AsyncStorage.getItem('@FeedsJetUid')
            if (value !== null) {
                const user = await firestore()
                    .collection('Users')
                    .doc(value)
                    .get()
                    .then((response)=>{this.setState({ UID: value,UserName:response._data.UserName })})
                

            }
        } catch (e) {
            // error reading value
        }
        fetch("http://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=" + ApiKey)
            .then((response) => response.json())
            .then((json) => { this.setState({ data: json.articles }); })
        alert("Welcome " + this.state.UserName)
    }
   async _logout(){
    try {
        await AsyncStorage.removeItem('@FeedsJetUid')
        this.props.navigation.navigate("Auth")
      } catch(e) {
        // remove error
      }
    }
    render() {
        //console.log(this.state.data);
        return (
            <Container>
                <Header androidStatusBarColor="#2962ff" style={{ backgroundColor: "#2962ff" }}>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Home</Title>
                    </Body>
                    <Right >
                        <Button transparent onPress={()=>{this._logout()}}>
                            <Icon name="logout"type="AntDesign"/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    {this.state.data.map((item, key) => {
                        return (
                            <TouchableOpacity key={key} onPress={() => { Linking.openURL(item.url) }}>
                                <Card style={Styles.NewsCard}>
                                    <Image source={{ uri: item.urlToImage }} style={Styles.MainImage} />
                                    <Text style={{ fontWeight: "bold", paddingHorizontal: responsiveWidth(1) }}>{item.title.substring(0, 50)}...</Text>
                                    <Text style={{ fontSize: responsiveFontSize(1.6), lineHeight: 20, paddingHorizontal: responsiveWidth(1) }}>{item.description}</Text>
                                    <View style={{ flexDirection: "row", paddingHorizontal: responsiveWidth(1) }}>
                                        <View style={{ flex: 0.5 }}>
                                            <Text style={{ fontWeight: "bold", fontSize: responsiveFontSize(1.4), paddingHorizontal: responsiveWidth(1) }}>Author : {item.source.name}</Text>
                                        </View>
                                        <View style={{ flex: 0.5, alignItems: "flex-end" }}>
                                            <Text style={{ fontSize: responsiveFontSize(1.4), color: "#2962ff", fontWeight: "bold" }}>{item.publishedAt.substring(0, 10)}</Text>
                                        </View>
                                    </View>

                                </Card>
                            </TouchableOpacity>
                        )
                    })}
                </Content>
            </Container>
        );
    }
}