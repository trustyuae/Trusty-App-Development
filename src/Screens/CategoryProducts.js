import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../Assets/Theme/globalColors';
import Product from '../Components/Product/Product';
import {ScrollView} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCategoryProducts} from '../Redux/Slice/productSlice';
import {fetchWishlist} from '../Redux/Slice/wishlistSlice';
import {getToken} from '../Utils/localstorage';

const CategoryProducts = ({navigation}) => {
  const route = useRoute();
  const {category} = route.params;
  // const [productss, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState([]);

  const [tokenData, setTokenData] = useState(null);
  const {categoryProducts, status, error} = useSelector(state => state.product);
  const {items} = useSelector(state => state.wishlist);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();

        if (token) {
          setTokenData(token);
          dispatch(fetchWishlist(token));
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    fetchData();
  }, [dispatch, tokenData]);

  useEffect(() => {
    const itemIdList = items?.Wishlist?.map(item => ({id: item}));

    const productIds = new Set(itemIdList?.map(item => Number(item?.id)));
    const result = categoryProducts.map(productItem => ({
      ...productItem,
      isWatchList: productIds.has(productItem?.id),
    }));
    if (result) {
      setWishlist(result);
    }
    // console.log('roductIdss', JSON.stringify(result));
  }, [items, categoryProducts, getToken]);

  useEffect(() => {
    dispatch(fetchCategoryProducts({categoryId: category.id}));
  }, [dispatch]);

  const count = categoryProducts?.length;

  const [selectedValue, setSelectedValue] = useState('One');
  const data = ['One', 'Two', 'Three'];
  const emojisWithIcons = ['Relevance', 'Lowest Price', 'Highest Price'];
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.TextHeading}>Women</Text>

        <View
          style={{flexDirection: 'row', alignItems: 'baseline', fontSize: 12}}>
          <Text style={styles.CategoryText}>{category.name}</Text>
          <Text>({count})</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            marginRight: 10,
            marginLeft: 10,
            paddingRight: 20,
            borderBottomColor: '#ccc',
            marginBottom: 10,
            marginTop: 10,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            // gap: wp('48%'),
            paddingLeft: 20,
            paddingRight: 10,
            justifyContent: 'space-between',
          }}>
          <SelectDropdown
            data={emojisWithIcons}
            onSelect={(selectedItem, index) => {}}
            // style={{marginLeft: 0}}
            renderButton={(selectedItem, isOpen) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text
                    style={{
                      fontFamily: 'Intrepid Regular',
                      fontSize: 15,
                      color: globalColors.buttonBackground,
                    }}>
                    {(selectedItem && selectedItem.title) || 'filter'}
                  </Text>
                  <Icon
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && {backgroundColor: '#D2D9DF'}),
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Intrepid Regular',
                      marginLeft: 4,
                      marginRight: 4,
                    }}>
                    {item}
                  </Text>
                </View>
              );
            }}
          />
          <SelectDropdown
            data={emojisWithIcons}
            onSelect={(selectedItem, index) => {}}
            // style={{marginLeft: 0}}
            renderButton={(selectedItem, isOpen) => {
              return (
                <View style={styles.dropdownButtonStyle}>
                  <Text
                    style={{
                      fontFamily: 'Intrepid Regular',
                      fontSize: 15,
                      color: globalColors.buttonBackground,
                    }}>
                    {(selectedItem && selectedItem.title) || 'Sort By'}
                  </Text>
                  <Icon
                    name={isOpen ? 'chevron-up' : 'chevron-down'}
                    style={styles.dropdownButtonArrowStyle}
                  />
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View
                  style={{
                    ...styles.dropdownItemStyle,
                    ...(isSelected && {backgroundColor: '#D2D9DF'}),
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Intrepid Regular',
                      marginLeft: 4,
                      marginRight: 4,
                    }}>
                    {item}
                  </Text>
                </View>
              );
            }}
          />
        </View>

        <View style={styles.productContainer}>
          {status === 'loading' ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : status === 'failed' ? (
            <Text style={styles.errorText}>Error: {error}</Text>
          ) : categoryProducts.length === 0 ? (
            <Text style={styles.noProductsText}>No products available</Text>
          ) : (
            wishlist.map(product => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    userId: product.id,
                    isWatchList: product?.isWatchList,
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
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',

    backgroundColor: globalColors.headingBackground,
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: hp('3%'),
  },
  TextHeading: {
    fontSize: 10,
    fontSize: 14,
    marginTop: hp('7%'),
    marginLeft: wp('2%'),
  },
  CategoryText: {
    fontSize: 25,
    // textTransform: 'uppercase',
    color: globalColors.black,
    marginLeft: wp('2%'),
  },

  dropdownItemStyle: {
    position: 'relative',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: globalColors.inputBorder,
    justifyContent: 'center',
    width: 100,
    height: 40,
    color: globalColors.black,
  },
  dropdownButtonStyle: {
    width: 80,
    flexDirection: 'row',
  },
});

export default CategoryProducts;
