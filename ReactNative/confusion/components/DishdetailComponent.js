import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, Button, Modal, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    };
}

const mapDispatchToProps = dispatch=>({
    postFavorite: (dishId)=>dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment)=>dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props){
    const dish = props.dish;
    const favorite = props.favorite;
    
    /* Why this.view? Why not simply 'view'? */
    handleViewRef = (ref) => {
        this.view = ref;
    } 
    
    /* recognizeDrag() recognizes Drag(R to L Swipe Gesture) */
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if(dx< -200)
            return true;
        else
            return false;
    };
    /* { moveX, moveY, dx, dy } are part of gestureState. Here, we recognize only R to L gesture and hence, dx < -200  */
    
    const recognizeDragLtoR = ({ moveX, moveY, dx, dy }) => {
        if(dx> 200)
            return true;
        else
            return false;
    };

    
    /*  various callbacks for panResponder are supplied here */
    /* onPanResponderGrant here is used to give Visual Feedback to the user */
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;    
        },

        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
                .then( endState => console.log(endState.finished? 'finished' : 'cancelled'));
        },

        onPanResponderEnd: (e, gestureState) => {
            console.log("PanResponder End ", gestureState);
            if(recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you wish to add '+ dish.name+ ' to your favorites? ',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => { favorite? console.log('Already Favorite') : props.onFavPress() }
                        }
                    ],
                    { cancelable: false }
                );
            
            if(recognizeDragLtoR(gestureState))
                props.onCommentPress(); 
            
            return true;
        }
    });
    
    /* gestureState contains info which can be used to recognize various aspects about actual pan gesture done on screen */
    
    /* 'ref' in Animatable is called by Animatable.View */
    return(
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000} ref={this.handleViewRef} {...panResponder.panHandlers}>
            <Card featuredTitle={dish.name} image={{uri: baseUrl+ dish.image}}>
                <Text style={ {margin: 10} }>
                    {dish.description} 
                </Text>
                <View style= {{justifyContent: 'center', flexDirection: 'row'}} >
                    <Icon raised reverse name={favorite? 'heart' : 'heart-o'} type='font-awesome' color='#f50' onPress={()=>favorite? console.log('Already Favorite') : props.onFavPress()}/>
                    <Icon raised reverse name={'pencil'} type='font-awesome' color='#512DA8' onPress={()=>props.onCommentPress()} />

                </View>
            </Card>
        </Animatable.View>
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
                <Rating imageSize={10} readonly startingValue={item.rating} style={ styles.rating } />
                <Text style={ {fontSize: 12} }>{'-- '+item.author+', '+dateOfComment}</Text>
            </View>
        );
    };
    
    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
            </Card>
        </Animatable.View>
        );
}

class Dishdetail extends Component{

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            rating: 0,
            author: '',
            comment: ''
        };
    }
    
    markFavorite(dishId){
        this.props.postFavorite(dishId);
    }
    
    toggleModal(){
        this.setState( {showModal: !this.state.showModal} );
    }
    
    resetForm(){
        this.setState( {
            showModal: false,
            rating: 0,
            author: '',
            comment: ''
        } );
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
                    <RenderDish dish={this.props.dishes.dishes[+dishId]} favorite={this.props.favorites.some(item => item===dishId)} onFavPress={()=>this.markFavorite(dishId) } onCommentPress={()=>this.toggleModal()}/>
                                        
                    <RenderComments comments={this.props.comments.comments.filter((comment)=>comment.dishId===dishId)} />
                    
                    <Modal animationType={'slide'} transparent={false} visible={this.state.showModal} onDismiss={ ()=> this.resetForm()} onRequestClose={ ()=> this.resetForm()}>
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>Your Feedback</Text>
                            <Rating showRating imageSize={20} ratingCount={5} minValue={1} startingValue={0} onFinishRating={(ratingGiven)=>this.setState({rating: ratingGiven})} />
                            <Input placeholder=' Author' leftIcon={ <Icon name='user-o' type='font-awesome'/>} onChangeText={(value)=>this.setState({author: value})}/>
                            <Input placeholder=' Comment' leftIcon={ <Icon name='comment-o' type='font-awesome'/>} onChangeText={(value)=>this.setState({comment: value})}/>                        
                            <Button onPress={ ()=> {this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment); this.resetForm()} } color="#512DA8" title="Submit"/>
                            <Button onPress={ ()=> this.resetForm() } color="#DCDCDC" title="Cancel"/>
                        </View>
                    </Modal>
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

const styles = StyleSheet.create({
    rating: {
        flexDirection: 'row'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    }
});
/* '.some()' returns TRUE if there exists an item in there matches the item */
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);