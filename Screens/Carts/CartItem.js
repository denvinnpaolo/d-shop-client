import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {Text, Left, Right, ListItem, Thumbnail, Body} from 'native-base';


var backupImg = 'https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png';

const CartItem = props => {
    
    const data = props.item.item;
    const [quantity, setQuantity] = useState(props.item.quantity)

    return(
        <ListItem 
            style={styles.listitem}
            key={Math.random()}
            avatar
        >
            <Left>
                <Thumbnail  source={{uri: data.image? data.image : backupImg}}/>
            </Left>
            <Body style={styles.body}>
                <Left>
                    <Text>{data.name}</Text>
                </Left>
                <Right>
                    <Text>${data.price}</Text>
                </Right>
            </Body>
        </ListItem>
    )
};


const styles = StyleSheet.create({
    listItem: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    body: {
        paddingRight: 10,
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        height: '100%',
    }
})
export default CartItem;