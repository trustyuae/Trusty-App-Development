import {StyleSheet, Text, View, TextInput, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../Components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {postApi} from '../../Redux/Slice/postApiSlice';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import {globalColors} from '../../Assets/Theme/globalColors';
import {Image} from 'react-native';
import {emailIcon} from '../../Constants/Icons';
import {Images} from '../../Constants/index';

const ForgotpasswordScreen = ({navigation}) => {
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
          Forget Password
          <Text
            style={{
              fontFamily: 'San Francisco',
              fontWeight: '700',
              fontSize: 24,
            }}>
            ?
          </Text>{' '}
        </Text>

        <View style={styles.custContainer}>
          <Text
            style={{
              fontWeight: '400',
              fontFamily: 'Product Sans',
              fontSize: 14,
              textAlign: 'center',
              color: globalColors.black,
              letterSpacing: 0.7,
            }}>
            Enter the email address associated with your account and we will
            send you a link to reset your password
          </Text>
          <View
            style={{
              marginTop: hp('5%'),
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: globalColors.white,
              paddingHorizontal: 15,
              paddingVertical: 4,
            }}>
            <Image style={styles.icon} source={emailIcon}></Image>
            <TextInput
              style={styles.inputfield}
              placeholder="EMAIL *"
              value={value.email}
              onChangeText={text => handlechange('email', text)}
            />
          </View>
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
    </SafeAreaView>
  );
};

export default ForgotpasswordScreen;

const styles = StyleSheet.create({
  logincontainer: {
    margin: hp('2%'),
    marginTop: Platform.OS === 'ios' ? 0 : hp('8%'),
  },
  headingtext: {
    fontSize: 24,
    padding: 20,
    textAlign: 'center',
    fontWeight: '700',
    fontFamily: 'Product Sans',
    color: globalColors.black,
    fontSize: 22,
  },
  inputfield: {
    backgroundColor: globalColors.white,
    // borderWidth: 1,
    height: hp('5.5%'),
    // marginTop: hp('3%'),
    fontFamily: 'Product Sans',
    // marginBottom: hp('3%'),
    // paddingHorizontal: wp('5%'),
    borderColor: globalColors.borderColor,
    borderRadius: 5,
    padding: 10,
  },
  custContainer: {
    padding: 20,
    marginTop: hp('-3%'),
  },
  custbtn: {
    backgroundColor: globalColors.black,
    padding: wp('3%'),
    borderRadius: 5,
    fontFamily: 'Product Sans',
    fontSize: 16,
  },
  custfontstyle: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Product Sans',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    color: globalColors.error,
    marginTop: 5,
    fontFamily: 'Product Sans',
    marginBottom: 20,
  },
  icon: {
    width: 18,
    height: 16,
  },
});
