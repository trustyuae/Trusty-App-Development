import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../Components/Product/Product';
import { globalColors } from '../../Assets/Theme/globalColors';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { fetchCategories } from '../../Redux/Slice/categorySearchSlice';
import { fetchPaginatedProducts, resetProducts } from '../../Redux/Slice/paginatedProductSlice';
import SkeletonLoader from '../../Components/Loader/SkeletonLoader';
import { getToken } from '../../Utils/localstorage';
import { useFocusEffect } from '@react-navigation/native';
import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';

const Shop = ({ navigation }) => {
    const [expanded, setExpanded] = useState({
        categoryId: 16,
        subcategoryId: null,
        childCategoryId: null,
    });
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const {
        categories,
        loading: categoryLoading,
        error: categoryError,
    } = useSelector(state => state.categorySearch);
    const { products: paginatedProducts, status: paginatedStatus, page } = useSelector(state => state.paginatedProducts);
    const { items } = useSelector(state => state.wishlist);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

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
        if (selectedCategoryId !== null) {
            dispatch(fetchPaginatedProducts({ page: 1, categoryId: selectedCategoryId }));
        }
    }, [selectedCategoryId, dispatch]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchTerm.trim() === '') {
                setSearchResults([]);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(
                    `${baseURL}/custom-woo-api/v1/products/search?search=${encodeURIComponent(searchTerm.trim())}`
                );
                setSearchResults(response.data);
                setError(null);
            } catch (err) {
                setError(err.message || 'An error occurred');
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        };

        const debounceTimeout = setTimeout(fetchSearchResults, 300);

        return () => clearTimeout(debounceTimeout);
    }, [searchTerm]);

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

    const navigateToCategoryProducts = category => {
        navigation.navigate('CategoryProducts', { category });
    };

    const toggleCategory = categoryId => {
        setExpanded(prev => ({
            categoryId: prev.categoryId === categoryId ? null : categoryId,
            subcategoryId: null, // Reset subcategory when changing category
            childCategoryId: null, // Reset child category when changing category
        }));
    };

    const toggleSubcategory = subcategoryId => {
        setExpanded(prev => ({
            ...prev,
            subcategoryId: prev.subcategoryId === subcategoryId ? null : subcategoryId,
            childCategoryId: null, // Reset child category when changing subcategory
        }));
    };

    const toggleChildCategory = childCategoryId => {
        setExpanded(prev => ({
            ...prev,
            childCategoryId: prev.childCategoryId === childCategoryId ? null : childCategoryId,
        }));
    };

    const renderChildCategories = childCategories => {
        return childCategories.map(childCategory => (
            <View key={childCategory.id} style={styles.childCategoryContainer}>
                <TouchableOpacity
                    onPress={() => navigateToCategoryProducts(childCategory)}>
                    <Text style={styles.childCategoryTitle}>{childCategory.name}</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    const renderSubcategories = subcategories => {
        return subcategories.map(subcategory => (
            <View key={subcategory.id} style={styles.subcategoryContainer}>
                <View style={styles.subcategoryHeader}>
                    <TouchableOpacity
                        onPress={() => subcategory.subcategories.length === 0 ? navigateToCategoryProducts(subcategory) : toggleSubcategory(subcategory.id)}>
                        <Text style={styles.subcategoryTitle}>{subcategory.name}</Text>
                    </TouchableOpacity>
                    {subcategory.subcategories.length > 0 && (
                        <TouchableOpacity onPress={() => toggleSubcategory(subcategory.id)}>
                            <View style={styles.toggleButton}>
                                <Text style={{ fontSize: 20 }}>
                                    {expanded.subcategoryId === subcategory.id ? '-' : '+'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
                {expanded.subcategoryId === subcategory.id && (
                    <View style={styles.childCategoryList}>
                        {renderChildCategories(subcategory.subcategories)}
                    </View>
                )}
            </View>
        ));
    };

    const renderCategories = ({ item }) => (
        <View key={item.id} style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
                <TouchableOpacity onPress={() => item.subcategories.length === 0 ? navigateToCategoryProducts(item) : toggleCategory(item.id)}>
                    <Text style={styles.categoryTitle}>{item.name}</Text>
                </TouchableOpacity>
                {item.subcategories.length > 0 && (
                    <TouchableOpacity onPress={() => toggleCategory(item.id)}>
                        {/* <View style={styles.toggleButton}>
                            <Text style={{ fontSize: 18 }}>
                                {expanded.categoryId === item.id ? '-' : '+'}
                    </Text>
                        </View> */}
                    </TouchableOpacity>
                )
                }
            </View >
            {
                expanded.categoryId === item.id && (
                    <View style={styles.subcategoryList}>
                        {renderSubcategories(item.subcategories)}
                    </View>
                )
            }
        </View >
    );

    const renderProducts = () => {
        const dataToRender = searchTerm.trim().length > 0 ? searchResults : paginatedProducts;

        // if (loading || paginatedStatus === 'loading') {
        //     return <View style={{ marginLeft: wp('1.5%') }}>
        //         <SkeletonLoader count={6} />
        //     </View>;
        // }

        if (dataToRender.length === 0) {
            return (
                <View style={styles.noRecordContainer}>
                    <Text style={styles.noRecordText}>No Record Found</Text>
                </View>
            );
        }

        return (
            <FlatList
                data={dataToRender}
                renderItem={renderProduct}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={styles.productContainer}
                ListFooterComponent={searchTerm.trim().length === 0 && paginatedProducts.length > 0 && (
                    <TouchableOpacity onPress={loadMoreProducts} style={styles.loadMoreButton}>
                        <Text style={styles.loadMoreButtonText}>Load More</Text>
                    </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        );
    };

    const renderProduct = ({ item: product }) => (
        <TouchableOpacity
            key={product.id}
            onPress={() =>
                navigation.navigate('ProductDetail', {
                    userId: product.id,
                    isWatchList: product.isWatchList,
                })
            }>
            {/* <Product
                uri={product?.images?.[0]?.src || product?.image}
                name={product?.name}
                price={product?.price}
                saved={product?.saved}
                product_id={product?.id}
                isWatchList={product?.isWatchList}
            /> */}
        </TouchableOpacity>
    );

    const loadMoreProducts = () => {
        dispatch(fetchPaginatedProducts({ page }));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ padding: wp('2%') }}>
                    <Icon
                        name="arrow-back"
                        size={25}
                        color={globalColors.black}
                        onPress={() => navigation.goBack()}
                    />
                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.inputfield}
                            placeholder="Search"
                            value={searchTerm}
                            onChangeText={setSearchTerm}
                        />
                    </View>
                    {categoryLoading ? (
                        <ActivityIndicator size="large" color={globalColors.primary} />
                    ) : categoryError ? (
                        <Text style={{ color: 'red' }}>{categoryError}</Text>
                    ) : (
                        <FlatList
                            data={categories}
                            horizontal={true}
                            renderItem={renderCategories}
                            keyExtractor={item => item.id.toString()}
                        />
                    )}
                </View>
                {renderProducts()}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalColors.backgroundColor,
    },
    categoryContainer: {
        marginVertical: hp('1%'),
        marginRight: wp('3%'),
    },
    categoryHeader: {
        flexDirection: 'row',
        // alignItems: 'center',

        justifyContent: 'space-between',
        borderRadius: 15,
        paddingHorizontal: wp('2.4%'),
    },
    subcategoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    categoryList: {
        paddingVertical: wp('1%'),
    },
    categoryTitle: {
        fontSize: wp('4%'),
        color: globalColors.black,
        fontSize: 18,
        fontFamily: 'Intrepid Regular',
        backgroundColor: globalColors.white,
        borderRadius: 10,
        padding: 3,
        flexDirection: 'row'
    },
    subcategoryContainer: {
        marginVertical: hp('0.5%'),
    },
    subcategoryTitle: {
        fontSize: 16,
        color: globalColors.darkGray,
        fontWeight: '700',
        fontFamily: 'Intrepid Regular',
    },
    subSubcategoryContainer: {
        marginLeft: wp('4%'),
    },
    subcategoryList: {
        fontSize: 16,
        fontFamily: 'Intrepid Regular',
        fontWeight: '500',
        marginTop: 20
    },
    childCategoryContainer: {
        marginLeft: wp('6%'),
        marginVertical: hp('0.5%'),
    },
    childCategoryTitle: {
        fontSize: 15,
        color: globalColors.darkGray,
        fontFamily: 'Intrepid Regular',
    },
    productContainer: {
        justifyContent: 'space-between',
        marginVertical: wp('2%'),
    },
    noRecordContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('50%'),
    },
    noRecordText: {
        fontSize: wp('4%'),
        color: globalColors.darkGray,
    },
    loadMoreButton: {
        alignItems: 'center',
        marginVertical: wp('2%'),
    },
    loadMoreButtonText: {
        fontSize: wp('4%'),
        color: globalColors.primary,
    },
    inputfield: {
        backgroundColor: 'white',
        margin: 10,
        fontSize: 16,
        borderColor: '#DBCCC1',
        borderWidth: 1,
        padding: 7,
        borderRadius: 20,
        paddingLeft: 20,
    },
    searchContainer: {
        paddingLeft: wp('2%'),
        paddingRight: wp('2%'),
        paddingTop: wp('2%'),
    },
    menuText: {
        color: globalColors.black,
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Intrepid Regular',
    },
    toggleButton: {
        justifyContent: 'center',
        paddingLeft: wp('1%'),
    },
});

export default Shop;
