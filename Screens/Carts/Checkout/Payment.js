import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { Container, Header, Content, ListItem, Text, Radio, Right, Left, Body, Picker, Title } from 'native-base';
import { EvilIcons as Icon, Ionicons as Check} from '@expo/vector-icons';

const methods = [
    {name: "Cash on Delivery", value: 1},
    {name: "Bank Transfer", value: 2},
    {name: 'Card Payment', value: 3}
];

const paymentCard = [
    {name: "Wallet", value: 1},
    {name: "Visa", value: 2},
    {name: "MasterCard", value: 3},
    {name: "Other", value: 4}
]

const Payment = props => {
    
    const order = props.route.params;

    const [selected, setSelected] = useState();
    const [card, setCard] = useState();
    

    return(
        <Container>
            <Header>
                <Body>
                    <Title>Choose your payment method</Title>
                </Body>
            </Header>
            <Content>
                {methods.map((item, idx) => {
                    return (
                        <ListItem key={idx} onPress={() => setSelected(item.value)}>
                            <Left>
                                <Text>{item.name}</Text>
                            </Left>
                            <Right>
                                {selected == item.value? <Check name="md-checkmark"  /> : null}
                            </Right>
                        </ListItem>
                    )
                })}
                {selected === 3 ? (
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name={"chevron-down"}/>}
                        headerStyle={{backgroundColor: 'orange'}}
                        headerBackButtonTextStyle={{ color: '#fff' }}
                        headerTitleStyle={{ color: '#fff' }}
                        selectedValue={card}
                        onValueChange={(x) => setCard(x)}
                    >   
                        {paymentCard.map((c, cIdx) => {
                            return (
                                <Picker.Item label={c.name} value={c.name} key={cIdx} iosIcon={<Check name="md-checkmark"  />}/>
                            )
                        })}
                    </Picker>
                ) : null}
                <View style={{marginTop: 60, alignSelf:'center' }}>
                        <Button title={"Confirm"} onPress={() => props.navigation.navigate("Confirm", { order })} />
                </View>
            </Content>
        </Container>
    )
};

export default Payment;