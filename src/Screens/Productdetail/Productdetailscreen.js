import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import {SaveICon} from '../../Constants/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Accordion from '../../Components/Accordion';
import Button from '../../Components/Button';
import MyCarousel from '../../Components/MyCarousel';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function Productdetailscreen() {
  const handlepress = () => {};

  return (
    <GestureHandlerRootView>
      <View>
        <ScrollView>
          <MyCarousel />
          <View style={styles.custcontainer}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={styles.cust_text}>Dummy Product 2</Text>
              </View>
              <View>
                <Image source={SaveICon} onPress={() => setSave(false)} />
              </View>
            </View>
            <Text style={styles.custAEDtext}>AED 100,00</Text>
            <View style={{borderBottomWidth: 1, borderColor: '#D8D8D8'}}>
              <Text style={{color: '#86D973', marginBottom: '10'}}>
                In stock
              </Text>
            </View>
            <Accordion />
          </View>

          <View style={{borderTopWidth: 1, borderColor: '#DBCCC1'}}>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 5,
                fontSize: 20,
                color: '#4b4746',
              }}>
              The Perfect Partner
            </Text>
          </View>
        </ScrollView>
        <Button
          styles={styles}
          handlepress={handlepress}
          name={'Add To Cart'}
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
    marginTop: hp('1%'),
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
    marginVertical: 5,
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
  },
  custfontstyle: {
    textAlign: 'center',
    color: 'white',
  },
});
