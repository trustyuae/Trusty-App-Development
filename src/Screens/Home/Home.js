import React, { useEffect, useRef, useState } from 'react';
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
import { fetchProducts, fetchRecentProducts } from '../../Redux/Slice/productSlice';
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
import { fontFamily } from '../../Assets/Theme/fontFamily';
import { AdornImage, tabbyIcon } from '../../Constants/Icons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


const Home = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [newWitchList, setNewWitchList] = useState([]);
  const [updatedRedytogoProductsWishlist, SetupdatedRedytogoProductsWishlist] = useState([])
  const [updatedSignatureSelectionsProducts, SetupdatedSignatureSelectionsProducts] = useState([])
  const [UpdatedReacetProducts, setUpdatedReacetProducts] = useState([])

  const dispatch = useDispatch();
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
  const { recentProducts, recentStatus, recentError } = useSelector((state) => state.product);

  const [tokenData, setTokenData] = useState(null);
  const [wishlist, setWishlist] = useState([items].map(item => ({ id: item })));
  const scrollViewRef = useRef(null);

  const scrollLeft = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: Math.max(scrollViewRef.current.contentOffset?.x - 168, 0),
        animated: true,
      });
    }
  };

  const scrollRight = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: scrollViewRef.current.contentOffset?.x + 168,
        animated: true,
      });
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      data();
      dispatch(fetchRedyToGo());
      dispatch(getSignatureSelectionsData());
      dispatch(fetchCategories());
      dispatch(fetchProducts());
      dispatch(fetchRecentProducts());
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchRecentProducts());
  }, [])
  useFocusEffect(
    React.useCallback(() => {
      data();
      dispatch(fetchProducts());
      dispatch(fetchRedyToGo());
      dispatch(fetchRecentProducts());
      dispatch(getSignatureSelectionsData());
    }, [tokenData]),
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

      const updatedRedytogoProducts = redytogoProducts.map(productItem => ({
        ...productItem,
        isWatchList: productIds.has(productItem.id),
      }));
      const updatedRecentProducts = recentProducts.map(productItem => ({
        ...productItem,
        isWatchList: productIds.has(productItem.id),
      }));

      const updatedSignatureSelectionsProducts = signatureSelectionsProducts.map(productItem => ({
        ...productItem,
        isWatchList: productIds.has(productItem.id),
      }))
      setUpdatedReacetProducts(updatedRecentProducts)
      SetupdatedRedytogoProductsWishlist(updatedRedytogoProducts);
      SetupdatedSignatureSelectionsProducts(updatedSignatureSelectionsProducts)
    } else if (wishlist) {
      SetupdatedRedytogoProductsWishlist(redytogoProducts);
      setUpdatedReacetProducts(recentProducts)
      SetupdatedSignatureSelectionsProducts(signatureSelectionsProducts)
    }
  };

  useEffect(() => {
    data();
  }, [items, redytogoProducts, signatureSelectionsProducts, tokenData, recentProducts]);


  useEffect(() => {
    dispatch(fetchWishlist(tokenData));
  }, [tokenData, products, categories]);
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
          <View style={{}}>
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

            <View style={{ alignItems: 'center' }}>
              <Image style={{ width: 250, height: 100 }} resizeMode='contain'
                source={tabbyIcon}>

              </Image>
            </View>
            {
              <View style={{ paddingHorizontal: wp('2.3%') }}>
                <CategoryComoponent
                  // getData={getData}
                  getData={categories}
                  navigateToCategoryProducts={navigateToCategoryProducts}
                />
              </View>
            }

            <View style={{
              alignItems: 'center', borderRadius: 25, top: 10
            }}>
              <Pressable onPress={() => navigation.navigate('SeeAll')}>
                <Image style={{
                  width: wp('94%'),
                  borderRadius: wp('3%'),
                  height: hp('23%'),

                }} source={Images.readyToGoImage}

                >
                </Image>
              </Pressable>
              <Text style={styles.heading}>Ready To Go</Text>
            </View>

            <View style={{
              marginLeft: wp('3'),
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: hp('5%'),
              marginTop: hp('5%')
              // marginVertical: hp('1%')
            }}>
              <View>
                <Text style={{
                  fontWeight: '800',
                  fontSize: 30,
                  color: 'black',
                  marginLeft: wp('5%'),
                  fontFamily: fontFamily.fontFamilyIntrepid,
                }}>
                  Adorn your arm
                </Text>
                <Text style={{
                  fontWeight: '800',
                  fontSize: 28,
                  color: 'black',
                  marginTop: wp('-1%'),
                  fontFamily: fontFamily.fontFamilyIntrepid,
                }}>with an iconic piece</Text>
              </View>
              <Image
                source={AdornImage}
                height={40}
                width={40}
                style={{ height: 60, width: 60, marginLeft: wp('-5%'), alignContent: 'center' }}></Image>

            </View>


            <View style={styles.categoryContainer}>
              <Pressable onPress={scrollLeft} style={styles.arrowButton}>
                <SimpleLineIcons name="arrow-left" size={25} color="#7C7A78" />
              </Pressable>
              <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onScroll={({ nativeEvent }) => {
                  scrollViewRef.current.contentOffset = nativeEvent.contentOffset; // Capture the scroll position
                }}
                scrollEventThrottle={16}>
                {recentStatus === 'loading' ? (
                  <View style={{ marginLeft: wp('2.5%') }}>
                    <SkeletonLoader count={6} />
                  </View>
                ) : (
                  UpdatedReacetProducts
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
                            uri={product?.images[0]?.src}
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
              <Pressable onPress={scrollRight} style={styles.arrowButton}>
                <SimpleLineIcons name="arrow-right" size={25} color="#7C7A78" />
              </Pressable>
            </View>

          </View>


          <View style={{ backgroundColor: globalColors.headingBackground }}>
            <View style={{
              alignSelf: 'center',
              marginTop: hp('5%')
            }}>
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
      </View >
    </SafeAreaView >
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
    fontFamily: fontFamily.fontFamilyIntrepid,
  },
  productContainer: {
    flexWrap: 'wrap',

    gap: 10,
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
    fontFamily: fontFamily.fontFamilyIntrepid,
    fontWeight: '600',
    fontSize: 22,
    marginTop: hp('2%'),
    // marginBottom: hp('2%'),
    color: globalColors.newTextColor,
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
    fontFamily: fontFamily.fontFamilyIntrepid,
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
    fontFamily: fontFamily.fontFamilyIntrepid,
    fontSize: 17,
    color: globalColors.white,
  },
  subHeading: {
    fontSize: 14,
    width: wp('70%'),
    height: hp('10%'),
    textAlign: 'center',
    fontFamily: fontFamily.fontFamilyIntrepid,
    margin: 'auto',
    color: globalColors.white,
  },
  textConatainer: {
    marginBottom: hp('11%'),
    alignContent: 'center',
    gap: hp('1%'),
  },
  arrowButton: {
    top: '50%',
    zIndex: 1,
    justifyContent: 'center',
    marginTop: hp('-7%')
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    color: 'black', fontFamily: fontFamily.fontFamilyIntrepid,

  },
});
export default Home;
