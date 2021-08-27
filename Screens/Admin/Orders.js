import React, { useState, useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

import baseURL from '../../assets/common/baseUrl.js';
import OrderCard from '../../Shared/OrderCard.js';


const Orders = props => {

    const [orderList, setOrderList] = useState([]);

    useFocusEffect(
        useCallback(
            () => {
                getOrders();

                return () => {
                    setOrderList();
                }
            },
            []
        )
    )

    const getOrders = () => {
        axios.get(`${baseURL}orders`)
            .then(( o ) => setOrderList(o.data))
            .catch(( err ) => console.log(err))
    }
    return (
        <View>
            <FlatList 
                data={orderList}
                renderItem={({ item }) => (
                    <OrderCard navigation={props.navigation} {...item} editMode={true}/>
                )}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
};

export default Orders;