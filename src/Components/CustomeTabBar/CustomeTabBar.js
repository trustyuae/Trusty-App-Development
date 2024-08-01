import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {globalColors} from '../../Assets/Theme/globalColors';
import {Images} from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import CustomStatusBar from '../StatusBar/CustomSatusBar';
import {getToken} from '../../Utils/localstorage';
import {fetchWishlist} from '../../Redux/Slice/wishlistSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomTabBar = ({state, descriptors, navigation}) => {
  const dispatch = useDispatch();

  const {data} = useSelector(state => state.profile);
  const {items} = useSelector(state => state.wishlist);

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
    <View style={styles.tabBarContainer}>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>
      <Icon
        name="arrow-back"
        size={25}
        color="#333"
        style={{marginLeft: 8, marginTop: -16}}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.container}>
          <Pressable style={{marginRight: 10}} onPress={handleClick}>
            <Image style={styles.image} source={Images.saveIconUnFill} />
            {items?.Wishlist?.length > 0 && (
              <View style={styles.notificationCount}>
                <Text
                  style={{
                    color: 'white',
                    textAlign:'center',
                  }}>
                  {items?.Wishlist?.length}
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* <Pressable onPress={handleClick}><Text>sdfsd</Text></Pressable> */}
        <View
          style={{flexDirection:"row",  marginBottom: hp('3%'),paddingHorizontal:wp('2%')}}>
          <Image source={Images.ProfileIcon} style={{  height:hp('14%'),
              width:wp('30%')}} resizeMode='contain'></Image>
          <View style={{marginTop: hp('2%')}}></View>
          <View style={{marginLeft:wp('2%'),marginTop:hp('2%')}}>
          <Text
            style={{
              marginBottom: hp('1.3%'),
              fontFamily:'Product Sans Light',
              fontSize:32,
              color: globalColors.productTextColor,
            }}>
            {data?.first_name}
          </Text>
          <Text
            style={{
                fontFamily:'Product Sans',
                fontSize:16,
              color: globalColors.black,
            }}>
            {data?.email}
          </Text>
          </View>
         
        </View>
        <View style={{flexDirection: 'row',backgroundColor:"white"}}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabItem}
                key={index}>
                <Text
                  style={{
                    color: isFocused
                      ? '#866528'
                      : globalColors.buttonBackground,
                      textDecorationLine:isFocused?'underline':'none', 
                      textDecorationStyle:'solid',
                      

                    // paddingLeft: 20,
                    // paddingRight: 50,
                    paddingHorizontal:wp("6%"),
                    paddingBottom: 5,
                    paddingTop: 5,
                    fontSize: 16,
                    backgroundColor: isFocused
                      ? globalColors.white
                      : globalColors.white,
                    fontFamily: 'Product Sans Medium',
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection:'column',
   
    // width: '50%',
    // height: '30%',
    paddingTop: hp('5%'),
    borderBottomWidth: 1,
    borderColor: globalColors.white,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: globalColors.headingBackground,
  },
  image: {
    marginRight: wp('7%'),
    marginTop: 12,
    // width: 30,
    // height: 30,
    // resizeMode: 'contain',
  },
  container: {
    zIndex:3,
    alignItems: 'flex-end',
    position: 'relative',
    height: 40,
    marginTop: hp('-4%')
  },

  notificationCount:{
    marginRight: wp('7.5%'),
    position: 'absolute',
    right: -10,
    backgroundColor: globalColors.black,
    borderRadius: 50,
    width: 20,
  },

  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 10, // Adjust padding as needed
  },
});

export default CustomTabBar;
