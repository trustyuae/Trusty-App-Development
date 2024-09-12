import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { globalColors } from '../../Assets/Theme/globalColors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { tabby } from '../../Constants/Icons';

const TabbyModal = ({ onClose, visible, priceToTabby }) => {

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    onRequestClose={onClose}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            {/* Close button */}
                            <View style={{
                                justifyContent: 'space-between',
                                marginTop: heightPercentageToDP('2%'),
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>
                                <View style={{}}>
                                    <Image style={{ width: 100, height: 70, marginLeft: widthPercentageToDP('-4%') }} source={tabby}></Image>

                                </View>
                                <View>
                                    <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={onClose}
                                    >
                                        <Icon name="close" size={24} color="#000" />
                                    </TouchableOpacity>
                                </View>

                            </View>

                            {/* Modal body content */}
                            <Text style={styles.title}>Pay in 4 interest-free payments</Text>
                            <Text style={styles.subTitle}>Shariah-compliant. No fees.</Text>

                            {/* Payment breakdown */}
                            <View style={styles.paymentPlan}>
                                {[...Array(4)].map((_, i) => (
                                    <View key={i} style={styles.paymentBlock}>
                                        <Image
                                            source={{ uri: 'https://via.placeholder.com/50' }} // Placeholder image
                                            style={styles.circle}
                                        />
                                        <Text style={styles.paymentAmount}>{priceToTabby} AED</Text>
                                        <Text></Text>
                                        <Text style={styles.paymentTime}>
                                            {i === 0 ? 'Today' : `${i} month${i > 1 ? 's' : ''}`}
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            {/* Steps */}
                            <Text style={{
                                fontSize: 18,
                                fontWeight: '600',
                                marginTop: widthPercentageToDP('1%'),
                                marginBottom: widthPercentageToDP('3%')
                            }}>How It Works:</Text>
                            <View style={styles.stepsContainer}>
                                {['Choose Tabby at checkout', 'Enter your information and add your debit or credit card.', 'Your first payment is taken when the order is made.', 'We’ll send you a reminder when your next payment is due.'].map((step, index) => (
                                    <View key={index} style={styles.step}>
                                        <Text style={styles.stepNumber}>{index + 1}</Text>
                                        <Text style={styles.stepText}>{step}</Text>
                                    </View>
                                ))}
                            </View>

                            {/* Shop safely info */}
                            <View style={styles.safeShop}>
                                <View>
                                    <Icon name="shield-check" type="material-community" color="#6200EA" size={24} />

                                </View>
                                <View>
                                    <Text style={styles.safeShopText}>Shop safely with Tabby</Text>
                                    <Text style={styles.safeShopSubText}>Buyer protection is included with every purchase</Text>
                                </View>

                            </View>

                            {/* Continue shopping button */}
                            <TouchableOpacity
                                style={styles.continueButton}
                                onPress={onClose}
                            >
                                <Text style={styles.continueButtonText}>Continue shopping</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        padding: widthPercentageToDP('5%'),
        // marginTop: widthPercentageToDP('3%')

    },
    button: {
        backgroundColor: '#6200EA',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: widthPercentageToDP('7%'),
    },
    closeButton: {
        alignSelf: 'flex-end',
        // marginTop: widthPercentageToDP('5%')
    },
    title: {
        fontSize: 30,
        fontFamily: 'Product Sans',        // fontWeight: 'bold',
        fontWeight: '700',
        color: '#6200EA',
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 16,
        color: '#666',
        // marginBottom: 20,
    },
    paymentPlan: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: heightPercentageToDP('4%'),
        marginTop: heightPercentageToDP('4%'),

    },
    paymentBlock: {
        alignItems: 'center',
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ddd',
        marginBottom: 10,
    },
    paymentAmount: {
        fontSize: 12,
        fontWeight: '700',
    },
    paymentTime: {
        fontSize: 14,
        color: '#666',
    },
    stepsContainer: {
        marginBottom: 20,
        // flexWrap: 'wrap',
        paddingRight: 20,


    },
    step: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    stepNumber: {
        backgroundColor: '#F2F5F7',
        // color: globalColors.black,
        borderRadius: 50,
        borderColor: '#F2F5F7',
        width: 30,
        height: 30,
        textAlign: 'center',
        justifyContent: 'center',
        lineHeight: 30,
        fontWeight: 'bold',
        marginRight: 10,
    },
    stepText: {
        fontSize: 14,
        // textAlign: 'auto',
        flexWrap: 'wrap',
        color: globalColors.textColorLogin,
    },
    safeShop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: heightPercentageToDP('4%'),
        padding: widthPercentageToDP('6%'),
        borderRadius: 15,
        backgroundColor: '#F2F2F8'
    },
    safeShopText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    safeShopSubText: {
        fontSize: 15,
        color: '#666',
        marginLeft: 10,
    },
    continueButton: {
        backgroundColor: globalColors.black,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        fontFamily: 'Product Sans',
    },
});

export default TabbyModal;
