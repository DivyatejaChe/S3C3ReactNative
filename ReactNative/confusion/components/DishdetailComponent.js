import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    };
}

const mapDispatchToProps = dispatch=>({
    postFavorite: (dishId)=>dispatch(postFavorite(dishId))
});

function RenderDish(props){
    const dish = props.dish;
    const favorite = props.favorite;
    
    return(
        <Card featuredTitle={dish.name} image={{uri: baseUrl+ dish.image}}>
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

    markFavorite(dishId){
        this.props.postFavorite(dishId);
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
                    <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite={this.props.favorites.favoritesArr.some(item => item===dishId)} onPress={()=>this.markFavorite(dishId)}/>
                    <RenderComments comments={this.props.comments.comments.filter((comment)=>comment.dishId===dishId)} />
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
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);