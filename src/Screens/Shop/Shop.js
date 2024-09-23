// import React, { useEffect, useState, useCallback } from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     FlatList,
//     StyleSheet,
//     SafeAreaView,
//     ScrollView,
//     ActivityIndicator,
//     TextInput,
// } from 'react-native';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { useDispatch, useSelector } from 'react-redux';
// import Product from '../../Components/Product/Product';
// import { globalColors } from '../../Assets/Theme/globalColors';
// import Icon from 'react-native-vector-icons/Ionicons';
// import axios from 'axios';
// import { fetchCategories } from '../../Redux/Slice/categorySearchSlice';
// import { fetchPaginatedProducts, resetProducts } from '../../Redux/Slice/paginatedProductSlice';
// import SkeletonLoader from '../../Components/Loader/SkeletonLoader';
// import { getToken } from '../../Utils/localstorage';
// import { useFocusEffect } from '@react-navigation/native';
// import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';

// const Shop = ({ navigation }) => {
//     const [expanded, setExpanded] = useState({
//         categoryId: 16,
//         subcategoryId: null,
//         childCategoryId: null,
//     });
//     const [selectedCategoryId, setSelectedCategoryId] = useState(null);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchResults, setSearchResults] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const dispatch = useDispatch();
//     const {
//         categories,
//         loading: categoryLoading,
//         error: categoryError,
//     } = useSelector(state => state.categorySearch);
//     const { products: paginatedProducts, status: paginatedStatus, page } = useSelector(state => state.paginatedProducts);
//     const { items } = useSelector(state => state.wishlist);

//     useEffect(() => {
//         dispatch(fetchCategories());
//     }, [dispatch]);

//     useFocusEffect(
//         useCallback(() => {
//             const token = getToken();
//             if (token) {
//                 dispatch(fetchWishlist(token));
//             }
//             dispatch(resetProducts());
//             dispatch(fetchPaginatedProducts({ page: 1 }));
//         }, [dispatch])
//     );

//     useEffect(() => {
//         if (selectedCategoryId !== null) {
//             dispatch(fetchPaginatedProducts({ page: 1, categoryId: selectedCategoryId }));
//         }
//     }, [selectedCategoryId, dispatch]);

//     useEffect(() => {
//         const fetchSearchResults = async () => {
//             if (searchTerm.trim() === '') {
//                 setSearchResults([]);
//                 return;
//             }

//             setLoading(true);
//             try {
//                 const response = await axios.get(
//                     `${baseURL}/custom-woo-api/v1/products/search?search=${encodeURIComponent(searchTerm.trim())}`
//                 );
//                 setSearchResults(response.data);
//                 setError(null);
//             } catch (err) {
//                 setError(err.message || 'An error occurred');
//                 setSearchResults([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const debounceTimeout = setTimeout(fetchSearchResults, 300);

//         return () => clearTimeout(debounceTimeout);
//     }, [searchTerm]);

//     const updateWishlistWithFlags = (products, wishlistItems) => {
//         if (!wishlistItems || wishlistItems.length === 0) {
//             return products;
//         }
//         const wishlistIds = new Set(wishlistItems.map(item => Number(item)));
//         return products.map(product => ({
//             ...product,
//             isWatchList: wishlistIds.has(product.id),
//         }));
//     };

//     const navigateToCategoryProducts = category => {
//         navigation.navigate('CategoryProducts', { category });
//     };

//     const toggleCategory = categoryId => {
//         setExpanded(prev => ({
//             categoryId: prev.categoryId === categoryId ? null : categoryId,
//             subcategoryId: null, // Reset subcategory when changing category
//             childCategoryId: null, // Reset child category when changing category
//         }));
//     };

//     const toggleSubcategory = subcategoryId => {
//         setExpanded(prev => ({
//             ...prev,
//             subcategoryId: prev.subcategoryId === subcategoryId ? null : subcategoryId,
//             childCategoryId: null, // Reset child category when changing subcategory
//         }));
//     };

//     const toggleChildCategory = childCategoryId => {
//         setExpanded(prev => ({
//             ...prev,
//             childCategoryId: prev.childCategoryId === childCategoryId ? null : childCategoryId,
//         }));
//     };

//     const renderChildCategories = childCategories => {
//         return childCategories.map(childCategory => (
//             <View key={childCategory.id} style={styles.childCategoryContainer}>
//                 <TouchableOpacity
//                     onPress={() => navigateToCategoryProducts(childCategory)}>
//                     <Text style={styles.childCategoryTitle}>{childCategory.name}</Text>
//                 </TouchableOpacity>
//             </View>
//         ));
//     };

//     const renderSubcategories = subcategories => {
//         return subcategories.map(subcategory => (
//             <View key={subcategory.id} style={styles.subcategoryContainer}>
//                 <View style={styles.subcategoryHeader}>
//                     <TouchableOpacity
//                         onPress={() => subcategory.subcategories.length === 0 ? navigateToCategoryProducts(subcategory) : toggleSubcategory(subcategory.id)}>
//                         <Text style={styles.subcategoryTitle}>{subcategory.name}</Text>
//                     </TouchableOpacity>
//                     {subcategory.subcategories.length > 0 && (
//                         <TouchableOpacity onPress={() => toggleSubcategory(subcategory.id)}>
//                             <View style={styles.toggleButton}>
//                                 <Text style={{ fontSize: 20 }}>
//                                     {expanded.subcategoryId === subcategory.id ? '-' : '+'}
//                                 </Text>
//                             </View>
//                         </TouchableOpacity>
//                     )}
//                 </View>
//                 {expanded.subcategoryId === subcategory.id && (
//                     <View style={styles.childCategoryList}>
//                         {renderChildCategories(subcategory.subcategories)}
//                     </View>
//                 )}
//             </View>
//         ));
//     };

//     const renderCategories = ({ item }) => (
//         <View key={item.id} style={styles.categoryContainer}>
//             <View style={styles.categoryHeader}>
//                 <TouchableOpacity onPress={() => item.subcategories.length === 0 ? navigateToCategoryProducts(item) : toggleCategory(item.id)}>
//                     <Text style={styles.categoryTitle}>{item.name}</Text>
//                 </TouchableOpacity>
//                 {item.subcategories.length > 0 && (
//                     <TouchableOpacity onPress={() => toggleCategory(item.id)}>
//                         {/* <View style={styles.toggleButton}>
//                             <Text style={{ fontSize: 18 }}>
//                                 {expanded.categoryId === item.id ? '-' : '+'}
//                     </Text>
//                         </View> */}
//                     </TouchableOpacity>
//                 )
//                 }
//             </View >
//             {
//                 expanded.categoryId === item.id && (
//                     <View style={styles.subcategoryList}>
//                         {renderSubcategories(item.subcategories)}
//                     </View>
//                 )
//             }
//         </View >
//     );

//     const renderProducts = () => {
//         const dataToRender = searchTerm.trim().length > 0 ? searchResults : paginatedProducts;

//         // if (loading || paginatedStatus === 'loading') {
//         //     return <View style={{ marginLeft: wp('1.5%') }}>
//         //         <SkeletonLoader count={6} />
//         //     </View>;
//         // }

//         if (dataToRender.length === 0) {
//             return (
//                 <View style={styles.noRecordContainer}>
//                     <Text style={styles.noRecordText}>No Record Found</Text>
//                 </View>
//             );
//         }

//         return (
//             <FlatList
//                 data={dataToRender}
//                 renderItem={renderProduct}
//                 keyExtractor={item => item.id.toString()}
//                 numColumns={2}
//                 columnWrapperStyle={styles.productContainer}
//                 ListFooterComponent={searchTerm.trim().length === 0 && paginatedProducts.length > 0 && (
//                     <TouchableOpacity onPress={loadMoreProducts} style={styles.loadMoreButton}>
//                         <Text style={styles.loadMoreButtonText}>Load More</Text>
//                     </TouchableOpacity>
//                 )}
//                 showsVerticalScrollIndicator={false}
//                 showsHorizontalScrollIndicator={false}
//             />
//         );
//     };

//     const renderProduct = ({ item: product }) => (
//         <TouchableOpacity
//             key={product.id}
//             onPress={() =>
//                 navigation.navigate('ProductDetail', {
//                     userId: product.id,
//                     isWatchList: product.isWatchList,
//                 })
//             }>
//             {/* <Product
//                 uri={product?.images?.[0]?.src || product?.image}
//                 name={product?.name}
//                 price={product?.price}
//                 saved={product?.saved}
//                 product_id={product?.id}
//                 isWatchList={product?.isWatchList}
//             /> */}
//         </TouchableOpacity>
//     );

//     const loadMoreProducts = () => {
//         dispatch(fetchPaginatedProducts({ page }));
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 <View style={{ padding: wp('2%') }}>
//                     <Icon
//                         name="arrow-back"
//                         size={25}
//                         color={globalColors.black}
//                         onPress={() => navigation.goBack()}
//                     />
//                     <View style={styles.searchContainer}>
//                         <TextInput
//                             style={styles.inputfield}
//                             placeholder="Search"
//                             value={searchTerm}
//                             onChangeText={setSearchTerm}
//                         />
//                     </View>
//                     {categoryLoading ? (
//                         <ActivityIndicator size="large" color={globalColors.primary} />
//                     ) : categoryError ? (
//                         <Text style={{ color: 'red' }}>{categoryError}</Text>
//                     ) : (
//                         <FlatList
//                             data={categories}
//                             horizontal={true}
//                             renderItem={renderCategories}
//                             keyExtractor={item => item.id.toString()}
//                         />
//                     )}
//                 </View>
//                 {renderProducts()}
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: globalColors.backgroundColor,
//     },
//     categoryContainer: {
//         marginVertical: hp('1%'),
//         marginRight: wp('3%'),
//     },
//     categoryHeader: {
//         flexDirection: 'row',
//         // alignItems: 'center',

//         justifyContent: 'space-between',
//         borderRadius: 15,
//         paddingHorizontal: wp('2.4%'),
//     },
//     subcategoryHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginHorizontal: 10,
//     },
//     categoryList: {
//         paddingVertical: wp('1%'),
//     },
//     categoryTitle: {
//         fontSize: wp('4%'),
//         color: globalColors.black,
//         fontSize: 18,
//         fontFamily: 'Intrepid Regular',
//         backgroundColor: globalColors.white,
//         borderRadius: 10,
//         padding: 3,
//         flexDirection: 'row'
//     },
//     subcategoryContainer: {
//         marginVertical: hp('0.5%'),
//     },
//     subcategoryTitle: {
//         fontSize: 16,
//         color: globalColors.darkGray,
//         fontWeight: '700',
//         fontFamily: 'Intrepid Regular',
//     },
//     subSubcategoryContainer: {
//         marginLeft: wp('4%'),
//     },
//     subcategoryList: {
//         fontSize: 16,
//         fontFamily: 'Intrepid Regular',
//         fontWeight: '500',
//         marginTop: 20
//     },
//     childCategoryContainer: {
//         marginLeft: wp('6%'),
//         marginVertical: hp('0.5%'),
//     },
//     childCategoryTitle: {
//         fontSize: 15,
//         color: globalColors.darkGray,
//         fontFamily: 'Intrepid Regular',
//     },
//     productContainer: {
//         justifyContent: 'space-between',
//         marginVertical: wp('2%'),
//     },
//     noRecordContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: hp('50%'),
//     },
//     noRecordText: {
//         fontSize: wp('4%'),
//         color: globalColors.darkGray,
//     },
//     loadMoreButton: {
//         alignItems: 'center',
//         marginVertical: wp('2%'),
//     },
//     loadMoreButtonText: {
//         fontSize: wp('4%'),
//         color: globalColors.primary,
//     },
//     inputfield: {
//         backgroundColor: 'white',
//         margin: 10,
//         fontSize: 16,
//         borderColor: '#DBCCC1',
//         borderWidth: 1,
//         padding: 7,
//         borderRadius: 20,
//         paddingLeft: 20,
//     },
//     searchContainer: {
//         paddingLeft: wp('2%'),
//         paddingRight: wp('2%'),
//         paddingTop: wp('2%'),
//     },
//     menuText: {
//         color: globalColors.black,
//         textAlign: 'center',
//         fontSize: 18,
//         fontFamily: 'Intrepid Regular',
//     },
//     toggleButton: {
//         justifyContent: 'center',
//         paddingLeft: wp('1%'),
//     },
// });


// export default Shop;



// const categories =
//     [
//         {
//             "id": 37,
//             "name": "Women",
//             "slug": "women",
//             "description": "",
//             "count": 1862,
//             "subcategories": [
//                 {
//                     "id": 16,
//                     "name": "Bags",
//                     "slug": "bags-women",
//                     "description": "",
//                     "count": 1265,
//                     "subcategories": [
//                         {
//                             "id": 185,
//                             "name": "ايرمس",
//                             "slug": "hermes",
//                             "description": "",
//                             "count": 128,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 284,
//                             "name": "برادا",
//                             "slug": "prada-bags-women",
//                             "description": "",
//                             "count": 1,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 194,
//                             "name": "بوتيقا",
//                             "slug": "bottega-venta",
//                             "description": "",
//                             "count": 210,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 252,
//                             "name": "ديلفوكس",
//                             "slug": "delvaux",
//                             "description": "",
//                             "count": 0,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 188,
//                             "name": "ديور",
//                             "slug": "dior",
//                             "description": "",
//                             "count": 215,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 191,
//                             "name": "سان لوران",
//                             "slug": "saint-laurent",
//                             "description": "",
//                             "count": 100,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 251,
//                             "name": "سيليين",
//                             "slug": "celine-bags-women",
//                             "description": "",
//                             "count": 0,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 186,
//                             "name": "شانيل",
//                             "slug": "chanel",
//                             "description": "",
//                             "count": 305,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 190,
//                             "name": "فندي",
//                             "slug": "fendi",
//                             "description": "",
//                             "count": 55,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 189,
//                             "name": "قوتشي",
//                             "slug": "gucci",
//                             "description": "",
//                             "count": 0,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 291,
//                             "name": "قويارد",
//                             "slug": "%d9%82%d9%88%d9%8a%d8%a7%d8%b1%d8%af",
//                             "description": "",
//                             "count": 57,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 193,
//                             "name": "لوروبيانا",
//                             "slug": "loro-piana",
//                             "description": "",
//                             "count": 2,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 187,
//                             "name": "لويس فيتون",
//                             "slug": "louis-vuitton",
//                             "description": "",
//                             "count": 176,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 192,
//                             "name": "لويفي",
//                             "slug": "loewe",
//                             "description": "",
//                             "count": 0,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 290,
//                             "name": "موينات",
//                             "slug": "%d9%85%d9%88%d9%8a%d9%86%d8%a7%d8%aa",
//                             "description": "",
//                             "count": 15,
//                             "subcategories": []
//                         }
//                     ]
//                 },
//                 {
//                     "id": 17,
//                     "name": "Shoes",
//                     "slug": "shoes-women",
//                     "description": "",
//                     "count": 457,
//                     "subcategories": [
//                         {
//                             "id": 307,
//                             "name": "لويفي",
//                             "slug": "loewe-shoes-women",
//                             "description": "",
//                             "count": 2,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 197,
//                             "name": "لوروبيانا",
//                             "slug": "loro-piana-shoes",
//                             "description": "",
//                             "count": 51,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 201,
//                             "name": "برادا",
//                             "slug": "prada",
//                             "description": "",
//                             "count": 0,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 195,
//                             "name": "ايرمس",
//                             "slug": "hermes-shoes",
//                             "description": "",
//                             "count": 279,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 198,
//                             "name": "ديور",
//                             "slug": "dior-shoes",
//                             "description": "",
//                             "count": 25,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 200,
//                             "name": "سان لوران",
//                             "slug": "saint-laurent-shoes",
//                             "description": "",
//                             "count": 0,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 199,
//                             "name": "سليين",
//                             "slug": "celine",
//                             "description": "",
//                             "count": 0,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 196,
//                             "name": "شانيل",
//                             "slug": "chanel-shoes",
//                             "description": "",
//                             "count": 100,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 203,
//                             "name": "لويس فيتون",
//                             "slug": "louis-vuitton-shoes",
//                             "description": "",
//                             "count": 0,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 202,
//                             "name": "ميو ميو",
//                             "slug": "mui-mui",
//                             "description": "",
//                             "count": 0,
//                             "subcategories": []
//                         }
//                     ]
//                 },
//                 {
//                     "id": 227,
//                     "name": "miumiu",
//                     "slug": "miumiu",
//                     "description": "",
//                     "count": 0,
//                     "subcategories": []
//                 }
//             ]
//         },
//         {
//             "id": 82,
//             "name": "Men",
//             "slug": "men",
//             "description": "",
//             "count": 125,
//             "subcategories": [
//                 {
//                     "id": 151,
//                     "name": "Bags",
//                     "slug": "bags-men",
//                     "description": "",
//                     "count": 44,
//                     "subcategories": [
//                         {
//                             "id": 309,
//                             "name": "ايرمس",
//                             "slug": "%d8%a7%d9%8a%d8%b1%d9%85%d8%b3-bags-men",
//                             "description": "",
//                             "count": 14,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 285,
//                             "name": "لويس فيتون",
//                             "slug": "louis-vuitton-bags-men",
//                             "description": "",
//                             "count": 29,
//                             "subcategories": []
//                         }
//                     ]
//                 },
//                 {
//                     "id": 152,
//                     "name": "Shoes",
//                     "slug": "shoes-men",
//                     "description": "",
//                     "count": 81,
//                     "subcategories": [
//                         {
//                             "id": 308,
//                             "name": "ديور",
//                             "slug": "%d8%af%d9%8a%d9%88%d8%b1-shoes-men",
//                             "description": "",
//                             "count": 4,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 231,
//                             "name": "لوروبيانا",
//                             "slug": "loro-piana-shoes-men",
//                             "description": "",
//                             "count": 19,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 230,
//                             "name": "ايرمس",
//                             "slug": "hermes-shoes-men",
//                             "description": "",
//                             "count": 54,
//                             "subcategories": []
//                         },
//                         {
//                             "id": 232,
//                             "name": "لويس فيتون",
//                             "slug": "louis-vuitton-shoes-men",
//                             "description": "",
//                             "count": 0,
//                             "subcategories": []
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "id": 298,
//             "name": "Tote Bags",
//             "slug": "tote-bags",
//             "description": "",
//             "count": 291,
//             "subcategories": [
//                 {
//                     "id": 299,
//                     "name": "ايرمس",
//                     "slug": "%d8%a7%d9%8a%d8%b1%d9%85%d8%b3",
//                     "description": "",
//                     "count": 4,
//                     "subcategories": []
//                 },
//                 {
//                     "id": 301,
//                     "name": "ديور",
//                     "slug": "%d8%af%d9%8a%d9%88%d8%b1",
//                     "description": "",
//                     "count": 36,
//                     "subcategories": []
//                 },
//                 {
//                     "id": 306,
//                     "name": "سان لوران",
//                     "slug": "%d8%b3%d8%a7%d9%86-%d9%84%d9%88%d8%b1%d8%a7%d9%86",
//                     "description": "",
//                     "count": 7,
//                     "subcategories": []
//                 },
//                 {
//                     "id": 300,
//                     "name": "شانيل",
//                     "slug": "%d8%b4%d8%a7%d9%86%d9%8a%d9%84",
//                     "description": "",
//                     "count": 59,
//                     "subcategories": []
//                 },
//                 {
//                     "id": 305,
//                     "name": "فندي",
//                     "slug": "%d9%81%d9%86%d8%af%d9%8a",
//                     "description": "",
//                     "count": 1,
//                     "subcategories": []
//                 },
//                 {
//                     "id": 302,
//                     "name": "قويارد",
//                     "slug": "%d9%82%d9%88%d9%8a%d8%a7%d8%b1%d8%af-tote-bags",
//                     "description": "",
//                     "count": 59,
//                     "subcategories": []
//                 },
//                 {
//                     "id": 303,
//                     "name": "لويس فيتون",
//                     "slug": "%d9%84%d9%88%d9%8a%d8%b3-%d9%81%d9%8a%d8%aa%d9%88%d9%86",
//                     "description": "",
//                     "count": 64,
//                     "subcategories": []
//                 },
//                 {
//                     "id": 304,
//                     "name": "موينات",
//                     "slug": "%d9%85%d9%88%d9%8a%d9%86%d8%a7%d8%aa-tote-bags",
//                     "description": "",
//                     "count": 13,
//                     "subcategories": []
//                 }
//             ]
//         },
//         {
//             "id": 182,
//             "name": "Travel Bags",
//             "slug": "travel-bags",
//             "description": "",
//             "count": 17,
//             "subcategories": []
//         }
//     ]

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, TextInput, Image } from 'react-native';
import { globalColors } from '../../Assets/Theme/globalColors';
import { fetchCategories } from '../../Redux/Slice/categorySearchSlice';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios, { Axios } from 'axios';
import { Images } from '../../Constants';

const DummyOptions = ({ options }) => (
    <ScrollView>
        {options.map((option, index) => (
            <View key={index} style={styles.optionContainer}>
                <Text style={styles.optionText}>{option}</Text>
            </View>
        ))}
    </ScrollView>
);

const Shop = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState(37);
    const [expandedCategory, setExpandedCategory] = useState({});
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [suggestion, setSuggestion] = useState('');

    const {
        categories,
        loading: categoryLoading,
        error: categoryError,
    } = useSelector(state => state.categorySearch);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categories.length > 0) {
            setSelectedTab(categories[0].id);
        }
    }, [categories]);

    const toggleCategory = (categoryId) => {
        setExpandedCategory(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };


    const handleClear = () => {
        setSearchTerm('');
        setSuggestion('');
        setFilteredCategories([])
    };

    const navigateToCategoryProducts = (category) => {
        navigation.navigate('CategoryProducts', { category });
    };

    const handlePress = (category) => {
        if (category.subcategories && category.subcategories.length > 0) {
            toggleCategory(category.id);
        } else {
            navigateToCategoryProducts(category);
        }
    };
    const renderSubcategories = (subcategories) => {
        return (
            <View>
                {subcategories.map((subcategory) => {
                    const isExpanded = expandedCategory[subcategory.id] || false;

                    return (
                        <View key={subcategory.id} style={styles.subcategoryContainer}>
                            <TouchableOpacity
                                onPress={() => handlePress(subcategory)}
                            >
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={styles.subcategoryTitle}>{subcategory.name}</Text>
                                    {subcategory.subcategories.length > 0 && (
                                        <Icon
                                            name={isExpanded ? 'remove' : 'add'}
                                            size={20}
                                            color={globalColors.black}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                            {isExpanded && (
                                <View style={styles.nestedSubcategories}>
                                    {renderSubcategories(subcategory.subcategories)}
                                </View>
                            )}
                        </View>
                    );
                })}
            </View>
        );
    };



    const renderContent = () => {
        const selectedCategory = categories.find(cat => cat.id === selectedTab);
        if (selectedCategory) {
            // Check if the selected category has subcategories
            if (selectedCategory.subcategories.length > 0) {
                return renderSubcategories(selectedCategory.subcategories);
            } else {
                // If no subcategories, navigate to CategoryProducts
                navigateToCategoryProducts(selectedCategory);
                return null; // Return null as we are navigating away
            }
        }
        return null;
    };


    const handleSearch = async (text) => {
        setSearchTerm(text);

        if (text.trim() === '') {
            setFilteredCategories([]);
            setSuggestion('');
            return;
        }

        try {
            // Fetch products using the API
            const response = await axios.get(
                `https://trustyuae.com/wp-json/custom-woo-api/v1/products/search?search=${encodeURIComponent(text.trim())}`
            );

            const products = response.data; // Adjust this based on the actual response structure

            if (products.length > 0) {
                // Map the product data to match the structure expected for rendering
                setFilteredCategories(products.map(product => ({
                    name: product?.name,
                    userId: product?.id,
                    image: product?.image
                })));
                setSuggestion('');
            } else {
                setFilteredCategories([]);
                setSuggestion('Product not found');
            }
        } catch (error) {
            console.error("Error fetching products:", error);
            setFilteredCategories([]);
            setSuggestion('Product not found');
        }
    };



    const getLevenshteinDistance = (a, b) => {
        const matrix = [];
        let i, j;

        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(matrix[i][j - 1] + 1, // insertion
                            matrix[i - 1][j] + 1) // deletion
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Icon
                        name="arrow-back"
                        size={25}
                        style={{ marginTop: wp('2%'), marginLeft: wp('2%'), zIndex: 1 }}
                        color={globalColors.black}
                        onPress={() => navigation.goBack()}
                    />
                    <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
                        <Image
                            source={Images.Head}
                            style={{ width: 145, height: 32, }}
                            resizeMode="contain"
                        />
                    </View>

                </View>
                <View style={styles.searchContainer}>
                    <View style={{
                        flexDirection: 'row',
                        borderColor: '#DBCCC1',
                        borderWidth: 1,
                        backgroundColor: 'white',
                        margin: 10,
                        fontSize: 16,
                        padding: 7,
                        borderRadius: 20,
                        paddingLeft: 20,
                        paddingRight: 20,

                    }}>
                        <TextInput
                            style={styles.inputfield}
                            placeholder="Search"
                            placeholderTextColor={globalColors.textColorLogin}
                            value={searchTerm}
                            onChangeText={handleSearch}
                        />

                        {searchTerm !== '' && (
                            <TouchableOpacity onPress={() => handleClear()}>
                                <Icon name="close-circle" size={24} color="gray" />
                            </TouchableOpacity>
                        )}
                    </View>
                    {suggestion && (
                        <Text style={styles.suggestionText}>{suggestion}</Text>
                    )}
                </View>
                <View style={styles.tabs}>
                    {filteredCategories.length > 0 ? (
                        filteredCategories.map(category => (
                            console.log("category=========>", category.image),
                            <TouchableOpacity key={category.id} onPress={() => navigation.navigate('ProductDetail', {
                                userId: category?.userId
                                // isWatchList: product?.isWatchList,
                            })}>
                                <ScrollView style={{
                                    // flex: 1,
                                    // flexDirection: 'row'

                                }} showsVerticalScrollIndicator={false}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        <View style={{ padding: 10 }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',

                                            }}>
                                                <View style={{ flex: 1 }}>
                                                    <Text style={styles.filteredCategory}>{category.name}</Text>

                                                </View>

                                                <Image
                                                    style={{
                                                        width: wp('20%'),
                                                        height: hp('10%'),
                                                        borderRadius: 50,
                                                    }}
                                                    source={{ uri: category.image }}
                                                />
                                            </View>

                                            <View style={styles.separator} />
                                        </View>
                                    </ScrollView>


                                </ScrollView>
                            </TouchableOpacity>
                        ))
                    ) :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {categories.map(category => (
                                <TouchableOpacity
                                    key={category.id}
                                    style={[styles.tab, selectedTab === category.id && styles.activeTab]}
                                    onPress={() => setSelectedTab(category.id)}
                                ><View style={{
                                    flexDirection: 'row',
                                }}>
                                        <Text style={[styles.tabText, selectedTab === category.id && styles.activeTabText]}>
                                            {category.name}
                                        </Text>
                                    </View>

                                </TouchableOpacity>
                            ))}
                        </View>



                    }
                </View>
                {filteredCategories.length > 0 || searchTerm.trim() !== '' ? '' : <ScrollView style={styles.content}>
                    {renderContent()}
                </ScrollView>}
            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalColors.headingBackground,
    },
    tabs: {
        // flexDirection: 'row',
        justifyContent: 'space-around',
        // backgroundColor: '#6200ee',
        paddingVertical: 10,
    },
    tab: {
        padding: 10,
        flexDirection: 'row',

    },
    activeTab: {
        borderBottomWidth: 2,
        // borderBottomColor: 'white',
    },
    tabText: {
        color: globalColors.black,
        fontFamily: 'Intrepid Regular',
        fontSize: 18,
        fontWeight: '800'
    },
    activeTabText: {
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        padding: 20,
        // flexDirection: 'row',

    },
    subcategoryContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    subcategoryTitle: {
        fontSize: 18,
        fontFamily: 'Intrepid Regular',

    },
    nestedSubcategories: {
        marginLeft: 20,
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
        fontFamily: 'Intrepid Regular',

    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        paddingLeft: wp('2%'),
        paddingRight: wp('2%'),
        paddingTop: wp('2%'),
    },
    filteredCategory: {
        padding: 10,
        fontSize: 18,
        fontFamily: 'Intrepid Regular',
        // backgroundColor: 'red',
        // flexDirection: 'column',
        // justifyContent: 'space-between',
        borderBottomWidth: 1,
        // borderBottomColor: 'red',
    },
    searchContainer: {
        paddingLeft: wp('2%'),
        // flex: 1,
        paddingRight: wp('2%'),
        paddingTop: wp('2%'),
    },
    inputfield: {
        flex: 1,  // To allow the input to take the remaining space
        fontSize: 16,
        color: globalColors.textColorLogin,
    },
    separator: {
        borderWidth: 0.5,
        borderColor: 'rgba(193, 177, 157, 1)',
        alignSelf: 'center',
        // backgroundColor: '#dcdcdc',
        width: '80%',
        marginTop: 10
    },
});

export default Shop;
