import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Counter from '../../Components/Counter';
import Category from '../../Components/Category';
import { Images } from '../../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PreviewImage from '../../Components/Preview/PreviewImage';
import { globalColors } from '../../Assets/Theme/globalColors';
import Product from '../../Components/Product/Product';
import HeadingImage from '../../Components/Preview/HeadingImage';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { fetchCategories } from '../../Redux/Slice/categorySlice';
import { fetchProducts } from '../../Redux/Slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';
import { getToken } from '../../Utils/localstorage';
import { SafeAreaView } from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  const [startIndex, setStartIndex] = useState(0);
  const [newWitchList, setNewWitchList] = useState([]);

  const dispatch = useDispatch();
  const { categories, categoryStatus, categoryError } = useSelector(
    state => state.category,
  ); // Select category state from Redux store
  const { products, status, error } = useSelector(state => state.product);
  const { items } = useSelector(state => state.wishlist);
  const [tokenData, setTokenData] = useState(null);
  //  const [wishlist, setWishlist] = useState([items].map(item => ({id: item})));
  console.log('inside home---->', newWitchList);

  useEffect(() => {
    const itemIdList = items?.Wishlist?.map(item => ({ id: item }));

    // const newArray = products.map(product => ({
    //   ...product,
    //   isWatchList: itemIdList?.some(
    //     wishlistItem => wishlistItem.id == product.id,
    //   ),
    // }));

    // const result = products?.map(watchItem => {
    //   const productMatch = items?.Wishlist?.find(
    //     item => console.log('Mtachs product', item),
    //     // productItem => productItem?.id?.toString() === watchItem?.id,
    //   );

    //   return {
    //     ...watchItem,
    //     isWatchList: !!productMatch,
    //   };
    // });

    const productIds = new Set(itemIdList?.map(item => Number(item.id)));
    const result = products.map(productItem => ({
      ...productItem,
      isWatchList: productIds.has(productItem.id),
    }));
    console.log('roductIds', result);
  }, [items]);

  // useEffect(() => {
  //   const newArray = products.map(product => ({
  //     ...product,
  //     isWatchList: newWitchList?.some(
  //       wishlistItem => wishlistItem.id === product.id,
  //     ),
  //   }));
  // }, [items]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        console.log('inside home---->', token);
        if (token) {
          setTokenData(token);
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(fetchWishlist(tokenData));
  }, [tokenData]);
  console.log('**********888888888888', products);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchCategories());
      await dispatch(fetchProducts());
    }
    fetch()
  }, [dispatch]);

  const navigateToCategoryProducts = category => {
    navigation.navigate('CategoryProducts', { category, products });
  };

  const previewimages = {
    previewImages: Images.preview,
  };
  const onNextPress = () => {
    setStartIndex(startIndex => startIndex + 4);
  };

  const onBackPress = () => {
    setStartIndex(startIndex => Math.max(0, startIndex - 4));
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
    {
      id: 8,
      uri: Images.product,
      name: 'Dummy Product 8',
      price: 'AED 600',
      saved: false,
    },
    {
      id: 9,
      uri: Images.product,
      name: 'Dummy Product 9',
      price: 'AED 600',
      saved: false,
    },
    {
      id: 10,
      uri: Images.product,
      name: 'Dummy Product 10',
      price: 'AED 600',
      saved: false,
    },
    {
      id: 11,
      uri: Images.product,
      name: 'Dummy Product 11',
      price: 'AED 600',
      saved: false,
    },
  ];

  return (
    <SafeAreaView>
      <StatusBar backgroundColor={globalColors.headingBackground} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeadingImage />
          <Text style={styles.heading}>Our Cave of Wonders</Text>
          <PreviewImage uri={previewimages.previewImages} />
          <Text style={styles.heading}>Ready To Go</Text>
          <View style={styles.categoryContainer}>
            {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> */}
            {categories.map(category => (
              <Pressable
                key={category.id}
                onPress={() => navigateToCategoryProducts(category)}>
                <Category
                  key={category.id}
                  uri={category?.image?.src}
                  name={category.name}
                />
              </Pressable>
            ))}
            {/* </ScrollView> */}
          </View>
          <Text style={styles.heading}>Signature Selections</Text>
          <PreviewImage style={{ height: hp('10%') }} uri={Images.preview1} />
          <View style={{ flexDirection: 'column' }}>
            <View style={styles.productContainer}>
              {products.slice(startIndex, startIndex + 4).map(product => (
                console.log("###", product),
                <Pressable
                  onPress={() =>
                    navigation.navigate('ProductDetail', { userId: product.id })
                  }>
                  <Product
                    key={product.id}
                    uri={product?.images[0]?.src}
                    name={product?.name}
                    price={product?.price}
                    saved={product?.saved}
                    product_id={product?.id}
                  />
                </Pressable>
              ))}
            </View>
            {/* </ScrollView> */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              <TouchableOpacity
                onPress={onBackPress}
                disabled={startIndex === 0}
                style={{
                  backgroundColor: startIndex === 0 ? '#B9B9B9' : 'black',
                  borderRadius: wp('50%'),
                }}>
                <View>
                  <Icon
                    name="keyboard-arrow-left"
                    size={20}
                    color={globalColors.white}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onNextPress}
                disabled={startIndex + 4 >= ProductList.length}
                style={{
                  backgroundColor:
                    startIndex + 4 >= ProductList.length ? '#B9B9B9' : 'black',
                  borderRadius: wp('50%'),
                }}>
                <View>
                  <Icon
                    name="keyboard-arrow-right"
                    size={20}
                    color={globalColors.white}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.productContainer}>
              {products.slice(startIndex + 2, startIndex + 4).map(product => (
                <Pressable
                  onPress={() =>
                    navigation.navigate('ProductDetail', { userId: product.id })
                  }>
                  <Product
                    key={product.id}
                    uri={product?.images[0]?.src}
                    name={product?.name}
                    price={product?.price}
                    saved={product?.saved}
                    product_id={product?.id}></Product>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: globalColors.headingBackground,
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
    flexWrap: 'wrap',
    justifyContent: 'center',
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
    // backgroundColor: 'black',
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
    // backgroundColor: globalColors.black,
  },
  enabledButton: {
    backgroundColor: globalColors.black,
  },
  disabledButton: {
    backgroundColor: '#B9B9B9',
  },
});

export default Home;
