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
import {getUserId} from '../../Utils/localstorage';
import {fetchProfile, updateProfile} from '../../Redux/Slice/profileSlice';

const ModalComponent = ({visible, onClose, stateUpdate, setStateUpdate}) => {
  const dispatch = useDispatch();

  const {data, loading, error} = useSelector(state => state.profile);
  const [name, setName] = useState(data?.billing?.first_name);
  const [lastname, setlastname] = useState(data?.billing?.last_name);
  const [email, setEmail] = useState(data?.billing?.email);
  const [phone, setPhone] = useState(data?.billing?.phone);
  const [address, setAddress] = useState(data?.billing?.address_1);
  const [shippingAddress, setShippingAddress] = useState(
    data?.shipping?.address_1,
  );
  const [postcode, setPostcode] = useState(data?.billing?.postcode);
  const [shippingCity, setShippingCity] = useState(data?.billing?.city);
  const [shippingCountry, setShippingCountry] = useState(
    data?.shipping?.country,
  );

  const handleUpdate = async () => {
    // let billingData = {
    //   address_1: address,
    //   city: shippingCity,
    //   country: shippingCountry,
    // };

    // const updatedData = {
    //   first_name: name,
    //   email,

    //   shipping: {
    //     address_1: shippingAddress,
    //     city: shippingCity,
    //     country: shippingCountry,
    //   },
    //   meta_data: [
    //     ...data.meta_data.slice(0, 2), // Keep the first two items unchanged
    //     {...data.meta_data[2], value: phone}, // Update the phone number
    //     ...data.meta_data.slice(3), // Keep the remaining items unchanged
    //   ],
    // };

    const updatedData = {
      ...data,
      billing: {
        first_name: name,
        last_name: lastname,
        address_1: address,
        city: shippingCity,
        postcode: postcode,
        country: shippingCountry,
        phone: phone,
      },
    };

    const customer_id = await getUserId();
    try {
      dispatch(updateProfile({customer_id, newData: updatedData}));
      // setName('');
      // setlastname('');
      // setPhone('');
      // setAddress('');
      // setPostcode('');
      // setShippingCity('');
      // setShippingCountry('');
      // setPhone('');

      onClose();
      setStateUpdate(!stateUpdate);
    } catch (error) {
      console.log(error);
    }
  };

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
  }, []);
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
            <Text>Last Name</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={lastname}
              onChangeText={text => setlastname(text)}></TextInput>
          </View>

          {/* <View style={{marginVertical: 5}}>
            <Text>Email</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={email}
              onChangeText={text => setEmail(text)}></TextInput>
          </View> */}
          <View style={{marginVertical: 5}}>
            <Text>Address</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={address}
              onChangeText={text => setAddress(text)}></TextInput>
          </View>

          <View style={{marginVertical: 5}}>
            <Text>Post Code</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={postcode}
              onChangeText={text => setPostcode(text)}></TextInput>
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
          handlepress={handleUpdate}
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
