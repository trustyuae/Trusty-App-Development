import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const SkeletonLoaderOrder = ({ count }) => {
    const animation = new Animated.Value(0);

    Animated.loop(
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            easing: Animated.Ease,
            useNativeDriver: true,
        }),
    ).start();

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [-wp('100%'), wp('100%')],
    });

    return (
        <View style={styles.skeletonContainer}>
            {[...Array(count)].map((_, index) => (
                <View key={index} style={styles.skeletonProduct}>
                    <Animated.View
                        style={[
                            styles.shimmer,
                            {
                                transform: [{ translateX }],
                            },
                        ]}
                    >
                        <View style={styles.gradient} />
                    </Animated.View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    skeletonContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: hp('2%'),
        overflow: 'hidden',
        flexWrap: 'wrap',
    },
    skeletonProduct: {
        width: wp('95%'),
        paddingLeft: wp('5%'),
        paddingRight: wp('5%'),
        height: hp('18%'),
        marginHorizontal: wp('1%'),
        marginBottom: hp('2%'),
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
        overflow: 'hidden',
    },
    shimmer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent',
    },
    gradient: {
        flex: 1,
        backgroundColor: 'linear-gradient(90deg, #E0E0E0 25%, #F0F0F0 50%, #E0E0E0 75%)',
    },
});

export default SkeletonLoaderOrder;
