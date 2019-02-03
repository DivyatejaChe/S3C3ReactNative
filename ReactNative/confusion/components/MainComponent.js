import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

/* Platform gives access to platform-specific info*/

/* Setting up Stack Navigation by using a component, MenuNavigator, between Menu & Dishdetail*/
/* navigationOptions is applied for all the screens inside stack */
const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    Dishdetail: { screen: Dishdetail }
}, {
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgrundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

/* Every navigator must have a container */
const MenuContainer = createAppContainer(MenuNavigator);

class Main extends Component{
    render(){
        return(
            <View style={ {flex:1, paddingTop: Platform.OS === 'ios'? 0 : Expo.Constants.statusBarHeight } }>
                <MenuContainer />
            </View>    
        );
    }
}

export default Menu;