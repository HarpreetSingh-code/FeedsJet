import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SignIn from "../Screens/Auth/SignIn";
import SingUp from "../Screens/Auth/SignUp";


const AuthStack=createStackNavigator({
    SignUp:SingUp,
    SignIn:SignIn
},{
    initialRouteName:"SignIn",
    headerMode:"none"
})

export default createAppContainer(AuthStack)