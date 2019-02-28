import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform, Image, StyleSheet, ScrollView, Text, NetInfo, ToastAndroid } from 'react-native';
/* ToastAndroid is required to show a 'toast msg' on screen whenever network info changes*/
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchLeaders, fetchPromos } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: ()=>dispatch(fetchDishes()),
    fetchComments: ()=>dispatch(fetchComments()),
    fetchPromos: ()=>dispatch(fetchPromos()),
    fetchLeaders: ()=>dispatch(fetchLeaders()),
})

/* DrawerItems & SafeAreaView allows us to design CUSTOM DRAWER LAYOUT */
const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={ {top: 'always', horizontal: 'never'} }>
            <View style={styles.drawerHeader}>
                <View style={ {flex: 1} }>
                    <Image source={ require('./images/logo.png')} style={styles.drawerImage}/>
                </View>
                <View style={ {flex:2} }>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
)
/* forceInset enables the side drawer to be displayed even covering status bar on top */
/* Two Inner Views have flex:1 & flex:2 which means they will be laid horizontally and the second view occupies the double of that of first one */

/* navigationOption can either be defined as a JS Object or JS Function */
const MenuNavigator = createStackNavigator({
    Menu: { 
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={24} color='white' onPress={()=>navigation.toggleDrawer()} />
        })
    },
    Dishdetail: { screen: Dishdetail }
},  {
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
},  {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24} color='white' onPress= {()=>navigation.toggleDrawer()} />
    })
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
},  {
    navigationOptions: ({ navigation })=> ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24} color='white' onPress={()=>navigation.toggleDrawer()} />
    })
});

const AboutNavigator = createStackNavigator({
    About: { screen: About }
},  {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24} color='white' onPress={()=>navigation.toggleDrawer()} />
    })
});

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
},  {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24} color='white' onPress={()=>navigation.toggleDrawer()} />
    })
});

const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites }
},  {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24} color='white' onPress={()=>navigation.toggleDrawer()} />
    })
});

const LoginNavigator = createStackNavigator({
    Login: { screen: Login }
},  {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24} color='white' onPress={()=>navigation.toggleDrawer()} />
    })
});

const MainNavigator = createDrawerNavigator({
    Login: { 
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor })=>(
                <Icon name='sign-in' type='font-awesome' size={24} color={tintColor}/>
            ),
        }
    },
    Home: { 
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor })=>(
                <Icon name='home' type='font-awesome' size={24} color={tintColor}/>
            ),
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor })=>(
                <Icon name='list' type='font-awesome' size={24} color={tintColor}/>
            ),
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About',
            drawerLabel: 'About',
            drawerIcon: ({ tintColor })=>(
                <Icon name='info-circle' type='font-awesome' size={24} color={tintColor}/>
            ),
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact',
            drawerIcon: ({ tintColor })=>(
                <Icon name='address-card' type='font-awesome' size={22} color={tintColor}/>
            ),
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor })=>(
                <Icon name='heart' type='font-awesome' size={22} color={tintColor}/>
            ),
        }
    },
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor })=>(
                <Icon name='cutlery' type='font-awesome' size={22} color={tintColor}/>
            ),
        }
    }
},  {
        initialRouteName: 'Home',
        drawerBackgroundColor: '#D1C4E9',
        contentComponent: CustomDrawerContentComponent
});

class Main extends Component{
    
    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();   
        
        NetInfo.getConnectionInfo()
            .then((connectionInfo) => {
                ToastAndroid.show('Initial Network Connectivity Type: '+ connectionInfo.type+ ', effectiveType: '+ connectionInfo.effectiveType, ToastAndroid.LONG)
        });
        
        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }
    
    componentWillUnmount(){
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange);
    }
    
    handleConnectivityChange= (connectionInfo) => {
        switch(connectionInfo.type){
            case 'none':
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show('You are now connected to Mobile Data!', ToastAndroid.LONG);           break; 
            case 'unknown':
                ToastAndroid.show('You are now connected to unknown connection!', ToastAndroid.LONG);           break; 
            default:
                break;
        }
    }
    render(){
        return(
            <View style={ {flex: 1, paddingTop: Platform.OS === 'ios'? 0 : Expo.Constants.statusBarHeight} }>
                <MainNavigator />
            </View>    
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        height: 60,
        width: 80
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Main);