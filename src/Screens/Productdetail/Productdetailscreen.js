import {StyleSheet, Text, View, Image, ScrollView, Pressable} from 'react-native';
import { NotSaveICon, SaveICon} from '../../Constants/Icons';
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
import {useEffect, useState} from 'react';
import {fetchById} from '../../Redux/Slice/SingleProductslice';
import {PartnerPerfect} from '../../Redux/Slice/perfectpatnerSlice';
import ProductBackup from '../../Components/Product/ProductBackup';

const ProductList = [
  {
    id: 1,
    uri: Images.product,
    name: 'Dummy Product 1',
    price: 'AED 100',
    saved: false,
  },
  {
    id: 2,
    uri: Images.product,
    name: 'Dummy Product 2',
    price: 'AED 200',
    saved: true,
  },
  {
    id: 3,
    uri: Images.product,
    name: 'Dummy Product 3',
    price: 'AED 300',
    saved: false,
  },
  {
    id: 4,
    uri: Images.product,
    name: 'Dummy Product 4',
    price: 'AED 400',
    saved: true,
  },
];

export default function Productdetailscreen() {
  const dispatch = useDispatch();
  const {loading, error, responseData} = useSelector(state => state.getById);
  const {load, errormessage, partner} = useSelector(state => state.PatnerGet);
  const [changeColor,setChange]=useState()
  const [saved,setSaved]=useState(true)

  // console.log('partner---------->', responseData?.categories[0]?.id);

  useEffect(() => {
    dispatch(fetchById(10173));
  }, []);

  useEffect(() => {
    if (responseData?.categories[0]?.id && !load) {
      dispatch(PartnerPerfect(responseData?.categories[0]?.id));
    }
  }, [responseData]);

  const handlepress = () => {};

  return (
    <GestureHandlerRootView>
      <View>
        <ScrollView>
          <MyCarousel views1={responseData?.images} />
          {/* <MyCarousel /> */}

          <View style={styles.custcontainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{color:"#444444",fontWeight:"500",marginBottom:2}}>{responseData?.name}</Text>
              </View>
              <View>
               {/* {saved?<Image source={SaveICon} onPress={() => setSaved(false)}/>:<Image source={NotSaveICon} onPress={() => setSaved(true)} />} */}
                   <Pressable onPress={()=>setSaved(!saved)}>

           { saved?  <Image source={SaveICon} />:<Image source={NotSaveICon} height={100} width={100} />}
                   </Pressable>
              </View>
            </View>
            <Text style={styles.custAEDtext}>AED {responseData?.price}</Text>
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
            />
            {/* <DummyAccordion attributes={responseData?.attributes}/> */}
          </View>
          <View style={{borderTopWidth: 1, borderColor: '#DBCCC1'}}>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 8,
                fontSize: 20,
                color: '#4B4746',
              }}>
              The Perfect Partner
            </Text>
            <View style={styles.productContainer}>
              {partner
                ?.map((product, key) => (
                  <View key={key}>
                  <ProductBackup
                    key={product?.id}
                    data={product?.images}
                    name={product?.name}
                    price={product?.price}
                    saved={product?.saved}/>
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
        />
      </View>
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
    bottom: 40,
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
});
