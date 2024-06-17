import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView, ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Product from '../../Components/Product/Product';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/Slice/productSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalColors } from '../../Assets/Theme/globalColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';
import { getToken } from '../../Utils/localstorage';
import SkeletonLoader from '../../Components/Loader/SkeletonLoader';

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector(state => state.product);
  const [data, setData] = useState([]);
  const { items } = useSelector(state => state.wishlist);

  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setTokenData(token);
      dispatch(fetchWishlist(token));
    }

    dispatch(fetchProducts());
    dataWishlist()
  }, [dispatch]);



  const dataWishlist = () => {
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
  }




  useEffect(() => {
    setData(wishlist);
  }, [products]);

  const updated = data.filter(item =>
    item?.name?.toLowerCase().includes(search?.toLowerCase()),
  );

  return (
    <SafeAreaView>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.custposition}>
            <TextInput
              style={styles.inputfield}
              placeholder="Search"
              value={search}
              onChangeText={text => setSearch(text)}
            />

            <Icon name={'search'} size={20} style={styles.cust_icon} />
          </View>
        </View>
        {status == 'loading' ? (
          // <ActivityIndicator
          //   size="large"
          //   color={globalColors.black}
          //   style={{ marginTop: '50%' }}
          // />
          <View style={{}}>
            <SkeletonLoader count={6} />
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {updated.length > 0 ? (
              <View style={styles.productContainer}>
                {updated?.map(product => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProductDetail', {
                        userId: product.id,
                      })
                    }>
                    <Product
                      key={product.id}
                      uri={product?.images?.[0]?.src}
                      name={product?.name}
                      price={product?.price}
                      saved={product?.saved}
                      product_id={product?.id}
                      isWatchList={product?.isWatchList}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontFamily: 'Intrepid Regular' }}>
                  No Record Found
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: hp('30%'),
  },
  container: {
    padding: 5,
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
    marginVertical: 20,
  },
});
