import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../Components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser } from '../../Redux/Slice/authSlice';

const Loginscreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading, error, userData} = useSelector(state => state?.user);
  const [showPassword, setShowPassword] = useState(true);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (userData) {
      navigation.navigate('Cart');
    }
  }, [userData]);

  const [values, setValues] = useState({
    email:'',
    password:'',
  });

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handlePress = () => {
    if (!values.email) {
      setErrors(prevErrors => ({...prevErrors, email:'email is required'}));
    } else if (!validateEmail(values.email)) {
      setErrors(prevErrors => ({...prevErrors, email:'Invalid email'}));
      return;
    } else {
      setErrors(prevErrors => ({...prevErrors, email: ''}));
    }
    if (values.password.length < 6) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password:'Password must be at least 6 characters long',
      }));
      return;
    } else {
      setErrors(prevErrors => ({...prevErrors, password: ''}));
    }

    const {email, password} = values;
    const ChangeKey = {
      username: email,
      password: password,
    };

    dispatch(loginUser(ChangeKey));
  };

  return (
    <ScrollView>
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
          <Text></Text>
        </View>
      </View>
    </ScrollView>
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
    marginTop: hp('0.9%'),
    marginBottom: hp('4%'),
    fontWeight: '600',
  },
  custposition: {
    position: 'relative',
    marginTop: 20,
  },
  cust_icon: {
    position: 'absolute',
    right: 14,
    top: 15,
  },
  errorText: {
    color: 'red',
    margin: 2,
  },
  createAccountText: {
    textAlign: 'center',
    marginTop: 10,
    color: '#684934',
  },
});
