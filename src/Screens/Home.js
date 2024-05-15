import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [startIndex, setStartIndex] = useState(0);

  const navigateToCategoryProducts = categoryName => {
    navigation.navigate('CategoryProducts', {categoryName});
  };

  const previewimages = {
    previewImages: Images.preview,
  };
  const onNextPress = () => {
    setStartIndex(startIndex => startIndex + 2);
  };

  const onBackPress = () => {
    setStartIndex(startIndex => startIndex - 2);
  };
  const ProductList = [
    {
      id: 1,
      uri: Images.product,
      name: 'Dummy Product 1',
      price: 'AED 100',
      saved: false,
    },
    {
      id: 2,
      uri: Images.product,
      name: 'Dummy Product 2',
      price: 'AED 200',
      saved: true,
    },
    {
      id: 3,
      uri: Images.product,
      name: 'Dummy Product 3',
      price: 'AED 300',
      saved: false,
    },
    {
      id: 4,
      uri: Images.product,
      name: 'Dummy Product 4',
      price: 'AED 400',
      saved: true,
    },

    {
      id: 5,
      uri: Images.product,
      name: 'Dummy Product 5',
      price: 'AED 500',
      saved: false,
    },

    {
      id: 6,
      uri: Images.product,
      name: 'Dummy Product 6',
      price: 'AED 600',
      saved: false,
    },
    {
      id: 7,
      uri: Images.product,
      name: 'Dummy Product 7',
      price: 'AED 600',
      saved: false,
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
          {CategoryList.map(category => (
            <TouchableOpacity
              key={category.id}
              onPress={() => navigateToCategoryProducts(category.name)}>
              <Category
                key={category.id}
                uri={category.uri}
                name={category.name}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.heading}>Signature Selections</Text>
        <PreviewImage style={{height: hp('10%')}} uri={Images.preview1} />
        <View style={{flexDirection: 'column'}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.productContainer}>
              {ProductList.slice(startIndex, startIndex + 2).map(product => (
                <Product
                  key={product.id}
                  uri={product.uri}
                  name={product.name}
                  price={product.price}
                  saved={product.saved}></Product>
              ))}
            </View>
          </ScrollView>

          <TouchableOpacity onPress={onBackPress} disabled={startIndex === 0}>
            <View style={styles.onBackPress}>
              <Icon
                name="keyboard-arrow-left"
                size={20}
                color={globalColors.white}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onNextPress}
            disabled={startIndex + 2 >= ProductList.length}
            style={[styles.arrowButton, {left: 10}]}>
            <View style={styles.onNextPress}>
              <Icon
                name="keyboard-arrow-right"
                size={20}
                color={globalColors.white}
              />
            </View>
          </TouchableOpacity>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.productContainer}>
              {ProductList.slice(startIndex, startIndex + 2).map(product => (
                <Product
                  key={product.id}
                  uri={product.uri}
                  name={product.name}
                  price={product.price}
                  saved={product.saved}></Product>
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
  },
  categoryContainer: {
    flexDirection: 'row',
    marginLeft: wp('12%'),
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
    fontFamily: 'Intrepid Regular',
    fontWeight: '600',
    fontSize: 22,
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    color: globalColors.black,
  },

  onBackPress: {
    alignItems: 'flex-start',
    backgroundColor: 'black',
    width: 20,
    marginLeft: wp('3%'),
    borderRadius: 20,
    height: 20,
  },
  onNextPress: {
    alignItems: 'flex-end',
    marginTop: hp('-2.7%'),
    marginLeft: wp('90%'),
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: globalColors.black,
  },
});

export default Home;
