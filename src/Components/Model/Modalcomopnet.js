import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { globalColors } from '../../Assets/Theme/globalColors';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button';
import { getUserId } from '../../Utils/localstorage';
import { fetchProfile, updateProfile } from '../../Redux/Slice/profileSlice';
// import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { updatechekout } from '../../Redux/Slice/car_slice/updatecheckout';
import { ScrollView } from 'react-native';
import MobileNo from '../MobileNo';
import SelectDropdown from 'react-native-select-dropdown';

const ModalComponent = ({
  visible,
  onClose,
  stateUpdate,
  setStateUpdate,
  data,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(data?.first_name || '');
  const [lastname, setLastname] = useState(data?.last_name || '');
  const [shippingAddress, setShippingAddress] = useState(
    data?.shipping?.address_1 || '',
  );
  const [shippingCity, setShippingCity] = useState(data?.shipping?.city || '');
  const [shippingCountry, setShippingCountry] = useState(
    data?.shipping?.country || '',
  );
  // const [phone, setPhone] = useState(data?.meta_data[2]?.value || '');
  const [title, setTitle] = useState(data?.meta_data[1]?.value || ''); // State variable to hold the selected title
  const [countries, setCountries] = useState([]);

  const [formData, setFormData] = useState({
    phone: data?.meta_data[2]?.value,
    selected: '+91',
  });


  const [errors, setErrors] = useState({
    name: '',
    lastname: '',
    shippingAddress: '',
    shippingCountry: '',
    shippingCity: '',
    phone: '',
  });

  const [selected, setSelectedCountry] = useState('');


  const handleTitleSelect = selectedItem => {
    setTitle(selectedItem.title);
  };

  const handleUpdate = async () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }

    if (!lastname.trim()) {
      newErrors.lastname = 'Last Name is required.';
    }

    if (!formData.phone.trim() || !validatePhone(formData.phone)) {
      newErrors.phone = 'A valid phone number is required.';
    }

    if (!shippingAddress.trim()) {
      newErrors.shippingAddress = 'Address is required.';
    }

    if (!shippingCity.trim()) {
      newErrors.shippingCity = 'City is required.';
    }

    if (!shippingCountry.trim()) {
      newErrors.shippingCountry = 'Country is required.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const updatedData = {
        first_name: name,
        last_name: lastname,

        shipping: {
          address_1: shippingAddress,
          city: shippingCity,
          country: shippingCountry,
        },
        meta_data: [
          ...data.meta_data,
          { ...data.meta_data[1], value: title },
          { ...data.meta_data[2], value: formData?.phone }
        ],
      };


      const customer_id = await getUserId();

      try {
        dispatch(updateProfile({ customer_id, newData: updatedData }));
        onClose();
        setStateUpdate(!stateUpdate);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validatePhone = phone => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  useEffect(() => {
    fetch(
      'https://valid.layercode.workers.dev/list/countries?format=select&value=code',
    )
      .then(response => response.json())
      .then(data => {
        setCountries(data.countries);
        setFormData(prevState => ({
          ...prevState,
          selectedCountry: data.userSelectValue,
        }));
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleCountryChange = value => {
    setSelectedCountry(value);
  };

  const handleChange = (key, value) => {
    if (key === 'phone' && value.length > 10) {
      return;
    }
    setFormData(prevState => ({ ...prevState, [key]: value }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}>
      <SafeAreaView>
        <ScrollView>

          <View
            style={{
              flex: 1,
              height: hp('100%'),
              paddingHorizontal: 20,
              backgroundColor: '#F6F1EB',
            }}>
            <Icon
              name={'close'}
              size={20}
              color="black"
              style={{
                position: 'absolute',
                right: 20,
                top: 20,
              }}
              onPress={onClose}></Icon>

            <View style={{ marginTop: 50 }}>
              <View style={{ marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Intrepid Regular' }}>Title</Text>
                <SelectDropdown
                  data={[{ title: 'Mr' }, { title: 'Miss' }]}
                  onSelect={selectedItem => handleTitleSelect(selectedItem)}
                  renderButton={(selectedItem, isOpen) => (
                    <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTextStyle}>
                        {title || 'Select Title'}
                      </Text>
                      <Icon
                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                        style={styles.dropdownButtonArrowStyle}
                      />
                    </View>
                  )}
                  renderItem={(item, index, isSelected) => (
                    <View
                      style={[
                        styles.dropdownItemStyle,
                        isSelected && { backgroundColor: '#D2D9DF' },
                      ]}>
                      <Text style={styles.dropdownItemTextStyle}>
                        {item.title}
                      </Text>
                    </View>
                  )}
                />
              </View>

              <View style={{ marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Intrepid Regular' }}>Name</Text>
                <TextInput
                  style={styles.inputfield}
                  value={name}
                  onChangeText={text => setName(text)}></TextInput>
                {errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              <View style={{ marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Intrepid Regular' }}>Last Name</Text>
                <TextInput
                  style={styles.inputfield}
                  value={lastname}
                  onChangeText={text => setLastname(text)}></TextInput>
                {errors.lastname && (
                  <Text style={styles.errorText}>{errors.lastname}</Text>
                )}
              </View>

              <View style={{ marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Intrepid Regular' }}>Address</Text>
                <TextInput
                  style={styles.inputfield}
                  value={shippingAddress}
                  onChangeText={text => setShippingAddress(text)}></TextInput>
                {errors.shippingAddress && (
                  <Text style={styles.errorText}>{errors.shippingAddress}</Text>
                )}
              </View>

              <View style={{ marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Intrepid Regular' }}>Country</Text>
                <SelectDropdown
                  data={countries}
                  search
                  searchPlaceHolder="Search Country"
                  searchInputStyle={{ fontFamily: 'Intrepid Regular' }}
                  onSelect={(selectedItem, index) => {
                    setShippingCountry(selectedItem.label);
                  }}
                  renderButton={(selectedItem, isOpen) => {
                    return (
                      <View style={styles.dropdownButtonStyle}>
                        <Text
                          style={{
                            fontFamily: 'Intrepid Regular',
                            fontSize: 14,
                            color: 'black',
                          }}>
                          {selectedItem?.label || shippingCountry}
                        </Text>
                        <Icon
                          name={isOpen ? 'chevron-up' : 'chevron-down'}
                          style={styles.dropdownButtonArrowStyle}
                        />
                      </View>
                    );
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View
                        style={{
                          ...styles.dropdownItemStyle,
                          ...(isSelected && { backgroundColor: '#D2D9DF' }),
                        }}>
                        <Text style={styles.dropdownItemTxtStyle}>
                          {item.label}
                        </Text>
                      </View>
                    );
                  }}></SelectDropdown>

                {errors.shippingCountry && (
                  <Text style={styles.errorText}>{errors.shippingCountry}</Text>
                )}
              </View>

              <View style={{ marginVertical: 5 }}>
                <Text style={{ fontFamily: 'Intrepid Regular' }}>City</Text>
                <TextInput
                  style={styles.inputfield}
                  value={shippingCity}
                  onChangeText={text => setShippingCity(text)}></TextInput>
                {errors.shippingCity && (
                  <Text style={styles.errorText}>{errors.shippingCity}</Text>
                )}
              </View>
              {/* 
              <View style={{marginVertical: 5}}>
                <Text style={{fontFamily: 'Intrepid Regular'}}>Phone</Text>
                <TextInput
                  style={styles.inputfield}
                  value={phone}
                  onChangeText={text => setPhone(text)}></TextInput>
                {errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
              </View> */}

              <MobileNo
                selected={formData.selected}
                setSelected={value => handleChange('selected', value)}
                setCountry={handleCountryChange}
                phone={formData.phone}
                setPhone={text => handleChange('phone', text)}></MobileNo>
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            <Button
              stylesofbtn={styles.custcheckoutbtn}
              styleoffont={styles.custfontstyle}
              name={'update'}
              handlepress={handleUpdate}
            />
          </View>

        </ScrollView>
      </SafeAreaView>
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
    marginTop:-8,
  },
  inputfield: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    marginBottom: hp('2%'),
    fontFamily: 'Intrepid Regular',
    fontSize: 16,
    borderColor: '#dbccc1',
    paddingHorizontal: wp('5%'),
    borderRadius: 1,
    padding: 8,
  },
  dropdownButtonStyle: {
    height: 50,
    height: hp('5.5%'),
    fontSize: wp('3.1%'),
    backgroundColor: globalColors.white,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: globalColors.inputBorder,
    marginBottom: hp('1.5%'),
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: wp('3.1%'),
    fontWeight: '500',
    color: 'red',
  },
  dropdownButtonArrowStyle: {
    fontSize: wp('6%'),
    marginLeft: 'auto',
  },
  dropdownButtonIconStyle: {
    fontSize: wp('3.1%'),
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    fontFamily: 'Intrepid Regular',

    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontFamily: 'Intrepid Regular',

    fontSize: wp('3.1%'),
    fontWeight: '500',
    // color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: wp('3.1%'),
    marginRight: 8,
  },
  dropdownItemTextStyle: {
    color: 'black',
  },
  dropdownButtonTextStyle: {
    color: 'black',
  },
});

export default ModalComponent;
