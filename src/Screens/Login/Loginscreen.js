import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../Components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Loginscreen = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(true);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handlePress = () => {
    if (!validateEmail(values.email)) {
      setErrors(prevErrors => ({...prevErrors, email: 'Invalid email'}));
      return;
    } else {
      setErrors(prevErrors => ({...prevErrors, email: ''}));
    }
    if (values.password.length < 6) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password must be at least 6 characters long',
      }));
      return;
    } else {
      setErrors(prevErrors => ({...prevErrors, password: ''}));
    }
  };

  return (
    <View>
      <View style={styles.logincontainer}>
        <Text style={styles.headingtext}>Sign In</Text>

        <View style={styles.custContainer}>
          <TextInput
            style={styles.inputfield}
            placeholder="E-mail"
            value={values.email}
            onChangeText={text =>
              setValues(prevValues => ({...prevValues, email: text}))
            }
          />
          {errors.email !== '' && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <View style={styles.custposition}>
            <TextInput
              style={styles.inputfield}
              placeholder="Password"
              value={values.password}
              secureTextEntry={showPassword}
              onChangeText={text =>
                setValues(prevValues => ({...prevValues, password: text}))
              }
            />
            {errors.password !== '' && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <Icon
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              style={styles.cust_icon}
              onPress={() => setShowPassword(prevShow => !prevShow)}
            />
          </View>

          <Text
            style={styles.custforgotpasstext}
            onPress={() => navigation.navigate('Forgotpassword')}>
            Forgot Password?
          </Text>

          <Button
            stylesofbtn={styles.custbtn}
            styleoffont={styles.custfontstyle}
            handlepress={handlePress}
            name={'Continue'}
          />

          <Text style={styles.createAccountText}>Create a new account</Text>
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
    fontSize: 22,
    fontFamily: 'Intrepid Regular',
  },
  inputfield: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    marginBottom: hp('2%'),
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
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
    fontFamily: 'Intrepid Regular',
    fontSize: 12,
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
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
    textAlign: 'center',
  },
});
