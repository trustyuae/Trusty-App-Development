import React from 'react';
import { View } from 'react-native';
import CountryCodeDropdownPicker from 'react-native-dropdown-country-picker';
import { globalColors } from '../Assets/Theme/globalColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const MobileNo = ({ selected, setSelected, setCountry, phone, setPhone }) => {
  return (
    <View style={{}}>
      <CountryCodeDropdownPicker
        selected={selected}
        setSelected={setSelected}
        setCountryDetails={setCountry}
        phone={phone}
        setPhone={setPhone}

        inputPlaceholder={'Your placeholder'}
        countryCodeTextStyles={{
          fontSize: 13,
          paddingTop: hp('0.6%'),
          paddingBottom: hp('0.6%'),
          paddingLeft: hp('0.6%'),
          paddingRight: hp('0.6%'),
          alignItems: 'center',
        }}
        countryCodeContainerStyles={{
          marginLeft: wp('5%'),
          borderColor: globalColors.white,

        }}

        phoneStyles={{
          backgroundColor: globalColors.white,
          fontFamily: 'Product Sans',
          color: globalColors.black,
          width: 750,
          borderColor: globalColors.white,
          height: hp('5.5%'),
          fontSize: 14,
        }}
      />
    </View>
  );
};

export default MobileNo;
