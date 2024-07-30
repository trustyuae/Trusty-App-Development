import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
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
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
const SeeAll = () => {
  const dispatch = useDispatch();
  const {redytogoProducts, redytogoStatus, redytogoError} = useSelector(
    state => state.redytogo,
  );

  const navigation = useNavigation();

  useLayoutEffect(() => {
    dispatch(fetchRedyToGo());
  }, [dispatch]);

  return (
    <GestureHandlerRootView>
      <SafeAreaView>
        <View>
          <View style={styles.maincontainer}>
            <FlatList
              data={redytogoProducts}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ProductDetail', {userId: item.id})
                  }>
                  {redytogoStatus === 'loading' ? (
                  <View style={{ marginLeft: wp('2.5%') }}>
                    <SkeletonLoader count={6} />
                  </View>
                ) : (<View style={styles.container}>
                    <View style={styles.imageContainer}>
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
                      <Pressable style={styles.saveImagea}>
                        <Image
                          style={styles.saveImage}
                          source={
                            false ? Images.saveIconFill : Images.saveIconUnFill
                          }
                        />
                      </Pressable>
                    </View>

                    <View style={styles.detailsContainer}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.price}>{item.price} AED</Text>
                    </View>
                  </View>)}
                </TouchableOpacity>
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
    marginTop: hp('3%'),
    flexDirection: 'row',
  },
  name: {
    fontFamily: 'Product Sans',
    color: globalColors.black,
   // fontWeight: '600'
   marginBottom:hp('0.5%'),
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
    marginTop:hp('3%')
  },
  price: {
    fontSize: 17,
    fontWeight: '400',
    fontFamily: 'Product Sans',
    color: globalColors.black,
    fontWeight: '700',
  },
});
