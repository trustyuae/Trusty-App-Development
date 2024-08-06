import React, {useEffect, useState} from 'react';
import {StyleSheet, Pressable, View, FlatList} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {fetchProducts} from '../../Redux/Slice/productSlice';
import {useDispatch, useSelector} from 'react-redux';
import {fetchWishlist} from '../../Redux/Slice/wishlistSlice';
import {getToken} from '../../Utils/localstorage';
import {SafeAreaView} from 'react-native';
import {fetchRedyToGo} from '../../Redux/Slice/ready_to_go';
import Readytogo from '../../Components/Ready To Go/Readytogo';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const SeeAll = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {categories, categoryStatus, categoryError} = useSelector(
    state => state.category,
  );
  const {redytogoProducts, redytogoStatus, redytogoError} = useSelector(
    state => state.redytogo,
  );
  const {products, status, error} = useSelector(state => state.product);
  const {items, loading: wishlistLoading} = useSelector(
    state => state.wishlist,
  );
  const [tokenData, setTokenData] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    data();
    dispatch(fetchRedyToGo());
    dispatch(fetchProducts());
  }, [dispatch]);

  useFocusEffect(
    React.useCallback(() => {
      data();
      dispatch(fetchProducts());
    }, [dispatch, tokenData]),
  );

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

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <View style={styles.maincontainer}>
          <FlatList
            data={redytogoProducts}
            renderItem={({item}) => (
              <Pressable
                key={item.id}
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    userId: item.id,
                  })
                }>
                <Readytogo
                  key={item?.id}
                  id={item?.id}
                  uri={item?.images[0]}
                  name={item?.name}
                  price={item?.price}
                  saved={item?.saved}
                  product_id={item?.id}
                  isWatchList={item?.isWatchList}
                />
              </Pressable>
            )}
            keyExtractor={item => item.id}
            numColumns={2}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SeeAll;

const styles = StyleSheet.create({
  maincontainer: {
    paddingHorizontal: wp('1%'),
    marginTop: hp('10%'),
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'Product Sans',
    color: globalColors.black,
    marginBottom: hp('0.5%'),
    fontSize: 17,
  },
  image: {
    borderRadius: 6,
    width: wp('46%'),
    height: hp('21%'),
  },
  saveImagea: {
    position: 'absolute',
    marginTop: wp('0.1%'),
    marginLeft: wp('28%'),
    padding: 12,
    left: 15,
  },
  saveImage: {
    width: 32,
    resizeMode: 'contain',
    padding: 8,
    height: 32,
  },
  detailsContainer: {
    marginTop: hp('1%'),
    height: hp('10%'),
    width: wp('46%'),
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    margin: wp('1%'),
    marginTop: hp('3%'),
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    fontFamily: 'Product Sans',
    color: globalColors.black,
  },
});
