import React, { useEffect, useState } from 'react';
import {
    Alert,
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
import { fontFamily } from '../../Assets/Theme/fontFamily';

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
            Alert.alert('', 'please login and try again ', [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('LoginCustomeNavigation'),
                },
            ]);
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
                        source={saved ? Images.SaveIconFillTransparant : Images.SavaIconUnFillTransparant}
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
        height: hp('21%'),
        position: 'relative',
    },
    detailsContainer: {
        marginTop: hp('1.5%'),
        // height: hp('10%'),
        width: wp('43%'),
        justifyContent: 'center',
    },
    name: {
        width: wp("44%"),
        fontSize: 18,
        textTransform: 'capitalize',
        fontFamily: fontFamily.fontFamilyOcatorStd,
        fontWeight: '400',
        lineHeight: 21.6,
        letterSpacing: -2,
        // paddingHorizontal: wp('2%'),
        color: globalColors.darkGray,
        // marginTop: hp('2%'),
    },
    price: {
        fontSize: 16,
        marginTop: hp('1%'),
        fontFamily: fontFamily.fontFamilyHelvetica,
        // paddingHorizontal: wp('2%'),
        fontWeight: '400',
        color: globalColors.lightBlack,
    },
    saveImagea: {
        position: 'absolute',
        marginTop: wp('0.1%'),
        marginLeft: wp('27.5%'),
        padding: 12,
        left: 15,
    },
    saveImage: {
        width: 22,
        resizeMode: 'contain',
        padding: 8,
        height: 22,
    },
    image: {
        // borderRadius: wp("1%"),
        borderRadius: 5,
        width: wp('43%'),
        height: hp('22%'),
    },
    dummy: {
        // borderRadius: 6,
        borderRadius: 5,
        width: wp('43%'),
        height: hp('22%'),
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