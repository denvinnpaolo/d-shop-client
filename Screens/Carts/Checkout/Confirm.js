import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import { Text, Left, Right, ListItem, Thumbnail, Body } from 'native-base';
import axios from 'axios';
import Toast from 'react-native-toast-message';

// Redux
import {connect} from 'react-redux';
import * as actions from '../../../Redux/Actions/cartActions.js';

import baseURL from '../../../assets/common/baseUrl.js';

var { height, width } = Dimensions.get('window')

const Confirm = props => {


    const finalOrder = props.route.params;

    const [productUpdate, setProductUpdate] = useState();

    useEffect(() => {
        if(finalOrder) {
            getProducts(finalOrder);
        }
        return () => {
        setProductUpdate();
        };
    }, [props]);

    const getProducts = (x) => {
        const order = x.order.order;
        var products = [];
        if(order) {
            order.orderItems.forEach((cart) => {
                axios
                  .get(`${baseURL}products/${cart.product}`)
                  .then((data) => {
                    products.push(data.data.product);
                    setProductUpdate(products);
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              });
        }
    };
    

    const confirmOrder = () => {

        const order = finalOrder.order.order;

        axios.post(`${baseURL}orders`, order)
            .then(( res ) => {
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Order Completed",
                        text2: ""
                    })

                    setTimeout(() => {
                        props.navigation.navigate('Cart')   
                    }, 500)
                }
            })
            .catch(( err ) => {
                Toast.show({
                    topOffset: 60,
                    type: 'error',
                    text1: 'Something went wrong',
                    text2: 'Please try again'
                })
                console.log(error)
            })


        setTimeout(() => {
            props.clearCart();
            props.navigation.navigate('Cart')
        }, 500)
    }

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{fontSize: 20, fontWeight: 'bold' }} >Confirm Order</Text>
                {finalOrder? (
                    <View style={{borderWidth: 1, borderColor: 'orange'}} >
                        <Text  style={styles.title}>Shipping to:</Text>
                        <View style={{padding: 8}} >
                            <Text>Address: {finalOrder.order.order.shippingAddress1}</Text>
                            <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
                            <Text>City: {finalOrder.order.order.city}</Text>
                            <Text>Zip Code: {finalOrder.order.order.zip}</Text>
                            <Text>Country: {finalOrder.order.order.country}</Text>
                        </View>
                        <Text style={styles.title}>Items:</Text>
                        {productUpdate && (
                            <React.Fragment>
                              {productUpdate.map((x) => {
                                return (
                                  <ListItem style={styles.listItem} key={x.name} avatar>
                                    <Left>
                                      <Thumbnail source={{ uri: x.image }} />
                                    </Left>
                                    <Body style={styles.body}>
                                      <Left>
                                        <Text>{x.name}</Text>
                                      </Left>
                                      <Right>
                                        <Text>$ {x.price}</Text>
                                      </Right>
                                    </Body>
                                  </ListItem>
                                );
                              })}
                            </React.Fragment>
                          )}
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