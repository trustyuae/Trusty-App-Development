
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, TextInput, Image } from 'react-native';
import { globalColors } from '../../Assets/Theme/globalColors';
import { fetchCategories } from '../../Redux/Slice/categorySearchSlice';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios, { Axios } from 'axios';
import { Images } from '../../Constants';
import { fontFamily } from '../../Assets/Theme/fontFamily';



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
            if (selectedCategory.subcategories.length > 0) {
                return renderSubcategories(selectedCategory.subcategories);
            } else {
                navigateToCategoryProducts(selectedCategory);
                return null;
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
            const response = await axios.get(
                `https://trustyuae.com/wp-json/custom-woo-api/v1/products/search?search=${encodeURIComponent(text.trim())}`
            );

            const products = response.data;

            if (products.length > 0) {
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
                        matrix[i - 1][j - 1] + 1,
                        Math.min(matrix[i][j - 1] + 1,
                            matrix[i - 1][j] + 1)
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <Icon
                            name="arrow-back"
                            size={25}
                            style={{ marginTop: wp('2%'), marginLeft: wp('2%'), zIndex: 1 }}
                            color={globalColors.black}
                            onPress={() => navigation.goBack()}
                        />
                        <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
                            {/* <Image
                            source={Images.Head}
                            style={{ width: 145, height: 32, }}
                            resizeMode="contain"
                        /> */}
                            <Text style={{
                                fontFamily: fontFamily.fontFamilyIntrepid,
                                fontSize: 22,
                                textTransform: 'uppercase'
                            }}>Search</Text>
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
                            padding: hp('1.5%'),
                            borderRadius: 40,
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
                            <View style={{ justifyContent: 'center' }}>
                                {searchTerm !== '' && (
                                    <TouchableOpacity onPress={() => handleClear()}>
                                        <Icon name="close-circle" size={24} color="gray" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                        {suggestion && (
                            <Text style={styles.suggestionText}>{suggestion}</Text>
                        )}
                    </View>
                    <View style={styles.tabs}>
                        {filteredCategories.length > 0 ? (
                            filteredCategories.map(category => (
                                <TouchableOpacity key={category.id} onPress={() => navigation.navigate('ProductDetail', {
                                    userId: category?.userId
                                    // isWatchList: product?.isWatchList,
                                })}>
                                    <ScrollView style={{


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
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}>
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
    },
    tabs: {
        justifyContent: 'space-around',
        paddingVertical: 10,
    },
    tab: {
        padding: 10,
        flexDirection: 'row',

    },
    activeTab: {
        borderBottomWidth: 2,
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
        backgroundColor: globalColors.headingBackground
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
        padding: 8,
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
    },
    searchContainer: {
        paddingLeft: wp('2%'),
        paddingRight: wp('2%'),
        paddingTop: wp('2%'),
    },
    inputfield: {
        flex: 1,
        fontSize: 16,
        color: globalColors.textColorLogin,
    },
    separator: {
        borderWidth: 0.5,
        borderColor: 'rgba(193, 177, 157, 1)',
        alignSelf: 'center',
        width: '80%',
        marginTop: 10
    },
});

export default Shop;
