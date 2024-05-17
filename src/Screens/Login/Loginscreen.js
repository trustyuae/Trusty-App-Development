import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../Components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Loginscreen = ({navigation}) => {
  const [show, setShow] = useState(true);
  const [value, setValues] = useState({
    email: '',
    password: '',
  });

  const handlechange = (key, value) => {
    setValues(pre => ({...pre, [key]: value}));
  };

  const handlepress = () => {};

  return (
    <View>
      <View style={styles.logincontainer}>
        <Text style={styles.headingtext}>Sign In</Text>

        <View style={styles.custContainer}>
          <TextInput
            style={styles.inputfield}
            placeholder="E-mail"
            value={value.email}
            onChangeText={text => handlechange('email', text)}
          />

          <View style={styles.custposition}>
            <TextInput
              style={styles.inputfield}
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

          <Text
            style={styles.custforgotpasstext}
            onPress={() => navigation.navigate('Forgotpassword')}>
            Forgot Password?
          </Text>

          <Button styles={styles} handlepress={handlepress} name={'Contiune'} />

          <Text style={{textAlign: 'center', marginTop: 10, color: '#684934'}}>
            Create a new account
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  logincontainer: {
    margin: wp('3%'),
    marginTop: hp('7%'),
  },
  headingtext: {
    fontSize: wp('5%'),
    padding: wp('5%'),
    fontWeight: '600',
  },
  inputfield: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    marginBottom: hp('2%'),
    borderColor: '#dbccc1',
    paddingHorizontal: wp('5%'),
    borderRadius: 1,
    padding: 8,
  },
  custContainer: {
    padding: wp('5%'),
    marginTop: hp('-2%'),
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
  custforgotpasstext: {
    textAlign: 'right',
    marginTop: hp('-0.5%'),
    marginBottom: hp('4%'),
    fontWeight: '600',
  },
  custposition: {
    position: 'relative',
  },
  cust_icon: {
    position: 'absolute',
    right: 14,
    top: 15,
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
