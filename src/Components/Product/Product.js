import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors';
import {Images} from '../../Constants/index';

const Product = ({uri, name, price}) => {
  const initialSaved = true;
  const [saved, setSaved] = useState(initialSaved);

  const toggleSaved = () => {
    console.log('Toggle saved');
    setSaved(!saved);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* {uri ? ( */}

        {/* ) : (
          <Text style={styles.errorText}>Image not available</Text>
        )} */}

        <Image
          style={styles.image}
          source={{
            uri,
          }}
          resizeMode="cover"
        />
        <Pressable onPress={toggleSaved} style={styles.saveImagea}>
          <Image
            style={styles.saveImage}
            source={saved ? Images.saveIconFill : Images.saveIconUnFill}
          />
        </Pressable>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    marginHorizontal: wp('1%'),
    borderRadius: 10,
    marginBottom: hp('2%'),
    overflow: 'hidden',
  },
  imageContainer: {
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // objectFit: 'resizeMode',
    // justifyContent: 'center',
    width: wp('46%'),
    position: 'relative',
    // height: hp('25%'),
    backgroundColor: globalColors.productBackground,
    // gap: 10,
  },
  detailsContainer: {
    height: hp('7%'),
    width: wp('46%'),
    justifyContent: 'center',
    backgroundColor: globalColors.white,
  },
  name: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: wp('2%'),
    textTransform: 'capitalize',
    fontFamily: 'Intrepid Regular',
    color: globalColors.productTextColor,
  },
  price: {
    fontSize: 14.06,
    marginLeft: wp('2%'),
    fontFamily: 'Intrepid Regular',

    color: globalColors.productPriceText,
  },
  saveImagea: {
    position: 'absolute',
    marginTop: wp('3%'),
    // backgroundColor: 'red',
    marginLeft: wp('32%'),

    width: 12,
    height: 14,
    left: 19,
  },
  saveImage: {
    // position: 'absolute',
    // marginLeft: wp('15%'),
    width: 11,
    padding: 4,
    height: 12,
  },
  image: {
    width: wp('46%'),
    height: hp('25%'),
    // alignContent: 'center',
  },
});

export default Product;
