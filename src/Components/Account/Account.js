import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Images} from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Pressable} from 'react-native';
import {globalColors} from '../../Assets/Theme/globalColors';
import {useDispatch, useSelector} from 'react-redux';
import {getToken} from '../../Utils/localstorage';
import {useNavigation} from '@react-navigation/native';

const Account = () => {
  const dispatch = useDispatch();
  const {data} = useSelector(state => state.profile);
  const {items} = useSelector(state => state.wishlist);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        dispatch(fetchWishlist({tokenData: token}));
      }
    };
    fetchData();
  }, [dispatch]);

  const handleClick = () => {
    navigation.navigate('wishlist', {
      items: items,
    });
  };
  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            // marginVertical: hp('1%'),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Icon
            name="arrow-back"
            size={25}
            color="#333"
            style={{marginLeft: 8}}
            onPress={() => navigation.goBack()}
          />

          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: 'Product Sans',
              fontWeight: '700',
              color: 'black',
              fontSize: 18,
            }}>
            My Profile
          </Text>

         
        </View>
        <View style={styles.container}>
          <View style={{marginRight:wp('1%')}}>
          <Pressable onPress={handleClick}>
              <Image
                style={styles.img}
                source={Images.Editicon}
                resizeMode="contain"
              />
            </Pressable>
          </View>
         
<View>
<Pressable style={{marginRight: 10}} onPress={handleClick}>
              <Image style={styles.saveImage} source={Images.saveIconUnFill} />
              {items?.Wishlist?.length > 0 && (
                <View style={styles.notificationCount}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontFamily: 'Product Sans Medium',
                    }}>
                    {items?.Wishlist?.length}
                  </Text>
                </View>
              )}
            </Pressable>
</View>
            
          </View>
        <View
          style={{
            flexDirection: 'row',
            marginBottom: hp('3%'),
            paddingHorizontal: wp('10%'),
            marginTop:hp("-5%")
          }}>
          <Image
            source={Images.ProfileIcon}
            style={{height: hp('14%'), width: wp('30%')}}
            resizeMode="contain"></Image>
          <View style={{marginTop: hp('2%')}}></View>
          <View style={{marginLeft: wp('2%'), marginTop: hp('2%')}}>
            <Text
              style={{
                marginBottom: hp('1.3%'),
                fontFamily: 'Product Sans Light',
                fontSize: 32,
                color: globalColors.productTextColor,
              }}>
              {data?.first_name}
            </Text>
            <Text
              style={{
                fontFamily: 'Product Sans',
                fontSize: 16,
                color: globalColors.black,
              }}>
              {data?.email}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      justifyContent:'flex-end',
    // alignItems: 'flex-end',
    position: 'relative',
    marginTop: -2,
  },

  notificationCount: {
    position: 'absolute',
    right: -6,
    top: 3,
    backgroundColor: globalColors.black,
    borderRadius: 50,
    width: 20,
  },
  saveImage: {
    width: wp('11.6%'),
    resizeMode: 'contain',
    padding: 8,
    height: hp('10%'),
  },
  img: {
    width: wp('17%'),
    padding: 8,
    marginTop:hp('-4%'),
    height: hp('20%'),
  },
});
