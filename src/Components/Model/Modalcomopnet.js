// ModalComponent.js
import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {globalColors} from '../../Assets/Theme/globalColors';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../Button';
const ModalComponent = ({visible, onClose}) => {
  const dispatch = useDispatch();

  const {data, loading, error} = useSelector(state => state.profile);
  const [name, setName] = useState(data?.first_name);
  const [email, setEmail] = useState(data?.email);
  const [phone, setPhone] = useState(data?.billing?.phone);
  const [address, setAddress] = useState(data?.shipping?.address_1);
  const [shippingAddress, setShippingAddress] = useState(
    data?.shipping?.address_1,
  );
  const [shippingCity, setShippingCity] = useState(data?.shipping?.city);
  const [shippingCountry, setShippingCountry] = useState(
    data?.shipping?.country,
  );

  console.log('phone----------->', data.phone);

  const handleConfirmpay = () => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customer_id = await getUserId();
        if (customer_id) {
          dispatch(fetchProfile(customer_id));
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
    fetchData();
  }, [dispatch]);
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Text>Edit Address</Text>
        {/* Add your editing functionality here */}
        <View style={{marginTop: 50}}>
          <View style={{marginVertical: 5}}>
            <Text>Name</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={name}
              onChangeText={text => setName(text)}></TextInput>
          </View>

          <View style={{marginVertical: 5}}>
            <Text>Email</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={email}
              onChangeText={text => setEmail(text)}></TextInput>
          </View>
          <View style={{marginVertical: 5}}>
            <Text>Address</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={address}
              onChangeText={text => setEmail(text)}></TextInput>
          </View>

          <View style={{marginVertical: 5}}>
            <Text>Country</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={shippingCountry}
              onChangeText={text => setShippingCountry(text)}></TextInput>
          </View>

          <View style={{marginVertical: 5}}>
            <Text>shippingCity</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={shippingCity}
              onChangeText={text => setShippingCity(text)}></TextInput>
          </View>

          <View style={{marginVertical: 5}}>
            <Text>Phone</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={phone}
              onChangeText={text => setPhone(text)}></TextInput>
          </View>
        </View>

        <Button
          stylesofbtn={styles.custcheckoutbtn}
          styleoffont={styles.custfontstyle}
          name={'update'}
          handlepress={handleConfirmpay}
        />
        <TouchableOpacity onPress={onClose}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  custcheckoutbtn: {
    backgroundColor: '#000000',
    padding: 7,
    marginVertical: 20,
    borderRadius: 5,
  },
  custfontstyle: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ModalComponent;
