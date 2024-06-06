import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import Product from '../../Components/Product/Product';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProducts} from '../../Redux/Slice/productSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalColors } from '../../Assets/Theme/globalColors';

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {products, status, error} = useSelector(state => state.product);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    setData(products);
  }, [products]);

  const updated = data.filter(item =>
    item?.name?.toLowerCase().includes(search?.toLowerCase()),
  );

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.custposition}>
          <TextInput
            style={styles.inputfield}
            placeholder="Search"
            value={search}
            onChangeText={text => setSearch(text)}
          />

          <Icon name={'search'} size={20} style={styles.cust_icon} />
        </View>
      </View>
{status=="loading"?     <ActivityIndicator size="large" color={globalColors.black}
            style={{marginTop:"50%"}}/>:
 <ScrollView>
 {updated.length > 0 ? (
   <View style={styles.productContainer}>
     {updated?.map(product => (
       <TouchableOpacity
         onPress={() =>
           navigation.navigate('ProductDetail', {
             userId: product.id,
           })
         }>
         <Product
           key={product.id}
           uri={product?.images?.[0]?.src}
           name={product?.name}
           price={product?.price}
           saved={product?.saved}
           product_id={product?.id}
         />
       </TouchableOpacity>
     ))}
   </View>
 ) : (
   <View
     style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
     <Text style={{fontFamily: 'Intrepid Regular'}}>
       No Record Found
     </Text>
   </View>
 )}
</ScrollView>
}
     
    </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 100,
  },
  container: {
    padding: 5,
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
  custposition: {
    position: 'relative',
  },
  cust_icon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  searchContainer: {
    marginVertical: 20,
  },
});
