import {
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Image} from 'react-native-elements';
import {Bronze, Gold, Platinum, Sliver} from '../../Constants/Icons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ProgressBar from 'react-native-progress-bar-horizontal';
import { Images } from '../../Constants';
import { globalColors } from '../../Assets/Theme/globalColors';

const Points = () => {
  const [count, setCount] = useState(3);

  return (
    <SafeAreaView>
     <ScrollView showsVerticalScrollIndicator={false}>


<View style={{paddingHorizontal:hp('2%')}}>



            <View style={styles.conatiner}>
              <Text style={styles.cust_text}>
                Shop and earn points wit us! Our loyalty
              </Text>

              <Text style={styles.cust_text}>
                program rewards every purchase, interaction, and
              </Text>
              <Text style={styles.cust_text}>
                referral. Redeem posints for rewards and disconounts.
              </Text>
              <Text style={styles.cust_text}>
                Seamlessly track your progress and unlock
              </Text>

              <Text style={styles.cust_text}>
                additional benefits through your user profile.
              </Text>
              <Text style={styles.cust_text}>
                join now for exclusive perks!
              </Text>
            </View>

            <View style={{marginBottom:hp('10%')}}>
              <ImageBackground source={Images.Points} resizeMode='contain' style={{height:hp('35%'),width:wp('93%'),zIndex:1}}>
                {/* <Image source={Images.Star}  style={{height:hp('34%'),width:wp('12%'),marginLeft:wp('5%'),zIndex:1}} resizeMode='contain'></Image> */}
                {/* <Image source={Images.Celebration}  style={{height:hp('20%'),width:wp('20%'),marginLeft:wp('5%'),zIndex:1}} resizeMode='contain'></Image> */}

                <View style={{flexDirection:'row'}}>
                  <View style={{marginTop:hp('16%'),marginLeft:wp('25%')}}>

                  <Text style={{fontFamily:'Product Sans Medium',fontSize:22,color:globalColors.black,fontWeight:'600'}}>You have earned</Text>
                  </View>
                  <View style={{marginTop:hp('15%'),marginLeft:wp('8%')}}>

                  <Text style={{fontFamily:'Product Sans',fontSize:22,color:'#D42A57',fontWeight:'700'}}>3499</Text>
                  <Text style={{fontFamily:'Product Sans',fontSize:22,color:'#D42A57',fontWeight:'700'}}>Points</Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
            

            </View>
            </ScrollView>

     
    </SafeAreaView>
  );
};

export default Points;

const styles = StyleSheet.create({
  conatiner: {
    // marginTop: Platform.OS === 'ios' ? hp('26%') : hp('35%'),
   marginTop:hp('3%')
  },
  cust_text: {
    color: '#797978',
    fontFamily: 'Product Sans',
    textAlign: 'center',
    fontSize: 17,
  },
  cust_continer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  custBorder: {
    borderWidth: 1,
    borderColor: '#684934',
  },
  custboxText: {
    textAlign: 'center',
    color: '#646260',
    marginTop: 2,
  },
});
