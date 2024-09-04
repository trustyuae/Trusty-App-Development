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
  const hasSizeValues = Array.isArray(Size) && Size.length > 0;
  const hasColorMeta = colorMeta && colorMeta.trim() !== '';

  return (
    <List.Section>
      <View style={{ backgroundColor: globalColors.headingBackground }}>
        {/* Color Section */}
        {!hasSizeValues && colorMeta ? (
          <Text
            style={{
              marginLeft: wp('2.5%'),
              padding: wp('5%'),
              fontSize: 14,
              color: globalColors.black,
            }}
          >
            {`Color :  ${data}`}
          </Text>
        ) : null}

        {/* Size Section */}
        {hasSizeValues ? (
          <List.Accordion
            title={`Size :  ${changeSize}`}
            titleStyle={{ color: '#5546DC' }}
            expanded={expandedSize}
            style={{
              backgroundColor: globalColors.headingBackground,
              paddingTop: -5,
              borderBottomWidth: expandedSize ? 0 : 1,
              borderBottomColor: globalColors.lightGray,
              fontFamily: 'Product Sans',
            }}
            onPress={() => setExpandedSize(!expandedSize)}
          >
            {expandedSize && (
              <>
                <View style={styles.custView}>
                  {Size.map((item, key) => (
                    <Pressable
                      key={key}
                      onPress={() => {
                        setSelectedSize(item);
                        setChangeSize(item);
                      }}
                    >
                      <View
                        style={[
                          styles.custcontainer,
                          selectedSize === item && styles.selectedSize,
                        ]}
                      >
                        <Text style={styles.custboldtext}>{item}</Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
                <View style={styles.custBorder} />
              </>
            )}
          </List.Accordion>
        ) : null}
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
