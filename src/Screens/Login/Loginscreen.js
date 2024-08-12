import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../Components/Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {loginUser} from '../../Redux/Slice/loginslice';
import {globalColors} from '../../Assets/Theme/globalColors';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import {fetchWishlist} from '../../Redux/Slice/wishlistSlice';
import {Images} from '../../Constants/index';
import {passwordIcon, emailIcon, trustyIconWhite} from '../../Constants/Icons';

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
      const data = async () => {
        await dispatch(fetchWishlist({tokenData: userData.jwt_token})); // Use the token from userData
      };
      data();
      navigation.navigate('Home');
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
      setErrors(prevErrors => ({...prevErrors, email: 'Email Is Required'}));
      return;
    } else if (!validateEmail(values.email)) {
      setErrors(prevErrors => ({...prevErrors, email: 'Invalid Email'}));
      return;
    } else {
      setErrors(prevErrors => ({...prevErrors, email: ''}));
    }

    if (!values.password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password Is Required',
      }));
      return;
    } else if (values.password.length < 4) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password must be at least 4 characters long',
      }));
      return;
    } else {
      setErrors(prevErrors => ({...prevErrors, password: ''}));
    }
    return true;
  };

  const handlePress = () => {
    const {email, password} = values;
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
      <View style={{flex: 1}}>
        <View>
          <Image
            style={{
              flex: 0.5,
              width: '100%',
              resizeMode: 'contain',
              height: hp('40%'),
            }}
            source={Images.loginImage}></Image>
        </View>

        <View style={styles.logincontainer}>
          <Text style={styles.headingtext}>Login</Text>

          <View style={styles.custContainer}>
            <View style={styles.inputfieldboth}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: globalColors.white,
                  paddingHorizontal: 20,
                }}>
                <Image style={styles.icon} source={emailIcon}></Image>
                <TextInput
                  style={styles.inputfield}
                  placeholder="EMAIL *"
                  value={values.email}
                  onChangeText={text =>
                    setValues(prevValues => ({...prevValues, email: text}))
                  }
                />
              </View>
              {errors.email !== '' && (
                <Text style={{color: 'red', marginBottom: 10}}>
                  {errors.email}
                </Text>
              )}
              <View style={styles.separator} />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: globalColors.white,
                  paddingHorizontal: 20,
                }}>
                <Image
                  style={styles.iconPassword}
                  source={passwordIcon}></Image>
                <TextInput
                  style={styles.inputfield}
                  placeholder="PASSWORD *"
                  value={values.password}
                  secureTextEntry={showPassword}
                  onChangeText={text =>
                    setValues(prevValues => ({...prevValues, password: text}))
                  }
                />

                {/* <Icon
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  style={styles.cust_icon}
                  onPress={() => setShowPassword(prevShow => !prevShow)}
                /> */}
              </View>
              {errors.password !== '' && (
                <Text
                  style={{color: 'red', marginTop: hp('1%'), marginBottom: 10}}>
                  {errors.password}
                </Text>
              )}
            </View>

            <Text
              style={styles.custforgotpasstext}
              onPress={() => navigation.navigate('Forgotpassword')}>
              Forgot Password ?
            </Text>

            <Button
              stylesofbtn={styles.custbtn}
              styleoffont={styles.custfontstyle}
              handlepress={handlePress}
              name={'Login'}
              loading={loading}
            />

            <Text
              style={styles.createAccountText}
              onPress={() => navigation.navigate('Signup')}>
              Create New Account
            </Text>
          </View>
        </View>
      </View>

      {/* </View> */}
    </ScrollView>
  );
};

export default Loginscreen;

const styles = StyleSheet.create({
  logincontainer: {
    // margin: wp('3%'),
    // marginTop: hp('30%'),
    fontFamily: 'Product Sans',
    flex: 0.5,
  },
  headingtext: {
    color: globalColors.black,
    fontSize: wp('5%'),
    textAlign: 'center',
    padding: wp('5%'),
    fontWeight: '700',
    fontSize: 32,
    fontFamily: 'Product Sans',
  },
  inputfield: {
    backgroundColor: globalColors.white,

    fontFamily: 'Product Sans',
    fontSize: 14,
    fontWeight: '400',
    padding: 20,
  },
  icon: {
    width: 18,
    height: 16,
  },
  iconPassword: {
    width: 18,
    height: 21,
  },
  inputfieldboth: {
    // borderWidth: 0.5,
    borderRadius: hp('1%'),
    borderColor: globalColors.borderColor,
  },
  separator: {
    borderWidth: 0.1,
    alignSelf: 'center',
    backgroundColor: '#dcdcdc',
    width: '80%',
  },
  custContainer: {
    padding: wp('5%'),
    // marginTop: hp('-2%'),
  },
  custbtn: {
    backgroundColor: 'black',
    padding: wp('3%'),

    borderRadius: 5,
    fontFamily: 'Product Sans',
  },
  custfontstyle: {
    color: globalColors.white,
    textAlign: 'center',
    fontFamily: 'Product Sans',
  },
  custforgotpasstext: {
    textAlign: 'center',
    marginTop: hp('3.5%'),
    marginBottom: hp('3.5%'),
    fontFamily: 'Product Sans',
    fontSize: 15,
    textTransform: 'uppercase',
    fontWeight: '400',
    color: 'black',
  },
  custposition: {
    position: 'relative',
  },
  cust_icon: {
    position: 'absolute',
    right: wp('2.5%'),
    color: globalColors.buttonBackground,
    top: hp('1.5%'),
  },
  custbtn: {
    backgroundColor: 'black',
    padding: wp('3%'),
    borderRadius: 5,
  },
  custfontstyle: {
    color: globalColors.white,
    fontFamily: 'Product Sans',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  createAccountText: {
    textAlign: 'center',
    marginVertical: 20,
    marginTop: hp('2%'),
    borderWidth: 2,
    padding: 10,
    borderColor: globalColors.lightgold,
    borderRadius: 6,
    fontSize: 16,
    fontWeight: '700',
    color: globalColors.lightgold,
    fontFamily: 'Product Sans',
  },
  errorText: {
    color: globalColors.error,
  },
});
