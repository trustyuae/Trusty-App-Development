import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { globalColors } from '../../Assets/Theme/globalColors';

const SkeletonLoaderOrderDetails = ({ count }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        startAnimation();
    }, []);

    const startAnimation = () => {
        Animated.loop(
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    };

    const skeletons = Array.from({ length: count }).map((_, index) => (
        <Animated.View
            key={index}
            style={[
                styles.container,
                {
                    opacity: fadeAnim.interpolate({
                        inputRange: [0, 3],
                        outputRange: [0.5, 1],
                    }),
                },
            ]}
        >
            <View style={styles.productContainer}>
                <View style={styles.imageSkeleton}></View>
                <View style={styles.detailsContainer}>
                    <View style={styles.nameSkeleton}></View>
                    <View style={styles.textSkeleton}></View>
                    <View style={styles.textSkeleton}></View>
                    <View style={styles.textSkeleton}></View>
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.headingSkeleton}></View>
                <View style={styles.textSkeleton}></View>
                <View style={styles.textSkeleton}></View>
                <View style={styles.textSkeleton}></View>
                <View style={styles.textSkeleton}></View>
                <View style={styles.textSkeleton}></View>
            </View>
            <View style={styles.section}>
                <View style={styles.subHeadingSkeleton}></View>
                <View style={styles.textSkeleton}></View>
                <View style={styles.textSkeleton}></View>
                <View style={styles.textSkeleton}></View>
                <View style={styles.textSkeleton}></View>
            </View>
            <View style={styles.section}>
                <View style={styles.subHeadingSkeleton}></View>
                <View style={styles.textSkeleton}></View>
                <View style={styles.textSkeleton}></View>
                <View style={styles.textSkeleton}></View>
                <View style={styles.textSkeleton}></View>
            </View>
        </Animated.View>
    ));

    return <>{skeletons}</>;
};

const styles = StyleSheet.create({
    container: {
        marginBottom: hp('2%'),
        height: hp('90%'),
        width: wp('90%'),
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        shadowColor: globalColors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    productContainer: {
        flexDirection: 'row',
        marginBottom: hp('2%'),
        padding: 30,
    },
    imageSkeleton: {
        width: 120,
        height: 120,
        paddingLeft: 10,
        backgroundColor: globalColors.white,
        marginRight: wp('5%'),
        borderRadius: 10,
    },
    detailsContainer: {
        flex: 1,
    },
    nameSkeleton: {
        height: 20,
        width: '80%',
        backgroundColor: globalColors.white,
        marginBottom: hp('1%'),
        marginLeft: wp('2%'),
        borderRadius: 5,
    },
    section: {
        marginBottom: hp('2%'),
    },
    headingSkeleton: {
        height: 30,
        width: '50%',
        backgroundColor: globalColors.white,
        marginBottom: hp('1%'),
        marginLeft: wp('2%'),
        borderRadius: 5,
    },
    subHeadingSkeleton: {
        height: 20,
        width: '40%',
        backgroundColor: globalColors.white,
        marginBottom: hp('1%'),
        marginLeft: wp('2%'),
        borderRadius: 5,
    },
    textSkeleton: {
        height: 18,
        width: '90%',
        marginLeft: wp('2%'),
        backgroundColor: globalColors.white,
        marginBottom: hp('1%'),
        borderRadius: 5,
    },
});

export default SkeletonLoaderOrderDetails;
