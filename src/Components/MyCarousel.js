import {Dimensions, Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ProductIMG} from '../Constants/Icons';
import {DummyProductimg} from '../Constants/Icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function MyCarousel({views}) {
  const width = Dimensions.get('window').width;

  return (
    <View>
      <ScrollView >
        <Carousel
          loop
          width={width}
          height={width / 0.7}
          data={views}
          onSnapToItem={index => console.log(index)}
          renderItem={({item}) => (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems:"center"
              }}>
              <Image source={{uri: item?.src}} style={styles.Imgcontainer} />
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

export default MyCarousel;

const styles = StyleSheet.create({
  Imgcontainer: {
    width: "100%",
    height: hp('50%'),
    objectFit: 'cover',

  },
});