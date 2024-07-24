import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {Images} from '../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../Assets/Theme/globalColors';
const Category = ({uri, name, description, price, id}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={uri}></Image>

      <Pressable style={styles.saveImagea}>
        <Image
          style={styles.saveImage}
          source={false ? Images.saveIconFill : Images.saveIconUnFill}
        />
      </Pressable>

      <View style={{width: 160,marginTop:hp("1%")}}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.custom}>{description}</Text>
        <Text style={styles.custtext}>{price}</Text>
        {id == 1 ? (
          <View
            style={{flexDirection: 'row', marginTop: -10, marginBottom: 30}}>
            <Text style={{textDecorationLine: 'line-through'}}>1840 AED </Text>
            <Text style={{color: globalColors.lightgold}}> (50%)</Text>
          </View>
        ) : (
          ''
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  custtext: {
    color: globalColors.black,
    fontWeight: '700',
    marginVertical: 10,
    fontSize: 16,
  },
  container: {
    backgroundColor: globalColors.headingBackground,
    marginHorizontal: 5,
  },

  image: {
    // resizeMode: 'contain',
    borderRadius: 5,
    width: wp('52%'),
  },
  name: {
    marginBottom: wp('5%'),
    fontFamily: 'Intrepid Regular',
    fontSize: 18,
    color: globalColors.lightgold,
  },
  saveImagea: {
    position: 'absolute',
    marginTop: -6,
    marginLeft: wp('36%'),
    padding: 12,
    left: 14,
  },
  saveImage: {
    width: 32,
    resizeMode: 'contain',
    padding: 8,
    height: 32,
  },
  custom: {
    color: globalColors.black,
    marginTop: -16,
    fontWeight: '550',
  },
});

export default Category;
