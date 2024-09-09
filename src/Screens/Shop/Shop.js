import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Pressable,
    TextInput,
    ActivityIndicator
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../Components/Product/Product';
import { globalColors } from '../../Assets/Theme/globalColors';
import Icon from 'react-native-vector-icons/Ionicons';
import { baseURL } from '../../Utils/API';
import { fetchCategories } from '../../Redux/Slice/categorySlice';
import axios from 'axios';


const Shop = ({ navigation }) => {
    const [expanded, setExpanded] = useState({
        categoryId: null,
        subcategoryId: null,
    });
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const { categories, products, loading: categoryLoading, error: categoryError } = useSelector(
        state => state.categorySearch,
    );

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (selectedCategoryId !== null) {
            dispatch(fetchProductsByCategory(selectedCategoryId));
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
                console.log("searchTerm======>", searchTerm)
                const response = await axios.get(
                    `${baseURL}/custom-woo-api/v1/products/search?search=${encodeURIComponent(searchTerm.trim())}`
                );
                setSearchResults(response.data); // Adjust based on API response structure
                console.log("==========ddd-->", response.data)
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

    const navigateToCategoryProducts = category => {
        navigation.navigate('CategoryProducts', { category });
    };

    const toggleCategory = categoryId => {
        setExpanded(prev => ({
            categoryId: prev.categoryId === categoryId ? null : categoryId,
            subcategoryId: null, // Reset subcategory when changing category
        }));
    };

    const toggleSubcategory = subcategoryId => {
        setExpanded(prev => ({
            ...prev,
            subcategoryId:
                prev.subcategoryId === subcategoryId ? null : subcategoryId,
        }));
    };

    const renderSubcategories = subcategories => {
        return subcategories.map(subcategory => (
            <View key={subcategory.id} style={styles.subcategoryContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
                    <TouchableOpacity
                        onPress={() => navigateToCategoryProducts(subcategory)}>
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
                {
                    expanded.subcategoryId === subcategory.id &&
                    subcategory.subcategories.length > 0 && (
                        <View style={styles.subSubcategoryContainer}>
                            {renderSubcategories(subcategory.subcategories)}
                        </View>
                    )
                }
            </View>
        ));
    };

    const renderCategories = ({ item }) => (
        <View key={item.id} style={styles.categoryContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 10 }}>
                <TouchableOpacity onPress={() => navigateToCategoryProducts(item)}>
                    <Text style={styles.categoryTitle}>{item.name}</Text>
                </TouchableOpacity>
                {item.subcategories.length > 0 && (
                    <TouchableOpacity onPress={() => toggleCategory(item.id)}>
                        <View style={styles.toggleButton}>
                            <Text style={{ fontSize: 20 }}>
                                {expanded.categoryId === item.id ? '-' : '+'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
            {expanded.categoryId === item.id && (
                <View style={styles.subcategoryList}>
                    {renderSubcategories(item.subcategories)}
                </View>
            )}
        </View>
    );

    const renderProducts = () => {
        if (loading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }

        if (searchResults?.length === 0 && !error) {
            return <Text>No products found.</Text>;
        }

        return (
            <ScrollView>
                <View style={styles.productsContainer}>
                    {searchResults?.map(product => (
                        <Pressable
                            key={product.id}
                            onPress={() =>
                                navigation.navigate('ProductDetail', {
                                    userId: product.id,
                                    isWatchList: product?.isWatchList,
                                })
                            }>
                            <Product
                                uri={product?.image}
                                name={product?.name}
                                price={product?.price}
                                saved={product?.saved}
                                product_id={product?.id}
                                isWatchList={product?.isWatchList}
                            />
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Icon
                    name="arrow-back"
                    size={25}
                    color="#333"
                    style={{ marginLeft: 8 }}
                    onPress={() => navigation.goBack()}
                />
                <View style={{ paddingLeft: wp('2%'), paddingRight: wp('2%'), paddingTop: wp('2%') }}>
                    <Text style={{
                        color: globalColors.black,
                        textAlign: 'center',
                        fontSize: 18,
                        fontFamily: 'Intrepid Regular',
                    }}>Menu</Text>
                    <TextInput
                        style={styles.inputfield}
                        placeholder="Search"
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <FlatList
                        data={categories}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderCategories}
                    />
                    <Text style={{
                        color: globalColors.black,
                        textAlign: 'center',
                        fontSize: 18,
                        fontFamily: 'Intrepid Regular',

                    }}>Search products Result</Text>
                    {renderProducts()}
                    {error && <Text>Error: {error}</Text>}
                    {categoryError && <Text>Category Error: {categoryError}</Text>}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: hp('3%'),
        height: '100%'
    },
    categoryContainer: {
        marginVertical: 10,
    },
    subcategoryContainer: {
        marginLeft: 20,
        flex: 1,
        marginVertical: 5,
    },
    subSubcategoryContainer: {
        marginLeft: 20,
        marginVertical: 5,
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    subcategoryTitle: {
        fontSize: 16,
        color: '#555',
    },
    subcategoryList: {
        marginTop: 5,
    },
    productsContainer: {
        marginTop: 10,
        // marginBottom: hp('25%'),
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },
    toggleButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
    },
    inputfield: {
        backgroundColor: 'white',
        margin: 10,
        borderColor: '#DBCCC1',
        borderWidth: 1,
        padding: 7,
        borderRadius: 20,
        paddingLeft: 20,
    },
});

export default Shop;
