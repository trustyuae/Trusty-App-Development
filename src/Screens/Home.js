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
import {globalColors} from '../Assets/Theme/globalColors';
import Product from '../Components/Product/Product';
import HeadingImage from '../Components/Preview/HeadingImage';

const Home = () => {
  const previewimages = {
    previewImages: Images.preview,
  };

  const ProductList = [
    {
      id: 1,
      uri: Images.product,
      name: 'Dummy Product 1',
      price: 'AED 100',
    },
    {
      id: 2,
      uri: Images.product,
      name: 'Dummy Product 2',
      price: 'AED 200',
    },
    {
      id: 3,
      uri: Images.product,
      name: 'Dummy Product 3',
      price: 'AED 300',
    },
    {
      id: 4,
      uri: Images.product,
      name: 'Dummy Product 4',
      price: 'AED 400',
    },
    {
      id: 5,
      uri: Images.product,
      name: 'Dummy Product 5',
      price: 'AED 500',
    },
    {
      id: 6,
      uri: Images.product,
      name: 'Dummy Product 6',
      price: 'AED 600',
    },
  ];

  const CategoryList = [
    {
      id: 1,
      uri: Images.bag,
      name: 'Bags',
    },
    {
      id: 2,
      uri: Images.bags,
      name: 'Shoes',
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeadingImage />
        <Text style={styles.heading}>Our Cave of Wonders</Text>
        <PreviewImage uri={previewimages.previewImages} />
        <Text style={styles.heading}>Ready To Go</Text>
        <View style={styles.categoryContainer}>
          {/* <Counter /> */}
          {CategoryList.map(category => (
            <Category
              key={category.id}
              uri={category.uri}
              name={category.name}
            />
          ))}
        </View>
        <Text style={styles.heading}>Signature Selections</Text>
        <PreviewImage uri={previewimages.previewImages} />
        <View style={{flexDirection: 'column'}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.productContainer}>
              {ProductList.map(product => (
                <Product
                  key={product.id}
                  uri={product.uri}
                  name={product.name}
                  price={product.price}></Product>
              ))}
            </View>
          </ScrollView>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.productContainer}>
              {ProductList.map(product => (
                <Product
                  key={product.id}
                  uri={product.uri}
                  name={product.name}
                  price={product.price}></Product>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.headingBackground,
    marginBottom: hp('6%'),

    height: hp('94%'),
    justifyContent: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    marginRight: wp('2.5%'),
    marginLeft: wp('2.5%'),
    alignItems: 'center',
    marginTop: 10,
    marginBottom: hp('4%'),
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: hp('4%'),
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  bestSellerContiner: {
    backgroundColor: globalColors.white,
    marginBottom: hp('10%'),
  },
  heading: {
    textAlign: 'center',
    fontFamily: 'Georgia, serif',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: hp('3%'),
    color: globalColors.black,
  },
});

export default Home;
