import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';
import { List } from 'react-native-paper';
import { globalColors } from '../Assets/Theme/globalColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Accordion = ({
  Size,
  Description,
  Color,
  changeColor,
  setChange,
  changeSize,
  setChangeSize,
  colorMeta,
}) => {
  const [expandedSize, setExpandedSize] = useState(true);
  const [expandedimg, setExpandedimg] = useState(true);
  const [expandedproductDetail, setProductDetail] = useState(false);
  const [expandedproductreturn, setProductReturn] = useState(false);
  const [selectedSize, setSelectedSize] = useState(changeSize);
  const [selectedColor, setSelectedColor] = useState(null);

  const stripHTMLTags = html => {
    return html.replace(/<[^>]*>?/gm, '');
  };
  const data = colorMeta?.split(',')[1];

  return (
    <List.Section>
      <View
        style={{
          backgroundColor: globalColors.headingBackground,
          // flexDirection: 'row',
          // alignSelf: 'center',
        }}>
        {Size === '' ? (
          <Text
            style={{
              marginLeft: wp('2.5%'),
              padding: wp('5%'),
              fontSize: 14,
              color: globalColors.black,
            }}>{`Color: ${data}`}</Text>
        ) : (
          <List.Accordion
            title={`Color: ${Color}`}
            titleStyle={{ color: globalColors.darkGray }}
            expanded={expandedimg}
            style={{
              backgroundColor: globalColors.headingBackground,
              paddingTop: -5,
              borderBottomWidth: expandedimg ? 0 : 1,
              borderBottomColor: globalColors.lightGray,
            }}
            onPress={() => setExpandedimg(!expandedimg)}>
            {expandedimg && (
              <>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  <View style={styles.custView}>
                    {Color?.map((item, key) => (
                      <View key={key}>
                        <Pressable
                          onPress={() => {
                            setChange(item), setSelectedColor(item);
                          }}>
                          <View style={{ marginVertical: 7, marginLeft: 20 }}>
                            <View
                              style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: `${item?.toLowerCase()}`,
                              }}
                            />
                          </View>
                        </Pressable>
                      </View>
                    ))}
                  </View>
                </ScrollView>
                {/* <View style={styles.custBorder} /> */}
              </>
            )}
          </List.Accordion>
        )}

        {Size ? (
          <List.Accordion
            title={`Size:  ${changeSize}`}
            titleStyle={{ color: globalColors.darkGray }}
            expanded={expandedSize}
            style={{
              backgroundColor: globalColors.headingBackground,
              paddingTop: -5,
              borderBottomWidth: expandedSize ? 0 : 1,
              borderBottomColor: globalColors.lightGray,
              fontFamily: 'Product Sans',
            }}
            onPress={() => setExpandedSize(!expandedSize)}>
            {expandedSize && (
              <>
                <View style={styles.custView}>
                  {Size?.map((item, key) => (
                    <Pressable
                      key={key}
                      onPress={() => {
                        setSelectedSize(item);
                        setChangeSize(item);
                      }}>
                      <View
                        style={[
                          styles.custcontainer,

                          selectedSize === item && styles.selectedSize,
                        ]}>
                        <Text style={styles.custboldtext}>{item}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>

                <View style={styles.custBorder} />
              </>
            )}
          </List.Accordion>
        ) : (
          ''
        )}
      </View>
    </List.Section>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  custcontainer: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  custView: {
    flexDirection: 'row',
    gap: 20,
    paddingLeft: 20,
    marginTop: -6,
    fontFamily: 'Product Sans',
    flexWrap: 'wrap',
  },
  custBorder: {
    marginTop: 13,
    borderBottomColor: globalColors.lightGray,
    borderBottomWidth: 1,
  },
  custboldtext: {
    textAlign: 'center',
    color: globalColors.darkGray,

    fontFamily: 'Product Sans',
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: globalColors.blue,
  },
  selectedSize: {
    borderColor: globalColors.black,
  },
});
