import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import Styles from '../../Components/Styles';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-community/async-storage';
export default class SingUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: "",
            Email: "",
            Password: "",
            CPassword: ""
        };
    }
    _handleSignUp() {
        let { Name, Email, Password, CPassword } = this.state
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;         //atleast 1 numeric, 1 small albhabet 1 capital and length>=8
        if (Name != "" && Email != "" && Password != "" && CPassword != "") {
            if (Email.match(mailformat)) {
                if (Password.match(passformat)) {
                    if (Password == CPassword) {
                        auth()
                            .createUserWithEmailAndPassword(Email, Password)
                            .then(async(response) => {
                               // console.log(response.user.uid);
                                firestore()
                                .collection('Users')
                                .doc(response.user.uid)
                                .set({
                                    UserId:response.user.uid,
                                    UserName:Name,
                                    Email:Email
                                })
                                try {
                                    await AsyncStorage.setItem('@FeedsJetUid', response.user.uid)
                                    this.props.navigation.navigate("Main")
                                } catch (e) {
                                    // saving error
                                }
                            })
                            .catch(error => {
                                if (error.code === 'auth/email-already-in-use') {
                                   alert('That email address is already in use!');
                                }

                                if (error.code === 'auth/invalid-email') {
                                    alert('That email address is invalid!');
                                }

                                console.error(error);
                            });
                    }
                    else {
                        alert("Password didn't match")
                    }
                }
                else {
                    alert("Password format wrong")
                }
            }
            else {
                alert("Email Wrong!")
            }
        }
        else {
            alert("All Fields are compulsary.")
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Image source={require('../../Images/Applogo.png')} style={Styles.Imagelogo} />
                <Text style={Styles.MainLogo}>FeedsJet</Text>
                <Text>[ SignUp ]</Text>
                <TextInput
                    style={Styles.inputField}
                    onChangeText={(val) => { this.setState({ Name: val }) }}
                    placeholder="Enter User Name" />
                <TextInput
                    style={Styles.inputField}
                    onChangeText={(val) => { this.setState({ Email: val }) }}
                    placeholder="Enter Email" />
                <TextInput
                    style={Styles.inputField}
                    onChangeText={(val) => { this.setState({ Password: val }) }}
                    secureTextEntry
                    placeholder="Enter Password" />
                <TextInput
                    style={Styles.inputField}
                    onChangeText={(val) => { this.setState({ CPassword: val }) }}
                    secureTextEntry
                    placeholder="Confirm Password" />

                <View style={{ flexDirection: "row", marginTop: responsiveWidth(10) }}>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity style={Styles.Button1} onPress={() => [this.props.navigation.navigate("SignIn")]}>
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: responsiveFontSize(2) }}>SignIn</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', }}>
                        <TouchableOpacity style={Styles.Button1} onPress={() => { this._handleSignUp() }}>
                            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: responsiveFontSize(2) }}>SignUp</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}

