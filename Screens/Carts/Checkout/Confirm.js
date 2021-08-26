import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import { Text, Left, Right, ListItem, Thumbnail, Body } from 'native-base';

import {connect} from 'react-redux';

import * as actions from '../../../Redux/Actions/cartActions.js';
import { flexDirection } from 'styled-system';

var { height, width } = Dimensions.get('window')

const Confirm = props => {

    const confirm = props.route.params;

    const confirmOrder = () => {
        setTimeout(() => {
            props.clearCart();
            props.navigation.navigate('Cart')
        }, 500)
    }

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{fontSize: 20, fontWeight: 'bold' }} >Confirm Order</Text>
                {confirm? (
                    <View style={{borderWidth: 1, borderColor: 'orange'}} >
                        <Text  style={styles.title}>Shipping to:</Text>
                        <View style={{padding: 8}} >
                            <Text>Address: {confirm.order.order.shippingAddress1}</Text>
                            <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
                            <Text>City: {confirm.order.order.city}</Text>
                            <Text>Zip Code: {confirm.order.order.zip}</Text>
                            <Text>Country: {confirm.order.order.country}</Text>
                        </View>
                        <Text style={styles.title}>Items:</Text>
                        {confirm.order.order.orderItems.map((item, itemIdx) => {
                            return (
                                <ListItem 
                                    style={styles.listItem}
                                    key={itemIdx}
                                    avatar
                                >
                                <Left>
                                    <Thumbnail  source={{uri: item.product.image}}/>
                                </Left>
                                <Body style={styles.body}>
                                    <Left>
                                        <Text>{item.product.name}</Text>
                                    </Left>
                                    <Right>
                                        <Text>${item.product.price}</Text>
                                    </Right>
                                </Body>
                                </ListItem>
                            )
                        })}
                    </View>
                    
                ) : null}
            <View s>
                <Button  title={"Place order"}  onPress={() => confirmOrder()}/>
            </View>
            </View>
        </ScrollView>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart())
    }
}

const styles = StyleSheet.create({
    container: {
        height: height,
        padding: 8,
        alignContent: 'center',
        backgroundColor: 'white'
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    title: {
        alignSelf: 'center',
        margin: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    listItem: {
        width: width / 1.2,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    body: {
        margin: 10,
        alignItems: 'center',
        flexDirection: 'row'
    }
})

export default connect(null, mapDispatchToProps)(Confirm);