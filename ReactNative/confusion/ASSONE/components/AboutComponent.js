import React, { Component } from 'react';
import { FlatList, ScrollView, View, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';

function RenderHistory(props){
    return(
        <Card title="Our History">
            <Text style={{padding: 5, fontSize: 12}}>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</Text>
            <Text style={{padding: 5, fontSize: 12}}>The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</Text>
        </Card>
    );
}

const renderLeaderItem = ({item, index})=>{
    return(
        <ListItem key={index} title={item.name} 
            subtitle={
                <View>
                    <Text>{item.designation}</Text>
                    <Text>{item.description}</Text>
                </View>
            } hideChevron={true} leftAvatar={ {source: require('./images/alberto.png')}}/>
    );
    
}

function RenderLeaders(props){
    return(
        <Card title="Corporate Leadership">
            <FlatList data={props.leaders} renderItem={renderLeaderItem} keyExtractor={(item)=>item.id.toString()}/>
        </Card>
    );
}

class About extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            leaders: LEADERS
        };
    }
    
    static navigationOptions = {
        title: 'About Us'  
    };
    
    render(){
        return(
            <ScrollView>
                <RenderHistory />
                <RenderLeaders leaders={this.state.leaders}/>
            </ScrollView>
        );
    }
}

export default About;