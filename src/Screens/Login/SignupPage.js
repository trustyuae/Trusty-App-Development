import React, { useEffect, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { globalColors } from '../../Assets/Theme/globalColors';
import MobileNo from '../../Components/MobileNo';
import Button from '../../Components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../Redux/Slice/authSlice';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import { Images } from '../../Constants';

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
    const nameRegex = /^[a-z ,.'-]+$/i;
    return nameRegex.test(name);
  };

  const isValidPhoneNumber = phoneNumber => {
    // Regular expression for phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  const { loading, error, user } = useSelector(state => state.auth);

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
    const newErrors = { ...errors };

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
    setFormData(prevState => ({ ...prevState, [key]: value }));
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

    const address1 = `${formData.shippingAddress}${formData.shippingAddressContinued
      ? ', ' + formData.shippingAddressContinued
      : ''
      }`;
    const address2 = `${formData.billingAddress}${formData.billingAddressContinued
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
    setIsCheckbox(prevState => {
      const newCheckboxState = !prevState;
      if (newCheckboxState) {
        const newErrors = { ...errors };
        delete newErrors.isCheckbox;
        setErrors(newErrors);
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          isCheckbox: 'Please check the above mark',
        }));
      }
      return newCheckboxState;
    });
  };

  const emojisWithIcons = [{ title: 'Mr' }, { title: 'Miss' }];
  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            style={{
              alignSelf: 'center',
              marginTop: Platform.OS === 'ios' ? hp('1') : hp('4%'),
              marginBottom: hp('1%'),
            }}
            source={Images.logoResetpage}
          />
          <Text style={styles.title}>Create An Account</Text>

          <View style={styles.inputContainer}>
            {/* <View style={styles.inputSection}> */}
            <View style={styles.headingInput}>
              <Text style={styles.formHeadingText}>Personal Information</Text>
            </View>
            <View style={{ backgroundColor: globalColors.white }}>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ width: '30%' }}>
                  <SelectDropdown
                    data={emojisWithIcons}
                    onSelect={(selectedItem, index) => {
                      setFormData({
                        ...formData,
                        selectedTitle: selectedItem.title,
                      });
                    }}
                    renderButton={(selectedItem, isOpen) => {
                      return (
                        <View style={styles.dropdownButtonStyle}>
                          <Text
                            style={{
                              fontFamily: 'Product Sans',
                              fontSize: 14,
                              fontWeight: 'bold',
                              marginLeft: wp('5%'),
                              color: globalColors.buttonBackground, // fontStyle: globalColors.buttonBackground,
                            }}>
                            {selectedItem?.title || 'TITLE'}
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
                            ...(isSelected && { backgroundColor: '#D2D9DF' }),
                          }}>
                          <Text style={styles.dropdownItemTxtStyle}>
                            {item.title}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>

                <View style={{ width: '70%' }}>
                  <TextInput
                    style={styles.input}
                    placeholder="FIRST NAME *"
                    placeholderTextColor={globalColors.textColorLogin}
                    value={formData.firstName}
                    onChangeText={text => handleChange('firstName', text)}
                  />
                  {errors.firstName && (
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        // marginTop: hp('1%'),
                        marginBottom: hp('1.5%'),
                        marginLeft: wp('-20%'),
                      }}>
                      {errors.firstName}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.separator} />
              <TextInput
                style={styles.input}
                placeholder="LAST NAME *"
                placeholderTextColor={globalColors.textColorLogin}

                value={formData.lastName}
                onChangeText={text => handleChange('lastName', text)}
              />
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}
              <View style={styles.separator} />
              <TextInput
                style={styles.input}
                placeholder="EMAIL *"
                placeholderTextColor={globalColors.textColorLogin}

                value={formData.email}
                onChangeText={text => handleChange('email', text)}
              />
              <View style={styles.separator} />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <View style={styles.custposition}>
                <TextInput
                  style={styles.input}
                  placeholder="PASSWORD *"
                  placeholderTextColor={globalColors.textColorLogin}
                  value={formData.password}
                  secureTextEntry={show ? true : false}
                  onChangeText={text => handleChange('password', text)}
                />
                <View></View>
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
                <View style={styles.separator} />
                <View style={{ backgroundColor: 'white' }}>
                  <MobileNo
                    selected={formData.selected}
                    setSelected={value => handleChange('selected', value)}
                    setCountry={handleCountryChange}
                    phone={formData.phone}
                    setPhone={text => handleChange('phone', text)}></MobileNo>
                </View>
                {errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
              </View>
            </View>
            {/* </View> */}
            {/* <View style={styles.inputSection}> */}
            <View style={{ backgroundColor: globalColors.white, marginTop: hp('2%') }}>
              <View style={styles.headingInput}>
                <Text style={styles.formHeadingText}>Billing Information</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="ADDRESS LINE 1 *" placeholderTextColor={globalColors.textColorLogin}

                value={formData.billingAddress}
                onChangeText={text => handleChange('billingAddress', text)}
              />
              {errors.billingAddress && (
                <Text style={styles.errorText}>{errors.billingAddress}</Text>
              )}
              <View style={styles.separator} />
              <TextInput
                style={styles.input}
                placeholder="ADDRESS LINE 2" placeholderTextColor={globalColors.textColorLogin}

                value={formData.billingAddressContinued}
                onChangeText={text =>
                  setFormData({ ...formData, billingAddressContinued: text })
                }
              />
              <View style={styles.separator} />
              <View style={styles.inputPicker}>
                <View style={{ width: '50%' }}>
                  <TextInput
                    style={styles.input}
                    placeholder="CITY/STATE *" placeholderTextColor={globalColors.textColorLogin}

                    value={formData.billingCity}
                    onChangeText={text => handleChange('billingCity', text)}
                  />
                  {errors.billingCity && (
                    <Text style={styles.errorText}>{errors.billingCity}</Text>
                  )}
                </View>
                <View style={styles.verticalLine} />
                <View style={{ width: '50%' }}>
                  <SelectDropdown
                    data={countries}
                    search
                    searchPlaceHolder="Search Country"
                    searchInputStyle={{ fontFamily: 'Product Sans' }}
                    onSelect={(selectedItem, index) => {
                      setFormData({
                        ...formData,
                        selectedCountry: selectedItem.label,
                      });
                    }}
                    renderButton={(selectedItem, isOpen) => {
                      return (
                        <View style={styles.dropdownButtonStyle}>
                          <Text
                            style={{
                              fontFamily: 'Product Sans',
                              fontSize: 14,
                              color: globalColors.buttonBackground,
                            }}>
                            {selectedItem?.label || 'COUNTRY *'}
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
                            ...(isSelected && { backgroundColor: '#D2D9DF' }),
                          }}>
                          <Text style={styles.dropdownItemTxtStyle}>
                            {item.label}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </View>
            {/* </View> */}
            {/* <View style={styles.inputSection}> */}
            <View style={{ marginTop: hp('2%'), backgroundColor: globalColors.white }}>
              <View style={styles.headingInput}>
                <Text style={styles.formHeadingText}>Shipping Information</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="ADDRESS LINE 1 *" placeholderTextColor={globalColors.textColorLogin}

                value={formData.shippingAddress}
                onChangeText={text => handleChange('shippingAddress', text)}
              />
              {errors.shippingAddress && (
                <Text style={styles.errorText}>{errors.shippingAddress}</Text>
              )}
              <View style={styles.separator} />
              <TextInput
                style={styles.input}
                placeholder="ADDRESS LINE 2" placeholderTextColor={globalColors.textColorLogin}

                value={formData.shippingAddressContinued}
                onChangeText={text =>
                  setFormData({ ...formData, shippingAddressContinued: text })
                }
              />
              <View style={styles.separator} />
              <View style={styles.inputPicker}>
                <View style={{ width: '50%' }}>
                  <TextInput
                    style={styles.input}
                    placeholder="CITY/STATE *" placeholderTextColor={globalColors.textColorLogin}

                    value={formData.shippingCity}
                    onChangeText={text => handleChange('shippingCity', text)}
                  />
                  {errors.shippingCity && (
                    <Text style={styles.errorText}>{errors.shippingCity}</Text>
                  )}
                </View>
                <View style={styles.verticalLine} />
                <View style={{ width: '50%' }}>
                  <SelectDropdown
                    data={countries}
                    search
                    searchPlaceHolder="Search Country" placeholderTextColor={globalColors.textColorLogin}

                    onSelect={(selectedItem, index) => {
                      setFormData({
                        ...formData,
                        selectedCountry: selectedItem.label,
                      });
                    }}
                    renderButton={(selectedItem, isOpen) => {
                      return (
                        <View style={styles.dropdownButtonStyle}>
                          <Text
                            style={{
                              fontFamily: 'Product Sans',
                              fontSize: 14,
                              color: globalColors.buttonBackground,
                            }}>
                            {selectedItem?.label || 'COUNTRY *'}
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
                            ...(isSelected && { backgroundColor: '#D2D9DF' }),
                          }}>
                          <Text style={styles.dropdownItemTxtStyle}>
                            {item.label}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
              </View>
            </View>
            {/* </View> */}
            <Pressable onPress={handleCheckboxPress}>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: hp('1.5%'),
                  marginTop: hp('2%'),
                }}>
                <View style={styles.CheckBoxContainer}>
                  {isCheckbox && <Text style={styles.checkedMark}>✓</Text>}
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '400',
                      // marginBottom: 5,
                      fontFamily: 'Product Sans', flexWrap: 'wrap',
                      color: globalColors.black,
                    }}>
                    I agree to receive information by email about offers,
                    services, products and events from Trusty or other group
                    companies, in accordance with the Privacy Policy.
                  </Text>
                  <Text
                    style={{
                      color: globalColors.lightgold,
                      fontFamily: 'Product Sans',
                      fontSize: 12,
                      fontWeight: '400',
                      marginBottom: hp('1%'), flexWrap: 'wrap',
                    }}>
                    Read more
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Product Sans',
                      fontSize: 12,
                      fontWeight: '400',
                      color: globalColors.black,
                    }}>
                    By creating an account, you agree to accept the{' '}
                    <Text
                      style={{
                        color: globalColors.lightgold,
                        resizeMode: 'cover',
                      }}>
                      General Terms and Conditions of Use
                    </Text>
                    and that your data will be processed in compliance with the
                    <Text style={{ color: globalColors.lightgold }}>
                      {' '}
                      Privacy Policy
                    </Text>{' '}
                    of Trusty.
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
            name={'Create account'}
            loading={loading}
          />

          {/* <View style={styles.footerContainer}> */}
          <Text
            style={styles.footerLink}
            onPress={() => navigation.navigate('Login')}>
            Log in
          </Text>
          {/* </View> */}
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
    fontFamily: 'Product Sans',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  custposition: {
    position: 'relative',
    // marginBottom: hp('2%'),
  },
  cust_icon: {
    position: 'absolute',
    right: wp('14%'),
    marginTop: wp('3%'),
    color: globalColors.textColorLogin
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    // marginTop: hp('1%'),
    marginBottom: hp('1.5%'),
    marginLeft: wp('6%'),
  },
  logo: {
    width: 150,
    height: 150,
  },
  formContainer: {
    // width: 'auto',
    paddingLeft: 25,
    paddingRight: 25,
    // padding: 25,
    marginTop: hp('3.5%'),
  },
  formHeadingText: {
    padding: wp('2%'),
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Product Sans',
    color: globalColors.textColorSignup,
  },
  title: {
    fontSize: wp('5%'),
    // fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    // marginTop: Platform.OS === 'ios' ? hp('1') : hp('10%'),
    alignSelf: 'center',
    fontFamily: 'Product Sans',
  },
  headingInput: {
    color: globalColors.black,

    backgroundColor: globalColors.headingBackgroundLogin,
    fontWeight: '800',
    fontSize: 14,
    fontFamily: 'Product Sans',
  },
  inputSection: {
    marginBottom: wp('6%'),
    borderWidth: 1,
    borderColor: globalColors.inputBorder,
    padding: 10,
  },
  description: {
    marginBottom: 20,
    fontSize: 14,
    color: globalColors.black,
    fontFamily: 'Product Sans',
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: hp('6.5%'),
    // borderWidth: 1,
    // borderColor: globalColors.inputBorder,
    // borderRadius: 4,
    fontFamily: 'Product Sans',
    // textTransform: 'uppercase',
    paddingLeft: wp('7%'),
    fontSize: 14,
    fontWeight: '400',
    // marginBottom: hp('1.5%'),  
    color: globalColors.buttonBackground,
    backgroundColor: globalColors.white,
  },
  inputPicker: {
    flexDirection: 'row',
    width: 'auto',
  },

  custfontstyle: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'Product Sans',
  },
  custbtn: {
    backgroundColor: globalColors.black,
    padding: wp('3%'),
    fontFamily: 'Product Sans',
    borderRadius: 5,
  },

  custbtnLogin: {
    backgroundColor: globalColors.headingBackground,
    padding: wp('3%'),
    fontFamily: 'Product Sans',
    borderRadius: 5,
  },
  custfontstyleLogin: {
    color: globalColors.lightgold,
    borderWidth: 1,
    borderColor: globalColors.lightgold,
    // padding: 10,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    fontFamily: 'Product Sans',
  },
  buttonText: {
    color: globalColors.white,
    fontSize: wp('3.5%'),
    fontFamily: 'Product Sans',
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
    fontFamily: 'Product Sans',
    fontSize: 14,
  },
  footerLink: {
    textAlign: 'center',
    marginVertical: 20,
    marginTop: hp('2%'),
    borderWidth: 2,
    padding: 10,
    borderColor: globalColors.lightgold,
    borderRadius: 6,
    fontSize: 16,
    fontWeight: '700',
    color: globalColors.lightgold,
    fontFamily: 'Product Sans',
  },

  //---------------------------------------------

  dropdownButtonStyle: {
    // height: 50,
    height: hp('6.5%'),
    fontSize: wp('3.1%'),
    backgroundColor: globalColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
    // borderLeftWidth: 1,
    borderColor: globalColors.inputBorder,
    // marginBottom: hp('1.5%'),
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: wp('3.1%'),
    fontWeight: '500',
    color: 'red',
  },
  dropdownButtonArrowStyle: {
    fontSize: wp('6%'),
    marginLeft: 3,
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
    fontFamily: 'Product Sans',

    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontFamily: 'Product Sans',

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
  verticalLine: {
    width: 0.5,
    borderColor: globalColors.borderColorlogin,

    // Width of the vertical line
    // backgroundColor: globalColors.borderColorlogin, // Color of the vertical line
    // marginTop: 10,
    borderWidth: 0.2,
    alignSelf: 'center',
    height: '50%', // Height of the line
  },
  separator: {
    borderWidth: 0.5,
    borderColor: 'rgba(193, 177, 157, 1)',
    alignSelf: 'center',
    // backgroundColor: globalColors.borderColorlogin,
    width: '80%',
  },
});

export default SignupPage;
