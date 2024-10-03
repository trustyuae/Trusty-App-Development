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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); 

  const lineAnimStyle = useAnimatedStyle(() => {
    return {
      width: `${interpolate(
        progressValue.value,
        [0, views.length - 1],
        [0, 100],
        Extrapolate.CLAMP
      )}%`,
      backgroundColor: '#000000',
    };
  });

  const handleImagePress = (index) => {
    setSelectedImageIndex(index); 
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
        onSnapToItem={(index) => setSelectedImageIndex(index)} // Update the image index on swipe
        renderItem={({ item, index }) => (
          <View>
            <Pressable onPress={() => handleImagePress(index)}>
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
            imageUrls={views.map((item) => ({ url: item.src }))} 
            enableSwipeDown={true}
            onSwipeDown={() => setModalVisible(false)}
            index={selectedImageIndex} 
            renderIndicator={() => null} 
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Icon name="arrow-back" size={25} color="#111" />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default MyCarousel;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: hp('8'),
  },
  Imgcontainer: {
    width: '100%',
    height: hp('50%'),
    objectFit: 'cover',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: hp('0%'),
    width: '100%',
    height: 4,
    backgroundColor: '#F0E9DE',
  },
  paginationLine: {
    height: '100%',
    backgroundColor: '#000000',
  },
  modal: {
    margin: 0,
    backgroundColor: globalColors.white,
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
