import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native';
import axios from 'axios';
import Product from '../../Components/Product/Product';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../../Components/Button';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getToken } from '../../Utils/localstorage';
import { fetchWishlist } from '../../Redux/Slice/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const API_URL = 'https://wordpress.trustysystem.com/wp-json/custom-woo-api/v1/products';

const DummySearch = ({ navigation }) => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const { items, loading: wishlistLoading } = useSelector(state => state.wishlist);
    const [tokenData, setTokenData] = useState(null);
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        fetchProducts();
        data()
    }, [page, dispatch]);

    useFocusEffect(
        React.useCallback(() => {
            data()
            dispatch(fetchWishlist(tokenData))
        }, [tokenData, dispatch]) // Fetch data on focus or token change
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken();
                if (token) {
                    setTokenData(token);
                    await dispatch(fetchWishlist(token));
                }
            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };
        fetchData();
    }, [dispatch, getToken]);


    const data = () => {
        if (items.Wishlist) {
            const itemIdList = items.Wishlist?.map(item => ({ id: item }));
            const productIds = new Set(itemIdList.map(item => Number(item.id)));
            const result = products.map(productItem => ({
                ...productItem,
                isWatchList: productIds.has(productItem.id),
            }));
            setWishlist(result);
        } else if (wishlist) {
            setWishlist(products);
        }
    }



    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}?page=${page}`);
            const data = response.data;
            setProducts(prevProducts => [...prevProducts, ...data]);
            data()
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const searchProducts = async () => {
        setLoading(true);
        try {
            setProducts([]);
            const response = await axios.get(
                `${API_URL}/search?search=${searchQuery}`,
            );
            const data = response.data;
            setProducts(data);
        } catch (error) {
            console.error('Error searching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        setPage(page + 1);
    };

    const renderProductItem = ({ item }) => (
        <View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('ProductDetail', { userId: item.id });
                }}>
                <Product
                    uri={item?.images?.[0]?.src || item?.image}
                    name={item?.name}
                    price={item?.price}
                    saved={item?.saved}
                    product_id={item?.id}
                    isWatchList={item?.isWatchList}
                />
            </TouchableOpacity>
        </View>
    );

    const renderFooter = () => {
        return loading ? (
            <ActivityIndicator style={{ marginVertical: 20 }} />
        ) : (
            <Button
                stylesofbtn={styles.custcheckoutbtn}
                styleoffont={styles.custfontstyle}
                name={'Load More'}
                handlepress={loadMore}
            />
        );
    };

    return (
        <GestureHandlerRootView>
            <View style={{ flex: 1, padding: 10 }}>
                <View style={styles.searchContainer}>
                    <View style={styles.custposition}>
                        <TextInput
                            style={styles.inputfield}
                            placeholder="Search"
                            onChangeText={text => setSearchQuery(text)}
                            onSubmitEditing={searchProducts}
                        />
                        <TouchableOpacity style={styles.cust_icon}>
                            <Icon name={'search'} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                <FlatList
                    data={wishlist}
                    renderItem={renderProductItem}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    ListFooterComponent={renderFooter}
                    onEndReached={loadMore}
                    numColumns={2}
                    columnWrapperStyle={styles.productContainer}
                    onEndReachedThreshold={0.5}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </GestureHandlerRootView>
    );
};

export default DummySearch;

const styles = StyleSheet.create({
    inputfield: {
        backgroundColor: 'white',
        margin: 10,
        borderColor: '#DBCCC1',
        borderWidth: 1,
        padding: 7,
        borderRadius: 20,
        paddingLeft: 20,
    },
    custposition: {
        position: 'relative',
    },
    cust_icon: {
        position: 'absolute',
        right: 20,
        top: 30,
        transform: [{ translateY: -10 }],
    },
    searchContainer: {
        marginVertical: 20,
    },
    custfontstyle: {
        color: 'white',
        textAlign: 'center',
    },
    custcheckoutbtn: {
        backgroundColor: '#000000',
        padding: 7,
        marginVertical: 20,
        borderRadius: 5,
    },

    productContainer: {
        justifyContent: 'space-around',
    },
});