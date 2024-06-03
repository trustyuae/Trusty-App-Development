import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {NotSaveICon, SaveICon} from '../../Constants/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Accordion from '../../Components/Accordion';
import Button from '../../Components/Button';
import MyCarousel from '../../Components/MyCarousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Product from '../../Components/Product/Product';
import {Images} from '../../Constants';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useRef, useState} from 'react';
import {fetchById} from '../../Redux/Slice/SingleProductslice';
import {PartnerPerfect} from '../../Redux/Slice/perfectpatnerSlice';
import ProductBackup from '../../Components/Product/ProductBackup';
import {addToCart} from '../../Redux/Slice/car_slice/addtocart';
import {getToken, getUsername} from '../../Utils/localstorage';

export default function Productdetailscreen({route, navigation}) {
  const scrollViewRef = useRef();
  const {userId} = route?.params;
  const dispatch = useDispatch();
  const {loading, error, responseData} = useSelector(state => state?.getById);
  const {errormessage, partner} = useSelector(state => state?.PatnerGet);
  const {loa, err, cartdata} = useSelector(state => state);
  const [changeColor, setChange] = useState('');
  const [saved, setSaved] = useState(true);
  const [id, setId] = useState(userId);
  const [changeSize, setChangeSize] = useState('');
  const [load, setLoding] = useState(false);



  useEffect(() => {
    dispatch(fetchById(id));
    setChange('');
    setChangeSize('');
  }, [id]);

  useEffect(() => {
    if (responseData?.categories[0]?.id && !load) {
      dispatch(PartnerPerfect(responseData?.categories[0]?.id));
    }
  }, [responseData]);

  const handlepress = async () => {
    setLoding(true);

    const data = {
      product_id: id,
      quantity: 1,
    };

    dispatch(addToCart(data)).then(action => {
      if (addToCart.fulfilled.match(action)) {
        setLoding(false);
        navigation.navigate('Cart');
      }
    });
  };

  const handleproduct = id => {
    scrollViewRef.current.scrollTo({y: 0, animated: true});
    setId(id);
  };

  return (
    <GestureHandlerRootView>
      {loading ? (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="blue" style={styles.loader} />
        </View>
      ) : (
        <>
          <View>
            <ScrollView ref={scrollViewRef}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MyCarousel views={responseData?.images} />
              </View>

              <View style={styles.custcontainer}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{
                        color:'#444444',
                        fontWeight: '500',
                        marginBottom: 2,
                      }}>
                      {responseData?.name}
                    </Text>
                  </View>
                  <View>
                    {/* {saved?<Image source={SaveICon} onPress={() => setSaved(false)}/>:<Image source={NotSaveICon} onPress={() => setSaved(true)} />} */}
                    <TouchableOpacity onPress={() => setSaved(!saved)}>
                      {saved ? (
                        <Image source={SaveICon} />
                      ) : (
                        <Image
                          source={NotSaveICon}
                          style={styles.iconContainer}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.custAEDtext}>
                  AED {responseData?.price}
                </Text>
                <View style={{borderBottomWidth: 1, borderColor: '#D8D8D8'}}>
                  <Text style={{color: '#86D973', marginBottom: '10'}}>
                    {responseData?.stock_status}
                  </Text>
                </View>
                <Accordion
                  Size={responseData?.attributes[0]?.options}
                  Color={responseData?.attributes[1]?.options}
                  Description={responseData?.description}
                  setChange={setChange}
                  changeColor={changeColor}
                  changeSize={changeSize}
                  setChangeSize={setChangeSize}
                />
                {/* <DummyAccordion attributes={responseData?.attributes}/> */}
              </View>
              <View style={{borderTopWidth: 1, borderColor: '#DBCCC1'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 20,
                    fontSize: 20,
                    color: '#4B4746',
                    fontFamily: 'Intrepid Regular',
                  }}>
                  The Perfect Partner
                </Text>
                <View style={styles.productContainer}>
                  {partner
                    ?.map((product, key) => (
                      <View key={key}>
                        <TouchableOpacity
                          onPress={() => handleproduct(product?.id)}>
                          <Product
                            key={product?.id}
                            uri={product?.images[0]?.src}
                            name={product?.name}
                            price={product?.price}
                            saved={product?.saved}
                          />
                        </TouchableOpacity>
                      </View>
                    ))
                    .slice(0, 4)}
                </View>
              </View>
            </ScrollView>
            <Button
              stylesofbtn={styles.custbtn}
              styleoffont={styles.custfontstyle}
              handlepress={handlepress}
              name={'Add To Carts'}
              loading={load}
            />
          </View>
        </>
      )}
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  Imgcontainer: {
    width: wp('100%'),
    height: hp('60%'),
    objectFit: 'cover',
  },
  custcontainer: {
    marginHorizontal: wp('3%'),
    marginTop: hp('-5%'),
  },
  cust_text: {
    fontWeight: '500',
    marginBottom: hp('0.5%'),
  },
  custAEDtext: {
    color: '#858483',
    marginLeft: 5,
    marginTop: 5,
  },
  custbtn: {
    backgroundColor: 'black',
    padding: 5,
    marginHorizontal: 110,
    borderRadius: 5,
    marginVertical: 0,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  custfontstyle: {
    textAlign: 'center',
    color: 'white',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: -2,
    paddingVertical: 10,
    paddingHorizontal: wp('1%'),
    marginTop: hp('1%'),
    marginBottom: hp('7%'),
  },
  iconContainer: {
    height: 18,
    width: 15,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: hp('20%'),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
