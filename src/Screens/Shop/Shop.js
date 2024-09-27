
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
                        <View key={subcategory.id} style={{}}>
                            <View style={styles.subcategoryContainer}>
                                <TouchableOpacity
                                    onPress={() => handlePress(subcategory)}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginVertical: hp('2%'),
                                        marginHorizontal: wp('6%'),

                                    }}>
                                        <Text style={styles.subcategoryTitle}>{subcategory.name}</Text>
                                        {subcategory.subcategories.length > 0 && (
                                            <Icon
                                                name={isExpanded ? 'remove' : 'add'}
                                                size={20}
                                                color={globalColors.black}
                                            />
                                        )}
                                    </View>
                                    <View style={{
                                        marginHorizontal: wp('6%'),
                                        borderBottomWidth: 1,
                                        borderBottomColor: '#ddd',
                                    }}></View>
                                </TouchableOpacity>
                                {isExpanded && (
                                    <View style={styles.nestedSubcategories}>
                                        {renderSubcategories(subcategory.subcategories)}
                                    </View>
                                )}
                            </View>

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
            <View style={{
                height: '100%',
                backgroundColor: globalColors.headingBackground
            }}>
                <ScrollView style={{}} showsVerticalScrollIndicator={false}>

                    <View style={{ backgroundColor: globalColors.white }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <Icon
                                name="arrow-back"
                                size={25}
                                style={{
                                    marginTop: wp('2%'),
                                    marginLeft: wp('2%'),
                                    zIndex: 1
                                }}
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
                                    fontFamily: fontFamily.fontFamilyOcator,
                                    fontSize: 22,
                                    lineHeight: 22,
                                    letterSpacing: -2,
                                    color: globalColors.darkGray
                                }}>Search</Text>
                            </View>

                        </View>
                        <View style={styles.searchContainer}>
                            <View style={{
                                flexDirection: 'row',
                                borderColor: '#E5E5E5',
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
                                    placeholderTextColor={globalColors.black}
                                    value={searchTerm}
                                    onChangeText={handleSearch}
                                />
                                <View style={{ justifyContent: 'center' }}>
                                    {/* {searchTerm !== '' && (
                                        <TouchableOpacity onPress={() => handleClear()}>
                                            <Icon name="close-circle" size={24} color="gray" />
                                        </TouchableOpacity>
                                    )} */}
                                    {
                                        searchTerm ? (
                                            <TouchableOpacity onPress={() => handleClear()}>
                                                <Icon name='close' size={24} color={globalColors.black}></Icon>
                                            </TouchableOpacity>
                                        ) :
                                            <Icon name="search" size={24} color={globalColors.lightgold} />
                                    }
                                </View>
                            </View>
                            {suggestion && (
                                <Text style={styles.suggestionText}>{suggestion}</Text>
                            )}
                        </View>
                        <View style={styles.tabs}>
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map(category => (
                                    <TouchableOpacity style={{ backgroundColor: globalColors.headingBackground }} key={category.id} onPress={() => navigation.navigate('ProductDetail', {
                                        userId: category?.userId
                                        // isWatchList: product?.isWatchList,
                                    })}>
                                        <ScrollView style={{

                                        }} showsVerticalScrollIndicator={false}>
                                            <ScrollView showsVerticalScrollIndicator={false}>
                                                <View style={{ padding: 20, }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',

                                                    }}>


                                                        <Image
                                                            style={{
                                                                width: 60,
                                                                height: 60,
                                                                borderRadius: 50,
                                                            }}
                                                            source={{ uri: category.image }}
                                                        />
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={styles.filteredCategory}>{category.name}</Text>

                                                        </View>
                                                    </View>

                                                    {/* <View style={styles.separator}  */}
                                                </View>
                                            </ScrollView>


                                        </ScrollView>
                                    </TouchableOpacity>
                                ))
                            ) :
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    marginVertical: hp('2%')

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

                    {filteredCategories.length > 0 || searchTerm.trim() !== '' ? '' :
                        <ScrollView style={styles.content}>
                            {renderContent()}
                        </ScrollView>}
                </ScrollView>
            </View >

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalColors.white

    },
    tabs: {
        justifyContent: 'space-around',
        // maVertical: 10,
        // marginVertical: hp('1.5%')


    },
    tab: {
        // padding: 10
        flexDirection: 'row',

    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: globalColors.lightgold
    },
    tabText: {
        color: globalColors.black,
        fontFamily: fontFamily.fontFamilyHelvetica,
        textTransform: 'uppercase',
        fontSize: 15,
        lineHeight: 24.8,
        fontWeight: '400',
    },
    activeTabText: {
        // fontWeight: 'bold',
        color: globalColors.lightgold,

    },
    content: {
        flex: 1,
        backgroundColor: globalColors.headingBackground,

    },
    subcategoryContainer: {
        // borderBottomWidth: 1,
        // borderBottomColor: '#ddd',
    },
    subcategoryTitle: {
        fontSize: 24,
        fontFamily: fontFamily.fontFamilyOcator,
        color: globalColors.darkGray,
        lineHeight: 25.8,
        letterSpacing: -2,
        textTransform: 'uppercase'
    },
    nestedSubcategories: {
        marginLeft: 20,
    },
    // inputfield: {
    //     backgroundColor: 'white',
    //     margin: 10,
    //     fontSize: 16,
    //     borderColor: '#DBCCC1',
    //     borderWidth: 1,
    //     padding: 8,
    //     borderRadius: 20,
    //     paddingLeft: 20,
    //     fontFamily: 'Intrepid Regular',

    // },
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
        fontFamily: fontFamily.fontFamilyOcator,
        color: globalColors.darkGray,
        fontWeight: '400',
        lineHeight: 21.6,
        letterSpacing: -2,
    },
    searchContainer: {
        paddingLeft: wp('2%'),
        paddingRight: wp('2%'),
        paddingTop: wp('2%'),
    },
    inputfield: {
        flex: 1,
        fontSize: 18,
        // color: globalColors.black,
        fontFamily: fontFamily.fontFamilyOcator,
        lineHeight: 21,
        letterSpacing: -2,
    },
    separator: {
        borderWidth: 0.5,
        borderColor: 'rgba(193, 177, 157, 1)',
        alignSelf: 'center',
        width: '80%',
        marginTop: 10
    },
    suggestionText: {
        fontFamily: fontFamily.fontFamilyOcator,
        fontSize: 18,
        lineHeight: 21,
        letterSpacing: -2,
        marginHorizontal: wp('2%')
    }
});

export default Shop;

