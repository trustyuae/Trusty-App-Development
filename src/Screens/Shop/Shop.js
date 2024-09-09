import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCategories,
    fetchProductsByCategory,
} from '../../Redux/Slice/categorySearchSlice';
import Product from '../../Components/Product/Product';
import { globalColors } from '../../Assets/Theme/globalColors';
import SearchScreen from '../search/SearchScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Shop = ({ navigation }) => {
    const [expanded, setExpanded] = useState({
        categoryId: null,
        subcategoryId: null,
    });
    const [data, setData] = useState();
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    // fetchCategoryProducts
    const dispatch = useDispatch();
    const { categories, products, loading, error } = useSelector(
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

    // const fetch = () => {
    //     dispatch(
    //         fetchCategoryProducts({ categoryId: data, page: 1 }),
    //     );
    // }
    // useEffect(() => {

    // }, [data, dispatch])

    // useEffect(() => {
    //     if (status === 'succeeded') {
    //         setProducts(categoryProducts);
    //     } else if (status === 'failed') {
    //         console.error(error);
    //     }
    // }, [categoryProducts, status, error]);


    const navigateToCategoryProducts = category => {
        console.log("categoryItemseleseted---->", category)
        // let category = { id: categoryItem }
        navigation.navigate('CategoryProducts', { category });
    };


    const toggleCategory = categoryId => {
        setExpanded(prev => ({
            categoryId: prev.categoryId === categoryId ? null : categoryId,
            subcategoryId: null, // Reset subcategory when changing category
        }));
        // setSelectedCategoryId(categoryId);
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
            </View >
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

            {console.log('expanded--', expanded)}
            {console.log('data---', data)}
            {/* {categoryProducts.map((data) =>
                console.log("categoryProducts11-->", data)
            )} */}

            {expanded.categoryId === item.id && (
                <View style={styles.subcategoryList}>
                    {renderSubcategories(item.subcategories)}
                </View>
            )}
        </View>
    );

    const renderProducts = () => {
        // return products?.length > 0 ? (
        //     <ScrollView>
        //         <View style={styles.productsContainer}>
        //             {products.map(product => (
        //                 <Pressable
        //                     key={product.id}
        //                     onPress={() =>
        //                         navigation.navigate('ProductDetail', {
        //                             userId: product.id,
        //                             isWatchList: product?.isWatchList,
        //                         })
        //                     }>
        //                     <View
        //                         style={{
        //                             flexDirection: 'row',
        //                             justifyContent: 'center', alignItems: 'center',
        //                             flexWrap: 'wrap',
        //                             // marginHorizontal: 5,
        //                             gap: 10
        //                         }}>
        //                         {/* <Product
        //                             key={product?.id}
        //                             uri={product?.images[0]?.src}
        //                             name={product?.name}
        //                             price={product?.price}
        //                             saved={product?.saved}
        //                             product_id={product?.id}
        //                             isWatchList={product?.isWatchList}></Product> */}
        //                     </View>

        //                     <ScrollView
        //                         key={product.id}
        //                         style={styles.productItem}></ScrollView>
        //                 </Pressable>
        //             ))}
        //         </View>
        //     </ScrollView>
        // ) : (
        //     <Text>No products available.</Text>
        // );
    };

    return (
        <SafeAreaView style={styles.container}>

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
                    // marginBottom: hp('5%')
                }}>Menu</Text>
                <TextInput
                    style={styles.inputfield}
                    placeholder="Search "
                // value={search}
                // onChangeText={setSearch}
                />
                <FlatList
                    data={categories}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderCategories}
                />

                <ScrollView>
                    {loading ? <Text>Loading products...</Text> : renderProducts()}
                    {error && <Text>Error: {error}</Text>}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: hp('100%')
        marginBottom: hp('3%')
    },
    categoryContainer: {
        marginVertical: 10,
        // flexDirection: 'row'
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
        marginBottom: hp('25%'),
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