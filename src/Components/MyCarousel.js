import {Dimensions, Text, View, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ProductIMG} from '../Constants/Icons';
import {DummyProductimg} from '../Constants/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// const views1 = [
//   {
//     imgUrl: ProductIMG,
//     title: 'Airport Cabs',
//   },
//   {
//     imgUrl: ProductIMG,
//     title: 'Gift Cards',
//   },
//   {
//     imgUrl: ProductIMG,
//     title: 'Hourly Stays',
//   },
//   {
//     imgUrl: ProductIMG,
//     title: 'Travel Insurance',
//   },
//   {
//     imgUrl: ProductIMG,
//     title: 'Forex',
//   },
//   {
//     imgUrl: ProductIMG,
//     title: 'HomeStays & Villas',
//   },
// ];

function MyCarousel({views1}) {
  const width = Dimensions.get('window').width;

  return (
    <View>
      <Carousel
        loop
        width={width}
        height={width / 0.7}
        data={views1}
        onSnapToItem={index => console.log(index)}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
     
              <Image source={{uri: item?.src}} style={styles.Imgcontainer} />
            
          </View>
        )}
      />
    </View>
  );
}

export default MyCarousel;

const styles = StyleSheet.create({
  Imgcontainer: {
    width: wp('100%'),
    height: hp('50%'),
    objectFit: 'cover',
  },
});
