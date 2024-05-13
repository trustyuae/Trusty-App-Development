import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CheckBox} from 'react-native-elements';
// import CountryPicker from 'react-native-country-picker-modal';
import PhoneInput from 'react-phone-number-input';

import {globalColors} from '../Assets/Theme/globalColors';

const SignupPage = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [checked, setChecked] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  const onSelectCountry = country => {
    setCountry(country.name);
    setCountryCode(country.cca2);
  };
  const handleSignup = () => {
    // Handle signup logic here
    navigation.navigate('DrawerHome');
  };

  const handleCheckboxPress = () => {
    setChecked(!checked);
  };
  const emojisWithIcons = [{title: 'Mr'}, {title: 'Miss'}];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Create An Account</Text>
          <Text style={styles.description}>
            By creating an account, Yoy agree to accept the General Terms And
            Conditions of Use and that your data will be processed in complines
            with the privacy Policy of Trusty.
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputSection}>
              <Text style={styles.headingInput}>Personal Information</Text>
              {/* <TextInput
                style={styles.input}
                placeholder="Select Title"
                value={firstName}
                onChangeText={setFirstName}
              /> */}

              <SelectDropdown
                data={emojisWithIcons}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                renderButton={(selectedItem, isOpen) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text>
                        {(selectedItem && selectedItem.title) ||
                          'Selected Title'}
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
                      <Text style={styles.dropdownItemTxtStyle}>
                        {item.title}
                      </Text>
                    </View>
                  );
                }}
                // showsVerticalScrollIndicator={false}
                // dropdownStyle={styles.dropdownMenuStyle}
              />
              <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />

              {/* <View>
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="US"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  renderFlag={({countryCode, callingCode, flag}) => (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      {flag && <PhoneInput.Flag countryCode={countryCode} />}
                      <Text>{callingCode}</Text>
                    </View>
                  )}
                  placeholder="Enter phone number"
                />
              </View> */}
            </View>
            <View style={styles.inputSection}>
              <Text style={styles.headingInput}>Billing Information</Text>
              <TextInput
                style={styles.input}
                placeholder="Country"
                value={country}
                onChangeText={setCountry}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
              <TextInput
                style={styles.input}
                placeholder="Address Continued"
                value={address}
                onChangeText={setAddress}
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={setCity}
              />
            </View>
            <View style={styles.inputSection}>
              <Text style={styles.headingInput}>Shipping Information</Text>
              <TextInput
                style={styles.input}
                placeholder="Country"
                value={country}
                onChangeText={setCountry}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={setAddress}
              />
              <TextInput
                style={styles.input}
                placeholder="Address Continued"
                value={address}
                onChangeText={setAddress}
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={city}
                onChangeText={setCity}
              />
            </View>
            <TouchableOpacity onPress={handleCheckboxPress}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.CheckBoxContainer}>
                  {checked && <Text style={styles.checkedMark}>✓</Text>}
                </View>
                <Text style={{fontSize: 14}}>
                  I agree to receive information by email about offers,
                  services, products and events from Trusty or other group
                  companies, in accordance with the Privacy Policy.{'\n'}
                  <Text style={{fontStyle: 'italic', fontSize: 12}}>
                    You can unsubscribe from email marketing communications via
                    the "unsubscribe" link at the bottom of each of our email
                    promotional communications.
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
            {/* <Text>
              I aress to receive information by email about offers,
              services,products and events from Trusty or other group companies,
              in accordance with the Privacy Policy. You can unsubscribe from
              email marketing communications via the "unsubscribe" link at the
              bottom of each of our email promotional communications.
            </Text> */}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Create an account</Text>
          </TouchableOpacity>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text
                style={styles.footerLink}
                onPress={() => navigation.navigate('DrawerHome')}>
                Log in
              </Text>
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
  },
  formContainer: {
    width: hp('45%'),
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  headingInput: {
    backgroundColor: globalColors.headingBackground,
    width: hp('20%'),
    marginBottom: wp('4%'),
  },
  inputSection: {
    marginBottom: wp('6%'),
  },
  description: {
    marginBottom: 20,
    fontFamily: 'Courier New',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    height: hp('5.5%'),
    borderColor: globalColors.inputBorder,
    borderRadius: 4,
    padding: 10,
    marginBottom: hp('1.5%'),
    fontSize: wp('3.1%'),
    backgroundColor: globalColors.white,
  },
  button: {
    backgroundColor: globalColors.buttonBackground,
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: globalColors.white,
    fontSize: wp('3.5%'),
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: wp('3.1%'),
    color: '#333',
    marginBottom: hp('4%'),
  },
  footerLink: {
    color: globalColors.backgroundLight,
    marginLeft: 5,
  },

  //---------------------------------------------

  dropdownButtonStyle: {
    height: 50,
    height: hp('5.5%'),
    fontSize: wp('3.1%'),
    backgroundColor: globalColors.white,
    borderRadius: 4,
    flexDirection: 'row',
    borderColor: globalColors.inputBorder,
    alignItems: 'center',
    paddingHorizontal: 12,
    borderColor: globalColors.inputBorder,
    marginBottom: hp('1.5%'),
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: wp('3.1%'),
    fontWeight: '500',
    color: 'red',
  },
  dropdownButtonArrowStyle: {
    fontSize: wp('6%'),
    marginLeft: wp('50%'),
  },
  dropdownButtonIconStyle: {
    fontSize: wp('3.1%'),
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: wp('3.1%'),
    fontWeight: '500',
    // color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: wp('3.1%'),
    marginRight: 8,
  },
  CheckBoxContainer: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    borderWidth: 1,
    // flexWrap: 'wrap',
    borderRadius: wp('1.2%'),
    backgroundColor: globalColors.white,
    marginRight: wp('2%'),
  },
  checkedMark: {
    color: globalColors.black,
  },
});

export default SignupPage;
