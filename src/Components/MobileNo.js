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
    <View style={{ marginBottom: hp('1.5%') }}>
      <CountryCodeDropdownPicker
        selected={selected}
        setSelected={setSelected}
        setCountryDetails={setCountry}
        phone={phone}
        setPhone={setPhone}
        countryCodeTextStyles={{
          fontSize: 13,
          paddingTop: hp('0.6%'), paddingBottom: hp('0.6%'), alignItems: 'center', borderColor: globalColors.inputBorder,
        }}
        countryCodeContainerStyles={{}}
        // countryCodeTextStyles={{backgroundColor: globalColors.white}}
        // dropdownStyles={{backgroundColor: 'red'}}
        phoneStyles={{
          backgroundColor: globalColors.white,
          fontFamily: 'Intrepid Regular',
          width: 750,
          borderColor: globalColors.inputBorder,

          height: hp('5.5%'),
          fontSize: 14,
        }}
        style={{ padding: 10 }}
      />
    </View>
  );
};

export default MobileNo;
