import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
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
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

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
  const count = productss?.length;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await axios.get(
          `https://ghostwhite-guanaco-836757.hostingersite.com/wp-json/wc/v3/products?category=${category.id}&consumer_key=ck_74025587053512828ec315f206d134bc313d97cb&consumer_secret=cs_72ca42854e72b72e3143a14d79fd0a91c649fbeb`,
        );
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category.id]);

  // console.log('###########', products?.name);

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
          {productss.length === 0 ? (
            <Text style={{fontSize: 30, textAlign: 'center'}}>
              No products available
            </Text>
          ) : (
            productss.map(product => (
              <Product
                key={product.id}
                uri={product?.images?.[0]?.src}
                name={product?.name}
                price={product?.price}
                saved={product?.saved}></Product>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: wp('2%'),
    alignContent: 'center',

    backgroundColor: globalColors.headingBackground,
  },
  productContainer: {
    flexDirection: 'row',

    flexWrap: 'wrap',
    marginTop: hp('3%'),
  },
  TextHeading: {
    fontSize: 10,
    marginTop: hp('5%'),
  },
  CategoryText: {
    fontSize: 25,
    // textTransform: 'uppercase',
    color: globalColors.black,
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
