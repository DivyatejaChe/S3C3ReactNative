import React from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';

function RenderDish({dish}){
   
    return(
        <Card featuredTitle={dish.name} image={require('./images/uthappizza.png')}>
            <Text style={ {margin: 10} }>
                {dish.description} 
            </Text>
        </Card>
    );
}

function Dishdetail(props){
    if(props.dish != null){
        return(
            <RenderDish dish={props.dish} />
        );
    }
    else {
        return(
            <View></View>
        );
    }
}

export default Dishdetail;