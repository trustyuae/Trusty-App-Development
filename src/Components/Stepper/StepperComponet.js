import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { globalColors } from '../../Assets/Theme/globalColors';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const StepperComponent = ({ labels, count, setCount }) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    setCurrentPosition(count);
  }, [count]);

  const getBackgroundColor = (position) => {
    return count === position ? globalColors.lightgold : '#fff';
  };

  const getTextColor = (position) => {
    return count === position ? globalColors.white : globalColors.textColorLogin;
  };

  const getTextweight = (position) => {
    return count === position ? '700' : '400';
  };

  const shouldShowIcon = count === 1;

  return (
    <View>
      {shouldShowIcon && (
        <Icon
          name={'arrow-left'}
          size={25}
          color="black"
          style={{
            position: 'absolute',
            left: 10,
            top: -45,
          }}
          onPress={() => setCount(pre => (count >= 2 ? 0 : pre - 1))} // Adjusting logic to handle decrement
        />
      )}
      <View style={{
        marginLeft: wp('4%'),
        marginRight: wp('4%'),
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        overflow: 'hidden',
        alignSelf: 'center',
      }}>
        {labels.map((label, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              backgroundColor: getBackgroundColor(index),
              paddingVertical: wp('3%'),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              borderColor: globalColors.lightgold,
              borderWidth: count === index ? 2 : 0,
            }}>
            <Text
              style={{
                color: getTextColor(index),
                fontWeight: getTextweight(index),
                fontSize: 16,
              }}>
              {label}
            </Text>
          </View>
        ))}
      </View>
    </View>

  );
};

export default StepperComponent;
