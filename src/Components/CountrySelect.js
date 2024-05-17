import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const CountrySelect = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    fetch(
      'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code',
    )
      .then(response => response.json())
      .then(data => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedCountry}
        onValueChange={(itemValue, itemIndex) => setSelectedCountry(itemValue)}>
        {countries.map((country, index) => (
          <Picker.Item
            key={index}
            label={country.label}
            value={country.value}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default CountrySelect;
