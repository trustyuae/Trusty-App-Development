import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SkeletonLoader = ({ count }) => {
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    const opacityAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          delay: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 500,
          delay: 500,
          useNativeDriver: true,
        }),
      ]),
    );

    opacityAnimation.start();

    return () => opacityAnimation.stop(); 
  }, [opacity]);

  return (
    <View style={styles.skeletonContainer}>
      {[...Array(count)].map((_, index) => (
        <Animated.View
          key={index}
          style={[
            styles.skeletonProduct,
            {
              opacity,
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
    borderRadius: 10,
    alignSelf: 'center',
    // marginLeft: wp('1%'),
    marginBottom: hp('2%'),
    overflow: 'hidden',
    flexWrap: 'wrap',
  },
  skeletonProduct: {
    width: wp('45%'),
    height: hp('25%'),
    marginHorizontal: wp('0.8%'),
    marginBottom: hp('2%'),
    backgroundColor: '#E1E1E1',
    borderRadius: 8,
  },
});

export default SkeletonLoader;
