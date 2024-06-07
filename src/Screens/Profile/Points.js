import {
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
import CustomStatusBar from '../../Components/StatusBar/CustomSatusBar';
import {globalColors} from '../../Assets/Theme/globalColors';

const Points = () => {
  const [count, setCount] = useState(3);

  return (
    <SafeAreaView>
      <CustomStatusBar color={globalColors.headingBackground}></CustomStatusBar>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.conatiner}>
            <View style={{flexDirection: 'row', gap: 10, position: 'relative'}}>
              <Image source={Gold} style={{height: 70, width: 70}} />
              <View>
                <Text
                  style={{
                    fontFamily: 'Intrepid Regular',
                    color: 'black',
                    fontSize: 20,
                  }}>
                  Gold
                </Text>
                <Text
                  style={{
                    color: '#676766',
                    marginVertical: 2,
                    fontFamily: 'Intrepid Regular',
                  }}>
                  Earn 401 points more to reach Platinum
                </Text>
                <View style={{marginVertical: 5}}>
                  <ProgressBar
                    progress={0.4}
                    borderWidth={0}
                    fillColor="#684934"
                    unfilledColor="#E2E2E2"
                    height={8}
                    width={310}
                    borderColor="#E2E2E2"
                    duration={100}
                  />
                </View>
              </View>
              <Text
                style={{
                  position: 'absolute',
                  right: 0,
                  top: -2,
                  color: '#684934',
                }}>
                3499 Points
              </Text>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: '#DBCCC1',
                marginVertical: 10,
              }}
            />

            <View style={{flexDirection: 'row', gap: 17, flexWrap: 'wrap'}}>
              <Pressable onPress={() => setCount(1)}>
                <View
                  style={
                    count == 1
                      ? [styles.cust_continer, styles.custBorder]
                      : styles.cust_continer
                  }>
                  <Image
                    source={Bronze}
                    style={{
                      height: 50,
                      width: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></Image>
                  <Text style={styles.custboxText}>Bronze</Text>
                  <Text style={{textAlign: 'center', color: '#92908E'}}>
                    Opts
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setCount(2)}>
                <View
                  style={
                    count == 2
                      ? [styles.cust_continer, styles.custBorder]
                      : styles.cust_continer
                  }>
                  <Image
                    source={Sliver}
                    style={{
                      height: 50,
                      width: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></Image>
                  <Text style={styles.custboxText}>Sliver</Text>
                  <Text style={{textAlign: 'center', color: '#92908E'}}>
                    200pts
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setCount(3)}>
                <View
                  style={
                    count == 3
                      ? [styles.cust_continer, styles.custBorder]
                      : styles.cust_continer
                  }>
                  <Image
                    source={Gold}
                    style={{
                      height: 50,
                      width: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></Image>
                  <Text style={styles.custboxText}>Gold</Text>
                  <Text style={{textAlign: 'center', color: '#92908E'}}>
                    1000pts
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => setCount(4)}>
                <View
                  style={
                    count == 4
                      ? [styles.cust_continer, styles.custBorder]
                      : styles.cust_continer
                  }>
                  <Image
                    source={Platinum}
                    style={{
                      height: 50,
                      width: 50,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></Image>
                  <Text style={styles.custboxText}>Platinum</Text>
                  <Text style={{textAlign: 'center', color: '#92908E'}}>
                    5000pts
                  </Text>
                </View>
              </Pressable>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: '#DBCCC1',
                marginVertical: 10,
              }}
            />

            <View>
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

            {/* ***********************************OR********************************************* */}

            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                position: 'relative',
                marginTop: 50,
                backgroundColor: 'white',
                padding: 20,
              }}>
              <Image source={Gold} style={{height: 70, width: 70}} />
              <View>
                <Text
                  style={{
                    fontFamily: 'Intrepid Regular',
                    color: 'black',
                    fontSize: 20,
                  }}>
                  Gold
                </Text>
                <Text
                  style={{
                    color: '#676766',
                    marginVertical: 2,
                    fontFamily: 'Intrepid Regular',
                  }}>
                  Earn 401 points more to reach Platinum
                </Text>
                <View style={{marginVertical: 5}}>
                  <ProgressBar
                    progress={0.4}
                    borderWidth={0}
                    fillColor="#684934"
                    unfilledColor="#E2E2E2"
                    height={8}
                    width={290}
                    borderColor="#E2E2E2"
                    duration={100}
                  />
                </View>
              </View>
              <Text
                style={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: '#684934',
                }}>
                3499 Points
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Points;

const styles = StyleSheet.create({
  conatiner: {
    marginTop: hp('28%'),
    margin: 10,
  },
  cust_text: {
    color: '#797978',
    fontFamily: 'Intrepid Regular',
    textAlign: 'center',
    fontSize: 17,
  },
  cust_continer: {
    backgroundColor: 'white',
    padding: 16,
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
