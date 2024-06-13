import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SkeletonLoaderProducts = () => {
    const animation = new Animated.Value(0);

    Animated.loop(
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            easing: Animated.Linear,
            useNativeDriver: true, // Add this line

        }),
    ).start();

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 10],
    });

    return (
        <View style={styles.skeletonContainer}>
            {[...Array(4)].map((_, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.skeletonProduct,
                        {
                            transform: [{ translateX }],
                        },
                    ]}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    skeletonContainer: {
        flexDirection: 'row',
        marginLeft: 5,
        borderRadius: 10,
        marginBottom: hp('2%'), overflow: 'hidden',
        flexWrap: 'wrap'
    },
    skeletonProduct: {
        width: wp('46%'),
        height: hp('25%'),
        marginHorizontal: wp('1%'),
        marginBottom: hp('2%'),
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
    },
});

export default SkeletonLoaderProducts;