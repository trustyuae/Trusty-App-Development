import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors';
import {useDispatch, useSelector} from 'react-redux';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import Button from '../../Components/Button';
import {Images} from '../../Constants';
import {emailIcon, passwordIcon} from '../../Constants/Icons';

const SetNewPassword = () => {
  const dispatch = useDispatch();
  const {loading, error, postData} = useSelector(state => state.post);

  useEffect(() => {
    if (!error) {
      setValues({
        email: '',
        password: '',
      });
    }
  }, [postData]);

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
      setErrors(prevErrors => ({...prevErrors, email: 'Email Is Required'}));
      return;
    } else if (!validateEmail(value.email)) {
      setErrors(prevErrors => ({...prevErrors, email: 'Invalid Email'}));
      return;
    } else {
      setErrors(prevErrors => ({...prevErrors, email: ''}));
    }
    return true;
  };

  const handlepress = () => {
    if (validation()) {
      dispatch(postApi(value)).then(action => {
        if (postApi.fulfilled.match(action)) {
          navigation.navigate('ResetPasswordLink');
        }
      });
    }
  };

  return (
    <SafeAreaView>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <View style={styles.logincontainer}>
        <Image style={{alignSelf: 'center'}} source={Images.logoResetpage} />
        <Text style={styles.headingtext}>
          Set New Password
          <Text style={{fontFamily: 'San Francisco'}}>?</Text>{' '}
        </Text>

        <View style={styles.custContainer}>
          <Text
            style={{
              fontWeight: '600',
              fontFamily: 'Intrepid Regular',
              fontSize: 14,
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
                // value={values.email}
                onChangeText={text =>
                  setValues(prevValues => ({...prevValues, email: text}))
                }
              />
              {errors.email !== '' && (
                <Text style={{marginTop: -10, color: 'red', marginBottom: 10}}>
                  {errors.email}
                </Text>
              )}
            </View>
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
                // value={values.password}
                // secureTextEntry={showPassword}
                onChangeText={text =>
                  setValues(prevValues => ({...prevValues, password: text}))
                }
              />
              {errors.password !== '' && (
                <Text style={{marginTop: -10, color: 'red', marginBottom: 10}}>
                  {errors.password}
                </Text>
              )}
              {/* <Icon
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                style={styles.cust_icon}
                onPress={() => setShowPassword(prevShow => !prevShow)}
              /> */}
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
    fontFamily: 'Intrepid Regular',
    color: globalColors.black,
    fontSize: 22,
  },
  inputfield: {
    backgroundColor: globalColors.white,
    // borderWidth: 1,
    height: hp('5.5%'),
    // marginTop: hp('3%'),
    fontFamily: 'Intrepid Regular',
    // marginBottom: hp('3%'),
    // paddingHorizontal: wp('5%'),
    borderColor: globalColors.borderColor,
    borderRadius: 5,
    padding: 10,
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
    // padding: 10,
    marginTop: hp('4%'),
    marginBottom: hp('4%'),
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
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
  },
  errorText: {
    color: globalColors.error,
    marginTop: 5,
    // marginBottom: 20,
  },
  icon: {
    width: 18,
    height: 16,
  },
});
