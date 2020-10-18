import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Styles from '../../Components/Styles';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-community/async-storage';
class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0.05,
            indeterminate: false,
        };
        setTimeout(() => {
            this._loadData()
        }, 7000);
    }

   async _loadData() {
    let isLoggedIn = false
        try {
            const value = await AsyncStorage.getItem('@FeedsJetUid')
            if (value !== null) {
                isLoggedIn=true
            }
        } catch (e) {
            // error reading value
        }
        
        isLoggedIn
            ? this.props.navigation.navigate("Main")
            : this.props.navigation.navigate("Auth")
    }
    componentDidMount() {
        let progress = 0;
        this.setState({ progress });
        setTimeout(() => {
            this.setState({ indeterminate: false });
            setInterval(() => {
                progress += Math.random() / 5;
                if (progress > 1) {
                    progress = 1;
                }
                this.setState({ progress });
            }, 500);
        }, 1500);
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <View style={{ flex: 0.9, alignItems: "center", justifyContent: 'center', }}>
                    <Image source={require("../../Images/Applogo.png")} style={Styles.Imagelogo} />
                    <Text style={Styles.MainLogo}>FeedsJet</Text>
                </View>
                <View style={{ flex: 0.1, justifyContent: 'flex-end', alignItems: 'center', }}>
                    <Progress.Bar
                        width={430}
                        height={15}
                        borderWidth={0}
                        progress={this.state.progress}
                        indeterminate={this.state.indeterminate}
                    />
                </View>
            </View>
        );
    }
}

export default Splash;
