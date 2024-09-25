import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
  Share,
  Linking,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalColors } from '../../Assets/Theme/globalColors';
import { useDispatch, useSelector } from 'react-redux';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import Button from '../../Components/Button';
import { Images } from '../../Constants';
import { passwordIcon } from '../../Constants/Icons';
import { postApiChangePassword } from '../../Redux/Slice/postApiSlice';

const SetNewPassword = () => {
  const dispatch = useDispatch();
  const { loading, error, postData } = useSelector(state => state.post);



  const [value, setValues] = useState({
    password: '',
    confirmPassword: '',
    token: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const handleDeepLink = event => {
      const url = event.url;
      const token = url.split('token=')[1];
      if (token) {
        setValues(prevValues => ({ ...prevValues, token }));
        console.log('Token from URL:', token);
      }
    };

    Linking.addEventListener('url', handleDeepLink);

    Linking.getInitialURL().then(url => {
      if (url) {
        const token = url.split('token=')[1];
        if (token) {
          setValues(prevValues => ({ ...prevValues, token }));
          console.log('Token from URL:', token);
        }
      }
    });

    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  }, []);

  const handleChange = (key, value) => {
    setValues(pre => ({ ...pre, [key]: value }));
  };



  const validateForm = () => {
    let valid = true;

    if (!value.password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: 'Password is required',
      }));
      valid = false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, password: '' }));
    }

    if (value.password !== value.confirmPassword) {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match',
      }));
      valid = false;
    } else {
      setErrors(prevErrors => ({ ...prevErrors, confirmPassword: '' }));
    }

    return valid;
  };

  const handlepress = () => {
    if (validateForm()) {
      console.log('value', value);
      dispatch(postApiChangePassword(value)).then(action => {
        if (postApiChangePassword.fulfilled.match(action)) {
          navigation.navigate('Login');
        }
      });
    }
  };

  return (
    <SafeAreaView>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <View style={styles.logincontainer}>
        <Image style={{ alignSelf: 'center' }} source={Images.logoResetpage} />
        <Text style={styles.headingtext}>
          Set New Password
          <Text style={{ fontFamily: 'San Francisco' }}>?</Text>{' '}
        </Text>

        <View style={styles.custContainer}>
          <Text
            style={{
              fontWeight: '600',
              fontFamily: 'Intrepid Regular',
              fontSize: 14,
              textAlign: 'center',
              resizeMode: 'cover',
              color: globalColors.black,
            }}>
            Thanks for verified link please set your new password here
          </Text>
          <View style={styles.inputfieldboth}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: globalColors.white,
                paddingHorizontal: 20,
              }}>
              <Image style={styles.iconPassword} source={passwordIcon}></Image>
              <TextInput
                style={styles.inputfield}
                placeholder="PASSWORD *"
                placeholderTextColor={globalColors.textColorLogin}
                value={value.password}
                onChangeText={text => handleChange('password', text)}
              />
            </View>
            {errors.password !== '' && (
              <Text
                style={{
                  marginTop: -10,
                  marginLeft: wp('5%'),
                  color: 'red',
                  marginBottom: 10,
                }}>
                {errors.password}
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
              <Image style={styles.iconPassword} source={passwordIcon}></Image>
              <TextInput
                style={styles.inputfield}
                placeholder="CONFIRM PASSWORD *"
                placeholderTextColor={globalColors.textColorLogin}
                value={value.confirmPassword}
                onChangeText={text => handleChange('confirmPassword', text)}
                secureTextEntry
              />
              {errors.confirmPassword !== '' && (
                <Text
                  style={{
                    marginTop: -30,
                    color: 'red',
                    marginBottom: 10,
                    marginLeft: wp('-55%'),
                  }}>
                  {errors.confirmPassword}
                </Text>
              )}

            </View>
          </View>
          <Button
            stylesofbtn={styles.custbtn}
            styleoffont={styles.custfontstyle}
            handlepress={handlepress}
            name={'Set Password'}
            loading={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SetNewPassword;

const styles = StyleSheet.create({
  logincontainer: {
    margin: hp('2%'),
    marginTop: Platform.OS === 'ios' ? 0 : hp('8%'),
  },
  headingtext: {
    fontSize: 20,
    padding: 20,
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'Intrepid Bold',
    color: globalColors.black,
    fontSize: 22,
  },
  inputfield: {
    backgroundColor: globalColors.white,
    fontFamily: 'Intrepid Regular',
    borderColor: globalColors.borderColor,
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
  custContainer: {
    padding: 10,
    marginTop: hp('-3%'),
  },
  inputfieldboth: {
    backgroundColor: globalColors.white,
    marginTop: hp('4%'),
    marginBottom: hp('2%'),
  },
  custbtn: {
    backgroundColor: globalColors.black,
    padding: wp('3%'),
    marginTop: hp('1%'),
    borderRadius: 5,
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
  },
  custfontstyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Intrepid Bold',
    fontSize: 16,
    fontWeight: '700'
  },
  errorText: {
    color: globalColors.error,
    marginTop: 5,
  },
  icon: {
    width: 18,
    height: 16,
  },
  separator: {
    borderWidth: 0.5,
    alignSelf: 'center',
    borderColor: 'rgba(193, 177, 157, 1)',
    width: '80%',
  },
});
