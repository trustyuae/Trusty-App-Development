import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { globalColors } from '../Assets/Theme/globalColors';
import CustomStatusBar from '../Components/StatusBar/CustomSatusBar';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StepperComponentTracking from '../Components/Stepper/StepperComponentTracking';
import Button from '../Components/Button';

const OrderTrackingScreen = ({ navigation }) => {
    const route = useRoute();
    // const orderId = route.params.orderId;

    const [orderDetails, setOrderDetails] = useState(null);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                // Simulate API call
                setTimeout(() => {
                    setOrderDetails(mockOrderDetails);
                    setStatus('succeeded');
                }, 1000);
            } catch (err) {
                setError('Failed to fetch order details');
                setStatus('failed');
            }
        };

        fetchOrderDetails();
    }, []);

    const renderOrderStatus = () => {
        if (status === 'loading') {
            return <ActivityIndicator size="large" color={globalColors.black} />;
        } else if (status === 'failed') {
            return <Text style={styles.errorText}>Error: {error}</Text>;
        } else if (orderDetails) {
            return (
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.statusContainer}>
                        <StepperComponentTracking statusTimeline={orderDetails.statusTimeline} />
                    </View>
                </ScrollView>
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <CustomStatusBar color={globalColors.headingBackground} />
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Text style={styles.heading}>Order Tracking</Text>
                <View style={styles.orderDetails}>
                    <Text style={styles.orderText}>Order ID: {orderDetails?.orderId}</Text>
                    <Text style={styles.orderText}>Order Date: {orderDetails?.orderDate}</Text>
                    <Text style={styles.orderText}>Total Amount: ${orderDetails?.totalAmount}</Text>
                </View>
                <View style={styles.divider} />
                <Text style={styles.subHeading}>Tracking Status</Text>
                {renderOrderStatus()}
                <View style={styles.divider} />
                <Button
                    stylesofbtn={styles.custbtn}
                    styleoffont={styles.custfontstyle}
                    name={'Back'}
                    handlepress={() => navigation.goBack()}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: globalColors.headingBackground,
        marginTop: hp('10%'),
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 60,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: globalColors.black,
        fontFamily: 'Intrepid Regular',
        marginBottom: 20,
    },
    orderDetails: {
        marginBottom: 20,
    },
    orderText: {
        fontSize: 16,
        fontFamily: 'Intrepid Regular',
        color: globalColors.black,
        marginBottom: 5,
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginVertical: 20,
    },
    subHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Intrepid Regular',
        color: globalColors.black,
        marginBottom: 10,
    },
    statusContainer: {
        marginBottom: hp('5%'),
        alignSelf: 'center'
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
    },
    custfontstyle: {
        color: 'white',
        fontFamily: 'Intrepid Regular',
        textAlign: 'center',
    },
    custbtn: {
        backgroundColor: '#444444',
        padding: 7,
        marginHorizontal: 90,
        marginVertical: 20,
        borderRadius: 5,
    },
});

const mockOrderDetails = {
    orderId: '12345',
    orderDate: '2023-06-15',
    totalAmount: 100.00,
    statusTimeline: [
        {
            title: 'Order Placed',
            time: '2023-06-15 10:00',
            completed: true,
        },
        {
            title: 'Order Confirmed',
            time: '2023-06-15 12:00',
            completed: true,
        },
        {
            title: 'Order Shipped',
            time: '2023-06-16 09:00',
            completed: true,
        },
        {
            title: 'Out for Delivery',
            time: '2023-06-17 08:00',
            completed: false,
        },
        {
            title: 'Delivered',
            time: '',
            completed: false,
        },
    ],
};

export default OrderTrackingScreen;
