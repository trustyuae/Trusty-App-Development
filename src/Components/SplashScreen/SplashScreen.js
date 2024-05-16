import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {globalColors} from '../../Assets/Theme/globalColors';
import {Images} from '../../Constants/index';
const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Main');
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={styles.MainContainer}>
      <Image source={Images.icons}></Image>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: globalColors.headingBackground,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
  },
});
