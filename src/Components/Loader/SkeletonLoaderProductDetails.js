import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SkeletonLoaderProductDetails = () => {
    const translateX = useRef(new Animated.Value(-wp('40%'))).current;
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: wp('100%'),
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    duration: 800,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [translateX, opacity]);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.imageSkeleton, { opacity }]} />
            <View style={styles.contentContainer}>
                <Animated.View style={[styles.titleSkeleton, { opacity }]} />
                <Animated.View style={[styles.priceSkeleton, { opacity }]} />
                <Animated.View style={[styles.statusSkeleton, { opacity }]} />
                <Animated.View style={[styles.accordionSkeleton, { opacity }]} />
            </View>
            <View style={styles.perfectPartnerContainer}>
                <Animated.View style={[styles.partnerTitleSkeleton, { opacity }]} />
                <View style={styles.productsContainer}>
                    {[...Array(4)].map((_, index) => (
                        <View key={index} style={styles.productSkeletonWrapper}>
                            <Animated.View
                                style={[
                                    styles.productSkeleton,
                                    {
                                        transform: [{ translateX }],
                                    },
                                ]}
                            />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: wp('3%'),
        padding: 10,
    },
    imageSkeleton: {
        height: hp('60%'),
        backgroundColor: '#E0E0E0',
        marginBottom: hp('2%'),
    },
    contentContainer: {
        marginHorizontal: wp('3%'),
        marginBottom: hp('2%'),
    },
    titleSkeleton: {
        width: wp('60%'),
        height: hp('2.5%'),
        backgroundColor: '#E0E0E0',
        marginBottom: hp('1%'),
    },
    priceSkeleton: {
        width: wp('30%'),
        height: hp('2%'),
        backgroundColor: '#E0E0E0',
        marginBottom: hp('1%'),
    },
    statusSkeleton: {
        width: wp('20%'),
        height: hp('2%'),
        backgroundColor: '#E0E0E0',
        marginBottom: hp('1%'),
    },
    accordionSkeleton: {
        height: hp('15%'),
        backgroundColor: '#E0E0E0',
        marginBottom: hp('2%'),
    },
    perfectPartnerContainer: {
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
        paddingTop: hp('2%'),
    },
    partnerTitleSkeleton: {
        width: wp('50%'),
        height: hp('3%'),
        backgroundColor: '#E1E9EE',
        alignSelf: 'center',
        marginBottom: hp('2%'),
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
    },
    productSkeletonWrapper: {
        width: wp('40%'),
        height: hp('18%'),
        backgroundColor: '#E1E9EE',
        margin: 10,
        borderRadius: 4,
        overflow: 'hidden',
    },
    productSkeleton: {
        height: '100%',
        backgroundColor: '#F0F0F0',
        borderRadius: 4,
    },
});

export default SkeletonLoaderProductDetails;
