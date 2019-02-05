import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
/* FlatList & ListItem helps in creating a list of items */
import { DISHES } from '../shared/dishes';

class Menu extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES  
        };
    }
    
    /* Including custom navOptions */
    static navigationOptions = {
        title: 'Menu'
    }

    render(){
            const renderMenuItem = ({item, index})=>{
                return(
                    <ListItem key={index} title={item.name} subtitle={item.description} hideChevron={true} leftAvatar={ {source: require('./images/uthappizza.png')}} onPress={()=>navigate('Dishdetail', {dishId: item.id})}/>
                );
            };
        
        const { navigate } = this.props.navigation;
                /* navigate is required to pass info from Menu to Dishdetail through parameters */
        return(
            <FlatList data={this.state.dishes} renderItem={renderMenuItem} keyExtractor={item => item.id.toString()}/>
        );

    }
    
    
}

export default Menu;