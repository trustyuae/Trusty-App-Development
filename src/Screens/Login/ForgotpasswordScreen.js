import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {postApi} from '../../Redux/Slice/postApiSlice';

const ForgotpasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading, error, postData} = useSelector(state => state.post);

  const [value, setValues] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });

  const handlechange = (key, value) => {
    setValues(pre => ({...pre, [key]: value}));
  };

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validation = () => {
    if (!value.email) {
      setErrors(prevErrors => ({...prevErrors, email: 'email is required'}));
      return;
    } else if (!validateEmail(value.email)) {
      setErrors(prevErrors => ({...prevErrors, email: 'Invalid email'}));
      return;
    } else {
      setErrors(prevErrors => ({...prevErrors, email: ''}));
    }
    return true;
  };

  const handlepress = () => {
    if (validation()) {
      dispatch(postApi(value));
      setValues(pre => ({email: ''}));
      navigation.navigate('Login');
    }
  };

  return (
    <View>
      <View style={styles.logincontainer}>
        <Text style={styles.headingtext}>Forgot Your Password?</Text>

        <View style={styles.custContainer}>
          <Text
            style={{
              fontWeight: '600',
              fontFamily: 'Intrepid Regular',
              fontSize: 14,
            }}>
            Enter the email address associated with account and we will send you
            a link to reset your password
          </Text>

          <TextInput
            style={styles.inputfield}
            placeholder="E-mail"
            value={value.email}
            onChangeText={text => handlechange('email', text)}
          />
          {errors && <Text style={styles.errorText}>{errors.email}</Text>}

          <Button
            stylesofbtn={styles.custbtn}
            styleoffont={styles.custfontstyle}
            handlepress={handlepress}
            name={'Send Reset Password Link'}
            loading={loading}
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
    fontFamily: 'Intrepid Regular',

    fontSize: 22,
  },
  inputfield: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    marginTop: hp('3%'),
    fontFamily: 'Intrepid Regular',
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
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
  },
  custfontstyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: -24,
    marginBottom: 20,
  },
});
