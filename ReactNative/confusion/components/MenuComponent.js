import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
/* FlatList & ListItem helps in creating a list of items */


function Menu(props){
    
    /* Each item in data becomes ITEM here and INDEX is the key passed */
    /* "KEY" is a ListItem property*/
    /* "hideChevron" helps in removing the default display of RIGHT ARROW on each list item */
    /* To supply an image in React Native through require(), it can't take a programmatical address, rather complete exact address */
    const renderMenuItem = ({item, index})=>{
        return(
            <ListItem key={index} title={item.name} subtitle={item.description} hideChevron={true} leftAvatar={ {source: require('./images/uthappizza.png')} }/>
        );
    };
    
    /* FlatList has 3 properties */
    /* "renderItem" is used to specify how to render each list item */
    /* "keyExtractor" is used to extract one of the props off each item and uses it as KEY as list requires one. It expects a STRING */
    return(
        <FlatList data={props.dishes} renderItem={renderMenuItem} keyExtractor={item => item.id.toString()}/>
    
    );
}

export default Menu;