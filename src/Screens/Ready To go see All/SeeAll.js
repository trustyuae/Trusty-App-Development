import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {fetchRedyToGo} from '../../Redux/Slice/ready_to_go';
import SkeletonLoader from '../../Components/Loader/SkeletonLoader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../../Constants';
import {NoImg} from '../../Constants/Icons';
import {globalColors} from '../../Assets/Theme/globalColors';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Get, Post, Remove} from '../../Services/Get';
import {getToken} from '../../Utils/localstorage';
const SeeAll = () => {
  const dispatch = useDispatch();
  const {redytogoProducts, redytogoStatus, redytogoError} = useSelector(
    state => state.redytogo,
  );
  const [savedItems, setSavedItems] = useState({});
  const [token, setToken] = useState();
  const navigation = useNavigation();
  const [wishlistdata, setWishlist] = useState();
  useEffect(() => {
    // Synchronize savedItems state with wishlistdata when it changes
    const updatedSavedItems = {};
    wishlistdata?.Wishlist.forEach(item => {
      updatedSavedItems[item.id] = true;
    });
    setSavedItems(updatedSavedItems);
  }, [wishlistdata]);

  useEffect(() => {
    const getwishlist = async () => {
      const token = await getToken();
      setToken(token);
      const data = await Get(token);
      setWishlist(data);
    };
    getwishlist();
  }, []);

  useLayoutEffect(() => {
    dispatch(fetchRedyToGo());
  }, [dispatch]);

  const toggleSave = async itemId => {
  
    setSavedItems(prev => {
      const isSaved = !!prev[itemId];
      const newSavedItems = {
        ...prev,
        [itemId]: !isSaved,
      };
      if (!isSaved) {
        Post({product_id: itemId}, token);
      } else {
        Remove({product_id: itemId}, token);
      }
      return newSavedItems;
    });
    const data = await Get(token);
    setWishlist(data);
  };

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <View>
          <View style={styles.maincontainer}>
            <FlatList
              data={redytogoProducts}
              renderItem={({item}) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate('ProductDetail', {userId: item.id})
                  }>
                  {redytogoStatus === 'loading' ? (
                    <View style={{marginLeft: '2.5%'}}>
                      <SkeletonLoader count={6} />
                    </View>
                  ) : (
                    <View style={styles.container}>
                      <View>
                        {item?.images[0] ? (
                          <View>
                            <Image
                              style={styles.image}
                              source={{
                                uri: item.images[0],
                              }}
                              resizeMode="cover"
                            />
                          </View>
                        ) : (
                          <Image
                            source={NoImg}
                            style={styles.image}
                            resizeMode="contain"
                          />
                        )}
                        <Pressable
                          onPress={() => toggleSave(item.id)}
                          style={styles.saveImagea}>
                          <Image
                            style={styles.saveImage}
                            source={
                              savedItems[item.id]
                                ? Images.saveIconFill
                                : Images.saveIconUnFill
                            }
                          />
                        </Pressable>
                      </View>

                      <View style={styles.detailsContainer}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Text style={styles.price}>{item.price} AED</Text>
                      </View>
                    </View>
                  )}
                </Pressable>
              )}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SeeAll;

const styles = StyleSheet.create({
  maincontainer: {
    paddingHorizontal: wp('1%'),
    marginTop: hp('5%'),
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'Product Sans',
    color: globalColors.black,
    // fontWeight: '600'
    marginBottom: hp('0.5%'),
    fontSize: 17,
  },

  image: {
    borderRadius: 6,
    width: wp('46%'),
    height: hp('21%'),
  },

  saveImagea: {
    position: 'absolute',
    marginTop: wp('0.1%'),
    marginLeft: wp('28%'),
    padding: 12,
    left: 15,
  },
  saveImage: {
    width: 32,
    resizeMode: 'contain',
    padding: 8,
    height: 32,
  },
  detailsContainer: {
    marginTop: hp('1%'),
    height: hp('10%'),
    width: wp('46%'),
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    margin: wp('1%'),
    marginTop: hp('3%'),
  },
  price: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'Product Sans',
    color: globalColors.black,
    fontWeight: '700',
  },
});
