import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryProducts } from '../../Redux/Slice/productSlice';

const categoryData =
    [
        {
            "id": 37,
            "name": "Women",
            "slug": "women",
            "description": "",
            "count": 1862,
            "subcategories": [
                {
                    "id": 16,
                    "name": "Bags",
                    "slug": "bags-women",
                    "description": "",
                    "count": 1265,
                    "subcategories": [
                        {
                            "id": 185,
                            "name": "ايرمس",
                            "slug": "hermes",
                            "description": "",
                            "count": 128,
                            "subcategories": []
                        },
                        {
                            "id": 284,
                            "name": "برادا",
                            "slug": "prada-bags-women",
                            "description": "",
                            "count": 1,
                            "subcategories": []
                        },
                        {
                            "id": 194,
                            "name": "بوتيقا",
                            "slug": "bottega-venta",
                            "description": "",
                            "count": 210,
                            "subcategories": []
                        },
                        {
                            "id": 252,
                            "name": "ديلفوكس",
                            "slug": "delvaux",
                            "description": "",
                            "count": 0,
                            "subcategories": []
                        },
                        {
                            "id": 188,
                            "name": "ديور",
                            "slug": "dior",
                            "description": "",
                            "count": 215,
                            "subcategories": []
                        },
                        {
                            "id": 191,
                            "name": "سان لوران",
                            "slug": "saint-laurent",
                            "description": "",
                            "count": 100,
                            "subcategories": []
                        },
                        {
                            "id": 251,
                            "name": "سيليين",
                            "slug": "celine-bags-women",
                            "description": "",
                            "count": 0,
                            "subcategories": []
                        },
                        {
                            "id": 186,
                            "name": "شانيل",
                            "slug": "chanel",
                            "description": "",
                            "count": 305,
                            "subcategories": []
                        },
                        {
                            "id": 190,
                            "name": "فندي",
                            "slug": "fendi",
                            "description": "",
                            "count": 55,
                            "subcategories": []
                        },
                        {
                            "id": 189,
                            "name": "قوتشي",
                            "slug": "gucci",
                            "description": "",
                            "count": 0,
                            "subcategories": []
                        },
                        {
                            "id": 291,
                            "name": "قويارد",
                            "slug": "%d9%82%d9%88%d9%8a%d8%a7%d8%b1%d8%af",
                            "description": "",
                            "count": 57,
                            "subcategories": []
                        },
                        {
                            "id": 193,
                            "name": "لوروبيانا",
                            "slug": "loro-piana",
                            "description": "",
                            "count": 2,
                            "subcategories": []
                        },
                        {
                            "id": 187,
                            "name": "لويس فيتون",
                            "slug": "louis-vuitton",
                            "description": "",
                            "count": 176,
                            "subcategories": []
                        },
                        {
                            "id": 192,
                            "name": "لويفي",
                            "slug": "loewe",
                            "description": "",
                            "count": 0,
                            "subcategories": []
                        },
                        {
                            "id": 290,
                            "name": "موينات",
                            "slug": "%d9%85%d9%88%d9%8a%d9%86%d8%a7%d8%aa",
                            "description": "",
                            "count": 15,
                            "subcategories": []
                        }
                    ]
                },
                {
                    "id": 17,
                    "name": "Shoes",
                    "slug": "shoes-women",
                    "description": "",
                    "count": 457,
                    "subcategories": [
                        {
                            "id": 307,
                            "name": "لويفي",
                            "slug": "loewe-shoes-women",
                            "description": "",
                            "count": 2,
                            "subcategories": []
                        },
                        {
                            "id": 197,
                            "name": "لوروبيانا",
                            "slug": "loro-piana-shoes",
                            "description": "",
                            "count": 51,
                            "subcategories": []
                        },
                        {
                            "id": 201,
                            "name": "برادا",
                            "slug": "prada",
                            "description": "",
                            "count": 0,
                            "subcategories": []
                        },
                        {
                            "id": 195,
                            "name": "ايرمس",
                            "slug": "hermes-shoes",
                            "description": "",
                            "count": 279,
                            "subcategories": []
                        },
                        {
                            "id": 198,
                            "name": "ديور",
                            "slug": "dior-shoes",
                            "description": "",
                            "count": 25,
                            "subcategories": []
                        },
                        {
                            "id": 200,
                            "name": "سان لوران",
                            "slug": "saint-laurent-shoes",
                            "description": "",
                            "count": 0,
                            "subcategories": []
                        },
                        {
                            "id": 199,
                            "name": "سليين",
                            "slug": "celine",
                            "description": "",
                            "count": 0,
                            "subcategories": []
                        },
                        {
                            "id": 196,
                            "name": "شانيل",
                            "slug": "chanel-shoes",
                            "description": "",
                            "count": 100,
                            "subcategories": []
                        },
                        {
                            "id": 203,
                            "name": "لويس فيتون",
                            "slug": "louis-vuitton-shoes",
                            "description": "",
                            "count": 0,
                            "subcategories": []
                        },
                        {
                            "id": 202,
                            "name": "ميو ميو",
                            "slug": "mui-mui",
                            "description": "",
                            "count": 0,
                            "subcategories": []
                        }
                    ]
                },
                {
                    "id": 227,
                    "name": "miumiu",
                    "slug": "miumiu",
                    "description": "",
                    "count": 0,
                    "subcategories": []
                }
            ]
        },
        {
            "id": 82,
            "name": "Men",
            "slug": "men",
            "description": "",
            "count": 125,
            "subcategories": [
                {
                    "id": 151,
                    "name": "Bags",
                    "slug": "bags-men",
                    "description": "",
                    "count": 44,
                    "subcategories": [
                        {
                            "id": 309,
                            "name": "ايرمس",
                            "slug": "%d8%a7%d9%8a%d8%b1%d9%85%d8%b3-bags-men",
                            "description": "",
                            "count": 14,
                            "subcategories": []
                        },
                        {
                            "id": 285,
                            "name": "لويس فيتون",
                            "slug": "louis-vuitton-bags-men",
                            "description": "",
                            "count": 29,
                            "subcategories": []
                        }
                    ]
                },
                {
                    "id": 152,
                    "name": "Shoes",
                    "slug": "shoes-men",
                    "description": "",
                    "count": 81,
                    "subcategories": [
                        {
                            "id": 308,
                            "name": "ديور",
                            "slug": "%d8%af%d9%8a%d9%88%d8%b1-shoes-men",
                            "description": "",
                            "count": 4,
                            "subcategories": []
                        },
                        {
                            "id": 231,
                            "name": "لوروبيانا",
                            "slug": "loro-piana-shoes-men",
                            "description": "",
                            "count": 19,
                            "subcategories": []
                        },
                        {
                            "id": 230,
                            "name": "ايرمس",
                            "slug": "hermes-shoes-men",
                            "description": "",
                            "count": 54,
                            "subcategories": []
                        },
                        {
                            "id": 232,
                            "name": "لويس فيتون",
                            "slug": "louis-vuitton-shoes-men",
                            "description": "",
                            "count": 0,
                            "subcategories": []
                        }
                    ]
                }
            ]
        },
        {
            "id": 298,
            "name": "Tote Bags",
            "slug": "tote-bags",
            "description": "",
            "count": 291,
            "subcategories": [
                {
                    "id": 299,
                    "name": "ايرمس",
                    "slug": "%d8%a7%d9%8a%d8%b1%d9%85%d8%b3",
                    "description": "",
                    "count": 4,
                    "subcategories": []
                },
                {
                    "id": 301,
                    "name": "ديور",
                    "slug": "%d8%af%d9%8a%d9%88%d8%b1",
                    "description": "",
                    "count": 36,
                    "subcategories": []
                },
                {
                    "id": 306,
                    "name": "سان لوران",
                    "slug": "%d8%b3%d8%a7%d9%86-%d9%84%d9%88%d8%b1%d8%a7%d9%86",
                    "description": "",
                    "count": 7,
                    "subcategories": []
                },
                {
                    "id": 300,
                    "name": "شانيل",
                    "slug": "%d8%b4%d8%a7%d9%86%d9%8a%d9%84",
                    "description": "",
                    "count": 59,
                    "subcategories": []
                },
                {
                    "id": 305,
                    "name": "فندي",
                    "slug": "%d9%81%d9%86%d8%af%d9%8a",
                    "description": "",
                    "count": 1,
                    "subcategories": []
                },
                {
                    "id": 302,
                    "name": "قويارد",
                    "slug": "%d9%82%d9%88%d9%8a%d8%a7%d8%b1%d8%af-tote-bags",
                    "description": "",
                    "count": 59,
                    "subcategories": []
                },
                {
                    "id": 303,
                    "name": "لويس فيتون",
                    "slug": "%d9%84%d9%88%d9%8a%d8%b3-%d9%81%d9%8a%d8%aa%d9%88%d9%86",
                    "description": "",
                    "count": 64,
                    "subcategories": []
                },
                {
                    "id": 304,
                    "name": "موينات",
                    "slug": "%d9%85%d9%88%d9%8a%d9%86%d8%a7%d8%aa-tote-bags",
                    "description": "",
                    "count": 13,
                    "subcategories": []
                }
            ]
        },
        {
            "id": 182,
            "name": "Travel Bags",
            "slug": "travel-bags",
            "description": "",
            "count": 17,
            "subcategories": []
        }
    ]



const Shop = () => {
    const [expanded, setExpanded] = useState({ categoryId: null, subcategoryId: null });
    const [data, setData] = useState()
    // fetchCategoryProducts
    const { categoryProducts, status, error } = useSelector(state => state.product);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);


    const fetch=()=>{
        dispatch(
            fetchCategoryProducts({ categoryId: data, page: 1 }),
        );
    }
    useEffect(() => {
       
    }, [data, dispatch])

    useEffect(() => {
        if (status === 'succeeded') {
            setProducts(categoryProducts);
        } else if (status === 'failed') {
            console.error(error);
        }
    }, [categoryProducts, status, error]);


    const toggleCategory = (categoryId) => {
        setExpanded(prev => ({
            categoryId: prev.categoryId === categoryId ? null : categoryId,
            subcategoryId: null // Reset subcategory when changing category
        }));
    };

    const toggleSubcategory = (subcategoryId) => {
        setExpanded(prev => ({
            ...prev,
            subcategoryId: prev.subcategoryId === subcategoryId ? null : subcategoryId
        }));
    };

    const renderSubcategories = (subcategories) => {
        return subcategories.map((subcategory) => (
            <View key={subcategory.id} style={styles.subcategoryContainer}>
                <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => setData(subcategory.id)}>
                        <Text style={styles.subcategoryTitle}>
                            {subcategory.name}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleSubcategory(subcategory.id)}>
                        <Text style={{ marginLeft: wp('3%'), textAlign: 'left' }}>
                            {expanded.subcategoryId === subcategory.id ? '-' : '+'}

                        </Text>
                    </TouchableOpacity>
                </View>

                {expanded.subcategoryId === subcategory.id && subcategory.subcategories.length > 0 && (
                    <View style={styles.subSubcategoryContainer}>
                        {renderSubcategories(subcategory.subcategories)}
                    </View>
                )}
            </View>
        ));
    };

    const renderCategories = ({ item }) => (
        <View key={item.id} style={styles.categoryContainer}>

            <View style={{ flexDirection: 'row', marginHorizontal: 10 }}>
                <TouchableOpacity onPress={() => setData(item.id)}>
                    <Text style={styles.categoryTitle}>
                        {item.name}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleCategory(item.id)}>
                    <Text style={{ marginLeft: wp('3%'), textAlign: 'left' }}>
                        {expanded.categoryId === item.id ? '-' : '+'}
                    </Text>
                </TouchableOpacity>
            </View>

            {console.log("expanded--", expanded)}
            {console.log("data---", data)}
            {categoryProducts.map((data) =>
                console.log("categoryProducts11-->", data)
            )}

            {expanded.categoryId === item.id && (
                <View style={styles.subcategoryList}>
                    {renderSubcategories(item.subcategories)}
                </View>
            )}
        </View>
    );

    const renderProducts = () => {
        return products?.length > 0 ? (
            <ScrollView>
                <View style={styles.productsContainer}>
                    {products.map(product => (
                        <View key={product.id} style={styles.productItem}>
                            <Text style={styles.productTitle}>{product.name}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
        ) : (
            <Text>No products available.</Text>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <FlatList
                    data={categoryData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderCategories}
                />
                {renderProducts()}
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    subcategoryTitle: {
        fontSize: 16,
        color: '#555',
    },
    subcategoryList: {
        marginTop: 5,
    },
});

export default Shop;