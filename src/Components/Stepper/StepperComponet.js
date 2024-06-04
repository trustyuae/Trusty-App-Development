import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const customStyles = {
  // stepIndicatorSize: 15,
  // currentStepIndicatorSize: 15,
  // separatorStrokeWidth: 2,
  // currentStepStrokeWidth: 6,
  // stepStrokeCurrentColor: '#444444',
  // stepStrokeWidth: 2,
  // stepStrokeFinishedColor: '#444444',
  // stepStrokeUnFinishedColor: '#444444',
  // separatorFinishedColor: '#444444',
  // separatorUnFinishedColor: '#aaaaaa',
  // stepIndicatorFinishedColor: '#444444',
  // stepIndicatorUnFinishedColor: '#f6f1eb',
  // stepIndicatorCurrentColor: '#444444',
  // stepIndicatorLabelFontSize: 0,
  // currentStepIndicatorLabelFontSize: 0,
  // // stepIndicatorLabelCurrentColor: 'red',
  // // stepIndicatorLabelFinishedColor: '#ffffff',
  // // stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  // // labelColor: '#676766',
  // labelSize: 13,
  // currentStepLabelColor: '#262525',

  stepIndicatorSize: 15,
  currentStepIndicatorSize: 15,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: '#444444',
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: '#444444',
  stepStrokeUnFinishedColor: '#444444',
  separatorFinishedColor: '#444444',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#444444',
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

const StepperComponet = ({ labels, count, stepCount }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  useEffect(() => {
    setCurrentPosition(count);
  }, [count]);

  const onPageChange = position => {
    setCurrentPosition(position);
  };

  const renderLabel = ({ position, stepStatus, label, currentPosition }) => {
    return (
      <SafeAreaView style={{ alignItems: 'center', margin: -48 }}>
        <Text
          style={{ color: position === currentPosition ? '#262525' : '#676766' }}>
          {label}
        </Text>
      </SafeAreaView>
    );
  };

  return (
    <StepIndicator
      customStyles={customStyles}
      currentPosition={currentPosition}
      labels={labels}
      stepCount={stepCount}
      renderLabel={renderLabel}
    />
  );
};

export default StepperComponet;
