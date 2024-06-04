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

  const [name, setName] = useState(data?.billing?.first_name || '');
  const [lastname, setLastname] = useState(data?.billing?.last_name || '');
  const [email, setEmail] = useState(data?.billing?.email || '');
  const [phone, setPhone] = useState(data?.billing?.phone || '');
  const [address, setAddress] = useState(data?.billing?.address_1 || '');
  const [shippingAddress, setShippingAddress] = useState(
    data?.shipping?.address_1 || '',
  );
  const [postcode, setPostcode] = useState(data?.billing?.postcode || '');
  const [shippingCity, setShippingCity] = useState(data?.billing?.city || '');
  const [shippingCountry, setShippingCountry] = useState(
    data?.shipping?.country || '',
  );

  const [errors, setErrors] = useState({});

  const handleUpdate = async () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!lastname.trim()) {
      newErrors.lastname = 'Last Name is required.';
    }

    if (!email.trim() || !validateEmail(email)) {
      newErrors.email = 'A valid email is required.';
    }

    if (!phone.trim() || !validatePhone(phone)) {
      newErrors.phone = 'A valid phone number is required.';
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required.';
    }

    if (!postcode.trim()) {
      newErrors.postcode = 'Post Code is required.';
    }

    if (!shippingCity.trim()) {
      newErrors.shippingCity = 'City is required.';
    }

    if (!shippingCountry.trim()) {
      newErrors.shippingCountry = 'Country is required.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const customer_id = await getUserId();
      const updatedData = {
        user_id: customer_id,
        first_name: data?.first_name,
        last_name: data?.last_name,
        title: 'Mr',
        phone: data?.billing?.phone,
        billing: {
          first_name: name,
          last_name: lastname,
          address_1: address,
          city: shippingCity,
          postcode: postcode,
          country: shippingCountry,
          phone: phone,
          email: email,
        },
        shipping: {
          first_name: data?.shipping?.first_name,
          last_name: data?.shipping?.last_name,
          address_1: data?.shipping?.address_1,
          city: data?.shipping?.city,
          state: data?.shipping?.state,
          postcode: data?.shipping?.postcode,
        },
      };

      try {
        dispatch(updateProfile(updatedData));
        onClose();
        setStateUpdate(!stateUpdate);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = phone => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
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
          backgroundColor: '#ffffff',
        }}>
        <View style={{marginTop: 50}}>
          <View style={{marginVertical: 5}}>
            <Text>Name</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={name}
              onChangeText={text => setName(text)}></TextInput>
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          <View style={{marginVertical: 5}}>
            <Text>Last Name</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={lastname}
              onChangeText={text => setLastname(text)}></TextInput>
            {errors.lastname && (
              <Text style={styles.errorText}>{errors.lastname}</Text>
            )}
          </View>

          <View style={{marginVertical: 5}}>
            <Text>Email</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={email}
              onChangeText={text => setEmail(text)}></TextInput>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>

          <View style={{marginVertical: 5}}>
            <Text>Address</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={address}
              onChangeText={text => setAddress(text)}></TextInput>
            {errors.address && (
              <Text style={styles.errorText}>{errors.address}</Text>
            )}
          </View>

          <View style={{marginVertical: 5}}>
            <Text>Post Code</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={postcode}
              onChangeText={text => setPostcode(text)}></TextInput>
            {errors.postcode && (
              <Text style={styles.errorText}>{errors.postcode}</Text>
            )}
          </View>

          <View style={{marginVertical: 5}}>
            <Text>Country</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={shippingCountry}
              onChangeText={text => setShippingCountry(text)}></TextInput>
            {errors.shippingCountry && (
              <Text style={styles.errorText}>{errors.shippingCountry}</Text>
            )}
          </View>

          <View style={{marginVertical: 5}}>
            <Text>City</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={shippingCity}
              onChangeText={text => setShippingCity(text)}></TextInput>
            {errors.shippingCity && (
              <Text style={styles.errorText}>{errors.shippingCity}</Text>
            )}
          </View>

          <View style={{marginVertical: 5}}>
            <Text>Phone</Text>
            <TextInput
              style={{borderWidth: 1, width: 200, padding: -2, paddingLeft: 10}}
              value={phone}
              onChangeText={text => setPhone(text)}></TextInput>
            {errors.phone && (
              <Text style={styles.errorText}>{errors.phone}</Text>
            )}
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
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default ModalComponent;
