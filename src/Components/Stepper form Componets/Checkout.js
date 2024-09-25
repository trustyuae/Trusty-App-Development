import {
  Image,
  Text,
  View,
  Pressable,
  SafeAreaView,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  CartImg,
  EditICon,
  Groupicon,
  NoImg,
  PlusIcon,
  ProductIMG,
} from '../../Constants/Icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';
import Button from '../Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { List } from 'react-native-paper';
import { useCallback, useEffect, useState } from 'react';
import ModalComponent from '../Model/Modalcomopnet';
import { useDispatch, useSelector } from 'react-redux';
import { OrderDetail } from '../../Redux/Slice/car_slice/orderdeatails';
import { deleteToCart } from '../../Redux/Slice/car_slice/deletecart';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { orderToCart } from '../../Redux/Slice/car_slice/placeordercart';
import { getUserId } from '../../Utils/localstorage';
import { fetchProfile, updateProfile } from '../../Redux/Slice/profileSlice';
import Toast from 'react-native-toast-message';
import { updateToCart } from '../../Redux/Slice/car_slice/updatecart';
import CustomStatusBar from '../StatusBar/CustomSatusBar';
import { globalColors } from '../../Assets/Theme/globalColors';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { ViewToCart } from '../../Redux/Slice/car_slice/viewcart';
import debounce from 'lodash/debounce';
import SelectDropdown from 'react-native-select-dropdown';
import PhoneInput from 'react-native-phone-number-input';
import FloatingLabelInput from '../FloatingLabelInput';

const Checkout = ({ count, setCount, setGetorderDetail }) => {
  const { viewcartdata } = useSelector(state => state?.ViewToCart);
  const [expanded, setExpanded] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(state => state?.profile);
  const [cartData, setCartData] = useState(viewcartdata?.cartData);
  const { deteltedData } = useSelector(state => state?.DeleteToCart);
  const { orderData, iserror, isloading } = useSelector(
    state => state?.OrderToCart,
  );
  const [customerid, setCustomerID] = useState();
  const [billingdata, setBillingdata] = useState({});
  const [stateUpdate, setStateUpdate] = useState(false);
  const [phone, setPhone] = useState(data?.meta_data[3]?.value || '');
  const [shippingCountry, setShippingCountry] = useState(
    data?.shipping?.country || '',
  );
  const [shippingCity, setShippingCity] = useState(data?.shipping?.city || '');
  const [shippingAddress, setShippingAddress] = useState(
    data?.shipping?.address_1 || '',
  );

  const [title, setTitle] = useState(data?.meta_data[1]?.value || '');

  useEffect(() => {
    const fetchData = async () => {
      const customer_id = await getUserId();
      setCustomerID(customer_id);
      dispatch(fetchProfile(customer_id));
    };
    fetchData();
  }, [stateUpdate]);

  useFocusEffect(() => {
    setBillingdata(data);
    setPhone(data?.meta_data[2]?.value || '');
    setShippingCountry(data?.shipping?.country || '');
    setShippingCity(data?.shipping?.city || '');
    setShippingAddress(data?.shipping?.address_1 || '');
    setTitle(data?.meta_data[1]?.value || '');
  });

  const product = cartData?.map(item => ({
    product_id: item.product_id,
    quantity: item.quantity,
  }));

  useFocusEffect(
    useCallback(() => {
      dispatch(ViewToCart());
    }, [deteltedData]),
  );

  // console.log("userData------------>", data)
  useEffect(() => {
    setCartData(viewcartdata?.cart_items);
  }, [viewcartdata, deteltedData]);

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const update = cartData?.map(item => ({
    ...item,
    taxed: parseFloat(item.tax) * item.quantity,
    total_tax: parseFloat(item.tax) + item.product_price * item.quantity,
    total: item.product_price * item.quantity,
  }));

  const totalSum = update?.reduce(
    (accumulator, currentItem) => accumulator + currentItem.total,
    0,
  );

  const debouncedUpdateCart = useCallback(
    debounce(async selectedItem => {
      await dispatch(
        updateToCart({
          product_id: selectedItem.product_id,
          variation_id: selectedItem.variation_id,
          quantity: selectedItem.quantity,
        }),
      );
      await dispatch(ViewToCart());
    }, 100),
    [],
  );

  const handleIncrease = useCallback(
    key => {
      const updatedCart = cartData?.map(item => {
        if (item.key === key) {
          const updatedItem = {
            ...item,
            quantity: item.quantity + 1,
          };
          debouncedUpdateCart(updatedItem);
          return updatedItem;
        }
        return item;
      });
      setCartData(updatedCart);
    },
    [cartData, debouncedUpdateCart],
  );

  const handleDecrease = useCallback(
    key => {
      const updatedCart = cartData?.map(item => {
        if (item.key === key && item.quantity > 1) {
          const updatedItem = {
            ...item,
            quantity: item.quantity - 1,
          };
          debouncedUpdateCart(updatedItem);
          return updatedItem;
        }
        return item;
      });
      setCartData(updatedCart);
    },
    [cartData, debouncedUpdateCart],
  );

  const handleRemove = useCallback(
    item => {
      const data = {
        product_id: item.product_id,
        variation_id: item.variation_id,
      };
      Alert.alert('Are You Sure', 'This Item Should Remove from Cart', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(deleteToCart(data));
          },
        },
      ]);
    },
    [viewcartdata],
  );

  const handleConfirmpay = () => {
    const obj = {
      payment_method: 'COD',
      payment_method_title: 'Cash On Delivery',
      set_paid: 'false',
      customer_id: customerid,
      billing: {
        first_name: data?.billing?.first_name,
        last_name: data?.billing?.last_name,
        company: data?.billing?.company,
        address_1: data?.billing?.address_1,
        address_2: data?.billing?.address_2,
        city: data?.billing?.city,
        state: data?.billing?.state,
        postcode: data?.billing?.postcode,
        country: data?.billing?.country,
        email: data?.email,
        phone: data?.billing?.phone,
      },
      shipping: {
        first_name: data?.shipping?.first_name,
        last_name: data?.shipping?.last_name,
        address_1: data?.shipping?.address_1,
        address_2: data?.shipping?.address_2,
        city: data?.shipping?.city,
        state: data?.shipping?.state,
        postcode: data?.shipping?.postcode,
        country: data?.billing?.country,
      },
      line_items: product,
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: 'Flat Rate',
          total: viewcartdata?.total_price,
        },
      ],
    };

    if (cartData.length > 0) {
      dispatch(orderToCart(obj)).then(action => {
        if (orderToCart.fulfilled.match(action)) {
          setGetorderDetail();
          setCount(pre => (count >= 2 ? 0 : pre + 1));
        }
      });
    } else {
      Toast.show({
        type: 'info',
        text1: 'Please add product',
        position: 'bottom',
        visibilityTime: 1000,
      });
    }
  };


  //-------------   new. -------
  const [errors, setErrors] = useState({});
  const [isCheckbox, setIsCheckbox] = useState(false);
  const [countries, setCountries] = useState(data?.shipping?.country);
  const [show, setShow] = useState(true);
  const [phoneInput, setPhoneInput] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: data?.billing?.first_name,
    lastName: data?.billing?.last_name,
    address: data?.billing?.address_1,
    addressContinued: data?.billing?.address_2,
    city: data?.billing?.city,
    billingAddressContinued: data?.billing?.address_2,
    selectedCountry: data?.billing?.country,
    selectedTitle: '',
    phone: data?.billing?.phone,
    countryCode: data?.billing?.country_code || '+1',
    selected: '+971',
    billingAddress: '',

    billingCity: data?.billing?.city,

    firstNameShipping: data?.shipping?.first_name,
    lastNameShipping: data?.shipping?.last_name,
    shippingAddress: data?.shipping?.address_1,
    selectedCountryShipping: data?.shipping?.country,
    shippingAddressContinued: data?.shipping?.address_2,
    shippingCity: data?.shipping?.city,
    ZipCode: '',
    phoneShipping: data?.shipping?.phone,
  });

  const isValidPassword = password => {
    return password.length >= 4;
  };

  const isValidName = name => {
    const nameRegex = /^[a-z ,.'-]+$/i;
    return nameRegex.test(name);
  };

  const isValidPhoneNumber = phoneNumber => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phoneNumber);
  };

  const validateForm = () => {
    const newErrors = {};

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

    if (!formData.address.trim())
      newErrors.address = 'Billing address is required';

    if (!formData.billingCity.trim())
      newErrors.billingCity = 'Billing city is required';

    if (!formData.firstNameShipping.trim())
      newErrors.firstNameShipping = 'First name shipping is required';
    else if (!isValidName(formData.firstNameShipping))
      newErrors.firstNameShipping =
        'First name shipping should contain only letters';

    if (!formData.lastNameShipping.trim())
      newErrors.lastNameShipping = 'Last name is required';
    else if (!isValidName(formData.lastNameShipping))
      newErrors.lastNameShipping = 'Last name should contain only letters';

    if (!formData.shippingAddress.trim())
      newErrors.shippingAddress = 'Shipping address is required';
    if (!formData.shippingCity.trim())
      newErrors.shippingCity = 'Shipping city is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    fetch(
      'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code',
    )
      .then(response => response.json())
      .then(data => {
        setCountries(data.countries);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleChange = (key, value) => {
    if (key === 'phone' && value.length > 15) {
      return;
    }
    setFormData(prevState => ({ ...prevState, [key]: value }));
    // validateField(key, value);
  };

  const handleUpdateData = async () => {
    handleUpdateData()
    if (!validateForm()) {
      Alert.alert('Validation Failed', 'Please correct the errors in the form');
      return;
    }

    const billingAddress = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      address_1: formData.address,
      address_2: formData.billingAddressContinued,
      city: formData.billingCity,
      phone: formData.phone,
      country: formData.selectedCountry,
      countryCode: formData.countryCode,
    };

    const shippingAddress = {
      first_name: formData.firstNameShipping,
      last_name: formData.lastNameShipping,
      address_1: formData.shippingAddress,
      address_2: formData.shippingAddressContinued,
      city: formData.shippingCity,
      phone: formData.phoneShipping,
      country: formData.selectedCountryShipping,
    };

    const userData = {

      billing: billingAddress,
      shipping: shippingAddress,
    };
    const customer_id = await getUserId();

    console.log('userData*************', userData);

    try {
      await dispatch(updateProfile({ customer_id, newData: userData }));
      // onClose();
      setStateUpdate(!stateUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxPress = () => {
    setIsCheckbox(prevState => !prevState);
  };
  const emojisWithIcons = [{ title: 'Mr' }, { title: 'Miss' }];

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ position: 'relative', marginBottom: hp('7%') }}>
        <Icon
          name={'arrow-left'}
          size={25}
          color="black"
          style={{
            position: 'absolute',
            left: 10,
            top: -85,
          }}
          onPress={() => setCount(pre => (count >= 2 ? 0 : pre - 1))}></Icon>
        <CustomStatusBar
          color={globalColors.headingBackground}></CustomStatusBar>

        <View style={styles.container}>
          <View>
            <Text style={styles.textheading}>Billing details</Text>
          </View>
          <View style={[styles.headingInput, {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }]}>
            <Text style={styles.formHeadingText}>Personal Information</Text>

            <View style={{
              backgroundColor: globalColors.white,
              borderRadius: 5,

            }}>
              <View style={{ flexDirection: 'row', }}>
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
                              fontFamily: 'Intrepid Bold',
                              fontSize: 14,
                              fontWeight: 'bold',
                              // marginLeft: wp('5%'),
                              color: globalColors.buttonBackground, // fontStyle: globalColors.buttonBackground,
                            }}>
                            {selectedItem?.title || 'TITLE'}
                          </Text>
                          <Icon
                            name={isOpen ? 'chevron-up' : 'chevron-down'}
                            style={styles.dropdownButtonArrowStyleTitle}
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
                  <FloatingLabelInput
                    label="FIRST NAME"
                    value={formData.firstName}
                    onChangeText={text => handleChange('firstName', text)}
                  />
                </View>
              </View>
              <View style={styles.separator} />

              <FloatingLabelInput
                label="LAST NAME"
                value={formData.lastName}
                onChangeText={text => handleChange('lastName', text)}
              />

              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName}</Text>
              )}

              <View style={styles.custposition}>
                <View style={styles.separator} />
                <PhoneInput
                  ref={setPhoneInput}
                  defaultCode="AE"
                  placeholder={'PHONE NUMBER'}
                  onChangeText={text => {
                    handleChange('phone', text);
                  }}
                  placeholderTextColor={globalColors.textColorLogin}
                  containerStyle={{
                    backgroundColor: globalColors.white,
                    paddingHorizontal: wp('3%'),
                  }}
                  textContainerStyle={{
                    backgroundColor: globalColors.white,
                    color: 'red',
                  }}
                  textInputStyle={{
                    fontFamily: 'Product Sans',
                    fontSize: 14,
                    fontWeight: '400',
                    backgroundColor: globalColors.white,
                  }}
                  // onChangeFormattedText={text => handleChange('phone', text)}
                  onChangeCountry={country =>
                    handleChange('countryCode', country.callingCode)
                  }
                  value={formData.phone}
                />
                {errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
                <View style={{ backgroundColor: 'white' }}>

                </View>

              </View>
            </View>
          </View>
          {/* <View style={styles.separator} /> */}


          <View style={{
            marginTop: hp('3%'),
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}>
            <View style={styles.headingInput}>
              <Text style={styles.formHeadingText}>Shipping Information</Text>
            </View>
            <View style={{
              backgroundColor: globalColors.white,
              borderRadius: 5,
              // marginTop: hp('2%')
            }}>
              <FloatingLabelInput
                label="ADDRESS LINE 1"
                value={formData.shippingAddress}
                onChangeText={text => handleChange('shippingAddress', text)}
              />
              {errors.shippingAddress && (
                <Text style={styles.errorText}>{errors.shippingAddress}</Text>
              )}
              <View style={styles.separator} />



              <FloatingLabelInput
                label="ADDRESS LINE 2"
                value={formData.shippingAddressContinued}
                isRequired={false}
                onChangeText={text =>
                  handleChange('shippingAddressContinued', text)
                }
              />

              <View style={styles.separator} />
              <View style={styles.inputPicker}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ width: '50%' }}>

                    <FloatingLabelInput
                      label="CITY/STATE"
                      value={formData.shippingCity}
                      onChangeText={text => handleChange('shippingCity', text)}
                    />
                    {errors.shippingCity && (
                      <Text style={styles.errorText}>{errors.shippingCity}</Text>
                    )}

                    {errors.billingCity && (
                      <Text style={styles.errorText}>{errors.billingCity}</Text>
                    )}

                  </View>
                  <View style={{
                    width: 1,
                    height: 20,
                    backgroundColor: 'rgba(193, 177, 157, 1)',

                  }} />
                  <View style={{ width: '50%', }} >

                    <FloatingLabelInput
                      label="ZIP CODE"
                      value={formData.ZipCode}
                      onChangeText={text => handleChange('ZipCode', text)}
                    />
                  </View>
                </View>
                <View style={styles.separator} />
                <SelectDropdown
                  data={countries}
                  search
                  searchPlaceHolder="Search Country"
                  searchInputStyle={{ fontFamily: 'Product Sans' }}
                  onSelect={(selectedItem, index) => {
                    setFormData({
                      ...formData,
                      selectedCountryShipping: selectedItem.label,
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
                          {formData.selectedCountryShipping || 'COUNTRY *'}
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
                <View style={styles.separator} />

                <Pressable onPress={handleCheckboxPress}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginLeft: hp('3%'),
                      height: hp('6.5%'),
                      // marginTop: hp('2%'),
                      alignItems: 'center',
                    }}>
                    <View style={styles.CheckBoxContainer}>
                      {isCheckbox && <Text style={styles.checkedMark}>✓</Text>}
                    </View>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '400',
                        fontFamily: 'Intrepid Regular',
                        color: globalColors.buttonBackground,
                      }}>
                      Same billing address
                    </Text>
                  </View>
                </Pressable>
                {/* </View> */}
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: hp('2%'),
              backgroundColor: globalColors.white,
              borderRadius: 5,
            }}>

          </View>
          {isCheckbox && (
            <View
              style={{
                backgroundColor: globalColors.white,
                marginTop: hp('2%'),
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}>
              <View style={styles.headingInput}>
                <Text style={styles.formHeadingText}>Billing Information</Text>
              </View>
              <View style={{
                borderRadius: 10,
              }}>
                <View style={{ width: '70%' }}>
                  <FloatingLabelInput
                    label="FIRST NAME"
                    value={formData.firstNameShipping}
                    onChangeText={text => handleChange('firstNameShipping', text)}
                  />


                  {errors.firstNameShipping && (
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                        // marginTop: hp('1%'),
                        marginBottom: hp('1.5%'),
                        marginLeft: wp('-20%'),
                      }}>
                      {errors.firstNameShipping}
                    </Text>
                  )}
                </View>
                <View style={styles.separator} />

                <FloatingLabelInput
                  label="LAST NAME"
                  value={formData.lastNameShipping}
                  onChangeText={text => handleChange('lastNameShipping', text)}
                />
                {errors.lastNameShipping && (
                  <Text style={styles.errorText}>{errors.lastNameShipping}</Text>
                )}
                <View style={styles.separator} />




                <FloatingLabelInput
                  label="ADDRESS LINE 1"
                  value={formData.address}
                  onChangeText={text => handleChange('address', text)}
                />

                {errors.address && (
                  <Text style={styles.errorText}>{errors.address}</Text>
                )}
                <View style={styles.separator} />



                <FloatingLabelInput
                  label="ADDRESS LINE 2"
                  isRequired={false}
                  value={formData.billingAddressContinued}
                  onChangeText={text =>
                    handleChange('billingAddressContinued', text)
                  }
                />

                <View style={styles.separator} />

                <FloatingLabelInput
                  label="CITY/STATE"
                  value={formData.billingCity}
                  onChangeText={text => handleChange('billingCity', text)}
                />
                {/* </View> */}
                {/* <View style={styles.verticalLine} /> */}
                <View style={styles.separator} />
                {/* <View style={{ width: '50%' }}> */}

                <SelectDropdown
                  data={countries}
                  search
                  searchPlaceHolder="Search Country"
                  placeholderTextColor={globalColors.textColorLogin}
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
                          {formData.selectedCountry || 'COUNTRY'}
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
          )}
        </View>

        <View style={{ backgroundColor: globalColors.white, padding: wp('4%') }}>
          <Text style={styles.textheading}>Summery</Text>
          <View
            style={{
              backgroundColor: globalColors.headingBackground,
              padding: wp('3%'),
              borderRadius: 5,
            }}>
            {cartData?.map(item => (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // marginVertical: 5,
                  }}>
                  <Text style={styles.custText}>{item?.product_name}</Text>
                  <Text>{item?.product_price * item?.quantity} AED</Text>
                </View>
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: '400',
                    backgroundColor: globalColors.white,
                    fontFamily: 'Intrepid Regular',
                    width: wp('9%'),
                    marginBottom: wp('1%'),
                  }}>
                  {item?.quantity} item
                </Text>
              </View>
            ))}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // marginVertical: 5,
              }}>
              <Text style={styles.custText}>SUBTOTAL</Text>
              <Text>{totalSum} AED</Text>
            </View>

            {/* <View style={styles.custborder} /> */}

            {viewcartdata?.coupon_status ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                  <Text style={styles.custText}>DISCOUNT PERCENTAGE</Text>
                  <Text>{viewcartdata?.discount_percentage}% </Text>
                </View>
                <View style={styles.custborder} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 5,
                  }}>
                  <Text style={styles.custText}>SAVE</Text>
                  <Text>{viewcartdata?.discount_amount} AED </Text>
                </View>
                <View style={styles.custborder} />
              </>
            ) : null}



          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: wp('5%'),
              marginVertical: 5,
            }}>
            <Text style={styles.custText}>TOTAL</Text>
            <Text style={[styles.custText, { color: globalColors.lightgold }]}>
              {viewcartdata?.total_price} AED
            </Text>
          </View>

          {/* <Button
            stylesofbtn={styles.custcheckoutbtn}
            styleoffont={styles.custfontstyle}
            name={'Confirm'}
            handlepress={handleConfirmpay}
            loading={isloading}
          /> */}
        </View>
        <ModalComponent
          visible={isModalVisible}
          onClose={closeModal}
          stateUpdate={stateUpdate}
          setStateUpdate={setStateUpdate}
          data={data}
        />
      </SafeAreaView>
    </ScrollView >
  );
};

export default Checkout;
const styles = StyleSheet.create({
  imageStyle: {
    height: 100,
    width: 90,
  },
  container: {
    marginHorizontal: wp('3%'),
    marginTop: hp('2%'),
  },
  custText: {
    color: globalColors.black,
    fontSize: 16,
    fontWeight: '700',
    marginVertical: 5,
    fontFamily: 'Intrepid Regular',
  },
  custborder: {
    borderWidth: 0.8,
    marginTop: hp('1%'),
    borderColor: '#DBCCC1',
  },
  custInput: {
    backgroundColor: globalColors.white,
    borderWidth: 1,
    borderColor: globalColors.gray,
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingVertical: 8,
  },
  custbtn: {
    backgroundColor: globalColors.darkGray,
    padding: 7,
    marginHorizontal: 90,
    marginVertical: 20,
    borderRadius: 5,
  },
  custfontstyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Intrepid Bold',
    fontSize: 16,
    fontWeight: '700',
  },
  custmargin: {
    marginBottom: 10,
  },
  custcheckoutbtn: {
    backgroundColor: globalColors.black,
    padding: 12,
    marginVertical: 20,
    borderRadius: 5,
  },

  // -------------  new
  container: {
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    paddingBottom: hp('5%'),
    marginTop: wp('4%'),
  },
  headingInput: {
    color: globalColors.black,

    backgroundColor: globalColors.headingBackgroundLogin,
    fontWeight: '800',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    fontSize: 14,
    fontFamily: 'Product Sans',
  },
  formHeadingText: {
    padding: wp('2%'),
    fontSize: 12,
    fontWeight: '800',
    fontFamily: 'Intrepid Bold',
    textTransform: 'uppercase',
    color: globalColors.textColorSignup,
  },
  input: {
    height: hp('6.5%'),

    fontFamily: 'Product Sans',
    // textTransform: 'uppercase',
    paddingLeft: hp('3%'),
    fontSize: 14,
    fontWeight: '400',
    // marginBottom: hp('1.5%'),
    color: globalColors.buttonBackground,
    backgroundColor: globalColors.white,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    // marginTop: hp('1%'),
    marginBottom: hp('1.5%'),
    marginLeft: wp('6%'),
  },
  separator: {
    borderWidth: 0.5,
    borderColor: 'rgba(193, 177, 157, 1)',
    alignSelf: 'center',
    // backgroundColor: globalColors.borderColorlogin,
    width: '85%',
  },
  dropdownButtonStyle: {
    // height: 50,
    height: hp('6.5%'),
    marginTop: wp('2%'),

    fontSize: wp('3.1%'),
    backgroundColor: globalColors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hp('3%'),
    borderColor: globalColors.inputBorder,
    // marginBottom: hp('1.5%'),
  },
  dropdownButtonArrowStyle: {
    fontSize: wp('5%'),
    paddingHorizontal: wp('10%'),
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
  dropdownButtonArrowStyleTitle: {
    fontSize: wp('5%'),
    paddingHorizontal: wp('2%'),
  },
  CheckBoxContainer: {
    width: wp('4.5%'),
    height: wp('4.5%'),
    borderWidth: 1,
    borderRadius: wp('1.2%'),
    backgroundColor: globalColors.white,
    marginRight: wp('4%'),
  },
  checkedMark: {
    color: globalColors.white,
    backgroundColor: globalColors.lightgold,
  },
  textheading: {
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
    marginBottom: wp('3%'),
    color: globalColors.black,
    fontWeight: '400',
  },
});
