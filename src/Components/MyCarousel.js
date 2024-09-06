// import { Dimensions, View, Image, StyleSheet, ScrollView } from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   interpolate,
//   Extrapolate,
// } from 'react-native-reanimated';

// // const PaginationItem = ({ index, length, animValue, isRotate }) => {
// //   const width = 10;

// //   const animStyle = useAnimatedStyle(() => {
// //     let inputRange = [index - 1, index, index + 1];
// //     let outputRange = [-width, 0, width];

// //     if (index === 0 && animValue?.value > length - 1) {
// //       inputRange = [length - 1, length, length + 1];
// //       outputRange = [-width, 0, width];
// //     }

// //     return {
// //       transform: [
// //         {
// //           translateX: interpolate(
// //             animValue.value,
// //             inputRange,
// //             outputRange,
// //             Extrapolate.CLAMP,
// //           ),
// //         },
// //       ],
// //     };
// //   });

// //   return (
// //     <View
// //       style={{
// //         backgroundColor: '#F0E9DE',
// //         width,
// //         borderWidth: 1,
// //         borderColor: '#000000',
// //         height: width,
// //         borderRadius: 50,
// //         marginLeft: 10,
// //         overflow: 'hidden',
// //         transform: [
// //           {
// //             rotateZ: isRotate ? '90deg' : '0deg',
// //           },
// //         ],
// //       }}>
// //       <Animated.View
// //         style={[
// //           {
// //             borderRadius: 50,
// //             backgroundColor: '#676766',
// //             borderColor: '#676766',
// //             borderWidth: 1,
// //             flex: 1,
// //           },
// //           animStyle,
// //         ]}
// //       />
// //     </View>
// //   );
// // };

// function MyCarousel({ views }) {
//   const width = Dimensions.get('window').width;
//   const progressValue = useSharedValue(0);


//   const lineAnimStyle = useAnimatedStyle(() => {
//     return {
//       width: `${interpolate(
//         progressValue.value,
//         [0, views.length - 1],
//         [0, 100], // Line starts at 0% and ends at 100% of the container's width
//         Extrapolate.CLAMP
//       )}%`,
//       backgroundColor: '#000000', // Set the color of the line to black
//     };
//   });

//   return (
//     <View style={styles.container}>
//       <Carousel
//         loop
//         width={width}
//         height={width / 0.7}
//         data={views}
//         onProgressChange={(_, absoluteProgress) =>
//           (progressValue.value = absoluteProgress)
//         }
//         renderItem={({ item }) => (
//           <View
//             style={{
//               flex: 1,
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Image source={{ uri: item?.src }} style={styles.Imgcontainer} />
//           </View>
//         )}
//       />
//       <View style={styles.paginationContainer}>
//         <Animated.View style={[styles.paginationLine, lineAnimStyle]} />
//       </View>
//     </View>
//   );
// }

// export default MyCarousel;

// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//   },
//   Imgcontainer: {
//     width: '100%',
//     height: hp('50%'),
//     objectFit: 'cover',
//   },
//   paginationContainer: {
//     position: 'absolute',
//     bottom: hp('12%'),
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//   },
//   paginationLine: {
//     height: '100%',
//     backgroundColor: '#000000', // Black color for the active part of the line
//   },
// });






import React, { useState } from 'react';
import { Dimensions, View, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
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
import Modal from 'react-native-modal';
import ImageZoom from 'react-native-image-zoom-viewer';
import { globalColors } from '../Assets/Theme/globalColors';
import Icon from 'react-native-vector-icons/MaterialIcons';

function MyCarousel({ views }) {
  const width = Dimensions.get('window').width;
  const progressValue = useSharedValue(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  // Animated style for the black line
  const lineAnimStyle = useAnimatedStyle(() => {
    return {
      width: `${interpolate(
        progressValue.value,
        [0, views.length - 1],
        [0, 100], // Line starts at 0% and ends at 100% of the container's width
        Extrapolate.CLAMP
      )}%`,
      backgroundColor: '#000000', // Set the color of the line to black
    };
  });

  const handleImagePress = (uri) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={hp('50%')}
        data={views}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        renderItem={({ item }) => (
          <View

          >
            <Pressable onPress={() => handleImagePress(item?.src)}>

              <Image source={{ uri: item?.src }} style={styles.Imgcontainer} />
            </Pressable>

          </View>
        )}
      />
      <View style={styles.paginationContainer}>
        <Animated.View style={[styles.paginationLine, lineAnimStyle]} />
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <ImageZoom
            imageUrls={[{ url: selectedImage }]}
            enableSwipeDown={true}
            onSwipeDown={() => setModalVisible(false)}
            renderIndicator={() => null} // Hide default indicator
          />
          <TouchableOpacity style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            {/* <Image source={require('../Assets/close-icon.png')} style={styles.closeIcon} /> */}
            <Icon
              name="arrow-back"
              size={25}
              color="#111"
            // style={{ marginLeft: 8 }}
            // onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View >
  );
}

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: hp('8')
  },
  Imgcontainer: {
    width: '100%',
    height: hp('50%'),
    objectFit: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: hp('0%'), // Position the line closer to the bottom of the image
    width: '100%',
    height: 4, // Set the height of the line
    backgroundColor: '#F0E9DE', // Light background for visibility
  },
  paginationLine: {
    height: '100%',
    backgroundColor: '#000000', // Black color for the active part of the line
  },
  modal: {
    margin: 0,
    // justifyContent: 'center',
    backgroundColor: globalColors.white
    // alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
