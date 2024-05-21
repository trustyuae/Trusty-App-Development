import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-picker/picker';
import {globalColors} from '../../Assets/Theme/globalColors';
import MobileNo from '../../Components/MobileNo';

import {useDispatch, useSelector} from 'react-redux';
import {signupUser} from '../../Redux/Slice/authSlice';

const SignupPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [addressContinued, setAddressContinued] = useState('');
  const [city, setCity] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selected, setSelected] = React.useState('+91');
  const [countries, setCountries] = useState([]);
  const [phone, setPhone] = React.useState('');
  const [show, setShow] = useState(true);

  const [value, setValues] = useState({
    email: '',
    password: '',
  });
  const {loading, error} = useSelector(state => state.auth);

  const isValidEmail = email => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = password => {
    // Check if password length is at least 8 characters
    return password.length >= 8;
  };

  const isValidName = name => {
    // Check if name contains only alphabetic characters
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const handleCountryChange = value => {
    setSelectedCountry(value);
  };
  const handlechange = (key, value) => {
    setValues(pre => ({...pre, [key]: value}));
  };
  useEffect(() => {
    fetch(
      'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code',
    )
      .then(response => response.json())
      .then(data => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);
  const clearForm = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setAddress('');
    setAddressContinued('');
    setCity('');
    setChecked(false);
    setSelectedCountry('');
    setSelected('+91');
    setPhone('');
    setShow(true);
    setValues({email: '', password: ''});
  };
  const handleSignup = () => {
    if (!isValidEmail(value.email)) {
      console.log('Please enter a valid email address');
      return;
    }
    if (!isValidPassword(value.password)) {
      console.log('Password must be at least 8 characters long');
      return;
    }
    if (!isValidName(firstName)) {
      console.log('First name should contain only alphabetic characters');
      return;
    }
    if (!isValidName(lastName)) {
      console.log('Last name should contain only alphabetic characters');
      return;
    }
    const userData = {
      title: selectedTitle,
      email: value.email,
      password: value.password,
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      address: address + (addressContinued ? ', ' + addressContinued : ''),
      city,
      country: selectedCountry,
    };
   
    dispatch(signupUser(userData)).then(action => {
      if (signupUser.fulfilled.match(action)) {
        clearForm();
        navigation.navigate('DrawerHome');
      }
    });
  };

  const handleCheckboxPress = () => {
    if (checked) {
      handleSignup();
    } else {
      console.log('please check the mark');
    }
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
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={value.email}
                onChangeText={text => handlechange('email', text)}
              />

              <View style={styles.custposition}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={value.password}
                  secureTextEntry={show ? true : false}
                  onChangeText={text => handlechange('password', text)}
                />
                {show ? (
                  <Icon
                    name="eye-off-outline"
                    size={20}
                    style={styles.cust_icon}
                    onPress={() => setShow(false)}
                  />
                ) : (
                  <Icon
                    name="eye-outline"
                    size={20}
                    style={styles.cust_icon}
                    onPress={() => setShow(true)}
                  />
                )}
              </View>

              <SelectDropdown
                data={emojisWithIcons}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                }}
                renderButton={(selectedItem, isOpen) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text
                        style={{
                          fontFamily: 'Intrepid Regular',
                          fontSize: 14,
                          color: globalColors.buttonBackground,
                        }}>
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

              <MobileNo
                selected={selected}
                setSelected={setSelected}
                setCountry={setSelectedCountry}
                phone={phone}
                setPhone={setPhone}></MobileNo>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.headingInput}>Billing Information</Text>

              <View style={styles.inputPicker}>
                <Picker
                  selectedValue={selectedCountry}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedCountry(itemValue)
                  }>
                  {countries.map((country, index) => (
                    <Picker.Item
                      key={index}
                      label={country.label}
                      value={country.value}
                      style={{
                        fontFamily: 'Intrepid Regular',
                        fontSize: 14,
                        color: globalColors.buttonBackground,
                      }}
                    />
                  ))}
                </Picker>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={address}
                onChangeText={text =>
                  setAddress(prevAddress => prevAddress + text)
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Address Continued"
                value={addressContinued}
                onChangeText={text => setAddressContinued(text)}
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
              <View style={styles.inputPicker}>
                <Picker
                  selectedValue={selectedCountry}
                  // styles={{backgroundColor: globalColors.white}}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedCountry(itemValue)
                  }>
                  {countries.map((country, index) => (
                    <Picker.Item
                      key={index}
                      label={country.label}
                      value={country.value}
                      style={{
                        fontFamily: 'Intrepid Regular',
                        fontSize: 14,
                        color: globalColors.buttonBackground,
                      }}
                    />
                  ))}
                </Picker>
              </View>
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
            <Pressable onPress={handleCheckboxPress}>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.CheckBoxContainer}>
                  {checked && <Text style={styles.checkedMark}>✓</Text>}
                </View>
                <Text style={{fontSize: 13, fontFamily: 'Intrepid Regular'}}>
                  I agree to receive information by email about offers,
                  services, products and events from Trusty or other group
                  companies, in accordance with the Privacy Policy.{'\n'}
                  <Text style={{fontFamily: 'Intrepid Regular', fontSize: 13}}>
                    You can unsubscribe from email marketing communications via
                    the "unsubscribe" link at the bottom of each of our email
                    promotional communications.
                  </Text>
                </Text>
              </View>
            </Pressable>
          </View>

          <Pressable style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Create an account</Text>
          </Pressable>
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text
                style={styles.footerLink}
                onPress={() => navigation.navigate('Login')}>
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
    backgroundColor: globalColors.headingBackground,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Intrepid Regular',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  custposition: {
    position: 'relative',
  },
  cust_icon: {
    position: 'absolute',
    right: 14,
    marginTop: wp('3%'),
  },
  logo: {
    width: 150,
    height: 150,
  },
  formContainer: {
    width: hp('45%'),
    // marginTop: hp('5%'),
  },
  title: {
    fontSize: wp('5%'),
    // fontWeight: 'bold',
    fontSize: 22,
    marginBottom: 20,
    marginTop: hp('10%'),

    textAlign: 'left',
    fontFamily: 'Intrepid Regular',
  },
  headingInput: {
    position: 'absolute',
    width: 'auto',
    marginTop: -10,
    backgroundColor: globalColors.headingBackground,
    marginLeft: wp('8%'),
    marginRight: wp('2%'),
    fontSize: 14,
    // marginBottom: wp('4%'),
    fontFamily: 'Intrepid Regular',
  },
  inputSection: {
    marginBottom: wp('6%'),
    borderWidth: 1,
    borderColor: globalColors.inputBorder,
    // width: wp('80%'),
    padding: 10,
  },
  description: {
    marginBottom: 20,
    fontSize: 14,
    fontFamily: 'Intrepid Regular',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: hp('5.5%'),
    borderWidth: 1,
    borderColor: globalColors.inputBorder,
    borderRadius: 4,
    fontFamily: 'Intrepid Regular',
    padding: 10,
    fontSize: 14,
    marginBottom: hp('1.5%'),
    color: globalColors.buttonBackground,
    backgroundColor: globalColors.white,
  },
  inputPicker: {
    borderWidth: 1,
    height: hp('5.5%'),
    justifyContent: 'center',
    borderColor: globalColors.inputBorder,
    borderRadius: 4,
    fontFamily: 'Intrepid Regular',
    fontSize: 14,
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
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: wp('3.1%'),
    color: '#333',
    marginBottom: hp('4%'),
    fontFamily: 'Intrepid Regular',
    fontSize: 14,
  },
  footerLink: {
    color: globalColors.backgroundLight,
  },

  //---------------------------------------------

  dropdownButtonStyle: {
    height: 50,
    height: hp('5.5%'),
    fontSize: wp('3.1%'),
    backgroundColor: globalColors.white,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
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
    marginLeft: wp('45%'),
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
    fontFamily: 'Intrepid Regular',

    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontFamily: 'Intrepid Regular',

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
    borderRadius: wp('1.2%'),
    backgroundColor: globalColors.white,
    marginRight: wp('2%'),
  },
  checkedMark: {
    color: globalColors.black,
  },
  countryPickerContainer: {
    paddingHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    width: 'auto',
  },
});

export default SignupPage;
