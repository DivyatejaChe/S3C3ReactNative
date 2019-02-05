import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

function RenderDish({dish}){
    return(
        <Card featuredTitle={dish.name} image={require('./images/uthappizza.png')}>
            <Text style={ {margin: 10} }>
                {dish.description} 
            </Text>
        </Card>
    );
}

class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES  
        };
    };
    
    /* Including custom navOptions */
    static navigationOptions = {
        title: 'Dish Details'
    };

    render(){
        
        const dishId =  this.props.navigation.getParam('dishId', '');
        
        if(dishId != null){
            return(
                <RenderDish dish={this.state.dishes[+dishId]} />
            );
        }
        else {
            return(
                <View>
                </View>
            );
        }        
    }
}
export default Dishdetail;