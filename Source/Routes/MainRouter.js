import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Dashboard from "../Screens/Main/Dashboard";



const Mainstack=createStackNavigator({
    Home:Dashboard
},{
    initialRouteName:"Home",
    headerMode:"none"
})

export default createAppContainer(Mainstack)