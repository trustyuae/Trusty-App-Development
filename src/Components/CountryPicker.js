// import React, {useState} from 'react';
// import {View, TextInput, Image, StyleSheet} from 'react-native';
// import CountryPicker from 'react-native-country-picker-modal';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {globalColors} from '../Assets/Theme/globalColors';

// const CountryPickerComponent = () => {
//   const [country, setCountry] = useState('');
//   const [countryCode, setCountryCode] = useState('');
//   const [countryFlag, setCountryFlag] = useState('');

//   const onSelectCountry = country => {
//     setCountry(country.name);
//     setCountryCode(country.cca2);
//     setCountryFlag(country.flag);
//   };

//   return (
//     <View>
//       <TextInput
//         style={styles.input}
//         placeholder="Country ss"
//         value={country}
//         onChangeText={text => setCountry(text)}
//       />
//       {/* <Image
//         source={{uri: countryFlag}}
//         style={{width: 24, height: 24, marginLeft: 10}}
//       /> */}
//       <CountryPicker
//         onSelect={country => onSelectCountry(country)}
//         countryCode={countryCode}
//         withFlag={true}
//         withFilter={true}
//         // withAlphaFilter={true}
//         // withCallingCode={true}
//         // withEmoji={true}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     borderWidth: 1,
//     height: hp('5.5%'),
//     borderColor: globalColors.inputBorder,
//     borderRadius: 4,
//     padding: 10,
//     marginBottom: hp('1.5%'),
//     fontSize: wp('3.1%'),
//     backgroundColor: globalColors.white,
//   },
// });

// export default CountryPickerComponent;
