import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { ScrollView } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalColors } from '../../Assets/Theme/globalColors';
import { fontFamily } from '../../Assets/Theme/fontFamily';

const CategoryComoponent = ({ getData, navigateToCategoryProducts }) => {
  const handleCategoryClick = categoryId => {
    navigateToCategoryProducts(categoryId);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
      <View style={styles.gridContainer}>
        {getData?.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleCategoryClick(item)}
            style={styles.itemContainer}
          >
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

export default CategoryComoponent;

const styles = StyleSheet.create({
  container: {
    // padding: wp('2%'),
    backgroundColor: globalColors.headingBackground
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  itemContainer: {
    // width: wp('49%'),
    marginBottom: hp('3%'),
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('43%'),
    height: wp('38%'),
    backgroundColor: globalColors.headingBackground,
    borderRadius: 10,
    resizeMode: 'center',
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // elevation: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    // resizeMode: 'contain',
  },
  label: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1%'),
    fontSize: 18,
    fontWeight: '400',
    color: globalColors.darkGray,
    fontFamily: fontFamily.fontFamilyOcator,
    //  fontFamily: fontFamily.fontFamilyOcatorBold,
    flexWrap: 'wrap',
    width: wp('43%'),
    lineHeight: 22,
  },
});
