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

import {globalColors} from '../Assets/Theme/globalColors';

const SignupPage = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSignup = () => {
    // Handle signup logic here
    navigation.navigate('DrawerHome');
  };
  const emojisWithIcons = [{title: 'Mr'}, {title: 'Miss'}];
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.logoContainer}>
        <Image
          source={require('../Assets/Images/logo.png')}
          style={styles.logo}
        />
      </View> */}
      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Create an account</Text>
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
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.dropdownButtonStyle}>
                      <Text>
                        {(selectedItem && selectedItem.title) ||
                          'Selected Title'}
                      </Text>
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
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
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
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Create Account</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: globalColors.inputBorder,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: globalColors.white,
  },
  button: {
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'red',
    fontSize: 16,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#333',
  },
  footerLink: {
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 5,
  },

  //---------------------------------------------

  dropdownButtonStyle: {
    height: 50,
    backgroundColor: globalColors.white,
    borderRadius: 4,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderColor: globalColors.inputBorder,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: 'red',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
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
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default SignupPage;
