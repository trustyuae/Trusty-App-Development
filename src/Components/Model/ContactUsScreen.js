import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalColors } from '../../Assets/Theme/globalColors';
import { Image } from 'react-native';
import { emailIconBlack, whatsappIcon } from '../../Constants/Icons';

const ContactUsScreen = ({ onClose, visible }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleModal = () => {
        setModalVisible(true);  // Show the modal
    };

    const closeModal = () => {
        setModalVisible(false);  // Hide the modal
    };

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}  // Android back button handling
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeIcon}>
                            <TouchableOpacity onPress={onClose}>
                                <Icon name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.modalText, {
                            marginBottom: wp('8%'), fontSize: 18,
                        }]}>We are here to help you!</Text>
                        <Text style={styles.modalText}>Monday to Friday from 8 AM to 9 PM</Text>
                        <Text style={styles.modalText}>Saturday & Sunday are OFF</Text>
                        <View style={{ justifyContent: 'center', alignContent: 'center' }}>
                            <View style={[styles.icons, { marginVertical: wp('4%') }]}>
                                <Image style={{ width: 30, height: 30, marginRight: wp('3%') }} source={whatsappIcon}></Image>
                                <View>
                                    <Text style={styles.modalInfoText}>Chat with us on WhatsApp </Text>
                                    <Text style={styles.modalInfoText}>+971 50 623 3092</Text>
                                </View>
                            </View>
                            <View style={styles.icons}>
                                <Image style={{ width: 25, height: 25, marginRight: wp('3%') }} source={emailIconBlack}></Image>

                                <View>
                                    <Text style={styles.modalInfoText}>Get in touch by email</Text>
                                    <Text style={styles.modalInfoText}>example@outlook.com</Text>
                                </View>
                            </View>
                        </View>


                        {/* Close Button */}
                        {/* <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </Modal >
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        // alignItems: 'flex-end',
        // backgroundColor: 'rgba(0,0,0,0.1)', // For the transparent background
    },
    modalView: {
        margin: wp('2%'),
        backgroundColor: 'white',
        borderRadius: 30,
        padding: wp('5%'),
        height: hp('40%'),
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        fontSize: 18,
        textAlign: 'left',
        fontWeight: 'bold',
        fontFamily: 'Intrepid Bold',

    },
    closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginTop: 20,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalInfoText: {
        color: globalColors.black,
        fontSize: 14,
        fontFamily: 'Intrepid Bold',
        fontWeight: 'bold',

    },
    closeIcon: {
        alignItems: 'flex-end',
        fontFamily: 'Intrepid Regular',

    },
    icons: {

        flexDirection: 'row'
    }

});

export default ContactUsScreen;