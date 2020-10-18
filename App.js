import React, { Component } from 'react';
import AuthStack from './Source/Routes/AuthRouter'
import Mainstack from './Source/Routes/MainRouter'
import Splash from './Source/Screens/Splash/Splash';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
const AppRouter=createSwitchNavigator({
  Splash:Splash,
  Auth:AuthStack,
  Main:Mainstack
},{
  initialRouteName:"Splash"
})
export default createAppContainer(AppRouter)
