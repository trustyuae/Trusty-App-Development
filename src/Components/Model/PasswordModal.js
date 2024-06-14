import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { getToken } from '../../Utils/localstorage';
import axios from 'axios';
import { globalColors } from '../../Assets/Theme/globalColors';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from 'react-native';

const PasswordModal = ({ modalVisible, setModalVisible }) => {
  const [newPassword, setNewPassword] = useState('');
  const [tokenData, setTokenData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      setTokenData(token);
    };
    fetchData();
  }, []);

  const handleChangePassword = async () => {
    try {

      if (newPassword.trim().length === 0) {
        setError('Password is required.');
        return;
      } else if (newPassword.trim().length < 4) {
        setError('Password must be at least 4 characters long.');
        return;
      }
      const response = await axios.post(
        'https://wordpress.trustysystem.com/wp-json/custom-woo-api/v1/change-password',
        {
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
          },
        },
      );
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Password changed successfully!',
        position: 'bottom',
        visibilityTime: 3000,
        autoHide: true,
      });
      // You might want to show a success message or navigate the user to another screen
      setModalVisible(false); // Close the modal after successful password change
    } catch (error) {
      console.error('Error changing password:', error);
      // Handle errors if needed
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                width: '80%',
              }}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputfield}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChangeText={text => setNewPassword(text)}
                  secureTextEntry={!showPassword}
                />
                <Icon
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  style={styles.icon}
                  onPress={() => setShowPassword(prevShow => !prevShow)}
                />
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <Button
                title="Submit"
                color={globalColors.buttonBackground}
                onPress={handleChangePassword}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  inputfield: {
    flex: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  icon: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginLeft: 10,
  },
});
export default PasswordModal;
