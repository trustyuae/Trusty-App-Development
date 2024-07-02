import React, {useEffect, useState, useCallback} from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import {globalColors} from '../../Assets/Theme/globalColors';
import {Images} from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import WishListCard from '../../Components/wishListCard/wishListCard';
import {useDispatch, useSelector} from 'react-redux';
import {getToken} from '../../Utils/localstorage';
import {fetchWishlist} from '../../Redux/Slice/wishlistSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const Wishlist = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [token, setToken] = useState(null);
  const {items} = useSelector(state => state.wishlist);

  // console.log(token);
  // console.log('items', items);

  const fetchWishlistData = async () => {
    try {
      const token = await getToken();
      setToken(token);
      if (token) {
        await dispatch(fetchWishlist({tokenData: token}));
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };

  useEffect(() => {
    fetchWishlistData();
  }, [items]);

  const fetchWishlistCallback = useCallback(() => {
    dispatch(fetchWishlist({tokenData: token}));
  }, [dispatch, token, items]);

  useFocusEffect(fetchWishlistCallback);
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchWishlistCallback();
    setRefreshing(false);
  };

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['black']}
          />
        }>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <Image style={{marginRight: 15}} source={Images.saveIconFill} />
            <Text style={styles.mainHeading}>My Wishlists</Text>
          </View>

          {items?.Products?.map(item => (
            <Pressable
              key={item.id}
              onPress={() => {
                navigation.navigate('ProductDetail', {
                  userId: item.id,
                  isWatchList: true,
                });
              }}>
              <WishListCard key={item.id} item={item} />
            </Pressable>
          ))}
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
});

export default Wishlist;
