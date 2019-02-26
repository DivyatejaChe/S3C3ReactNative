import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Card, Input, Icon, CheckBox } from 'react-native-elements';
import { SecureStore } from 'expo';

class Login extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }
    
    /* Access to Secure Store. getItemSync returns a Promise */
    componentDidMount(){
        SecureStore.getItemAsync('userinfo')
            .then( (userdata)=> {
                let userinfo = JSON.parse(userdata);
                if(userinfo){
                    this.setState( {username: userinfo.username} );
                    this.setState( {password: userinfo.password} );
                    this.setState( {remember: true} );
                }    
        } )
    }
    /* SecureStore stores key-value pair and returned value has to be either a string or a number and cannot be a JS object */
    
    static navigationOptions = {
        title: 'Login'
    };

    /* Key used here should be the same as the one used in getItemAsync i.e., userinfo */
    handleLogin(){
        console.log(JSON.stringify(this.state));
        if(this.state.remember === true){
            SecureStore.setItemAsync('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password}))
            .catch((error)=>console.log('Could not save userinfo', error));
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch((error)=>console.log('Could not delete userinfo', error));
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Input placeholder="Username" leftIcon={{type: 'font-awesome', name: 'user-o'}} onChangeText={(uname)=>this.setState({username: uname})} value={this.state.username} containerStyle={styles.formInput}/>
                
                <Input placeholder="Password" leftIcon={{type: 'font-awesome', name: 'key'}} onChangeText={(pwd)=>this.setState({password: pwd})} value={this.state.password} containerStyle={styles.formInput}/>                
                <CheckBox title="Remember Me" center checked={this.state.remember} onPress={()=>this.setState({remember: !this.state.remember})} containerStyle={styles.formCheckbox}/>
                
                <View style={styles.formButton}>
                    <Button onPress={()=>this.handleLogin()} title="Login" color="#512DA8" />
                </View>        
            </View>          
        );
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        margin: 40,
        marginLeft: 10
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;
