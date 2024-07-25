import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {Images} from '../../Constants';
import {globalColors} from '../../Assets/Theme/globalColors';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {Text} from 'react-native-paper';
import {ScrollView} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// let getData = [
//   {
//     id: 1,
//     img: Images.Shopping,
//     label: 'Bags',
//   },
//   {
//     id: 2,
//     img: Images.Shoes_01,
//     label: 'Shoes',
//   },
//   {
//     id: 3,
//     img: Images.Accessories,
//     label: 'Accessories',
//   },
//   {
//     id: 4,
//     img: Images.Scarf,
//     label: 'Scarfs',
//   },
//   {
//     id: 5,
//     img: Images.Jewellery,
//     label: 'Jewellery``',
//   },
//   // {
//   //   id: 4,
//   //   img: Images.shoes,
//   //   label: 'JEWELLERY',
//   // },
// ];

const CategoryComponent = ({getData,categories,navigateToCategoryProducts}) => {
 
 
  const updated=getData.map((data)=>({
    img:data.img,
    // id: categories.find((item) => item.label == data.label)?.id,
    id:data.id,
    label:data.label
  }))
  console.log("updated---------------------->",updated);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {updated?.map(item => (
          <TouchableOpacity key={item.id}  onPress={() => navigateToCategoryProducts(item.id)}>
            <View style={styles.imageContainer}>
              <Image source={item.img} style={styles.image} />
            </View>
            <Text style={styles.label}>{item.label}</Text>
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
     paddingLeft: wp('1%'),
    paddingBottom: 16,
    gap: 13,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 84,
    width: 84,
    borderRadius: 12,
    backgroundColor: globalColors.white,
    marginTop: 16,
  },
  image: {
    resizeMode: 'contain',
    height: 42,
    width: 42,
  },
  label: {
    textAlign: 'center',
    marginTop: 8,
    fontFamily:'Product Sans'
  },
});
