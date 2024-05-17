import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../Components/Button';

const ForgotpasswordScreen = ({navigation}) => {
  const [value, setValues] = useState({
    email: '',
  });

  const handlechange = (key, value) => {
    setValues(pre => ({...pre, [key]: value}));
  };

  const handlepress = () => {};

  return (
    <View>
      <View style={styles.logincontainer}>
        <Text style={styles.headingtext}>Forgot Your Password?</Text>

        <View style={styles.custContainer}>
          <Text style={{fontWeight: '600'}}>
            Enter the email address associated with account and we will send you
            a link to reset your password
          </Text>

          <TextInput
            style={styles.inputfield}
            placeholder="E-mail"
            value={value.email}
            onChangeText={text => handlechange('email', text)}
          />

          <Button
            stylesofbtn={styles.custbtn}
            styleoffont={styles.custfontstyle}
            handlepress={handlepress}
            name={'Send Reset Password Link'}
          />
        </View>
      </View>
    </View>
  );
};

export default ForgotpasswordScreen;

const styles = StyleSheet.create({
  logincontainer: {
    margin: hp('2%'),
    marginTop: hp('8%'),
  },
  headingtext: {
    fontSize: 20,
    padding: 20,
    fontWeight: 'bold',
  },
  inputfield: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    paddingHorizontal: wp('5%'),
    borderColor: '#dbccc1',
    borderRadius: 1,
    padding: 8,
  },
  custContainer: {
    padding: 20,
    marginTop: hp('-3%'),
  },
  custbtn: {
    backgroundColor: 'black',
    padding: wp('3%'),
    borderRadius: 5,
  },
  custfontstyle: {
    color: 'white',
    textAlign: 'center',
  },
});
