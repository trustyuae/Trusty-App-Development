import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {globalColors} from '../../Assets/Theme/globalColors';
import {Images} from '../../Constants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const CustomTabBar = ({state, descriptors, navigation}) => {
  return (
    <View style={styles.tabBarContainer}>
      <ScrollView>
        <View style={{alignItems: 'center', paddingBottom: 2}}>
          <Image source={Images.ProfileIcon}></Image>
          <Text>MR SAF ASD</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? {selected: true} : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.tabItem}
                key={index}>
                <Text
                  style={{
                    color: isFocused
                      ? globalColors.black
                      : globalColors.buttonBackground,
                    padding: 10,
                    fontSize: 16,
                    backgroundColor: isFocused
                      ? globalColors.white
                      : globalColors.headingBackground,
                    fontFamily: 'Intrepid Regular',
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'column',
    // width: '50%',
    // height: '30%',
    paddingTop: hp('10%'),

    position: 'absolute',
    // top: '30%', // Position it in the middle
    left: 0,
    right: 0,
    backgroundColor: globalColors.headingBackground, // Ensure background color to cover content below
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10, // Adjust padding as needed
  },
});

export default CustomTabBar;
