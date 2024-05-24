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
  Alert,
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
import Button from '../../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {signupUser} from '../../Redux/Slice/authSlice';

const SignupPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [show, setShow] = useState(true);
  const [isCheckbox, setIsCheckbox] = useState(false);
  const [countries, setCountries] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    addressContinued: '',
    city: '',
    selectedCountry: '',
    selectedTitle: '',
    phone: '',
    selected: '+91',
    billingAddress: '',
    billingAddressContinued: '',
    billingCity: '',
    shippingAddress: '',
    shippingAddressContinued: '',
    shippingCity: '',
  });

  const isValidEmail = email => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const isValidPassword = password => {
    return password.length >= 4;
  };

  const isValidName = name => {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name);
  };

  const isValidPhoneNumber = phoneNumber => {
    // Regular expression for phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  const {loading, error, user} = useSelector(state => state.auth);

  const validateForm = () => {
    const newErrors = {};

    // Check for empty fields first
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!isValidEmail(formData.email))
      newErrors.email = 'Invalid email address';

    if (!formData.password.trim()) newErrors.password = 'Password is required';
    else if (!isValidPassword(formData.password))
      newErrors.password = 'Password must be at least 4 characters';

    if (!formData.firstName.trim())
      newErrors.firstName = 'First name is required';
    else if (!isValidName(formData.firstName))
      newErrors.firstName = 'First name should contain only letters';

    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    else if (!isValidName(formData.lastName))
      newErrors.lastName = 'Last name should contain only letters';

    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!isValidPhoneNumber(formData.phone))
      newErrors.phone = 'Please enter a valid phone number';

    if (!formData.billingAddress.trim())
      newErrors.billingAddress = 'Billing address is required';
    if (!formData.billingCity.trim())
      newErrors.billingCity = 'Billing city is required';
    if (!formData.shippingAddress.trim())
      newErrors.shippingAddress = 'Shipping address is required';
    if (!formData.shippingCity.trim())
      newErrors.shippingCity = 'Shipping city is required';
    if (!isCheckbox) newErrors.isCheckbox = 'Please check the above mark';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateField = (key, value) => {
    const newErrors = {...errors};

    switch (key) {
      case 'email':
        if (!value.trim()) newErrors.email = 'Email is required';
        else if (!isValidEmail(value))
          newErrors.email = 'Invalid email address';
        else delete newErrors.email;
        break;
      case 'password':
        if (!value.trim()) newErrors.password = 'Password is required';
        else if (!isValidPassword(value))
          newErrors.password = 'Password must be at least 4 characters';
        else delete newErrors.password;
        break;
      case 'firstName':
        if (!value.trim()) newErrors.firstName = 'First name is required';
        else if (!isValidName(value))
          newErrors.firstName = 'First name should contain only letters';
        else delete newErrors.firstName;
        break;
      case 'lastName':
        if (!value.trim()) newErrors.lastName = 'Last name is required';
        else if (!isValidName(value))
          newErrors.lastName = 'Last name should contain only letters';
        else delete newErrors.lastName;
        break;
      case 'phone':
        if (!value.trim()) newErrors.phone = 'Phone number is required';
        else if (!isValidPhoneNumber(value))
          newErrors.phone = 'Please enter a valid phone number';
        else delete newErrors.phone;
        break;
      case 'billingAddress':
        if (!value.trim())
          newErrors.billingAddress = 'Billing address is required';
        else delete newErrors.billingAddress;
        break;
      case 'billingCity':
        if (!value.trim()) newErrors.billingCity = 'Billing city is required';
        else delete newErrors.billingCity;
        break;
      case 'shippingAddress':
        if (!value.trim())
          newErrors.shippingAddress = 'Shipping address is required';
        else delete newErrors.shippingAddress;
        break;
      case 'shippingCity':
        if (!value.trim()) newErrors.shippingCity = 'Shipping city is required';
        else delete newErrors.shippingCity;
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };
  const [selectedCountry, setSelectedCountry] = useState('');
  const handleCountryChange = value => {
    setSelectedCountry(value);
  };
  const handleChange = (key, value) => {
    if (key === 'phone' && value.length > 10) {
      return;
    }
    setFormData(prevState => ({...prevState, [key]: value}));
    validateField(key, value);
  };
  useEffect(() => {
    fetch(
      'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code',
    )
      .then(response => response.json())
      .then(data => {
        setCountries(data.countries);
        setFormData(prevState => ({
          ...prevState,
          selectedCountry: data.userSelectValue,
        }));
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleSignup = () => {
    if (!validateForm()) return;

    const address1 = `${formData.shippingAddress}${
      formData.shippingAddressContinued
        ? ', ' + formData.shippingAddressContinued
        : ''
    }`;
    const address2 = `${formData.billingAddress}${
      formData.billingAddressContinued
        ? ', ' + formData.shippingAddressContinued
        : ''
    }`;

    const billingAddress = {
      address_1: address2,
      city: formData.billingCity,
      country: formData.selectedCountry,
    };

    const shippingAddress = {
      address_1: address1,
      city: formData.shippingCity,
      country: formData.selectedCountry,
    };

    const userData = {
      title: formData.selectedTitle,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      billing: billingAddress,
      shipping: shippingAddress,
    };
    dispatch(signupUser(userData)).then(action => {
      if (signupUser.fulfilled.match(action)) {
        clearForm();
        navigation.navigate('Login');
      }
    });
  };

  const clearForm = () => {
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      addressContinued: '',
      city: '',
      selectedCountry: '',
      selectedTitle: '',
      phone: '',
      billingAddress: '',
      billingAddressContinued: '',
      billingCity: '',
      shippingAddress: '',
      shippingAddressContinued: '',
      shippingCity: '',
    });
    setShow(true);
    setErrors({});
  };
  const handleCheckboxPress = () => {
    setIsCheckbox(!isCheckbox);
  };
  const emojisWithIcons = [{title: 'Mr'}, {title: 'Miss'}];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Create An Account</Text>
          <Text style={styles.description}>
            By creating an account, Yoy agree to accept the
            <Text style={{color: globalColors.backgroundLight}}>
              {' '}
              General Terms And Conditions
            </Text>{' '}
            of Use and that your data will be processed in complines with the
            <Text style={{color: globalColors.backgroundLight}}>
              {' '}
              privacy Policy
            </Text>{' '}
            of Trusty.
          </Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputSection}>
              <Text style={styles.headingInput}>Personal Information</Text>
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={formData.email}
                onChangeText={text => handleChange('email', text)}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <View style={styles.custposition}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={formData.password}
                  secureTextEntry={show ? true : false}
                  onChangeText={text => handleChange('password', text)}
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
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <SelectDropdown
                data={emojisWithIcons}
                onSelect={(selectedItem, index) => {
                  setFormData({...formData, selectedTitle: selectedItem.title});
                }}
                renderButton={(selectedItem, isOpen) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text
                        style={{
                          fontFamily: 'Intrepid Regular',
                          fontSize: 14,
                          color: globalColors.buttonBackground, // fontStyle: globalColors.buttonBackground,
                        }}>
                        {selectedItem?.title || 'Selected Title'}
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
                value={formData.firstName}
                onChangeText={text => handleChange('firstName', text)}
              />
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={formData.lastName}
                onChangeText={text => handleChange('lastName', text)}
              />
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}

              <MobileNo
                selected={formData.selected}
                setSelected={value => handleChange('selected', value)}
                setCountry={handleCountryChange}
                phone={formData.phone}
                setPhone={text => handleChange('phone', text)}></MobileNo>
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.headingInput}>Billing Information</Text>

              <View style={styles.inputPicker}>
                <Picker
                  selectedValue={formData.selectedCountry}
                  onValueChange={(itemValue, itemIndex) =>
                    setFormData({...formData, selectedCountry: itemValue})
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
                value={formData.billingAddress}
                onChangeText={text => handleChange('billingAddress', text)}
              />
              {errors.billingAddress && (
                <Text style={styles.errorText}>{errors.billingAddress}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="Address Continued"
                value={formData.billingAddressContinued}
                onChangeText={text =>
                  setFormData({...formData, billingAddressContinued: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="City"
                value={formData.billingCity}
                onChangeText={text => handleChange('billingCity', text)}
              />
              {errors.billingCity && (
                <Text style={styles.errorText}>{errors.billingCity}</Text>
              )}
            </View>
            <View style={styles.inputSection}>
              <Text style={styles.headingInput}>Shipping Information</Text>
              <View style={styles.inputPicker}>
                <Picker
                  selectedValue={formData.selectedCountry}
                  onValueChange={(itemValue, itemIndex) =>
                    setFormData({...formData, selectedCountry: itemValue})
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
                value={formData.shippingAddress}
                onChangeText={text => handleChange('shippingAddress', text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Address Continued"
                value={formData.shippingAddressContinued}
                onChangeText={text =>
                  setFormData({...formData, shippingAddressContinued: text})
                }
              />
              {errors.shippingAddress && (
                <Text style={styles.errorText}>{errors.shippingAddress}</Text>
              )}
              <TextInput
                style={styles.input}
                placeholder="City"
                value={formData.shippingCity}
                onChangeText={text => handleChange('shippingCity', text)}
              />
              {errors.shippingCity && (
                <Text style={styles.errorText}>{errors.shippingCity}</Text>
              )}
            </View>
            <Pressable onPress={handleCheckboxPress}>
              <View style={{flexDirection: 'row', marginBottom: hp('1.5%')}}>
                <View style={styles.CheckBoxContainer}>
                  {isCheckbox && <Text style={styles.checkedMark}>✓</Text>}
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 13,
                      marginBottom: 5,
                      fontFamily: 'Intrepid Regular',
                      color: globalColors.black,
                    }}>
                    I agree to receive information by email about offers,
                    services, products and events from Trusty or other group
                    companies, in accordance with the Privacy Policy.{'\n'}
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Intrepid Regular',
                      fontSize: 13,
                      color: globalColors.black,
                    }}>
                    You can unsubscribe from email marketing communications via
                    the "unsubscribe" link at the bottom of each of our email
                    promotional communications.
                  </Text>
                </View>
              </View>
            </Pressable>
            {errors.isCheckbox && (
              <Text style={styles.errorText}>{errors.isCheckbox}</Text>
            )}
          </View>

          <Button
            stylesofbtn={styles.custbtn}
            styleoffont={styles.custfontstyle}
            handlepress={handleSignup}
            name={'Create an account'}
            loading={loading}
          />

          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>
              Already have an account?
              <Text
                style={styles.footerLink}
                onPress={() => navigation.navigate('Login')}>
                {''} Log in
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
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: hp('1.5%'),
    marginLeft: wp('2%'),
  },
  logo: {
    width: 150,
    height: 150,
  },
  formContainer: {
    // width: 'auto',
    paddingLeft: 25,
    paddingRight: 25,
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
    color: globalColors.black,
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
    color: globalColors.black,
    fontFamily: 'Intrepid Regular',
  },
  inputContainer: {
    marginBottom: 10,
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

  custfontstyle: {
    color: 'white',
    textAlign: 'center',
  },
  custbtn: {
    backgroundColor: globalColors.buttonBackground,
    padding: wp('3%'),
    borderRadius: 5,
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
    marginLeft: 'auto',
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
