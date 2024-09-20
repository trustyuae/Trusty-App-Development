// import * as React from 'react';
// import { Button, Image, Touchable, View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Home, Settings } from '../Screens';
// import SignupPage from '../Screens/Login/SignupPage';
// import BottomTabNavigation from './BottomTabNavigation';
// import HomeCustomeNavigation from './HomeCustomeNavigation';
// import { Images } from '../Constants';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { useNavigation } from '@react-navigation/native';
// import { DrawerActions } from '@react-navigation/native';
// import { color } from 'react-native-elements/dist/helpers';
// import Shop from '../Screens/Shop/Shop';
// const Drawer = createDrawerNavigator();

// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }
// function FAQ({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

// const DrawerNavigation = ({ navigation }) => {
//   const screenOptions = {
//     headerShown: false,
//     activeBackgroundColor: 'red',
//   };

//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         drawerStyle: {
//           backgroundColor: '#fff',
//           width: 280,
//         },
//       }}>
//       <Drawer.Screen
//         name="Home"
//         component={Home}
//         options={{
//           headerShown: true,
//           headerTitle: '',
//           headerLeft: () => (
//             <TouchableOpacity
//               onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//             >
//               <View style={{ marginLeft: 10 }}>
//                 <Image source={Images.Menu} style={{ width: 18, height: 16 }} />
//               </View>
//             </TouchableOpacity>
//           ),
//           headerTitleAlign: 'center',
//           headerTitle: () => (
//             <Image source={Images.Head} style={{ width: 145, height: 32 }} />
//           ),
//           headerRight: () => (
//             <View style={{ marginRight: 10 }}>
//               <Image source={Images.Bags} style={{ width: 25, height: 24 }} />
//             </View>
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Shop"
//         component={Shop}
//         options={{
//           headerTitle: '',
//         }}
//       />
//       {/* <Drawer.Screen name="Settings" component={Settings} /> */}
//       <Drawer.Screen
//         name="Notification"
//         component={NotificationsScreen}
//         options={{ headerTitle: '' }}
//       />
//       <Drawer.Screen name="Faq" component={FAQ} options={{ headerTitle: '' }} />
//     </Drawer.Navigator>
//   );
// };

// export default DrawerNavigation;


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
    dispatch(fetchCategories()); // Fetch categories from API
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
    <View style={styles.drawerContainer}>
      {/* <TouchableOpacity onPress={() => navigation.closeDrawer()}>
        <Icon name="close" size={30} color={globalColors.black} style={styles.closeIcon} />
      </TouchableOpacity> */}

      {/* Search Bar */}
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories"
          value={searchTerm}
          onChangeText={handleSearch}
        />
        {searchTerm !== '' && (
          <TouchableOpacity onPress={() => setSearchTerm('')}>
            <Icon name="close-circle" size={24} color="gray" />
          </TouchableOpacity>
        )}
      </View> */}


      <ScrollView showsVerticalScrollIndicator={false}>
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
    </View>
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
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <View style={{ marginLeft: 10 }}>
                {/* <Image source={Images.Menu} style={{ width: 18, height: 16 }} /> */}
                <Feather name='menu' size={25} color='#7C7A78'></Feather>
              </View>
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerTitle: () => (
            <Image source={Images.Head} style={{ width: 145, height: 32 }} />
          ),
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              {/* <Image source={Images.Bags} style={{ width: 25, height: 24 }} /> */}
              <Feather name="shopping-bag" size={25} color='#7C7A78' />
            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: hp('2%'),
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
    marginTop: hp('2%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 15,

  }
});

export default DrawerNavigation;
