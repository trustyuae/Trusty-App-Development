import React, {useState} from 'react';
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
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
// data
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState('saf asd');
  const [email, setEmail] = useState('czxc');
  const [phone, setPhone] = useState('1234567890');
  const [address, setAddress] = useState('qq');
  const [shippingAddress, setShippingAddress] = useState('Johnathan does');
  const [shippingCity, setShippingCity] = useState('New York');
  const [shippingCountry, setShippingCountry] = useState(
    ' 123 main St Near LandMark XYZ',
  );

  const handleEdit = () => {
    setEditable(true);
  };

  const handleSave = () => {
    // Perform save action here, e.g., update data in the backend
    setEditable(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate('DrawerHome');
  };
  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleEdit}>
          <Text style={{marginLeft: 'auto'}}>{editable ? 'Save' : 'Edit'}</Text>
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
              <Text style={styles.textHeadingValue}>{name}</Text>
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
              <Text style={styles.textHeadingValue}>{email}</Text>
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
              <Text style={styles.textHeadingValue}>{phone}</Text>
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
              <Text style={styles.textHeadingValue}>{address}</Text>
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
              <Text style={styles.textHeading}>Johnathan doe</Text>
            )}
            {editable ? (
              <TextInput
                style={styles.mainText}
                value={shippingAddress}
                onChangeText={setShippingAddress}
              />
            ) : (
              <Text style={styles.SubtextHeading}>
                123 main St Near LandMark XYZ
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
              <Text style={styles.textHeading}>45678990</Text>
            )}
          </View>
          {/* <Text style={styles.mainText}>Billing Address</Text>
          <View style={styles.contantContainer}>
            <Text style={styles.textHeading}>Johnathan doe</Text>
            <Text style={styles.SubtextHeading}>
              123 main St Near LandMark XYZ
            </Text>
            <Text style={styles.textHeading}>45678990</Text>
          </View> */}
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
