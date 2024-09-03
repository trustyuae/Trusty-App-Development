import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  View,
} from 'react-native';
import React from 'react';
import {globalColors} from '../Assets/Theme/globalColors';
import {BagIcon} from '../Constants/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ButtonAddToCart = ({
  stylesofbtn,
  handlepress,
  name,
  styleoffont,
  loading,
  img,
}) => {
  return (
    <TouchableOpacity style={stylesofbtn} onPress={handlepress}>
      {loading ? (
        <ActivityIndicator size="small" color={globalColors.white} />
      ) : (
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
            gap: 5,
          }}>
          <Image
            source={BagIcon}
            style={{
              width: wp('3.5%'),
              alignSelf: 'center',
              height: hp('2%'),
            }}></Image>
          <Text style={styleoffont}>{name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};
export default ButtonAddToCart;
