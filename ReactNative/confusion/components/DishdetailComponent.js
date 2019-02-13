import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

function RenderDish(props){
    const dish = props.dish;
    const favorite = props.favorite;
    
    return(
        <Card featuredTitle={dish.name} image={require('./images/uthappizza.png')}>
            <Text style={ {margin: 10} }>
                {dish.description} 
            </Text>
            <Icon raised reverse name={favorite? 'heart' : 'heart-o'} type='font-awesome' color='#f50' onPress={()=>favorite? console.log('Already Favorite') : props.onPress()}/>
        </Card>
    );
}

/* 'raised' attribute/prop displays the ICON as a ROUNDED BUTTON */
/* 'reverse' reverses the color of ICON */

function RenderComments({comments}){
    
    const renderCommentItem = ({item, index}) => {
        const positionOfT = (item.date).indexOf("T");
        const dateOfComment = (item.date).slice(0, positionOfT);
        return(
            <View key={index} style={ {margin: 10} }>
                <Text style={ {fontSize: 14} }>{item.comment}</Text>
                <Text style={ {fontSize: 12} }>{item.rating} Stars</Text>
                <Text style={ {fontSize: 12} }>{'-- '+item.author+', '+dateOfComment}</Text>
            </View>
        );
    };
    
    return(
            <Card title="Comments">
                <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
            </Card>
        );
}

class Dishdetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
            comments: COMMENTS,
            favorites: []
        };
    };
    
    markFavorite(dishId){
        this.setState(
            {favorites: this.state.favorites.concat(dishId)}
        );    
    }
    
    /* Including custom navOptions */
    static navigationOptions = {
        title: 'Dish Details'
    };

    render(){
        
        const dishId =  this.props.navigation.getParam('dishId', '');
        
        if(dishId != null){
            return(
                <ScrollView>
                    <RenderDish dish={this.state.dishes[+dishId]} favorite={this.state.favorites.some(item => item===dishId)} onPress={()=>this.markFavorite(dishId)}/>
                    <RenderComments comments={this.state.comments.filter((comment)=>comment.dishId===dishId)} />
                </ScrollView>
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

/* '.some()' returns TRUE if there exists an item in there matches the item */
export default Dishdetail;