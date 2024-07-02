import {Dimensions, View, Image, StyleSheet, ScrollView} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const PaginationItem = ({index, length, animValue, isRotate}) => {
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue.value,
            inputRange,
            outputRange,
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <View
      style={{
        backgroundColor: '#F0E9DE',
        width,
        borderWidth: 1,
        borderColor: '#000000',
        height: width,
        borderRadius: 50,
        marginLeft: 10,
        overflow: 'hidden',
        transform: [
          {
            rotateZ: isRotate ? '90deg' : '0deg',
          },
        ],
      }}>
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor: '#676766',
            borderColor: '#676766',
            borderWidth: 1,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

function MyCarousel({views}) {
  const width = Dimensions.get('window').width;
  const progressValue = useSharedValue(0);

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={width / 0.7}
        data={views}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={{uri: item?.src}} style={styles.Imgcontainer} />
          </View>
        )}
      />
      <View style={styles.paginationContainer}>
        {views?.map((_, index) => (
          <PaginationItem
            animValue={progressValue}
            index={index}
            key={index}
            length={views.length}
          />
        ))}
      </View>
    </View>
  );
}

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  Imgcontainer: {
    width: '100%',
    height: hp('50%'),
    objectFit: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
     bottom: hp('12%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
