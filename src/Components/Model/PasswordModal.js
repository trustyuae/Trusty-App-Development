import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';
import {getToken} from '../../Utils/localstorage';
import axios from 'axios';
import {globalColors} from '../../Assets/Theme/globalColors';

const PasswordModal = ({modalVisible, setModalVisible}) => {
  const [newPassword, setNewPassword] = useState('');
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      setTokenData(token);
    };
    fetchData();
  }, []);

  const handleChangePassword = async () => {
    try {
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
      console.log('Password changed successfully:', response.data);
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
              <TextInput
                placeholder="Enter new password"
                onChangeText={text => setNewPassword(text)}
                value={newPassword}
                secureTextEntry={true}
                style={{
                  marginBottom: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: 'black',
                }}
              />
              <Button
                title="Submit"
                color={globalColors.buttonBackground}
                onPress={handleChangePassword}
              />
              {/* <Button
                title="Close"
                onPress={() => setModalVisible(false)}
                color={globalColors.buttonBackground}
              /> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PasswordModal;
