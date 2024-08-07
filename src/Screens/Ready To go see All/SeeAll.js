import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPaginatedProducts,
  resetProducts,
} from '../../Redux/Slice/paginatedProductSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalColors } from '../../Assets/Theme/globalColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import Product from '../../Components/Product/Product';
import SkeletonLoader from '../../Components/Loader/SkeletonLoader';
import { getToken } from '../../Utils/localstorage';
import { useFocusEffect } from '@react-navigation/native';
import { fetchRedyToGo } from '../../Redux/Slice/ready_to_go';
import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';

const SeeAll = ({ navigation }) => {
  const dispatch = useDispatch();
  const { redytogoProducts, redytogoStatus } = useSelector(state => state.redytogo);
  const paginatedProducts = redytogoProducts;
  const paginatedStatus = redytogoStatus;
  const { items } = useSelector(state => state.wishlist);
  const [wishlist, setWishlist] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const token = getToken();
      if (token) {
        dispatch(fetchWishlist(token));
      }
      dispatch(fetchRedyToGo());
    }, [dispatch])
  );

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

  const renderProduct = ({ item: product }) => (
    <TouchableOpacity
      key={product.id}
      onPress={() => navigation.navigate('ProductDetail', { userId: product.id })}
    >
      <Product
        uri={product?.images?.[0] || product?.image}
        name={product?.name}
        price={product?.price}
        saved={product?.saved}
        product_id={product?.id}
        isWatchList={product?.isWatchList}
      />
    </TouchableOpacity>
  );

  const loadMoreProducts = () => {
    dispatch(fetchPaginatedProducts({ page: currentPage + 1 }));
  };

  const renderProducts = () => {
    if (paginatedStatus === 'loading') {
      return (
        <View style={{ marginLeft: wp('1.5%') }}>
          <SkeletonLoader count={6} />
        </View>
      );
    }

    if (wishlist.length === 0) {
      return (
        <View style={styles.noRecordContainer}>
          <Text style={styles.noRecordText}>No Record Found</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={wishlist}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.productContainer}
        ListFooterComponent={
          paginatedProducts.length > 0 && (
            <TouchableOpacity
              onPress={loadMoreProducts}
              style={styles.loadMoreButton}
            >
              <Text style={styles.loadMoreButtonText}>Load More</Text>
            </TouchableOpacity>
          )
        }
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <CustomStatusBar color={globalColors.headingBackground} />
      <View style={styles.container}>
        {renderProducts()}
      </View>
    </SafeAreaView>
  );
};

export default SeeAll;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  productContainer: {
    justifyContent: 'space-around',
  },
  container: {
    padding: 5,
    flex: 1,
    marginTop:Platform.OS=='ios'?hp('2%'):hp('5%'),
  },
  noRecordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordText: {
    fontFamily: 'Product Sans',
  },
  loadMoreButton: {
    backgroundColor: globalColors.black,
    height: hp('4%'),
    alignSelf: 'center',
    justifyContent: 'center',
    width: wp('25%'),
    borderRadius: 5,
    marginBottom: hp('6%'),
    marginVertical: 10,
    color: globalColors.white,
    fontFamily: 'Product Sans',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loadMoreButtonText: {
    fontSize: 14,
    color: globalColors.white,
    fontFamily: 'Product Sans',
    textAlign: 'center',
  },
});
