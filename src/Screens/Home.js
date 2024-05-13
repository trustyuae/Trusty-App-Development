import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Counter from '../Components/Counter';
import Category from '../Components/Category';
import {Images} from '../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PreviewImage from '../Components/Preview/PreviewImage';

const Home = () => {
  const previewimages = {
    previewImages: Images.preview,
  };

  const products = [
    {
      id: 1,
      uri: Images.bag,
      name: 'Accessories',
    },
    {
      id: 2,
      uri: Images.bags,
      name: 'Bags',
    },
    {
      id: 3,
      uri: Images.shoes,
      name: 'Shoes',
    },
    {
      id: 4,
      uri: Images.watches,
      name: 'Watches',
    },
    {
      id: 5,
      uri: Images.smallLeatherGoods,
      name: 'Small Leather Goods',
    },
    {
      id: 6,
      uri: Images.travelBags,
      name: 'Travel Bags',
    },
  ];
  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <PreviewImage uri={previewimages.previewImages} />
        <Text style={{textAlign: 'center', fontWeight: '700', fontSize: 18}}>
          Ready To Go
        </Text>
        <View style={styles.container}>
          {/* <Counter /> */}
          {products.map(product => (
            <Category key={product.id} uri={product.uri} name={product.name} />
          ))}
          {/* <Icon name="rocket" size={30} color="#900" /> */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
    // paddingHorizontal: 10,
    width: '100%',
    paddingHorizontal: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
});

export default Home;
