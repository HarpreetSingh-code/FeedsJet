import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import Styles from '../../Components/Styles';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: "",
            Password: ""
        };
    }
    _handleSignIn() {
        let { Email, Password } = this.state
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        if (Email != "" && Password != "") {
            if (Email.match(mailformat)) {
                if (Password.match(passformat)) {
                    auth()
                        .signInWithEmailAndPassword(this.state.Email, this.state.Password)
                        .then(async(response) => {
                           // console.log(response.user.uid);
                            try {
                                await AsyncStorage.setItem('@FeedsJetUid', response.user.uid)
                                this.props.navigation.navigate("Main")
                            } catch (e) {
                                // saving error
                            }

                        })
                }
                else {
                    alert("Wrong Password")
                }
            }
            else {
                alert("Wrong Email")
            }
        }
        else {
            alert("Empty Fields")
        }

    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Image source={require('../../Images/Applogo.png')} style={Styles.Imagelogo} />
                <Text style={Styles.MainLogo}>FeedsJet</Text>
                <Text>[ SignIn ]</Text>
                <TextInput
                    style={Styles.inputField}
                    onChangeText={(val) => { this.setState({ Email: val }) }}
                    placeholder="Enter Email" />
                <TextInput
                    style={Styles.inputField}
                    onChangeText={(val) => { this.setState({ Password: val }) }}
                    secureTextEntry
                    placeholder="Enter Password" />

                <View style={{ flexDirection: "row", marginTop: responsiveWidth(10) }}>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity style={Styles.Button1} onPress={() => { this.props.navigation.navigate("SignUp") }}>
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: responsiveFontSize(2) }}>SignUp</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity style={Styles.Button1} onPress={() => { this._handleSignIn() }}>
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: responsiveFontSize(2) }}>SignIn</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

