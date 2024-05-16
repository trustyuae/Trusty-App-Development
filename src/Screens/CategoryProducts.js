import React, {useState} from 'react';
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
  const {categoryName} = route.params;
  const count = 218;

  const [selectedValue, setSelectedValue] = useState('One');
  const data = ['One', 'Two', 'Three'];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.TextHeading}>Women</Text>
        <View
          style={{flexDirection: 'row', alignItems: 'baseline', fontSize: 12}}>
          <Text style={styles.CategoryText}>{categoryName}</Text>
          <Text>({count})</Text>
        </View>
        {/* <View style={{width: 90}}>
          <Text>Sort by</Text>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
            style={styles.dropdownPicker}>
            <Picker.Item label="One" value="one" />
            <Picker.Item label="Two" value="two" />
            <Picker.Item label="Three" value="three" />
          </Picker>
        </View> */}

        <SelectDropdown
          data={data}
          onSelect={(selectedItem, index) => setSelectedValue(selectedItem)}
          buttonTextAfterSelection={(selectedItem, index) => selectedItem}
          rowTextForSelection={(item, index) => item}
          buttonStyle={styles.dropdownButtonStyle}
          buttonTextStyle={styles.dropdownButtonTextStyle}
          renderDropdownIcon={() => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Text style={styles.dropdownButtonTextStyle}>{'V'}</Text>
            </View>
          )}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        <View style={styles.productContainer}>
          {ProductList.map(product => (
            <Product
              key={product.id}
              uri={product.uri}
              name={product.name}
              price={product.price}
              saved={product.saved}></Product>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: wp('3%'),
    // marginBottom: hp('6%'),

    // height: hp('9%'),
    backgroundColor: globalColors.headingBackground,
  },
  productContainer: {
    flexDirection: 'row',

    flexWrap: 'wrap',
    marginTop: hp('3%'),
  },
  TextHeading: {
    fontSize: 10,
  },
  CategoryText: {
    fontSize: 25,
    textTransform: 'uppercase',
    color: globalColors.black,
  },
  dropdownPicker: {
    // height: 40,
    marginBottom: 10,
    // backgroundColor: globalColors.white,
    borderWidth: 1,
    // borderColor: globalColors.inputBorder,
    borderRadius: 4,
  },
});

export default CategoryProducts;
