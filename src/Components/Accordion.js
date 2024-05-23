import {View, Text, StyleSheet, Image} from 'react-native';
import {useState} from 'react';
import {List} from 'react-native-paper';
import {Dummyproduct1, Dummyproduct2} from '../Constants/Icons';
import {color} from 'react-native-elements/dist/helpers';

const Accordion = ({Size, Description, Color}) => {
  const [expandedSize, setExpandedSize] = useState(true);
  const [expandedimg, setExpandedimg] = useState(true);
  const [expandedproductDetail, setProductDetail] = useState(false);
  const [expandedproductreturn, setProductReturn] = useState(false);
  const [ChangeColor, setColor] = useState({Color})
  
  const stripHTMLTags = html => {
    // Replace HTML tags with an empty string
    return html.replace(/<[^>]*>?/gm, '');
  };


  console.log("Color----------->",ChangeColor);
  return (
    <List.Section>
      <List.Accordion
        title="Size"
        expanded={expandedSize}
        style={{
          backgroundColor: '#f6f1eb',
          paddingTop: -5,
          borderBottomWidth: expandedSize ? 0 : 1,
          borderBottomColor: '#D8D8D8',
          fontFamily: 'Intrepid Regular',
        }}
        onPress={() => setExpandedSize(!expandedSize)}>
        {expandedSize && (
          <>
            <View style={styles.custView}>
              {Size?.map(item => (
                <View style={[styles.custcontainer]}>
                  
                  <Text style={styles.custboldtext}>{item}</Text>
                </View>
              ))}
            </View>
            <View style={styles.custBorder} />
          </>
        )}
      </List.Accordion>

      <List.Accordion
        title={`color:Black`}
        expanded={expandedimg}
        style={{
          backgroundColor: '#f6f1eb',
          paddingTop: -5,
          borderBottomWidth: expandedimg ? 0 : 1,
          borderBottomColor: '#D8D8D8',
        }}
        onPress={() => setExpandedimg(!expandedimg)}>
        {expandedimg && (
          <>
            <View style={styles.custView}>
              {Color?.map(item => (
                <View  onPress={() =>setColor(item)}> 
                { console.log(item)}
                            <Image
                  source={Dummyproduct1}
                 ></Image>
                </View>
       
              ))}
            </View>
            <View style={styles.custBorder} />
          </>
        )}
      </List.Accordion>

      <List.Accordion
        title="Product details"
        expanded={expandedproductDetail}
        style={{
          backgroundColor: '#f6f1eb',
          paddingTop: -5,
          borderBottomWidth: expandedproductDetail ? 0 : 1,
          borderBottomColor: '#D8D8D8',
        }}
        onPress={() => setProductDetail(!expandedproductDetail)}>
        {expandedproductDetail && (
          <>
            <View style={styles.custView}>
              <Text> {stripHTMLTags(Description)}</Text>
            </View>
            <View style={styles.custBorder} />
          </>
        )}
      </List.Accordion>

      <List.Accordion
        title="Delivery And Returns"
        expanded={expandedproductreturn}
        style={{
          backgroundColor: '#f6f1eb',
          paddingTop: -5,
        }}
        onPress={() => setProductReturn(!expandedproductreturn)}>
        {expandedproductreturn && (
          <>
            <View style={styles.custView}>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </Text>
            </View>
            <View style={styles.custBorder} />
          </>
        )}
      </List.Accordion>
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
  },
  custView: {
    flexDirection: 'row',
    gap: 12,
    marginTop: -6,
    fontFamily: 'Intrepid Regular',
  },
  custBorder: {
    marginTop: 13,
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
  },
  custboldtext: {textAlign: 'center', fontWeight: 'bold'},
});
