import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Animated } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const customStyles = {
    stepIndicatorSize: 40,
    currentStepIndicatorSize: 50,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: 'green',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: 'green',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: 'green',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: 'green',
    stepIndicatorUnFinishedColor: '#f6f1eb',
    stepIndicatorCurrentColor: '#444444',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#7eaec4',
};

const icons = {
    'Order Placed': 'cart-outline',
    'Order Confirmed': 'check-outline',
    'Order Shipped': 'truck-outline',
    'Out for Delivery': 'map-marker-outline',
    'Delivered': 'home-outline'
};

const StepperComponentTracking = ({ statusTimeline }) => {
    const [currentPosition, setCurrentPosition] = useState(0);
    const [fadeAnim] = useState(new Animated.Value(0));  // Initial value for opacity: 0

    useEffect(() => {
        const currentStep = statusTimeline.findIndex(status => !status.completed);
        setCurrentPosition(currentStep === -1 ? statusTimeline.length - 1 : currentStep);

        // Fade in animation
        Animated.timing(fadeAnim, {
            toValue: 2,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [statusTimeline, fadeAnim]);

    const renderLabel = ({ position, stepStatus, label, currentPosition }) => {
        const status = statusTimeline[position];
        return (
            <SafeAreaView style={{ marginLeft: 20, alignItems: 'center', marginVertical: 30 }}>
                <Text style={{ color: position === currentPosition ? '#262525' : '#676766', fontFamily: 'Intrepid Regular' }}>
                    {label}
                </Text>
                {status.time && (
                    <Text style={{ color: position === currentPosition ? '#262525' : '#676766', fontSize: 12, fontFamily: 'Intrepid Regular' }}>
                        {status.time}
                    </Text>
                )}
            </SafeAreaView>
        );
    };

    const renderStepIndicator = params => {
        const iconName = icons[statusTimeline[params.position].title];
        return (
            <Icon
                name={iconName}
                size={params.stepStatus === 'current' ? 30 : 20}
                color={params.stepStatus === 'finished' ? '#ffffff' : '#444444'}
            />
        );
    };

    const labels = statusTimeline.map(status => status.title);

    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            <StepIndicator
                customStyles={customStyles}
                currentPosition={currentPosition}
                labels={labels}
                stepCount={statusTimeline.length}
                renderLabel={renderLabel}
                renderStepIndicator={renderStepIndicator}
                direction="vertical"
            />
        </Animated.View>
    );
};

export default StepperComponentTracking;
