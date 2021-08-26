import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';

import Banner1 from '../assets/Banner1.jpeg'
import Banner2 from '../assets/Banner2.jpeg'
import Banner3 from '../assets/Banner3.jpeg'

var { width } = Dimensions.get('window');

const Banner = () => {
    const [bannerData, setBannerData] = useState([]);
    useEffect(() => {
        setBannerData([Banner1, Banner2, Banner3])

        return () => {
            setBannerData([])
        }
    },[])

    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.swiper}>
                    <Swiper
                        style={{ height: width / 2}}
                        showsButtons={false}
                        autoplay={true}
                        autoplayTimeout={2}
                    >
                        {bannerData.map(item => {
                            return(
                                <Image
                                    key={item}
                                    style={styles.imageBanner}
                                    resizeMode='contain'
                                    source={item}
                                />
                            );
                        })}
                    </Swiper>
                    <View style={{ height: 20 }}></View>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gainsboro',
    },
    swiper: {
        width: width,
        alignItems: 'center',
        marginTop: 10
    },
    imageBanner: {
        height: width / 2,
        width: width - 40,
        borderRadius: 10,
        marginHorizontal: 20
    }
})

export default Banner;