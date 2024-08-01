import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors.js';
import {Image} from 'react-native';
import {Images} from '../../Constants/index.js';
import {logoutUser} from '../../Redux/Slice/loginslice.js';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getToken, getUserId} from '../../Utils/localstorage.js';
import RNPickerSelect from 'react-native-picker-select';
import {currencies} from '../../Assets/Currency.js';
import {
  fetchProfile,
  resetProfile,
  updateProfile,
} from '../../Redux/Slice/profileSlice.js';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordModal from '../../Components/Model/PasswordModal.js';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar.js';
import SkeletonLoaderProfile from '../../Components/Loader/SkeletonLoaderProfile.js';

const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [editable, setEditable] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {data, loading, error} = useSelector(state => state.profile);
  const onRefresh = async () => {
    setRefreshing(true);
    const customer_id = await getUserId();
    if (customer_id) {
      await dispatch(fetchProfile(customer_id));
    }
    setRefreshing(false);
  };

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
  const [refreshing, setRefreshing] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    shippingAddress: '',
    shippingCountry: '',
    shippingCity: '',
    phone: '',
  });

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

    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }
    if (!shippingAddress.trim()) {
      newErrors.shippingAddress = 'Address is required.';
    }

    if (!shippingCity.trim()) {
      newErrors.shippingCity = 'City is required.';
    }

    if (!shippingCountry.trim()) {
      newErrors.shippingCountry = 'Country is required.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const validName = name.replace(/\s+/g, ' ').trim();
    if (!validName) {
      Alert.alert(
        'Invalid name',
        'Name cannot be empty or consist of only spaces.',
      );
      return;
    }

    const updatedData = {
      first_name: validName,
      email,

      shipping: {
        address_1: shippingAddress,
        city: shippingCity,
        country: shippingCountry,
      },
      meta_data: [
        ...data.meta_data.slice(0, 2),
        {...data.meta_data[2], value: phone},
        ...data.meta_data.slice(3),
      ],
    };

    const customer_id = await getUserId();
    try {
      dispatch(updateProfile({customer_id, newData: updatedData}));
      setEditable(false);
    } catch (error) {
      console.log(error);
    }
    // setEditable(false);
  };

  const handleLogout = async () => {
    // await AsyncStorage.removeItem('token');
    // await AsyncStorage.removeItem('user_id');
    dispatch(logoutUser());
    dispatch(resetProfile());
    navigation.navigate('Home');
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
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
        <View style={{flex:1,backgroundColor:globalColors.white}}>  
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['black']}
          />
        }>
        <CustomStatusBar
          color={globalColors.headingBackground}></CustomStatusBar>

        {loading ? (
          // <ActivityIndicator
          //   style={{ marginTop: 300 }}
          //   size="large"
          //   color={globalColors.black}

          // />
          <SkeletonLoaderProfile />
        ) : data ? (
          <View style={styles.container}>
            <Text style={styles.mainText}>Personal Information</Text>
            
            <View style={styles.subContantContainer}>
                <Text style={styles.textHeading}>ADDRESS</Text>
                {editable ? (
                  <>
                    <TextInput
                      style={styles.textInput}
                      value={address}
                      onChangeText={setAddress}
                    />
                    {errors.shippingAddress ? (
                      <Text style={styles.errorText}>
                        {errors.shippingAddress}
                      </Text>
                    ) : null}
                  </>
                ) : (
                  <Text style={styles.textHeadingValue}>
                    {data?.shipping?.address_1}
                  </Text>
                )}
              </View>

              <View style={styles.subContantContainer}>
                <Text style={styles.textHeading}>PHONE NUMBER</Text>

                {editable ? (
                  <>
                    <TextInput
                      style={styles.textInput}
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="numeric"
                    />
                    {errors.phone ? (
                      <Text style={styles.errorText}>{errors.phone}</Text>
                    ) : null}
                  </>
                ) : (
                  <Text style={styles.textHeadingValue}>
                    {data?.meta_data[2]?.value}
                  </Text>
                )}
              </View>
             
            <View style={styles.subPasswordContainer}>
                <View>
                  <Text style={styles.textHeading}>PASSWORD</Text>
                  <Text style={styles.custpasswordtext}>********</Text>
                </View>
                <View style={{marginLeft: 'auto', marginRight: 5}}>
                  <Text
                    // style={{textDecorationLine: 'underline'}}
                    style={{color:"#866528"}}
                    onPress={() => setModalVisible(true)}>
                    CHANGE?
                  </Text>
                  <PasswordModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                  />
                </View>
              </View>

              <View style={styles.subPasswordContainer}>
                <View>
                <Text style={styles.textHeading}>CURRENCY</Text>
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

                <View style={{marginLeft: 'auto', marginRight: 5}}>
                  <Text
                    // style={{textDecorationLine: 'underline'}}
                    style={{color:"#866528"}}
                    onPress={() => setEditable(true)}>
                    CHANGE?
                  </Text>
              
                </View>
                
              </View>

              <View style={{marginTop:hp('2%')}}>
              <Text style={styles.shippingaddress}>SHIPPING ADDRESS</Text>
              </View>

              <View style={{borderWidth:1,borderColor:"#D9D9D9"}}/>

   <View style={{marginTop:hp('1%')}}>

              <Text style={{fontFamily:"Product Sans Medium",fontSize:18,color:"black"}}>Johnathan Doe</Text>
              <Text style={{fontFamily:"Product Sans Medium",fontSize:16,color:"black",marginTop:2}}>1234, Main st,Near Landmark XYZ 4567890</Text>
   </View>

 
            <TouchableOpacity onPress={handleLogout}>
              <View style={{flexDirection: 'row', marginVertical: hp('3%')}}>
                <Image style={{}} source={Images.Logout}></Image>
                <Text
                  style={{
                    marginLeft: wp('2%'),
                    marginTop: -3,
                    marginBottom: 10,
                    fontSize: 16,
                    color: "red",
                    fontFamily:"Product Sans Medium"
                  }}>
                  LOGOUT
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
        <View></View>
      </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: hp('28%'),
   
    backgroundColor:"white",
    marginTop: Platform.OS === 'ios' ? hp('21%') : hp('28%'),

    paddingHorizontal: wp('4%'),
  },
  mainText: {
    fontFamily: 'Product Sans',
    color: globalColors.black,
    fontSize: 24,
    fontWeight:'bold',
    marginBottom: hp('2%'),
    // marginTop: hp('1%'),
  },
  shippingaddress: {
    fontFamily: 'Product Sans Medium',
    color: "#866528",
    fontSize: 16,
    fontWeight:'600',
    marginBottom: hp('2%'),
    // marginTop: hp('1%'),
  },
  contantContainer: {
    backgroundColor: globalColors.white,
    paddingLeft: 20,
  },
  textHeading: {
    opacity:0.6,
    color: globalColors.black,
    fontSize: 14,
    fontFamily: 'Product Sans',
    fontWeight: '400'
  },
  SubtextHeading: {
    color: globalColors.black,
    fontSize: 16,
    paddingTop: 6,
    paddingBottom: 6,
    fontFamily: 'Product Sans',
  },
  custpasswordtext: {
    color: globalColors.black,
    fontWeight:'700',
    fontSize: 16,
    fontFamily: 'Product Sans',
  },

  textHeadingValue: {
    color: globalColors.black,
    fontWeight:'600',
    fontSize: 16,
    fontFamily: 'Product Sans',
    marginTop:hp('0.5%')
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
    marginTop:hp("0.5%"),
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
});
export default Profile;
