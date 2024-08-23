import React, { useEffect, useState } from 'react';
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

import { Images } from '../../Constants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalColors } from '../../Assets/Theme/globalColors';
import Product from '../../Components/Product/Product';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
import { fetchCategories } from '../../Redux/Slice/categorySlice';
import { fetchProducts } from '../../Redux/Slice/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';
import { getToken } from '../../Utils/localstorage';
import { SafeAreaView } from 'react-native';
import SkeletonLoader from '../../Components/Loader/SkeletonLoader';
import CategoryComoponent from '../../Components/Category/CategoryComoponent';
import Button from '../../Components/Button';
import { fetchRedyToGo } from '../../Redux/Slice/ready_to_go';
import Readytogo from '../../Components/Ready To Go/Readytogo';
import { ImageBackground } from 'react-native';
import SkeletonLoaderHomeimg from '../../Components/Loader/SkeletonLoaderHomeimg';
import { getSignatureSelectionsData } from '../../Redux/Slice/signatureSelections';

const categoriesx = [
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

const DummyData = [
  {
    id: '1',
    img: Images.Woman,
    name: 'MISH',
    description: 'Button-Front V-Neck Top',
    price: '920 ',
    saved: false,
    product_id: 121,
    isWatchList: false,
  },
  {
    id: '2',
    img: Images.Catelog3,
    name: 'ZINK LONDON',
    description: 'V-Neck Front Styled Top',
    price: '320 ',
    saved: false,
    product_id: 121,
    isWatchList: false,
  },
  {
    id: '3',
    img: Images.Catelog2,
    name: 'MISH',
    description: 'Button-Front V-Neck Top',
    price: '920 ',
    saved: false,
    product_id: 121,
    isWatchList: false,
  },
  {
    id: '4',
    img: Images.Catelog1,
    name: 'ZINK LONDON',
    description: 'V-Neck Front Styled Top',
    price: '320',
    saved: false,
    product_id: 121,
    isWatchList: false,
  },
];

let getData = [
  {
    id: 16,
    img: 'https://trustyuae.com/wp-content/uploads/2024/08/B174438D-10E1-4BAC-861E-CE048B9D24BC-scaled.webp',
    name: 'Bags',
  },
  {
    id: 17,
    img: 'https://trustyuae.com/wp-content/uploads/2024/08/Photoroom_20240802_163138.jpeg',
    name: 'Shoes',
  },
  {
    id: 182,
    img: 'https://trustyuae.com/wp-content/uploads/2024/08/Photoroom_20240802_172622.jpeg',
    name: 'Travel Bags',
  },
  {
    id: 298,
    img: 'https://trustyuae.com/wp-content/uploads/2024/08/tote-profile.webp',
    name: 'Tote Bags',
  },
  {
    id: 22,
    img: 'https://trustyuae.com/wp-content/uploads/2024/08/IMG_7785-1.webp',
    name: 'SMALL LEATHER GOODS',
  },
  // {
  //   id: 3,
  //  // img: Images.Accessories,
  //   label: 'Accessories',
  // },
  // {
  //   id: 4,
  //  // img: Images.Scarf,
  //   label: 'Scarfs',
  // },
  // {
  //   id: 5,
  //  // img: Images.Jewellery,
  //   label: 'Jewellery',
  // },
  // {
  //   id: 4,
  //   img: Images.shoes,
  //   label: 'JEWELLERY',
  // },
];

const Home = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [newWitchList, setNewWitchList] = useState([]);
  const dispatch = useDispatch();
  // const categoryStatus = false;
  const { categories, categoryStatus, categoryError } = useSelector(
    state => state.category,
  );
  const signatureSelectionsProducts = useSelector(
    state => state?.signatureSelectionsSlice?.signatureSelectionsData
  );
  const { redytogoProducts, redytogoStatus, redytogoError } = useSelector(
    state => state.redytogo,
  );
  const { products, status, error } = useSelector(state => state.product);
  const { items, loading: wishlistLoading } = useSelector(
    state => state.wishlist,
  );
  const [tokenData, setTokenData] = useState(null);
  // const [wishlist, setWishlist] = useState([]);
  const [wishlist, setWishlist] = useState([items].map(item => ({ id: item })));
  // console.log('inside home---->', products);




  useEffect(() => {
    const fetchData = async () => {
      data();
      dispatch(fetchRedyToGo());
      dispatch(fetchCategories());
      dispatch(getSignatureSelectionsData());
      dispatch(fetchProducts());
    };
    fetchData();
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
      const itemIdList = items.Wishlist?.map(item => ({ id: item }));
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
    navigation.navigate('CategoryProducts', { category, products });
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

  const handlepress = () => {
    navigation.navigate('ExploreMore');
  };

  return (
    <SafeAreaView style={{ backgroundColor: globalColors.statusBar }}>
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
          <View style={{ paddingHorizontal: wp('2%') }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Image
                source={Images.homeScreenBackground}
                style={styles.Topimg}></Image>
            </View>
            {
              <CategoryComoponent
                // getData={getData}
                getData={categories}
                navigateToCategoryProducts={navigateToCategoryProducts}
              />
            }

            <View style={{ marginHorizontal: 5, margin: 15 }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[styles.customheading]}>Ready to go</Text>

                <Text
                  onPress={() => navigation.navigate('SeeAll')}
                  style={{
                    color: 'black',
                    fontSize: 14,
                    fontWeight: '600',
                    fontFamily: 'Intrepid Regular',
                    top: 10,
                  }}>
                  SEE ALL
                  <Image
                    source={Images.Backarrow}
                    width={22}
                    height={10}></Image>
                </Text>
              </View>
            </View>
            {/* <PreviewImage uri={previewimages.previewImages} /> */}
            {/* <Text style={styles.heading}>Ready To Go</Text> */}
            {/* ------ */}
            {/* <View style={styles.categoryContainer}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {categoryStatus === 'loading' ? (
                  <View style={{ marginLeft: wp('2.5%') }}>
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
                      {console.log("categories----------------->", category)}
                    </Pressable>
                  ))
                )}
              </ScrollView>
            </View> */}
            {/* ----- */}
            <View style={styles.categoryContainer}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {redytogoStatus === 'loading' ? (
                  <View style={{ marginLeft: wp('2.5%') }}>
                    <SkeletonLoader count={6} />
                  </View>
                ) : (
                  redytogoProducts
                    .slice(startIndex, startIndex + 10)
                    .map(product => (
                      <>

                        <Pressable
                          key={product.id}
                          onPress={() =>
                            navigation.navigate('ProductDetail', {
                              userId: product.id,
                            })
                          }>
                          <Readytogo
                            key={product?.id}
                            id={product?.id}
                            uri={product?.images[0]}
                            name={product?.name}
                            price={product?.price}
                            saved={product?.saved}
                            product_id={product?.id}
                            isWatchList={product?.isWatchList}
                          />
                        </Pressable>
                      </>
                    ))
                )}
              </ScrollView>
            </View>
          </View>
          <View style={{ backgroundColor: globalColors.headingBackground }}>
            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.customheading, styles.custommargin]}>
                  MUST HAVE
                </Text>
                <Image
                  source={Images.Musthavelogo}
                  height={30}
                  width={30}
                  style={{ margin: 6 }}></Image>
              </View>
              <View style={{ marginTop: -20, marginBottom: 10 }}>
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
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  paddingHorizontal: 11,
                  // gap: 8
                  // marginTop: 20,
                  // marginLeft: 2,
                  // columnGap: 10,
                  // backgroundColor:"blue"
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      paddingHorizontal: 2,
                    }}>
                    <SkeletonLoader count={4} />
                  </View>
                ) : (
                  signatureSelectionsProducts.map(product => (
                    <Pressable
                      key={product?.id}
                      onPress={() =>
                        navigation.navigate('ProductDetail', {
                          userId: product.id,
                          isWatchList: product?.isWatchList,
                        })
                      }>
                      {/* Console log for debugging */}
                      {/* {console.log("product image URL:", product?.images[1]?.src)} */}

                      {product.image && product.image.length > 0 ? (
                        <>
                          <Product
                            key={product?.id}
                            uri={product?.image}
                            name={product?.name}
                            price={product?.price}
                            saved={product?.saved}
                            product_id={product?.id}
                            isWatchList={product?.isWatchList}
                          />
                        </>
                      ) : (
                        <Product
                          key={product?.id}
                          uri={false}
                          name={product?.name}
                          price={product?.price}
                          saved={product?.saved}
                          product_id={product?.id}
                          isWatchList={product?.isWatchList}
                        />
                      )}
                    </Pressable>
                  ))
                )}
                {/* </View> */}
              </View>
              {/* </View> */}

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  marginBottom: 20,
                }}>
                <Button
                  stylesofbtn={styles.stylesofbtn}
                  handlepress={handlepress}
                  name={'Explore More'}
                  styleoffont={styles.custfontstyle}
                  loading={false}
                />
              </View>
            </View>

            {/* <HeadingImage /> */}
            <View style={{ alignSelf: 'center', marginTop: -10 }}>
              {imageLoaded && <SkeletonLoaderHomeimg />}
              <ImageBackground
                style={styles.containerimgbackgr}
                source={Images.HeadingImage}
                onLoad={() => setImageLoaded(false)}
              >
                <Image
                  style={styles.imageContainer}
                  source={Images.Textimg}></Image>
              </ImageBackground>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Topimg: {
    height: hp('26%'),
    width: wp('96%'),
    resizeMode: 'contain',
  },
  custommargin: {
    paddingHorizontal: wp('2%'),
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
    fontWeight: '800',
    fontSize: 24,
    color: 'black',
    fontFamily: 'Intrepid Regular',
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
    fontFamily: 'Product Sans',
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
    borderRadius: 4,
  },
  custfontstyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Intrepid Regular',
  },
  containerimgbackgr: {
    width: wp('100%'),
    ImageBackground: globalColors.homeScreenBackground,
    height: hp('36%'),
    resizeMode: 'contain',
  },
  imageContainer: {
    alignItems: 'center',
    margin: 'auto',
    marginTop: hp('9%'),
    height: hp('25%'),
    width: wp('90%'),
    resizeMode: 'contain',
  },
  MainHeading: {
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
    fontSize: 17,
    color: globalColors.white,
  },
  subHeading: {
    fontSize: 14,
    width: wp('70%'),
    height: hp('10%'),
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
    margin: 'auto',
    color: globalColors.white,
  },
  textConatainer: {
    marginBottom: hp('11%'),
    alignContent: 'center',
    gap: hp('1%'),
  },
});
export default Home;
