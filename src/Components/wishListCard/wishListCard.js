import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { globalColors } from '../../Assets/Theme/globalColors';
import { Images } from '../../Constants';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const WishListCard = ({ navigation }) => {
    return (<View>
        {/* {cartData?.map(Item => ( */}
        <View
            style={{
                borderBottomWidth: 1,
                // marginRight: 10,
                // marginLeft: 10,
                // paddingRight: 20,
                borderBottomColor: globalColors.inputBorder,
                // marginBottom: 10,
                marginTop: 20,
            }}
        />
        <View
            style={{
                marginVertical: 15,
                flexDirection: 'row',
                gap: 10,
                position: 'relative',
            }}>
            <Icon
                name={'close'}
                size={20}
                color="black"
                style={{
                    position: 'absolute',
                    right: 0,
                }}
            // onPress={() => handleRemove(Item.product_id)}

            ></Icon>

            <View
                style={{
                    backgroundColor: '#ffffff',
                    paddingVertical: 2,
                    position: 'absolute',
                    bottom: -8,
                    right: 0,
                }}>

            </View>

            <View>
                {/* {( */}
                <Image
                    // source={{ uri: Item?.product_image }}
                    source={Images.watches}
                // height={90}
                // width={50}
                />
                {/* )  */}
                {/* // : ( */}
                {/* // <View */}
                {/* //     style={{ */}
                {/* //         height: 100,
            //         width: 90,
            //         backgroundColor: '#f4f4f4',
            //     }}></View>
            // )} */}
            </View>
            <View >
                <Text
                    style={{
                        color: 'black', fontFamily: 'Intrepid Regular', fontSize: 18, marginVertical: 4,
                    }}>
                    {/* {Item.product_name} */}
                    Dummy
                </Text>
                <View style={{ flexDirection: 'row', fontSize: 16 }}><Text>Price  : {' '}</Text>
                    <Text
                        style={{
                            marginVertical: 4,
                            color: '#676766',
                            fontFamily: 'Intrepid Regular',
                        }}>
                        {/* {Item.product_price}  */}
                        10 AED
                    </Text>
                </View>
                <Text
                    style={{
                        marginVertical: 4,
                        color: 'black',
                        fontFamily: 'Intrepid Regular',
                        fontSize: 16
                    }}>
                    Color :{' '}
                    <Text style={{ color: '#676766' }}>
                        {/* {Item?.variation_attr?.attribute_pa_color} */}
                        red
                    </Text>{' '}
                </Text>
                <Text
                    style={{
                        color: 'black', fontFamily: 'Intrepid Regular', marginVertical: 4, fontSize: 16
                    }}>
                    Size : <Text style={{ color: '#676766' }}>
                        L
                        {/* {Item?.variation_attr?.attribute_pa_size} */}
                    </Text>{' '}
                </Text>
            </View>
            <View></View>
        </View>
        <View
            style={{
                borderBottomWidth: 1,
                // marginRight: 10,
                // marginLeft: 10,
                // paddingRight: 20,
                borderBottomColor: globalColors.inputBorder,
                // marginBottom: 10,
                // marginTop: 10,
            }}
        />
        {/* ))} */}
    </View>)

}

const style = StyleSheet.create({

})

export default WishListCard;
