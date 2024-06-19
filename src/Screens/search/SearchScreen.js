import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Redux/Slice/productSlice';
import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';
import { fetchPaginatedProducts, resetProducts } from '../../Redux/Slice/paginatedProductSlice';
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
import { baseURL } from '../../Utils/API';

const SearchScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products: paginatedProducts, status: paginatedStatus, page } = useSelector(state => state.paginatedProducts);
  const { items } = useSelector(state => state.wishlist);

  const [search, setSearch] = useState('');
  const [wishlist, setWishlist] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const debouncedSearchRef = useRef(useCallback(debounce(handleSearch, 300)));


  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(fetchWishlist(token));
    }
    dispatch(resetProducts());
    dispatch(fetchPaginatedProducts({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    const updatedWishlist = updateWishlistWithFlags(paginatedProducts, items.Wishlist);
    setWishlist(updatedWishlist);
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

  async function handleSearch(searchQuery) {
    try {
      if (searchQuery.trim().length > 0) {
        setLoadingSearch(true);
        const response = await fetch(
          `${baseURL}/custom-woo-api/v1/products/search?search=${encodeURIComponent(
            searchQuery.trim()
          )}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const searchData = await response.json();
        setSearchResults(searchData);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    } finally {
      setLoadingSearch(false);
    }
  }

  useEffect(() => {
    debouncedSearchRef.current(search);
  }, [search]);

  const renderProducts = () => {
    const dataToRender = search.trim().length > 0 ? searchResults : wishlist;

    if (loadingSearch || paginatedStatus === 'loading') {
      return <View style={{ marginLeft: wp('1.5%') }}><SkeletonLoader count={6} /></View>;
    }

    if (dataToRender.length === 0) {
      return (
        <View style={styles.noRecordContainer}>
          <Text style={styles.noRecordText}>No Record Found</Text>
        </View>
      );
    }

    return (
      <View style={styles.productContainer}>
        {dataToRender.map(product => (
          <TouchableOpacity
            key={product.id}
            onPress={() =>
              navigation.navigate('ProductDetail', {
                userId: product.id,
              })
            }>
            <Product
              uri={product?.images?.[0]?.src || product?.image}
              name={product?.name}
              price={product?.price}
              saved={product?.saved}
              product_id={product?.id}
              isWatchList={product?.isWatchList}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const loadMoreProducts = () => {
    dispatch(fetchPaginatedProducts({ page }));
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomStatusBar color={globalColors.headingBackground} />
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <View style={styles.custposition}>
              <TextInput
                style={styles.inputfield}
                placeholder="Search"
                value={search}
                onChangeText={text => setSearch(text)}
              />
              <TouchableOpacity style={styles.cust_icon}>
                <Icon name={'search'} size={20} onPress={() => debouncedSearchRef.current(search)} />
              </TouchableOpacity>
            </View>
          </View>
          {paginatedStatus === 'loading' ? (
            <View style={{ marginLeft: wp('1.5%') }}>
              <SkeletonLoader count={6} />
            </View>
          ) : (
            <ScrollView showsVerticalScrollIndicator={false}>
              {renderProducts()}

            </ScrollView>
          )}
        </View>
        {paginatedProducts.length > 0 && (<View style={{
          backgroundColor: globalColors.black, height: hp('4%'), alignSelf: 'center', width: wp('25%'), borderRadius: 5, marginBottom: hp('6%'),

        }}>
          <TouchableOpacity onPress={loadMoreProducts} style={styles.loadMoreButton}>
            <Text style={styles.loadMoreButtonText}>Load More</Text>
          </TouchableOpacity>
        </View>)

        }

      </ScrollView>
    </SafeAreaView >
  );
};

export default SearchScreen;

// Debounce function to delay API calls
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
  noRecordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noRecordText: {
    fontFamily: 'Intrepid Regular',
  },
  loadMoreButton: {
    // alignItems: 'center',
    marginVertical: 10,
    color: globalColors.white,
    fontFamily: 'Intrepid Regular',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loadMoreButtonText: {
    fontSize: 14,
    color: globalColors.white,
    fontFamily: 'Intrepid Regular',
    textAlign: 'center'
  },
});
