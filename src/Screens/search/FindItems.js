import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    FlatList,
    Image,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { globalColors } from '../../Assets/Theme/globalColors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Product from '../../Components/Product/Product';
import SkeletonLoader from '../../Components/Loader/SkeletonLoader';
import { fetchPaginatedProducts, resetProducts } from '../../Redux/Slice/paginatedProductSlice';
import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';
import { getToken } from '../../Utils/localstorage';
import { baseURL } from '../../Utils/API';
import { fontFamily } from '../../Assets/Theme/fontFamily';
import { NoImageShow, SearchIcon3xLightColor } from '../../Constants/Icons';


const RenderSkeletonLoader = () => {
    return (
        <View style={styles.productRow}>
            {/* Skeleton for product image */}
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonText} />
        </View>
    );
};

const FindItems = ({ navigation }) => {
    const dispatch = useDispatch();

    const { products: paginatedProducts, status: paginatedStatus, page } = useSelector(state => state.paginatedProducts);
    const { items: wishlistItems } = useSelector(state => state.wishlist);

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const debouncedSearchRef = useRef(debounce(handleSearch, 300));
    const [searchTerm, setSearchTerm] = useState('');

    useFocusEffect(
        useCallback(() => {
            const token = getToken();
            if (token) {
                dispatch(fetchWishlist(token));
            }
            dispatch(resetProducts());
            dispatch(fetchPaginatedProducts({ page: 1 }));
        }, [dispatch])
    );

    useEffect(() => {
        if (paginatedProducts.length > 0) {
            const updatedWishlist = updateWishlistWithFlags(paginatedProducts, wishlistItems.Wishlist);
            setSearchResults(updatedWishlist);
        }
    }, [paginatedProducts, wishlistItems]);

    const updateWishlistWithFlags = (products, wishlistItems) => {
        if (!wishlistItems || wishlistItems.length === 0) {
            return products;
        }
        const wishlistIds = new Set(wishlistItems.map(item => Number(item)));
        return products.map(product => ({
            ...product,
            isWatchList: wishlistIds.has(product.id),
        }));
    };

    async function handleSearch(searchQuery) {
        setSearch(searchQuery);

        try {
            if (searchQuery.trim().length > 0) {
                setLoadingSearch(true);
                const response = await fetch(
                    `${baseURL}/custom-woo-api/v1/products/search?search=${encodeURIComponent(searchQuery.trim())}`
                );
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const searchData = await response.json();
                setSearchResults(searchData);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
        } finally {
            setLoadingSearch(false);
        }
    }



    useFocusEffect(
        useCallback(() => {
            if (search.trim().length > 0) {
                debouncedSearchRef.current(search);
            }
        }, [search])
    );

    const renderProduct = ({ item: product }) => (

        <TouchableOpacity style={{ backgroundColor: globalColors.headingBackground }} key={product.id} onPress={() => navigation.navigate('ProductDetail', {
            userId: product?.id
            // isWatchList: product?.isWatchList,
        })}><View style={styles.productRow}>
                {
                    (product.images?.[0].src || product?.image) ? (
                        <Image
                            source={{ uri: product?.images?.[0]?.src || product?.image }}
                            style={styles.productImage}
                        />
                    ) : <Image style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        borderWidth: 1,
                        borderColor: '#E7DDD2'
                    }} source={NoImageShow}>

                    </Image>
                }
                {/* <Image
                    source={{ uri: product?.images?.[0]?.src || product?.image }}
                    style={styles.productImage}
                /> */}
                <Text style={styles.productName}>{product.name}</Text>
            </View>
        </TouchableOpacity>
    );

    const loadMoreProducts = () => {
        if (search.trim().length === 0) {
            dispatch(fetchPaginatedProducts({ page: page + 1 }));
        }
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <SafeAreaView style={{ backgroundColor: 'white' }}>
                <StatusBar barStyle="Dark-content" />
            </SafeAreaView>

            {/* <StatusBar barStyle="light-content" /> */}
            <View style={{
                height: '100%',
                backgroundColor: globalColors.headingBackground
            }}>
                <View style={styles.headerContainer}>
                    <Icon
                        name="arrow-back"
                        size={25}
                        color={globalColors.darkGray}
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.headerText}>Find Your Favorite Items</Text>
                </View>

                <View style={{
                    backgroundColor: globalColors.white,
                    paddingVertical: 10
                }}>
                    <View style={styles.searchBar}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            placeholderTextColor={globalColors.darkGray}
                            value={search}
                            onChangeText={setSearch}
                        />
                        {/* <Text style={styles.categoryText}>FOR WOMEN</Text> */}

                        {search ?
                            <Icon
                                name="close"
                                size={20}
                                style={styles.clearIcon}
                                onPress={() => setSearch('')}
                            /> :
                            <Image style={{
                                height: 20,
                                width: 20,
                                marginRight: 10,
                            }} source={SearchIcon3xLightColor}></Image>

                        }
                    </View>
                </View>


                {/* Product List */}
                {/* <View style={{ backgroundColor: globalColors.headingBackground }}> */}


                {
                    paginatedStatus === 'loading' ? (
                        <View style={styles.loadingContainer}>
                            {/* <Text>Loading products...</Text> */}
                            {Array.from({ length: 5 }).map((_, index) => (
                                <RenderSkeletonLoader key={index} />
                            ))}
                        </View>
                    )
                        :

                        (search.trim().length > 0 && searchResults.length === 0) || (!search.trim() && paginatedProducts.length === 0)
                            ? (
                                <View style={styles.noProductContainer}>
                                    <Text style={styles.noProductText}>No products found</Text>
                                </View>
                            )
                            :
                            (
                                <FlatList
                                    data={search.trim().length > 0 ? searchResults : ''}
                                    renderItem={renderProduct}
                                    keyExtractor={(item) => item.id.toString()}
                                    contentContainerStyle={styles.productList}
                                    showsVerticalScrollIndicator={false}
                                />
                            )

                }
            </View>

            {/* </View> */}
        </SafeAreaView >

    );
};

export default FindItems;

const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            timeout = null;
            func.apply(context, args);
        }, wait);
    };
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: globalColors.white,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: globalColors.white,
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        fontFamily: fontFamily.fontFamilyOcator,
        fontSize: 22,
        lineHeight: 22,
        letterSpacing: -2,
        fontWeight: '400',
        color: globalColors.darkGray
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: wp('5%'),
        marginVertical: 10,
        fontSize: 18,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 40,
        backgroundColor: 'white',
    },
    searchInput: {
        flex: 1,
        padding: 15,
        // paddingVertical: 8,
        // paddingHorizontal: 10,
        fontSize: 18,
        color: globalColors.darkGray,
        fontFamily: fontFamily.fontFamilyOcator,
        lineHeight: 21,
        letterSpacing: -2,
        textTransform: 'uppercase'
    },
    categoryText: {
        fontSize: 12,
        color: '#666',
        marginRight: 10,
    },
    clearIcon: {
        marginRight: 10,
        color: globalColors.darkGray,
    },
    productList: {
        paddingHorizontal: 10,
        backgroundColor: globalColors.headingBackground,
        // height: 'auto'

    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    productName: {
        padding: 10,
        marginLeft: wp('2%'),
        // textAlign: 'center',
        flex: 1,
        fontSize: 18,
        fontFamily: fontFamily.fontFamilyOcator,
        color: globalColors.darkGray,
        fontWeight: '400',
        lineHeight: 21.6,
        letterSpacing: -2,
    },
    loadMoreButton: {
        backgroundColor: globalColors.black,
        height: hp('4%'),
        alignSelf: 'center',
        justifyContent: 'center',
        width: wp('25%'),
        borderRadius: 5,
        marginBottom: hp('6%'),
        marginVertical: 10,
    },
    loadMoreButtonText: {
        fontSize: 14,
        color: globalColors.white,
        textAlign: 'center',
    },
    noProductText: {
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 18,
        fontFamily: fontFamily.fontFamilyOcator,
        color: globalColors.darkGray,
        fontWeight: '400',
        lineHeight: 21.6,
        letterSpacing: -2,
    },
    skeletonImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#E0E0E0',
        marginRight: 10,
    },
    skeletonText: {
        height: 20,
        width: '60%',
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
});
