import React, { useEffect, useState } from 'react';
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalColors } from '../../Assets/Theme/globalColors';
import { Images } from '../../Constants/index';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToWishlist,
    fetchWishlist,
    removeFromWishlist,
} from '../../Redux/Slice/wishlistSlice';
import { getToken } from '../../Utils/localstorage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { NoImg } from '../../Constants/Icons';
import Carousel from 'react-native-reanimated-carousel';
import MyCarousel from '../MyCarousel';
import MyCarouselOutside from '../MyCarouselOutside';

const ProductCategory = ({ uri, name, price, product_id, isWatchList, img, description }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [saved, setSaved] = useState(isWatchList === true);
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
    }, [dispatch, tokenData]);

    useFocusEffect(
        React.useCallback(() => {
            const fetchData = async () => {
                if (tokenData) {
                    await dispatch(fetchWishlist(tokenData));
                }
            };

            fetchData();
        }, [saved, dispatch, isWatchList, tokenData]),
    );


    const toggleSaved = async () => {
        if (tokenData) {
            if (saved) {
                try {
                    // await dispatch(fetchWishlist(tokenData));
                    await dispatch(removeFromWishlist({ product_id, tokenData }));
                    setSaved(false);
                    // await dispatch(fetchWishlist(tokenData));
                } catch (error) {
                    console.log(error);
                }
            } else {
                try {
                    await dispatch(addToWishlist({ product_id, tokenData }));
                    setSaved(true);
                    // await dispatch(fetchWishlist(tokenData));
                } catch (error) {
                    console.log(error);
                }
            }
        } else {
            navigation.navigate('LoginCustomeNavigation');
            Toast.show({
                type: 'info',
                text1: 'Please login',
                position: 'bottom',
                text2: 'You need to login to save items to your wishlist',
                visibilityTime: 3000,
                autoHide: true,
            });
            console.log('No token available');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <View style={styles.carouselContainer}>
                    {uri?.images ?
                        <MyCarouselOutside views={uri?.images.slice(0, 4)} /> : ''
                    }

                </View>
                <Pressable onPress={toggleSaved} style={styles.saveImagea}>
                    <Image
                        style={styles.saveImage}
                        source={saved ? Images.saveIconFill : Images.saveIconUnFill}
                    />
                </Pressable>
            </View>

            <View style={styles.detailsContainer}>

                <Text style={styles.name}>{name}</Text>
                {price ?
                    <Text style={styles.price}>{price} AED</Text> : <Text style={styles.price}>0 AED</Text>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    centercontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        alignContent: 'center',
        borderRadius: 6,
        overflow: 'hidden',
        height: hp("32%"),
    },
    imageContainer: {
        width: wp('32%'),
        height: hp('18%'),
        position: 'relative',
    },
    detailsContainer: {
        marginTop: hp('2%'),
        height: hp('10%'),
        width: wp('46%'),
        justifyContent: 'center',
    },
    name: {
        width: wp("44%"),
        fontSize: 18,
        textTransform: 'capitalize',
        fontFamily: 'Intrepid Regular',
        fontWeight: '400',
        paddingHorizontal: wp('2%'),
        color: globalColors.newTextColorProduct,
        marginTop: hp('2%'),
    },
    price: {
        fontSize: 18,
        marginTop: wp('1%'),
        fontFamily: 'Intrepid Regular',
        paddingHorizontal: wp('2%'),
        fontWeight: '300',
        color: globalColors.productPriceText,
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
    image: {
        // borderRadius: wp("1%"),
        borderRadius: 5,
        width: wp('46%'),
        height: hp('21%'),
    },
    dummy: {
        // borderRadius: 6,
        borderRadius: 5,
        width: wp('46%'),
        height: hp('21%'),
    },

    heading: {
        color: globalColors.lightgold,
        marginTop: hp('6%'),
        fontFamily: 'Product Sans',
    },
    carouselContainer: {
        width: '100%',
        height: hp('50%'),
        marginBottom: 10,
    },
});

export default ProductCategory;