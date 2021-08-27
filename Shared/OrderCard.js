import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from 'native-base';
import { FontAwesome as Icon } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TrafficLight from './StyledComponents/TrafficLight.js'
import EasyButton from './StyledComponents/EasyButton.js';
import baseURL from '../assets/common/baseUrl.js';
import { order } from 'styled-system';

const codes = [
    {name: "pending", code: "3"},
    {name: "shipped", code: "2"},
    {name: "delivered", code: "1"}
]

const OrderCard = ( props ) => {

    const [orderStatus, setOrderStatus] = useState();
    const [statusText, setStatusText] = useState();
    const[statusChange, setStatusChange] = useState();
    const [token, setToken] = useState();
    const [cardColor, setCardColor] = useState();

    useEffect(() => {

        if (props.editMode) {
            AsyncStorage.getItem('jwt') 
            .then(( res ) => setToken(res))
            .catch(( err ) => console.log(err))
        }
        

        if (props.status == "3") {
            setOrderStatus(<TrafficLight unavailable></TrafficLight>)
            setStatusText("pending")
            setCardColor('#E74C3C')
        } else if (props.status == "2") {
            setOrderStatus(<TrafficLight limited></TrafficLight>)
            setStatusText("shipped")
            setCardColor('#F1C40F')
        } else {
            setOrderStatus(<TrafficLight available></TrafficLight>)
            setStatusText("delivered")
            setCardColor('#2ECC71')
        }

        return () => {
            setOrderStatus()
            setStatusText()
            setCardColor()
        }
    }, []);

    const updateOrder = () => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const order = {
            city: props.city,
            country: props.country,
            dateOrdered: props.dateOrdered,
            id: props.id,
            orderItems: props.orderItems,
            phone: props.phone,
            shippingAddress1: props.shippingAddress1,
            shippingAddress2: props.shippingAddress2,
            status: statusChange,
            totalPrice: props.totalPrice,
            user: props.user,
            zip: props.zip
        };

        axios.put(`${baseURL}orders/${props.id}`, order, config)
            .then(( res ) => {
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Order Updated",
                        text2: ""
                    })
                    setTimeout(() => {
                        props.navigation.navigate('Orders')
                           
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
    }

    return (
        <View style={[styles.container, {backgroundColor: cardColor}]}>
            <View style={styles.container}>
                <Text >Order Number: ${props.id}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Text>
                    Status: {statusText} {orderStatus}
                </Text>
                <Text>
                    Address: {props.shippingAddress1} {props.shippingAddress2}
                </Text>
                <Text>
                    City: {props.city}
                </Text>
                <Text>
                    Country: {props.country}
                </Text>
                <Text>
                    Date Ordered: {props.dateOrdered.split("T")[0]}
                </Text>
                <View style={styles.priceContainer}>
                    <Text>Price: </Text>
                    <Text style={styles.price}>{props.totalPrice}</Text>
                </View>
                {!props.editMode?
                null
                : 
                <View>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon color={'#007aff'} name="arrow-down"/>}
                    style={{ width: undefined}}
                    selectedValue={statusChange}
                    placeholder="Change Status"
                    placeholderIconColor={{ color: "#007aff" }}
                    onValueChange={(e) => setStatusChange(e)}
                >
                {codes.map((c) => {
                    return (
                        <Picker.Item key={c.code} label={c.name} value={c.code} />
                    )
                })}
                </Picker>
                <EasyButton
                    secondary
                    large
                    onPress={() => updateOrder()}
                >
                    <Text style={{color: 'white'}}>Update</Text>
                </EasyButton>
                </View>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
        borderRadius: 10
    },
    title: {
        backgroundColor: "#62B1F6",
        padding: 5
    },
    priceContainer: {
        marginTop: 10,
        alignSelf: 'flex-end',
        flexDirection: 'row'
    },
    price: {
        color: 'white',
        fontWeight: 'bold'
    }
})

export default OrderCard;
