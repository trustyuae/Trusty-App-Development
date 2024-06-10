import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../Components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/Slice/loginslice';
import { getToken, getUserId } from '../../Utils/localstorage';
import Profile from '../Profile/Profile';
import CustomTabBar from '../../Components/CustomeTabBar/CustomeTabBar';
import { globalColors } from '../../Assets/Theme/globalColors';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';

const Loginscreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error, userData } = useSelector(state => state?.user);
  const [showPassword, setShowPassword] = useState(true);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [isAuth, setAuth] = useState();

  useEffect(() => {
    if (userData) {
      dispatch(fetchWishlist(userData.token));

      navigation.navigate('DrawerHome');
    }

    if (!error) {
      setValues({
        email: '',
        password: '',
      });
    }
  }, [userData]);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const validateEmail = email => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validation = () => {
    if (!values.email) {
      setErrors(prevErrors => ({ ...prevErrors, email: 'email is required' }));
      return;
    } else if (!validateEmail(values.email)) {
      setErrors(prevErrors => ({ ...prevErrors, email: 'Invalid email' }));
      return;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, email: '' }));
    }

    if (!values.password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'password is required',
      }));
      return;
    } else if (values.password.length < 4) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password must be at least 4 characters long',
      }));
      return;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, password: '' }));
    }
    return true;
  };

  const handlePress = () => {
    const { email, password } = values;
    const ChangeKey = {
      username: email,
      password: password,
    };
    if (validation()) {
      dispatch(loginUser(ChangeKey));
    }
  };

  return (
    <ScrollView>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <View>
        <View style={styles.logincontainer}>
          <Text style={styles.headingtext}>Sign In</Text>

          <View style={styles.custContainer}>
            <TextInput
              style={styles.inputfield}
              placeholder="E-mail"
              value={values.email}
              onChangeText={text =>
                setValues(prevValues => ({ ...prevValues, email: text }))
              }
            />
            {errors.email !== '' && (
              <Text style={{ marginTop: -10, color: 'red', marginBottom: 10 }}>
                {errors.email}
              </Text>
            )}
            <View style={styles.custposition}>
              <TextInput
                style={styles.inputfield}
                placeholder="Password"
                value={values.password}
                secureTextEntry={showPassword}
                onChangeText={text =>
                  setValues(prevValues => ({ ...prevValues, password: text }))
                }
              />
              {errors.password !== '' && (
                <Text style={{ marginTop: -10, color: 'red', marginBottom: 10 }}>
                  {errors.password}
                </Text>
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
              loading={loading}
            />

            <Text
              style={styles.createAccountText}
              onPress={() => navigation.navigate('Signup')}>
              Create a new account
            </Text>
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
    fontFamily: 'Intrepid Regular',
  },
  headingtext: {
    color: 'black',
    fontSize: wp('5%'),
    padding: wp('5%'),
    fontWeight: '600',
    fontSize: 22,
    fontFamily: 'Intrepid Regular',
  },
  inputfield: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    height: hp('5.5%'),
    borderRadius: 4,

    marginBottom: hp('2%'),
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
    borderColor: '#dbccc1',
    paddingHorizontal: wp('5%'),
    borderRadius: 5,
    padding: 10,
  },
  custContainer: {
    padding: wp('5%'),
    marginTop: hp('-2%'),
  },
  custbtn: {
    backgroundColor: 'black',
    padding: wp('3%'),

    borderRadius: 5,
    fontFamily: 'Intrepid Regular',
  },
  custfontstyle: {
    color: 'white',

    textAlign: 'center',
    fontFamily: 'Intrepid Regular',
  },
  custforgotpasstext: {
    textAlign: 'right',
    marginTop: hp('-0.5%'),
    marginBottom: hp('4%'),
    fontFamily: 'Intrepid Regular',
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
  },
  custposition: {
    position: 'relative',
  },
  cust_icon: {
    position: 'absolute',
    right: 14,
    color: globalColors.buttonBackground,
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
  createAccountText: {
    textAlign: 'center',
    marginVertical: 15,
    fontSize: 16,
    color: globalColors.backgroundLight,
    fontFamily: 'Intrepid Regular',
  },
  errorText: {
    color: 'red',
  },
});
