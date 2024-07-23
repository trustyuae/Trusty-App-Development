import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Counter from '../../Components/Counter';
import Category from '../../Components/Category';
import {Images} from '../../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import PreviewImage from '../../Components/Preview/PreviewImage';
import {globalColors} from '../../Assets/Theme/globalColors';
import Product from '../../Components/Product/Product';
import HeadingImage from '../../Components/Preview/HeadingImage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Pressable} from 'react-native';
import {fetchCategories} from '../../Redux/Slice/categorySlice';
import {fetchProducts} from '../../Redux/Slice/productSlice';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWishlist} from '../../Redux/Slice/wishlistSlice';
import {getToken} from '../../Utils/localstorage';
import {SafeAreaView} from 'react-native';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import SkeletonLoader from '../../Components/Loader/SkeletonLoader';
import CategoryComoponent from '../../Components/Category/CategoryComoponent';
import Button from '../../Components/Button';

const categories = [
  {
    id: 1,
    img: Images.Man,
    name: 'US POLO',
    description: 'Slim Fit Shirt with Button Down Collar',
    price: '920 AED',
  },
  {
    id: 2,
    img: Images.Boy,
    name: 'GAP',
    description: 'Men Brand Print Regular Fit Crew-Neck T-Shirt',
    price: '320 AED',
  },
  {
    id: 3,
    img: Images.Woman,
    name: 'US POLO',
    description: 'Slim Fit Shirt with Button Down Collar',
    price: '920 AED',
  },
];

const Home = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [newWitchList, setNewWitchList] = useState([]);
  const dispatch = useDispatch();
  const categoryStatus = false;
  // const {categories, categoryStatus, categoryError} = useSelector(
  //   state => state.category,
  // ); // Select category state from Redux store
  const {products, status, error} = useSelector(state => state.product);
  const {items, loading: wishlistLoading} = useSelector(
    state => state.wishlist,
  );
  const [tokenData, setTokenData] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  //  const [wishlist, setWishlist] = useState([items].map(item => ({id: item})));
  // console.log('inside home---->', products);
  useEffect(() => {
    data();

    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      data();
      dispatch(fetchProducts());
    }, [tokenData]), // Fetch data on focus or token change
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchCategories());
      await dispatch(fetchProducts());
      data();
      const token = await getToken();
      if (token) {
        setTokenData(token);
        await dispatch(fetchWishlist(token));
      }
    } catch (error) {
      console.log('Error refreshing data:', error);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (token) {
          setTokenData(token);
          await dispatch(fetchWishlist(token));
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
    fetchData();
  }, [dispatch, getToken]);
  const data = () => {
    if (items.Wishlist) {
      const itemIdList = items.Wishlist?.map(item => ({id: item}));
      const productIds = new Set(itemIdList.map(item => Number(item.id)));
      const result = products.map(productItem => ({
        ...productItem,
        isWatchList: productIds.has(productItem.id),
      }));
      setWishlist(result);
    } else if (wishlist) {
      setWishlist(products);
    }
  };

  useEffect(() => {
    data();
  }, [items, products, categories, tokenData]);
  // console.log(
  //   '------======',
  //   wishlist?.map(data => console.log(data.isWatchList)),
  // );

  // useEffect(() => {
  //   dispatch(fetchWishlist(tokenData));
  // }, [tokenData, products, categories]);
  const navigateToCategoryProducts = category => {
    navigation.navigate('CategoryProducts', {category, products});
    // console.log("products",category);
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

  const handlepress = () => {};

  return (
    <SafeAreaView style={{backgroundColor: globalColors.statusBar}}>
      <View style={styles.container}>
        {/* <CustomStatusBar color={globalColors.statusBar}></CustomStatusBar> */}
        {/* <StatusBar backgroundColor={globalColors.statusBar}></StatusBar> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={globalColors.black}
            />
          }>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image
              source={Images.homeScreenBackground}
              width={382}
              height={200}></Image>
          </View>

          <CategoryComoponent />

          <View style={{marginHorizontal: 10, marginVertical: 15}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.customheading}>Ready to go</Text>

              <Text style={{color: 'black', fontSize: 12, fontWeight: 600}}>
                SEE ALL{' '}
                <Image source={Images.Backarrow} width={22} height={10}></Image>{' '}
              </Text>
            </View>
          </View>
          {/* <PreviewImage uri={previewimages.previewImages} /> */}
          {/* <Text style={styles.heading}>Ready To Go</Text> */}
          <View style={styles.categoryContainer}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {categoryStatus === 'loading' ? (
                <View style={{marginLeft: wp('2.5%')}}>
                  <SkeletonLoader count={6} />
                </View>
              ) : (
                categories.map(category => (
                  <Pressable
                    key={category.id}
                    onPress={() => navigateToCategoryProducts(category)}>
                    <Category
                      key={category?.id}
                      uri={category?.img}
                      name={category?.name}
                      price={category?.price}
                      description={category?.description}
                      id={category?.id}
                    />
                  </Pressable>
                ))
              )}
            </ScrollView>
          </View>

          <View style={{backgroundColor: 'white'}}>
            <View style={{marginTop: 20}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.customheading, styles.custommargin]}>
                MUST HAVE
                </Text>
                <Image
                  source={Images.Musthavelogo}
                  height={30}
                  width={30}
                  style={{margin: 6}}></Image>
              </View>
              <View style={{marginTop: -20, marginBottom: 10}}>
                <Text style={[styles.customheading, styles.custommargin]}>
                  FOR{' '}
                  <Text style={[styles.customheading, styles.Custcolor]}>
                    HER
                  </Text>
                </Text>
              </View>

              {/* <View style={{flexDirection: 'row', marginTop: 15}}> */}
              {/* <View style={styles.productContainer}>
              {true && wishlist.length === 0 ? (
                <View style={{marginLeft: wp('1.5%'), flexWrap: 'wrap'}}>
                  <SkeletonLoader count={2} />
                </View>
              ) : (
                wishlist.slice(startIndex, startIndex + 4).map(product => (
                  <Pressable
                    key={product?.id}
                    onPress={() =>
                      navigation.navigate('ProductDetail', {
                        userId: product.id,
                        isWatchList: product?.isWatchList,
                      })
                    }>
                    <Product
                      key={product?.id}
                      uri={product?.images[0]?.src}
                      name={product?.name}
                      price={product?.price}
                      saved={product?.saved}
                      product_id={product?.id}
                      isWatchList={product?.isWatchList}
                    />
                  </Pressable>
                ))
              )}
            </View> */}
              {/* </ScrollView> */}
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  // paddingLeft: 10,
                  // paddingRight: 10,
                  marginTop: 20,

                  // rowGap: 20,
                  columnGap: 10,
                }}>
                {/* <TouchableOpacity
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
              </TouchableOpacity> */}
                {/* <TouchableOpacity
                onPress={onNextPress}
                disabled={startIndex + 4 >= products.length}
                style={{
                  backgroundColor:
                    startIndex + 4 >= products.length ? '#B9B9B9' : 'black',
                  borderRadius: wp('50%'),
                }}>
                <View>
                  <Icon
                    name="keyboard-arrow-right"
                    size={20}
                    color={globalColors.white}
                  />
                </View>
              </TouchableOpacity> */}
                {/* <View style={styles.productContainer}> */}
                {true && wishlist.length === 0 ? (
                  <View style={{marginLeft: wp('1.5%')}}>
                    <SkeletonLoader count={2} />
                  </View>
                ) : (
                  wishlist.slice(0, 4).map(product => (
                    <Pressable
                      key={product?.id}
                      onPress={() =>
                        navigation.navigate('ProductDetail', {
                          userId: product.id,
                          isWatchList: product?.isWatchList,
                        })
                      }>
                      <Product
                        key={product?.id}
                        uri={product?.images[0]?.src}
                        name={product?.name}
                        price={product?.price}
                        saved={product?.saved}
                        product_id={product?.id}
                        isWatchList={product?.isWatchList}></Product>
                    </Pressable>
                  ))
                )}
                {/* </View> */}
              </View>
              {/* </View> */}

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Button
                  stylesofbtn={styles.stylesofbtn}
                  handlepress={handlepress}
                  name={'Explore More'}
                  styleoffont={styles.custfontstyle}
                  loading={false}
                />
              </View>
            </View>

            <HeadingImage />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  custommargin: {
    marginLeft: 20,
    fontSize: 30,
    marginBottom: 20,
  },
  container: {
    backgroundColor: globalColors.headingBackground,
    justifyContent: 'center',
  },
  Custcolor: {
    color: '#D42A57',
    fontSize: 30,
  },
  customheading: {
    fontWeight: '700',
    fontSize: 22,
    color: 'black',
  },
  productContainer: {
    flexWrap: 'wrap',
    // marginRight: wp('2.5%'),
    // marginLeft: wp('2.5%'),
    gap: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  categoryContainer: {
    marginTop: 20,
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
    backgroundColor: globalColors.productBackground,
  },
  stylesofbtn: {
    backgroundColor: '#000000',
    padding: 7,
    marginVertical: 20,
    width: 120,
  },
  custfontstyle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});
export default Home;
