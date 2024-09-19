import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalColors } from '../Assets/Theme/globalColors';

const FloatingLabelInput = ({ label, value, onChangeText, isRequired = true }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [labelPosition] = useState(new Animated.Value(value ? 1 : 0));

    useEffect(() => {
        // Animate label when value or focus changes
        Animated.timing(labelPosition, {
            toValue: value || isFocused ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [value, isFocused]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!value) {
            setIsFocused(false);
        }
    };

    const labelStyle = {
        position: 'absolute',
        left: hp('3%'), // Adjust this to match input padding
        top: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [hp('3%'), 5], // Adjust these values to position the label
        }),
        fontSize: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [14, 12], // Adjust font sizes
        }),
        color: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [globalColors.textColorLogin, globalColors.buttonBackground], // Adjust colors
        }),
        backgroundColor: globalColors.white, // Prevent overlap with input text
        paddingHorizontal: hp('1%'), // Adjust padding to fit label
    };
    const handlePressOutside = () => {
        Keyboard.dismiss();
        handleFocus();
        handleBlur();
    };

    return (
        <TouchableWithoutFeedback onPress={handlePressOutside}>
            <View style={{ paddingTop: hp('2%'), }}>
                <Animated.Text style={labelStyle}>
                    {label}
                    {isRequired && <Text style={{ color: 'red' }}>*</Text>}
                </Animated.Text>
                <TextInput
                    style={[styles.input, isFocused && styles.inputFocused]}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder=""
                />
            </View>
        </TouchableWithoutFeedback >
    );
};

const styles = StyleSheet.create({
    input: {
        height: hp('5%'),
        fontFamily: 'Product Sans',
        paddingLeft: hp('3%'),
        fontSize: 14,
        fontWeight: '400',
        color: globalColors.buttonBackground,
        // backgroundColor: globalColors.white,
        // borderBottomWidth: 1,
        borderBottomColor: globalColors.inputBorder, // Adjust if needed
    },
    inputFocused: {
        borderBottomColor: globalColors.buttonBackground, // Change border color when focused
    },
});

export default FloatingLabelInput;
