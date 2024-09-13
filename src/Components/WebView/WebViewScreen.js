import React from 'react';
import { WebView } from 'react-native-webview';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalColors } from '../../Assets/Theme/globalColors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const WebViewScreen = ({ route }) => {
    const { url } = route.params;
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Icon
                    name="close"
                    size={25}
                    color={globalColors.black}
                    style={{ position: 'relative', top: hp('6%'), left: 10 }}
                    onPress={() => navigation.goBack()}
                />
            </View>

            <WebView source={{ uri: url }} style={styles.webview} />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    }, header: {
        position: 'absolute',
        // top: hp('1%'),
        // left: 10,
        right: wp('7%'),
        zIndex: 1,
        backgroundColor: 'transparent',
        padding: wp('1%'),
    },
});

export default WebViewScreen;
