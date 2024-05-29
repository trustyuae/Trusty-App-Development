import {
  Image,
  Text,
  View,
  Pressable,
} from 'react-native';
import {CartImg, EditICon, Groupicon, PlusIcon} from '../../Constants/Icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import Button from '../Button';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {List} from 'react-native-paper';
import {useState} from 'react';
import ModalComponent from '../Model/Modalcomopnet';

const Checkout = ({count, setCount}) => {
  const [expanded, setExpanded] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleConfirmpay = () => {
    setCount(pre => (count >= 2 ? 0 : pre + 1));
  };

  const handleEditClick = () => {
    setIsModalVisible(true); 
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.custText}>DELIVERY</Text>

        <View style={styles.custborder} />

        <View style={{marginVertical: 10}}>
          <Text style={styles.custText}>SHIPPING ADDRESS</Text>
        </View>

        <View style={styles.custborder} />

        <View
          style={{
            marginTop: 10,
          }}>
          <View
             style={{flexDirection:"row",justifyContent:"space-between"}} >
            <View>
              <Image source={Groupicon} />
            </View>
              
              <View >
              <Pressable
               onPress={() => console.log('hiii')}>
               <Image source={EditICon} />
             </Pressable>
              </View>
           
          </View>

          <View style={{marginLeft: 30, marginTop: -20, marginVertical: 10}}>
            <Text style={{color: 'black', fontFamily: 'Intrepid Regular'}}>
              Mr. Safwan Aipuram Ap
            </Text>
            <Text style={{fontFamily: 'Intrepid Regular', marginVertical: 2}}>
              31,Madinath dubai,DH
            </Text>
            <Text style={{fontFamily: 'Intrepid Regular'}}>+971581563589</Text>
          </View>
        </View>
        <View style={styles.custborder} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <Image source={PlusIcon} style={{marginHorizontal: 10}}></Image>
          <Text
            onPress={handleEditClick}
            style={{
              textDecorationLine: 'underline',
              color: 'black',
              fontFamily: 'Intrepid Regular',
            }}>
            Add an address
          </Text>
        </View>
        <View style={styles.custborder} />
        <View
          style={{
            marginTop: 10,
          }}>
          <Text style={styles.custText}>SHIPPING METHOD</Text>
        </View>

        <View style={styles.custborder} />

        <View
          style={{
            marginVertical: 5,
          }}>
          <Text
            style={{
              fontFamily: 'Intrepid Regular',
              color: 'black',
              marginVertical: 5,
            }}>
            Delivery fees Cash On Arrivals 30 AED
          </Text>
        </View>
        <View style={styles.custborder} />

        <List.Section>
          <List.Accordion
            title="MY ORDERS"
            titleStyle={{color: '#444444'}}
            expanded={expanded}
            style={{
              backgroundColor: '#f6f1eb',
              paddingTop: -5,
              borderBottomWidth: expanded ? 1 : 0,
              borderBottomColor: '#D8CCC1',
              fontFamily: 'Intrepid Regular',
            }}
            onPress={() => setExpanded(!expanded)}>
            <View
              style={{
                marginVertical: 15,
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'space-evenly',
              }}>
              <View>
                <Image source={CartImg} height={5} />
              </View>
              <View>
                <Text style={{color: 'black', fontFamily: 'Intrepid Regular'}}>
                  Dummy Product 3 CHANEL
                </Text>
                <Text
                  style={{
                    marginVertical: 2,
                    color: '#676766',
                    fontFamily: 'Intrepid Regular',
                  }}>
                  200,00 AED
                </Text>
                <Text
                  style={{
                    marginVertical: 3,
                    color: 'black',
                    fontFamily: 'Intrepid Regular',
                  }}>
                  Color : <Text style={{color: '#676766'}}>red</Text>{' '}
                </Text>
                <Text style={{color: 'black', fontFamily: 'Intrepid Regular'}}>
                  Size
                </Text>
              </View>
              <View>
                <Icon
                  name={'close'}
                  size={30}
                  color="black"
                  style={{marginLeft: 70}}></Icon>
                <View
                  style={{
                    backgroundColor: '#ffffff',
                    paddingVertical: 4,

                    marginTop: 50,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    {/* <View><Pressable onPress={setNumber(pre=>pre<=0 ?0:pre-1)}><Image source={minus}/></Pressable></View>
                <View><Text>{number}</Text></View>
                <View><Pressable onPress={setNumber(pre=>pre+1)}><Image source={Plus}/></Pressable></View> */}

                    <View>
                      <Text
                        style={{fontSize: 20, color: '#444444', marginLeft: 3}}>
                        -
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 20,
                          color: '#444444',
                          fontFamily: 'Intrepid Regular',
                          marginHorizontal: 32,
                        }}>
                        1
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{fontSize: 20, color: '#444444', marginLeft: 7}}>
                        +
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </List.Accordion>
        </List.Section>

        <View style={styles.custborder} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <Text style={styles.custText}>SUBTOTAL</Text>
          <Text>200 AED</Text>
        </View>

        <View style={styles.custborder} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <Text style={styles.custText}>SHIPPING</Text>
          <Text>30 AED</Text>
        </View>

        <View style={styles.custborder} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <Text style={styles.custText}>TAXES</Text>
          <Text>10 AED</Text>
        </View>

        <View style={styles.custborder} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <Text style={styles.custText}>TOTAL</Text>
          <Text>10 AED</Text>
        </View>

        <Button
          stylesofbtn={styles.custcheckoutbtn}
          styleoffont={styles.custfontstyle}
          name={'Confirm And Pay'}
          handlepress={handleConfirmpay}
        />
      </View>
      <ModalComponent visible={isModalVisible} onClose={closeModal} />
    </View>
  );
};

export default Checkout;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp('3%'),
    marginTop: hp('2%'),
  },
  custText: {
    color: 'black',
    fontWeight: '600',
    marginVertical: 5,
    fontFamily: 'Intrepid Regular',
  },
  custborder: {
    borderWidth: 0.8,
    marginTop: hp('1%'),
    borderColor: '#DBCCC1',
  },
  custInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#cccccc',
    paddingHorizontal: 20,
    borderRadius: 5,
    paddingVertical: 8,
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
  custmargin: {
    marginBottom: 10,
  },
  custcheckoutbtn: {
    backgroundColor: '#000000',
    padding: 7,
    marginVertical: 20,
    borderRadius: 5,
  },
});
