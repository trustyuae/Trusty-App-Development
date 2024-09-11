import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  ImageBackground,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';
import {
  fetchPaginatedProducts,
  resetProducts,
} from '../../Redux/Slice/paginatedProductSlice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalColors } from '../../Assets/Theme/globalColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import Product from '../../Components/Product/Product';
import SkeletonLoader from '../../Components/Loader/SkeletonLoader';
import { getToken } from '../../Utils/localstorage';
import { baseURL } from '../../Utils/API';
import { useFocusEffect } from '@react-navigation/native';
import { Images } from '../../Constants';
import { Image } from 'react-native-elements';
import Explore from '../../Components/ExploreMore/Explore';
import Button from '../../Components/Button';
import { Modal } from 'react-native-paper';

const ExploreMore = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    products: paginatedProducts,
    status: paginatedStatus,
    page,
  } = useSelector(state => state.paginatedProducts);
  const { items } = useSelector(state => state.wishlist);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [selected, setSelected] = useState(null);
  const options = [
    { label: 'Men Bags', value: 'option1' },
    { label: 'Women Bags', value: 'option2' },
    { label: 'Laptop Bags', value: 'option3' },
    { label: 'School Bags & Sets', value: 'option4' },
    { label: 'Gym Bags', value: 'option5' },
    { label: 'Briefcases Bags', value: 'option6' },
    { label: 'Waist Packs', value: 'option7' },
    { label: 'Canvas & Beach Tote Bags', value: 'option8' },
  ];

  const handlePress = value => {
    setSelected(value);
  };

  useFocusEffect(
    React.useCallback(() => {
      const token = getToken();
      if (token) {
        dispatch(fetchWishlist(token));
      }
      dispatch(resetProducts());
      dispatch(fetchPaginatedProducts({ page: 1 }));
    }, [dispatch]),
  );

  // useEffect(() => {
  //   const token = getToken();
  //   if (token) {

  //     dispatch(fetchWishlist(token));
  //   }
  //   dispatch(resetProducts());
  //   dispatch(fetchPaginatedProducts({ page: 1 }));
  // }, [dispatch]);

  useEffect(() => {
    setWishlist(updateWishlistWithFlags(paginatedProducts, items.Wishlist));
  }, [paginatedProducts, items]);

  const updateWishlistWithFlags = (products, wishlistItems) => {
    if (!wishlistItems || wishlistItems.length === 0) {
      return products;
    }
    const wishlistIds = new Set(wishlistItems.map(item => Number(item)));
    return products.map(product => ({
      ...product,
      isWatchList: wishlistIds.has(product.id),
    }));
  };


  const loadMoreProducts = () => {
    if (!isLoadingMore && paginatedStatus !== 'loading') {
      setIsLoadingMore(true);
      dispatch(fetchPaginatedProducts({ page: currentPage + 1 }));
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    setIsLoadingMore(false);
  }, [paginatedStatus]);


  const renderProduct = ({ item: product }) => (
    <TouchableOpacity
      key={product.id}
      onPress={() =>
        navigation.navigate('ProductDetail', { userId: product.id })
      }>
      <Explore
        uri={product?.images?.[0]?.src || product?.image}
        name={product?.name}
        price={product?.price}
        saved={product?.saved}
        product_id={product?.id}
        isWatchList={product?.isWatchList}
      />
    </TouchableOpacity>
  );

  const renderProducts = () => {
    const dataToRender = search.trim().length > 0 ? searchResults : wishlist;

    // if (loadingSearch || paginatedStatus === 'loading') {
    //   return (
    //     <View style={{marginLeft: wp('1.5%')}}>
    //       <SkeletonLoader count={6} />
    //     </View>
    //   );
    // }

    if (dataToRender.length === 0) {
      return (
        <View style={styles.noRecordContainer}>
          <Text style={styles.noRecordText}>No Record Found</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={dataToRender}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.productContainer}
        ListFooterComponent={
          search.trim().length === 0 &&
          paginatedProducts.length > 0 && (
            <TouchableOpacity
              onPress={loadMoreProducts}
              style={styles.loadMoreButton}>
              <Text style={styles.loadMoreButtonText}>Load More</Text>
            </TouchableOpacity>
          )
        } onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  const handlepress = () => {
    setVisible(!visible);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <CustomStatusBar color={globalColors.headingBackground} />
      <View
        style={{
          marginVertical: hp('1%'),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Icon
          name="arrow-back"
          size={25}
          color="#333"
          style={{ marginLeft: 8 }}
          onPress={() => navigation.goBack()}
        />

        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontFamily: 'Product Sans',
            fontWeight: '700',
            color: 'black',
            fontSize: 18,
          }}>
          Women Bags
          <Icon
            name="keyboard-arrow-down"
            size={20}
            color="#D42A57"
            style={{ marginTop: 20 }}
          />
        </Text>

        <ImageBackground source={Images.circle} style={{ height: 65, width: 65 }}>
          <Image
            source={Images.sortlogo}
            style={{
              height: 25,
              width: 25,
              marginTop: 12,
              marginLeft: 20,
              alignSelf: 'center',
            }}
          />
        </ImageBackground>
      </View>

      <View style={styles.container}>
        <View style={{ marginTop: '10%' }}>
          <View style={styles.searchContainer}>
            <Text
              style={{
                fontFamily: 'Product Sans',
                color: 'black',
                fontSize: 18,
              }}>
              218 Bags found
            </Text>
          </View>
          {renderProducts()}
        </View>
      </View>
      <TouchableOpacity style={styles.stylesofbtn} onPress={handlepress}>
        <Text style={styles.styleoffont}>
          <Image source={Images.sortarrow} style={{ height: 12, width: 12 }} />{' '}
          Sort
        </Text>
      </TouchableOpacity>
      <Modal visible={visible} onDismiss={handlepress}>
        <View
          style={{
            backgroundColor: 'white',
            height: hp('65%'),
            marginTop: hp('34%'),
            padding: wp('3%'),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: hp('1%'),
            }}>
            <View>
              <Text
                style={{
                  fontFamily: 'Product Sans',
                  fontSize: 40,
                  fontWeight: '700',
                  color: globalColors.black,
                }}>
                SELECT
              </Text>
              <Text
                style={{
                  fontFamily: 'Product Sans',
                  fontSize: 40,
                  fontWeight: '700',
                  color: '#D42A57',
                  marginTop: hp('-1%'),
                }}>
                BAG TYPE
              </Text>
            </View>

            <View>
              <TouchableOpacity onPress={handlepress}>
                <Image
                  source={Images.closeicon}
                  style={{
                    height: 30,
                    width: 30,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingTop: hp('1%') }}>
            {options.map(option => (
              <TouchableOpacity
                key={option.value}
                onPress={() => handlePress(option.value)}
                style={[
                  styles.container2,
                  selected === option.value ? styles.selected : null,
                ]}>
                <View style={styles.circle}>
                  {selected === option.value && (
                    <View style={styles.checkmark}>
                      <Image
                        source={Images.righticon}
                        style={{
                          height: hp('1%'),
                          width: wp('3.2%'),
                          marginTop: hp('0.8%'),
                          marginLeft: wp('1.1%'),
                        }}></Image>
                    </View>
                  )}
                </View>
                <Text style={styles.label}>{option.label}</Text>
              </TouchableOpacity>
              //       <View>
              //          <CheckBox
              //   value={selected}
              //   onValueChange={setSelected}
              //   style={styles.checkbox}
              // />

              //         </View>
            ))}
          </View>
          <Button
            stylesofbtn={styles.custbtn}
            styleoffont={styles.custfontstyle}
            // handlepress={handlePress}
            name={'Apply'}
          // loading={loading}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ExploreMore;

const styles = StyleSheet.create({
  custbtn: {
    backgroundColor: 'black',
    padding: wp('3%'),
    borderRadius: 5,
    marginVertical: hp('1.5%'),
  },
  custfontstyle: {
    color: globalColors.white,
    textAlign: 'center',
    fontFamily: 'Product Sans',
    fontWeight: '700',
  },

  stylesofbtn: {
    backgroundColor: globalColors.black,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    marginHorizontal: wp('33%'),
    borderRadius: 30,
    marginVertical: 0,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  styleoffont: {
    textAlign: 'center',
    color: globalColors.white,
    fontWeight: '700',
    fontFamily: 'Product Sans',
    fontSize: 16,
  },
  safeAreaView: {
    flex: 1,
    position: 'relative',
  },
  productContainer: {
    justifyContent: 'space-around',
  },
  container: {
    padding: 5,
    flex: 1,
    marginTop: -5,
    backgroundColor: globalColors.white,
  },
  inputfield: {
    backgroundColor: 'white',
    margin: 10,
    borderColor: '#DBCCC1',
    borderWidth: 1,
    padding: 7,
    borderRadius: 20,
    paddingLeft: 20,
  },
  custposition: {
    position: 'relative',
  },
  cust_icon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  searchContainer: {
    // marginVertical: 5,
    marginBottom: hp('2%'),
    marginLeft: wp('1%'),
  },
  noRecordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordText: {
    fontFamily: 'Intrepid Regular',
  },
  loadMoreButton: {
    backgroundColor: globalColors.black,
    height: hp('4%'),
    alignSelf: 'center',
    justifyContent: 'center',
    width: wp('25%'),
    borderRadius: 5,
    marginBottom: hp('14%'),
    margintop: hp("0.2%"),
    color: globalColors.white,
    fontFamily: 'Product Sans',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loadMoreButtonText: {
    fontSize: 14,
    color: globalColors.white,
    fontFamily: 'Intrepid Regular',
    textAlign: 'center',
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#D42A57',
  },
  label: {
    marginLeft: 10,
    fontFamily: 'Product Sans',
    color: globalColors.black,
    fontWeight: '600',
  },
  selected: {
    backgroundColor: '#f0f0f0',
  },
});
