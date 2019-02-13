import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

function RenderDish({dish}){
    return(
        <Card featuredTitle={dish.name} image={require('./images/uthappizza.png')}>
            <Text style={ {margin: 10} }>
                {dish.description} 
            </Text>
        </Card>
    );
}

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
            comments: COMMENTS
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
                <ScrollView>
                    <RenderDish dish={this.state.dishes[+dishId]} />
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
export default Dishdetail;