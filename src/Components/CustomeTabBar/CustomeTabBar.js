import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import { globalColors } from '../../Assets/Theme/globalColors';
import { Images } from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import CustomStatusBar from '../StatusBar/CustomSatusBar';
import { getToken } from '../../Utils/localstorage';
import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';


const CustomTabBar = ({ state, descriptors, navigation }) => {
  const dispatch = useDispatch();

  const { data } = useSelector(state => state.profile);
  const { items } = useSelector(state => state.wishlist);


  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        dispatch(fetchWishlist({ tokenData: token }));
      }
    }
    fetchData();
  }, [dispatch]);


  const handleClick = () => {
    navigation.navigate('wishlist', {
      items: items
    })
  }
  return (
    <View style={styles.tabBarContainer}>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <ScrollView >

        <View style={styles.container}>
          <Pressable style={{ marginRight: 10 }} onPress={handleClick}>
            <Image style={styles.image} source={Images.saveIconUnFill3x} />
            {items?.Wishlist?.length > 0 && <View style={styles.notificationCount}><Text style={{
              color: 'white', textAlign: 'center',
            }}>{items?.Wishlist?.length}</Text></View>}
          </Pressable>
        </View>

        {/* <Pressable onPress={handleClick}><Text>sdfsd</Text></Pressable> */}
        <View style={{ alignItems: 'center', paddingBottom: 2, marginTop: wp('5%') }}>


          <Image source={Images.ProfileIcon}></Image>


          <Text style={{ marginBottom: hp('2.5%') }}>{data?.first_name}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
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
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabItem}
                key={index}>
                <Text
                  style={{
                    color: isFocused
                      ? globalColors.black
                      : globalColors.buttonBackground,
                    padding: 10,
                    fontSize: 16,
                    backgroundColor: isFocused
                      ? globalColors.white
                      : globalColors.headingBackground,
                    fontFamily: 'Intrepid Regular',
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
    flexDirection: 'column',
    // width: '50%',
    // height: '30%',
    paddingTop: hp('5%'),
    borderBottomWidth: 1,
    borderColor: globalColors.white,
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: globalColors.headingBackground, // Ensure background color to cover content below
  },
  image: {
    marginRight: wp('7%'), marginTop: 10,
    // width: 30,
    // height: 30,
    // resizeMode: 'contain',
  },
  container: {
    alignItems: 'flex-end',
    position: 'relative',
    height: 40, // Add a fixed height to the parent container
  },



  notificationCount: {
    marginRight: wp('7.5%'),
    position: 'absolute',
    right: -7,
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
