// PACKAGES
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, ActivityIndicator, FlatList, ScrollView, Dimensions} from 'react-native';
import { Header, Text, Container, Item, Input } from 'native-base';
import { FontAwesome as Icon} from '@expo/vector-icons'
import axios from 'axios';

// COMPONENTS
import ProductList from './ProductList.js';
import SearchProducts from './SearchProducts.js';
import Banner from '../../Shared/Banner.js';
import CategoryFilter from './CategoryFilter.js';


// Backend connection
import baseURL from '../../assets/common/baseUrl.js';


const productsCategories = require('../../assets/data/categories.json');

var { height } = Dimensions.get('window');


const ProductContainer = (props) => {

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true)

    useFocusEffect((
        useCallback(
            () => {
                setFocus(false);
                setActive(-1);
        
            axios.get(`${baseURL}products`)
            .then((res) => {
                setProducts(res.data);
                setProductsFiltered(res.data);
                setProductsCtg(res.data);
                setInitialState(res.data);
                setLoading(false)
            })
            .catch(err => console.log('error: ',err))

            axios.get(`${baseURL}categories`)
            .then((res) => {
                setCategories(res.data)
            })
            .catch(err => console.log(err))
            return () => {
                setProducts([]);
                setProductsFiltered([])
                setFocus()
                setCategories([]);
                setProductsCtg()
                setActive();
                setInitialState();
            }
            },[]
        )
    ))
        
        



    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    };
    const openList = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    const changeCtg = (category) => {
        {
            category === "all"
            ? [setProductsCtg(initialState), setActive(true)]
            : 
            [
                setProductsCtg(
                    products.filter((i) => i.category._id === category),
                    setActive(true)
                ),
            ];
        }
    };

    return(
        <React.Fragment>
        { loading === false?
        (
            <Container style={styles.container}>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="search" style={{paddingLeft: 10}}/>
                        <Input 
                            placeholder="Search"
                            onFocus={openList}
                            onChangeText={(text) => searchProduct(text)}
                        />
                        {focus? 
                            <Icon onPress={onBlur} name="close" style={{paddingRight: 10}}/>
                            :
                            null
                        }
                    </Item>
                </Header>
            {focus? (
                <SearchProducts
                    productsFiltered={productsFiltered}
                    navigation={props.navigation}
                />
            ) 
            :
            (   
            <ScrollView>
            <View>
                <View>
                    <Banner />
                </View>
                <View>
                    <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                    />
                </View>
                {productsCtg? (
                    <View style={styles.listContainer}>
                        {productsCtg.map((item) => {
                            return(
                                <ProductList
                                    navigation={props.navigation}
                                    key={item._id}
                                    item={item}
                                />
                            )
                        })}
                    </View>)
                    :
                    (<View styles={[styles.center, { height: '40%'}]}>
                        <Text>No products found</Text>
                    </View>)
                }
                
            </View>
            </ScrollView>
            )}
            </Container>
        )
        :
        (
           <Container style={[styles.center, { backgroundColor: "#f2f2f2"}]}>
            <ActivityIndicator  size="large" color="red" />
           </Container>
        )
        }</React.Fragment>
        
    )
};


const styles = StyleSheet.create({
    container: {
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
      },
      listContainer: {
        height: height,
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "gainsboro",
      },
      center: {
          justifyContent: 'center',
          alignItems: 'center'
      }
})

export default ProductContainer;