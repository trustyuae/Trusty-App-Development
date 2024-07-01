import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalColors} from '../../Assets/Theme/globalColors';
import {Images} from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {removeFromWishlist} from '../../Redux/Slice/wishlistSlice';
import {getToken} from '../../Utils/localstorage';
import {NoImg} from '../../Constants/Icons';

const WishListCard = ({navigation, item, onPress}) => {
  const dispatch = useDispatch();
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();

        if (token) {
          setTokenData(token);
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            borderBottomWidth: 1,

            borderBottomColor: globalColors.inputBorder,

            marginTop: 20,
          }}
        />
        <View
          style={{
            marginVertical: 15,
            flexDirection: 'row',
            gap: 10,
            position: 'relative',
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              paddingVertical: 2,
              position: 'absolute',
              bottom: -8,
              right: 0,
            }}></View>

          <View style={{alignSelf: 'center'}}>
            {/* {( */}
            {item.image ? (
              <Image
                source={{uri: item.image}}
                // style={{ width: 90, height: 90 }}
                style={styles.imageStyle}
              />
            ) : (
              <Image
                source={NoImg}
                style={styles.imageStyle}
                resizeMode="contain"
              />
            )}
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Intrepid Regular',
                fontSize: 18,
                marginVertical: 4,
              }}>
              {item.name}
            </Text>

            {item.price ? (
              <View style={{flexDirection: 'row', fontSize: 16}}>
                <Text
                  style={{
                    color: 'black',
                    fontFamily: 'Intrepid Regular',
                    fontSize: 16,
                  }}>
                  Price:{' '}
                </Text>
                <Text
                  style={{
                    marginVertical: 4,
                    color: '#676766',
                    fontFamily: 'Intrepid Regular',
                  }}>
                  {item?.currency} {item?.price}
                </Text>
              </View>
            ) : null}

            <Text
              style={{
                marginVertical: 4,
                color: 'black',
                fontFamily: 'Intrepid Regular',
                fontSize: 16,
              }}>
              Stock : <Text style={{color: '#676766'}}>{item.stock}</Text>{' '}
            </Text>
            <Text
              style={{
                color: 'black',
                fontFamily: 'Intrepid Regular',
                marginVertical: 4,
                fontSize: 16,
              }}>
              Size :{' '}
              <Text style={{color: '#676766'}}>
                L{/* {Item?.variation_attr?.attribute_pa_size} */}
              </Text>{' '}
            </Text>
          </View>
          <View></View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,

            borderBottomColor: globalColors.inputBorder,
          }}
        />
        {/* ))} */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 120,
    width: 120,
  },
});

export default WishListCard;
