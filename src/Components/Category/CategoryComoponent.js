import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Images } from '../../Constants';
import { globalColors } from '../../Assets/Theme/globalColors';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { Text } from 'react-native-paper';
import { ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';



const CategoryComponent = ({ getData, navigateToCategoryProducts }) => {
  const updated = getData.map(data => ({
    img: data.img,
    id: data.id,
    label: data.label,
  }));

  const handleCategoryClick = categoryId => {
    navigateToCategoryProducts(categoryId);
  };

  const getImageSource = img => {
    if (typeof img === 'string' && img.startsWith('http')) {
      return { uri: img };
    }

    return img;
  };
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {getData?.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleCategoryClick(item)}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item?.image?.Image }} style={styles.image} />
            </View>
            <Text style={styles.label}>{item?.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoryComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: wp('0.5%'),
    paddingRight: wp('1%'),
    paddingBottom: 16,
    gap: wp('5.5%'),
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('12.5%'),
    width: wp('27.5%'),
    // height: 110,
    // width: 110,
    borderRadius: 12,
    backgroundColor: globalColors.white,
    marginTop: 16,
  },
  image: {
    // resizeMode: 'contain',
    height: hp('12.5%'),
    width: wp('27.5%'),
    borderRadius: wp('2%'),
  },
  label: {
    textTransform: 'capitalize',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 19,
    fontWeight: '400',
    color: globalColors.newTextColor,
    fontFamily: 'Intrepid Regular',
    // flexWrap: 'wrap'
  },
});