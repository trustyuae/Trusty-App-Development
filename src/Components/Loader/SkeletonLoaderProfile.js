import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SkeletonLoaderProfile = () => {
    return (
        <View style={styles.container}>
            {/* Profile Information Skeleton */}
            <View style={styles.skeletonBlock}></View>
            <View style={styles.skeletonBlock}></View>
            <View style={styles.skeletonBlock}></View>
            <View style={styles.skeletonBlock}></View>
            <View style={styles.skeletonBlock}></View>
            <View style={styles.skeletonBlock}></View>
            {/* Shipping Address Skeleton */}
            <View style={styles.skeletonBlock}></View>
            <View style={styles.skeletonBlock}></View>
            <View style={styles.skeletonBlock}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
         padding: 20,
        // marginTop: Platform.OS === 'ios' ? hp('21%') : hp('2%'),
    },
    skeletonBlock: {
        backgroundColor: '#E0E0E0',
        height: 30,
        marginBottom: 30,
        borderRadius: 5,
    },
});

export default SkeletonLoaderProfile;
