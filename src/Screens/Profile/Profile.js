import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import ProfileNavigations from '../../Navigation/ProfileNavigations';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors';
import {Image} from 'react-native';
import {Images} from '../../Constants';
import {logoutUser} from '../../Redux/Slice/loginslice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getToken, getUserId} from '../../Utils/localstorage';
import {
  fetchProfile,
  resetProfile,
  updateProfile,
} from '../../Redux/Slice/profileSlice';
import {ActivityIndicator} from 'react-native';
const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {data, loading, error} = useSelector(state => state.profile);

  // data
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(data?.first_name);
  const [email, setEmail] = useState(data?.email);
  const [phone, setPhone] = useState(data?.phone);
  const [address, setAddress] = useState(data?.shipping?.address_1);
  const [shippingAddress, setShippingAddress] = useState(
    data?.shipping?.address_1,
  );
  const [shippingCity, setShippingCity] = useState(data?.shipping?.city);
  const [shippingCountry, setShippingCountry] = useState(
    data?.shipping?.country,
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const customer_id = await getUserId();
        if (customer_id) {
          dispatch(fetchProfile(customer_id));
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
    fetchData();
  }, [dispatch]);
  const handleEdit = () => {
    setEditable(true);
  };

  // useEffect(() => {
  //   handleSave();
  // }, [data]);
  const handleSave = async () => {
    let billingData = {
      address_1: address,
      city: shippingCity,
      country: shippingCountry,
    };

    // "shipping": {
    //     "first_name": "",
    //     "last_name": "",
    //     "company": "",
    //     "address_1": "2Nd 3 f",
    //     "address_2": "",
    //     "city": "Kolhapurfdfdf",
    //     "postcode": "",
    //     "country": "AD",
    //     "state": "",
    //     "phone": "9898767898"
    // },
    const updatedData = {
      first_name: name,
      email,
      phone,
      shipping: {
        address_1: shippingAddress,
        city: shippingCity,
        country: shippingCountry,
      },
    };
    const customer_id = await getUserId();
    try {
      dispatch(updateProfile({customer_id, newData: updatedData}));
    } catch (error) {
      console.log(error);
    }
    setEditable(false);
  };

  console.log(
    'data****************',
    JSON.stringify(data?.shipping?.address_1),
  );

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetProfile());
    navigation.navigate('DrawerHome');
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      {loading ? (
        <ActivityIndicator
          style={{marginTop: 400}}
          size="large"
          color={globalColors.black}
        />
      ) : data ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={editable ? handleSave : handleEdit}>
            <Text style={{marginLeft: 'auto'}}>
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
            <View style={styles.subContantContainer}>
              <Text style={styles.textHeading}>Password</Text>
              <Text style={styles.textHeadingValue}>********</Text>
            </View>
            <View style={styles.subContantContainer}>
              <Text style={styles.textHeading}>Currency</Text>
              <Text style={styles.textHeadingValue}>IND</Text>
            </View>
            <View style={styles.subContantContainer}>
              <Text style={styles.textHeading}>Phone Number</Text>

              {editable ? (
                <TextInput
                  style={styles.textInput}
                  value={phone}
                  onChangeText={setPhone}
                />
              ) : (
                <Text style={styles.textHeadingValue}>{data?.phone}</Text>
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
                  {data?.billing?.address_1}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.subContantContainerAddress}>
            <Text style={styles.mainText}>Shipping Address</Text>
            <View style={styles.contantContainer}>
              {editable ? (
                <TextInput
                  style={styles.SubtextHeading}
                  value={shippingCountry}
                  onChangeText={setShippingCountry}
                />
              ) : (
                <Text style={styles.textHeading}>
                  {data?.shipping?.country}
                </Text>
              )}
              {editable ? (
                <TextInput
                  style={styles.mainText}
                  value={shippingAddress}
                  onChangeText={setShippingAddress}
                />
              ) : (
                <Text style={styles.SubtextHeading}>
                  {data?.shipping?.address_1}
                </Text>
              )}
              {/* <Text style={styles.textHeading}>Johnathan doe</Text> */}
              {editable ? (
                <TextInput
                  style={styles.mainText}
                  value={shippingCity}
                  onChangeText={setShippingCity}
                />
              ) : (
                <Text style={styles.textHeading}>{data?.shipping?.city}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <View style={{flexDirection: 'row', marginTop: hp('2%')}}>
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
    marginTop: hp('28%'),
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
});
export default Profile;
