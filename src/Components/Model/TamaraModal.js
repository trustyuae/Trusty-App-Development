import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { globalColors } from '../../Assets/Theme/globalColors';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { tabby } from '../../Constants/Icons';

const TamaraModal = ({ onClose, visible, priceToTabby }) => {

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* Button to open the modal */}
                {/* <TouchableOpacity style={styles.openModalButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.openModalButtonText}>Open Payment Options</Text>
            </TouchableOpacity> */}

                {/* Modal that contains the entire content */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={visible}
                    onRequestClose={onClose} // Close modal when pressing back or outside
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <ScrollView contentContainerStyle={styles.modalScrollContent}>
                                {/* Header Section */}
                                <View style={styles.header}>
                                    <Text style={styles.headerTitle}>Enjoy flexible payments with Tamara</Text>
                                    <Text style={styles.headerSubtitle}>
                                        Split your payments or Pay in Full for your AED 45 order!
                                    </Text>
                                </View>

                                {/* Split in 4 Payments Section */}
                                <View style={styles.paymentOption}>
                                    <TouchableOpacity style={styles.splitBadge}>
                                        <Text style={styles.splitBadgeText}>Split in 4</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.splitTitle}>Split in up to 4 payments</Text>
                                    <Text style={styles.splitSubTitle}>Sharia compliant</Text>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <Text style={styles.actionButtonText}>Split payments</Text>
                                    </TouchableOpacity>
                                    <Image
                                        source={{ uri: 'https://your-image-url.com' }} // Replace with actual image URL or local asset
                                        style={styles.splitImage}
                                    />
                                </View>

                                {/* Full Payment Section */}
                                <View style={styles.paymentOption}>
                                    <TouchableOpacity style={styles.secureBadge}>
                                        <Text style={styles.secureBadgeText}>Secure payments</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.splitTitle}>Make your full payment in one go</Text>
                                    <Text style={styles.splitSubTitle}>Seamless & hassle-free</Text>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <Text style={styles.actionButtonText}>Pay in Full</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>

                            {/* Button to close the modal */}
                            {/* <TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
                                <Text style={styles.modalCloseText}>Close</Text>
                            </TouchableOpacity> */}
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
    },
    openModalButton: {
        backgroundColor: '#6200EA',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    openModalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalContent: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        // borderRadius: 15,
        // padding: widthPercentageToDP('7%'),// Adjust according to screen size
    },
    modalScrollContent: {
        paddingBottom: 20,
    },
    header: {
        backgroundColor: '#E8E2FF',

        padding: widthPercentageToDP('5%'),

        marginTop: heightPercentageToDP('6%'),
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 30,
        fontWeight: '700',
        fontFamily: 'Product Sans',
        textAlign: 'center',
        color: '#000',
        marginBottom: 10,
    },
    headerSubtitle: {
        fontSize: 14,
        textAlign: 'center',
        color: '#555',
    },
    paymentOption: {
        backgroundColor: globalColors.white,
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        // shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 5,
    },
    splitBadge: {
        backgroundColor: '#F6E599',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
    splitBadgeText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 12,
    },
    splitTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },
    splitSubTitle: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
    },
    actionButton: {
        backgroundColor: '#000',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 20,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    splitImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    secureBadge: {
        backgroundColor: '#DCEAF8',
        padding: 10,
        borderRadius: 20,
        marginBottom: 10,
    },
    secureBadgeText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 12,
    },

    // Modal Close Button
    modalCloseButton: {
        backgroundColor: '#6200EA',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginTop: 20,
        alignSelf: 'center',
    },
    modalCloseText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TamaraModal;
