import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import ProfileNavigations from '../../Navigation/ProfileNavigations';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalColors } from '../../Assets/Theme/globalColors';
import { Image } from 'react-native';
import { Images } from '../../Constants';
import { logoutUser } from '../../Redux/Slice/loginslice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { getToken, getUserId } from '../../Utils/localstorage';
import RNPickerSelect from 'react-native-picker-select';
import { currencies } from '../../Assets/Currency.js';
import {
  fetchProfile,
  resetProfile,
  updateProfile,
} from '../../Redux/Slice/profileSlice';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordModal from '../../Components/Model/PasswordModal.js';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [editable, setEditable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const { data, loading, error } = useSelector(state => state.profile);

  console.log('data$$$$-->', data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customer_id = await getUserId();

        if (customer_id) {
          await dispatch(fetchProfile(customer_id));
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
    fetchData();
  }, [editable]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [currency, setCurrency] = useState('');
  const [isoCode, setIsoCode] = useState('');
  const [name, setName] = useState(data?.first_name || ''); // Set initial value to data?.first_name
  const [email, setEmail] = useState(data?.email || ''); // Set initial value to data?.email
  const [phone, setPhone] = useState(data?.meta_data[2]?.value || ''); // Set initial value to data?.meta_data[2]?.value
  const [address, setAddress] = useState(data?.shipping?.address_1 || ''); // Set initial value to data?.shipping?.address_1
  const [shippingAddress, setShippingAddress] = useState(
    data?.shipping?.address_1 || '',
  );
  const [shippingCity, setShippingCity] = useState(data?.shipping?.city || '');
  const [shippingCountry, setShippingCountry] = useState(
    data?.shipping?.country || '',
  );
  useEffect(() => {
    const phoneNumberMetadata = data?.meta_data.find(
      item => item.key === 'phone',
    );
    if (phoneNumberMetadata) {
      setPhone(phoneNumberMetadata.value);
    }
  }, [data]);

  // data

  const handleEdit = () => {
    setName(data.first_name || '');
    setEmail(data?.email);
    setShippingCountry(data?.shipping?.country);
    setShippingAddress(data?.shipping?.address_1);
    setShippingCity(data?.shipping?.city);
    setAddress(data?.shipping?.address_1);
    setPhone(data?.meta_data[2]?.value);
    setEditable(true);
  };
  const handleSave = async () => {
    if (!/^\d{10}$/.test(phone)) {
      Alert.alert(
        'Invalid phone number',
        'Please enter a valid 10-digit phone number.',
      );
      return;
    }

    let billingData = {
      address_1: address,
      city: shippingCity,
      country: shippingCountry,
    };

    const updatedData = {
      first_name: name,
      email,

      shipping: {
        address_1: shippingAddress,
        city: shippingCity,
        country: shippingCountry,
      },
      meta_data: [
        ...data.meta_data.slice(0, 2),
        { ...data.meta_data[2], value: phone },
        ...data.meta_data.slice(3),
      ],
    };
    console.log('updatedData', updatedData);
    const customer_id = await getUserId();
    try {
      dispatch(updateProfile({ customer_id, newData: updatedData }));
    } catch (error) {
      console.log(error);
    }
    setEditable(false);
  };

  console.log(
    'data****************',
    JSON.stringify(data?.shipping?.address_1),
  );

  const handleLogout = async () => {
    // await AsyncStorage.removeItem('token');
    // await AsyncStorage.removeItem('user_id');
    dispatch(logoutUser());
    dispatch(resetProfile());
    navigation.navigate('DrawerHome');
  };

  const handleCountryChange = country => {
    setSelectedCountry(country);
    const selected = currencies.find(item => item.name === country);
    if (selected) {
      setCurrency(selected.symbol);
      setIsoCode(selected.iso_code);
    } else {
      setCurrency('');
      setIsoCode('');
    }
  };
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 400 }}
          size="large"
          color={globalColors.black}
        />
      ) : data ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={editable ? handleSave : handleEdit}>
            <Text style={{ marginLeft: 'auto' }}>
              {editable ? 'Save' : 'Edit'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.mainText}>Profile Information</Text>
          <Text style={styles.contactHeading}>Contact Details</Text>
          <View style={styles.contantContainer}>
            <View style={styles.subContantContainer}>
              <Text style={styles.textHeading}>Name</Text>
              {editable ? (
                <TextInput
                  style={styles.textInput}
                  value={name}
                  onChangeText={setName}
                  onKeyPress={({ nativeEvent }) => {
                    if (!/[a-zA-Z]/.test(nativeEvent.key)) {
                      nativeEvent.preventDefault();
                    }
                  }}
                />
              ) : (
                <Text style={styles.textHeadingValue}>{data?.first_name}</Text>
              )}
            </View>
            <View style={styles.subContantContainer}>
              <Text style={styles.textHeading}>Email</Text>
              {editable ? (
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                />
              ) : (
                <Text style={styles.textHeadingValue}>{data?.email}</Text>
              )}
            </View>
            <View style={styles.subPasswordContainer}>
              <View>
                <Text style={styles.textHeading}>Password</Text>
                <Text style={styles.textHeadingValue}>********</Text>
              </View>
              <View style={{ marginLeft: 'auto', marginRight: 5 }}>
                <Text
                  style={{ textDecorationLine: 'underline' }}
                  onPress={() => setModalVisible(true)}>
                  Change
                </Text>
                <PasswordModal
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
              </View>
            </View>
            <View style={styles.subContantContainer}>
              <Text style={styles.textHeading}>Currency</Text>
              {editable ? (
                <RNPickerSelect
                  onValueChange={value => handleCountryChange(value)}
                  items={currencies.map(item => ({
                    label: item.name,
                    value: item.name,
                  }))}
                />
              ) : (
                <Text style={styles.textHeadingValue}>{isoCode}</Text>
              )}
            </View>
            <View style={styles.subContantContainer}>
              <Text style={styles.textHeading}>Phone Number</Text>

              {editable ? (
                <TextInput
                  style={styles.textInput}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.textHeadingValue}>
                  {data?.meta_data[2]?.value}
                </Text>
              )}
            </View>
            <View style={styles.subContantContainer}>
              <Text style={styles.textHeading}>Address</Text>
              {editable ? (
                <TextInput
                  style={styles.textInput}
                  value={address}
                  onChangeText={setAddress}
                />
              ) : (
                <Text style={styles.textHeadingValue}>
                  {data?.shipping?.address_1}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.subContantContainerAddress}>
            <Text style={styles.mainText}>Shipping Address</Text>
            <View style={styles.contantContainer}>
              {editable ? (
                <View>
                  <Text style={styles.textHeading}>shippingCountry</Text>
                  <TextInput
                    style={styles.textInputShipping}
                    value={shippingCountry}
                    onChangeText={setShippingCountry}
                    placeholder="shippingCountry"
                  />
                </View>
              ) : (
                <Text style={styles.textHeading}>
                  {data?.shipping?.country}
                </Text>
              )}
              {editable ? (
                <View>
                  <Text style={styles.textHeading}>shipping Address</Text>

                  <TextInput
                    style={styles.textInputShipping}
                    value={shippingAddress}
                    onChangeText={setShippingAddress}
                    placeholder="shippingAddress"
                  />
                </View>
              ) : (
                <Text style={styles.SubtextHeading}>
                  {data?.shipping?.address_1}
                </Text>
              )}
              {/* <Text style={styles.textHeading}>Johnathan doe</Text> */}
              {editable ? (
                <View>
                  <Text style={styles.textHeading}>shipping City</Text>

                  <TextInput
                    style={styles.textInputShipping}
                    value={shippingCity}
                    onChangeText={setShippingCity}
                    placeholder="shippingCity"
                  />
                </View>
              ) : (
                <Text style={styles.textHeading}>{data?.shipping?.city}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <View style={{ flexDirection: 'row', marginTop: hp('2%') }}>
              <Image style={{}} source={Images.Logout}></Image>
              <Text
                style={{
                  marginLeft: wp('2%'),
                  marginTop: -3,
                  marginBottom: 10,
                  fontSize: 16,
                  color: globalColors.black,
                }}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: hp('28%'),
    marginTop: Platform.OS === 'ios' ? hp('20%') : hp('28%'),

    padding: 20,
  },
  mainText: {
    fontFamily: 'Intrepid Regular',
    color: globalColors.black,
    fontSize: 18,
    marginBottom: hp('2%'),
    // marginTop: hp('1%'),
  },
  contantContainer: {
    backgroundColor: globalColors.white,
    paddingLeft: 20,
  },
  textHeading: {
    color: globalColors.black,
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
  },
  SubtextHeading: {
    color: globalColors.black,
    fontSize: 16,
    paddingTop: 6,
    paddingBottom: 6,
    fontFamily: 'Intrepid Regular',
  },
  textHeadingValue: {
    color: globalColors.buttonBackground,
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
  },
  subContantContainer: {
    marginBottom: wp('2%'),
    marginTop: wp('1%'),
  },
  subPasswordContainer: {
    marginBottom: wp('2%'),
    flexDirection: 'row',
    marginTop: wp('1%'),
  },
  subContantContainerAddress: {
    marginBottom: wp('3%'),
    marginTop: wp('4%'),
  },
  contactHeading: {
    marginBottom: hp('1%'),
    marginTop: hp('1%'),
    fontSize: 16,
    fontFamily: 'Intrepid Regular',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginRight: 20,
    borderColor: globalColors.black,
  },

  textInputShipping: {
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginRight: 20,
    borderColor: globalColors.black,
    marginBottom: 10,
    marginTop: 10,
  },
});
export default Profile;
