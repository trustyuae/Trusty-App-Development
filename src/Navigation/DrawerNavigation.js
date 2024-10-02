
import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../Redux/Slice/categorySearchSlice'; // Replace with your actual action
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { globalColors } from '../Assets/Theme/globalColors';
import { Home } from '../Screens';
import { Images } from '../Constants';
import { DrawerActions } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { fontFamily } from '../Assets/Theme/fontFamily';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Head3x, NewCartIcons, NewCartIcons3x, NewSearchIcon3x } from '../Constants/Icons';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState({});
  const dispatch = useDispatch();

  const {
    categories,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector(state => state.categorySearch);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(prevState => ({
      ...prevState,
      [categoryId]: !prevState[categoryId]
    }));
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text.trim() === '') {
      setFilteredCategories([]);
      return;
    }

    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handlePress = (category) => {
    if (category.subcategories && category.subcategories.length > 0) {
      toggleCategory(category.id);
    } else {
      navigation.navigate('CategoryProducts', { category });
    }
  };

  const renderSubcategories = (subcategories) => {
    return subcategories.map(subcategory => (
      <TouchableOpacity key={subcategory.id} onPress={() => handlePress(subcategory)}>
        <View style={styles.subcategoryItem}>
          <Text style={styles.subcategoryText}>{subcategory.name}</Text>
          {subcategory.subcategories.length > 0 && (
            <Icon
              name={expandedCategory[subcategory.id] ? "minus" : "plus"}
              size={20}
              color={globalColors.black}
            />
          )}
        </View>
        {expandedCategory[subcategory.id] && (
          <View style={styles.nestedSubcategories}>
            {renderSubcategories(subcategory.subcategories)}
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.drawerContainer}>
      <ScrollView style={{
        padding: hp('2%'),
      }} showsVerticalScrollIndicator={false}>
        <View style={styles.headingContainer}>
          <Text style={styles.menuText}>Menu</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SeeAll')}>
            <Text style={{
              fontFamily: fontFamily.fontFamilyIntrepid,
              fontSize: 16,
              color: globalColors.black,

            }}>READY-TO-GO</Text>
          </TouchableOpacity>

        </View>
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <TouchableOpacity key={category.id} onPress={() => handlePress(category)}>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryText}>{category.name}</Text>
                {category.subcategories.length > 0 && (
                  <Icon
                    name={expandedCategory[category.id] ? "minus" : "plus"}
                    size={20}
                    color={globalColors.black}
                  />
                )}
              </View>
              {expandedCategory[category.id] && (
                <View style={styles.subcategoryList}>
                  {renderSubcategories(category.subcategories)}
                </View>
              )}
            </TouchableOpacity>
          ))
        ) : (
          categories.map(category => (
            <TouchableOpacity key={category.id} onPress={() => handlePress(category)}>
              <View style={styles.categoryItem}>
                <Text style={styles.categoryText}>{category.name}</Text>
                {category.subcategories.length > 0 && (
                  <Icon
                    name={expandedCategory[category.id] ? "minus" : "plus"}
                    size={20}
                    color={globalColors.black}
                  />
                )}
              </View>
              {expandedCategory[category.id] && (
                <View style={styles.subcategoryList}>
                  {renderSubcategories(category.subcategories)}
                </View>
              )}
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const DrawerNavigation = ({ navigation }) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#fff',
          width: 300,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('findItems')}
            >
              <View style={{ marginLeft: wp('4%') }}>
                {/* <Feather name='menu' size={25} color='#7C7A78'></Feather> */}
                <Image source={NewSearchIcon3x} style={{ width: 25, height: 25 }}></Image>
              </View>
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image source={Head3x} style={{ width: 115, height: 26 }} />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
            >
              <View style={{ marginRight: wp('4%') }}>
                {/* <Feather name="shopping-bag" size={25} color='#7C7A78' /> */}
                <Image source={NewCartIcons3x} style={{ width: 25, height: 25 }}></Image>

              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  closeIcon: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: globalColors.black,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryText: {
    fontFamily: fontFamily.fontFamilyIntrepid,
    fontSize: 16,
    color: globalColors.black,
  },
  subcategoryList: {
    paddingLeft: 20,
  },
  subcategoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  subcategoryText: {
    fontSize: 14,
    fontFamily: fontFamily.fontFamilyIntrepid,
    color: globalColors.black,
  },
  menuText: {
    fontFamily: fontFamily.fontFamilyIntrepid,
    fontSize: 24,
    marginBottom: 15,


  },
  headingContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    // paddingVertical: 15,
    paddingBottom: 15

  }
});

export default DrawerNavigation;
