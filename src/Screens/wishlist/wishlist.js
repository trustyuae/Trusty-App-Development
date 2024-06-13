import React, { useEffect, useState } from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { globalColors } from '../../Assets/Theme/globalColors';
import { Images } from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import WishListCard from '../../Components/wishListCard/wishListCard';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../Utils/localstorage';
import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

const wishlist = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [token, SetToken] = useState(null);

  // const { items } = route?.params;
  const { items } = useSelector(state => state.wishlist);


  const fetchWishlistData = async () => {
    try {
      const token = await getToken();
      SetToken(token);
      if (token) {
        await dispatch(fetchWishlist({ tokenData: token }));
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    fetchWishlistData();
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchWishlist({ tokenData: token }));
    }
  }, [token, dispatch]);

  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing to true
    await dispatch(fetchWishlist({ tokenData: token })); // Fetch data again
    setRefreshing(false); // Set refreshing to false once data is fetched
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchWishlistData();
    }, [dispatch, token]) // Fetch data on focus or token change
  );

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['black']} // Customize the refresh indicator colors
          />
        }>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ marginRight: 15 }}
              source={Images.saveIconFill}></Image>
            <Text style={styles.mainHeading}>My Wishlists</Text>
          </View>

          {items?.Products?.map(item => (
            <Pressable
              onPress={() => {
                navigation.navigate('ProductDetail', { userId: item.id, isWatchList: true });
              }}>
              <WishListCard key={item.id} item={item} />
            </Pressable>
          ))}

          {/* <WishListCard items={items} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: Platform.OS === 'android' ? hp('6%') : 0,
    backgroundColor: globalColors.headingBackground,
  },
  mainHeading: {
    color: globalColors.black,
    fontFamily: 'Intrepid Regular',
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
  },
  productHeading: {
    height: hp('6%'),
    marginTop: hp('2%'),
    justifyContent: 'space-between',
    backgroundColor: globalColors.white,
    flexDirection: 'row',
  },
});
export default wishlist;
