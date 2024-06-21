import {react, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {OrderById} from '../../Redux/Slice/orderSlice';
import {useDispatch, useSelector} from 'react-redux';
import {globalColors} from '../../Assets/Theme/globalColors';
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import {ScrollView} from 'react-native';
import {Image} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Icon component
import SkeletonLoaderOrder from '../../Components/Loader/SkeletonLoaderOrder';
import SkeletonLoaderOrderDetails from '../../Components/Loader/SkeletonLoaderOrderDetails';
import Button from '../../Components/Button';

const OrderDetails = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {data, loading, error} = useSelector(state => state.order);
  const [date, setDate] = useState('');

  const {orderId} = route?.params;
  useEffect(() => {
    if (data.date_created) {
      const extractedDate = data.date_created.split('T')[0];
      setDate(extractedDate);
    }
  }, [data.date_created]);

  useEffect(() => {
    dispatch(OrderById(orderId));
  }, []);
  return (
    // <SafeAreaView>
    //     <View>
    //         <Text>OrderDetails</Text>
    //         <Text>{orderId}</Text>

    //     </View>
    // </SafeAreaView>

    <SafeAreaView>
      <CustomStatusBar color={globalColors.headingBackground} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              //   marginTop: '20%',
              marginTop: Platform.OS === 'ios' ? 0 : '20%',
            }}>
            <SkeletonLoaderOrderDetails count={1} />
          </View>
        ) : (
          <View style={styles.container}>
            <View style={styles.headingContainer}>
              <Icon
                name="information-circle"
                size={24}
                color={globalColors.black}
              />
              <Text style={styles.heading}>Order Details</Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('OrderTracking', {orderId})}>
              <View style={styles.sectionProduct}>
                <Text style={styles.subHeading}>Product</Text>
                {data?.line_items?.map(item => (
                  <View key={item.id} style={styles.item}>
                    {/* <Image source={{ uri: item.image.src }} style={styles.itemImage} /> */}

                    {item.image.src ? (
                      <Image
                        source={{
                          uri: item.image.src,
                        }}
                        height={120}
                        width={120}></Image>
                    ) : (
                      <View
                        style={{
                          height: 120,
                          width: 120,
                          backgroundColor: globalColors.buttonBackground,
                        }}></View>
                    )}
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <Text style={styles.text}>Quantity: {item.quantity}</Text>
                      <Text style={styles.text}>
                        Price: {data.currency_symbol} {item.price}
                      </Text>
                      <Text style={styles.text}>
                        Subtotal: {data.currency_symbol} {item.subtotal}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </TouchableOpacity>

            <Button
              name={'Order Tracking Status'}
              handlepress={() =>
                navigation.navigate('OrderTracking', {orderId})
              }
              stylesofbtn={styles.custbtn}
              styleoffont={styles.custfontstyle}
            />

            <View style={styles.section}>
              <Text style={styles.subHeading}>Order Information</Text>
              <Text style={styles.text}>Order Number: {data.number}</Text>
              <Text style={styles.text}>Order Date: {date}</Text>
              <Text style={styles.text}>Order Status: {data.status}</Text>
              <Text style={styles.text}>
                Payment Method: {data.payment_method_title}
              </Text>
              <Text style={styles.text}>
                Total Amount: {data.currency_symbol} {data.shipping_total}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.subHeading}>Billing Information</Text>
              <Text style={styles.text}>
                {data?.billing?.first_name} {data?.billing?.last_name}
              </Text>
              <Text style={styles.text}>{data?.billing?.address_1}</Text>
              <Text style={styles.text}>
                {data?.billing?.city}, {data?.billing?.country}
              </Text>
              <Text style={styles.text}>Email: {data?.billing?.email}</Text>
              {/* <Text style={styles.text}>Phone: {data?.billing?.phone}</Text> */}
            </View>

            <View style={styles.section}>
              <Text style={styles.subHeading}>Shipping Information</Text>
              <Text style={styles.text}>
                {data?.shipping?.first_name} {data?.shipping?.last_name}
              </Text>
              <Text style={styles.text}>{data?.shipping?.address_1}</Text>
              <Text style={styles.text}>
                {data?.shipping?.city}, {data?.shipping?.country}
              </Text>
              {/* <Text style={styles.text}>Phone: {data?.shipping?.phone}</Text> */}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp('5%'),
    backgroundColor: globalColors.headingBackground,
    fontFamily: 'Intrepid Regular',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    // marginBottom: hp('2%'),
    paddingLeft: 10,
    color: globalColors.black,
    fontFamily: 'Intrepid Regular',

    textAlign: 'center',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  section: {
    marginBottom: hp('2%'),
    padding: 10,
    paddingLeft: 30,
    fontFamily: 'Intrepid Regular',
  },
  sectionProduct: {
    fontFamily: 'Intrepid Regular',
    marginBottom: hp('2%'),
  },
  subHeading: {
    fontSize: 18,
    // fontWeight: 'bold',
    marginBottom: hp('1%'),
    color: globalColors.black,
    fontFamily: 'Intrepid Regular',
  },
  text: {
    fontSize: 16,
    marginBottom: hp('0.5%'),
    color: globalColors.black,
    fontFamily: 'Intrepid Regular',
    color: globalColors.buttonBackground,

    marginRight: wp('5%'),
  },
  item: {
    flexDirection: 'row',
    marginBottom: hp('2%'),
    padding: hp('1%'),
    fontFamily: 'Intrepid Regular',
    color: globalColors.inputBorder,
    backgroundColor: globalColors.white,
    borderRadius: 10,
  },
  itemImage: {
    width: wp('20%'),
    height: wp('20%'),
    marginRight: wp('5%'),
  },
  itemDetails: {
    flex: 1,
    marginLeft: 20,
    fontFamily: 'Intrepid Regular',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Intrepid Regular',

    marginBottom: hp('0.5%'),
    color: globalColors.black,
  },
  custbtn: {
    backgroundColor: '#444444',
    padding: 7,
    marginHorizontal: 90,
    marginVertical: 20,
    borderRadius: 5,
  },
  custfontstyle: {
    color: 'white',
    textAlign: 'center',
  },
});

export default OrderDetails;
