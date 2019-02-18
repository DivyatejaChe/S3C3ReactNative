import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

function RenderItem(props){
    
    const item = props.item;
    
    
        if(item != null){
            return(
                <Card featuredTitle={item.name} featuredSubtitle={item.designation} image={{uri: baseUrl+ item.image}}>
                    <Text style={{margin: 10}}>
                        {item.description}
                    </Text>
                </Card>
            );
        }
        else{
            return(<View></View>);
        }
    
}

class Home extends Component{
               
    static navigationOptions = {
        title: 'Home'  
    };
    
    render(){
        if(this.props.dishes.isLoading || this.props.promotions.isLoading || this.props.leaders.isLoading){
            return(
                <Loading />
            );
        }
        else if(this.props.dishes.errMess || this.props.promotions.errMess || this.props.leaders.errMess){
            if(this.props.dishes.errMess)
                errMessage = this.props.dishes.errMess;
            else if(this.props.promotions.errMess)
                errMessage = this.props.promotions.errMess;
            else if(this.props.leaders.errMess)
                errMessage = this.props.leaders.errMess;
            
            return(
                <View>
                    <Text>{errMessage}</Text>
                </View>
            );
        }
        else {
        return(
            <ScrollView>
                <RenderItem item={this.props.dishes.dishes.filter((dish)=>dish.featured === true)[0]} isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess}/>
                <RenderItem item={this.props.promotions.promotions.filter((promotion)=>promotion.featured === true)[0]} isLoading={this.props.promotions.isLoading} errMess={this.props.promotions.errMess}/>
                <RenderItem item={this.props.leaders.leaders.filter((leader)=>leader.featured === true)[0]} isLoading={this.props.leaders.isLoading} errMess={this.props.leaders.errMess}/>    
            </ScrollView>
            );
        }
    }
}

export default connect(mapStateToProps)(Home);