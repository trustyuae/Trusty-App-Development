import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import {View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../Assets/Theme/globalColors';
import Product from '../Components/Product/Product';
import {Images} from '../Constants';
import {ScrollView} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCategoryProducts} from '../Redux/Slice/productSlice';

const CategoryProducts = () => {
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
    {
      id: 12,
      uri: Images.product,
      name: 'Dummy Product 12',
      price: 'AED 600',
      saved: false,
    },
  ];
  const route = useRoute();
  const {category} = route.params;
  const [productss, setProducts] = useState([]);
  const dispatch = useDispatch();
  const {categoryProducts, status, error} = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchCategoryProducts({categoryId: category.id}));
  }, [category.id, dispatch]);

  // console.log('###########', products?.name);
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
            borderBottomColor: '#ccc',
            marginBottom: 10,
            marginTop: 10,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            gap: wp('48%'),
            justifyContent: 'center',
          }}>
          <SelectDropdown
            data={emojisWithIcons}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
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
                  <Text style={{fontSize: 14, fontFamily: 'Intrepid Regular'}}>
                    {item}
                  </Text>
                </View>
              );
            }}
          />
          <SelectDropdown
            data={emojisWithIcons}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
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
                  <Text style={{fontSize: 14, fontFamily: 'Intrepid Regular'}}>
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
            categoryProducts.map(product => (
              <Product
                key={product.id}
                uri={product?.images?.[0]?.src}
                name={product?.name}
                price={product?.price}
                saved={product?.saved}
              />
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
    marginTop: hp('5%'),
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
    marginLeft: 5,
    width: 80,
    height: 30,
  },
  dropdownButtonStyle: {
    width: 80,
    flexDirection: 'row',
  },
});

export default CategoryProducts;
