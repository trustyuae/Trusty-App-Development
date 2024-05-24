import {View, Text, StyleSheet, Image} from 'react-native';
import {useState} from 'react';
import {List} from 'react-native-paper';
import {Dummyproduct1, Dummyproduct2} from '../Constants/Icons';

const DummyAccordion = ({attributes}) => {
  const [expandedSize, setExpandedSize] = useState(true);
  const [expandedimg, setExpandedimg] = useState(true);
  const [expandedproductDetail, setProductDetail] = useState(false);
  const [expandedproductreturn, setProductReturn] = useState(false);

  return (
    // <List.Section>
    //   <List.Accordion
    //     title="Size"
    //     expanded={expandedSize}
    //     style={{
    //       backgroundColor: '#f6f1eb',
    //       paddingTop: -5,
    //       borderBottomWidth: expandedSize ? 0 : 1,
    //       borderBottomColor: '#D8D8D8',
    //       fontFamily: 'Intrepid Regular',
    //     }}
    //     onPress={() => setExpandedSize(!expandedSize)}>
    //     {expandedSize && (
    //       <>
    //         <View style={styles.custView}>
    //           <View style={[styles.custcontainer]}>
    //             <Text style={styles.custboldtext}>L</Text>
    //           </View>
    //           <View style={styles.custcontainer}>
    //             <Text style={styles.custboldtext}>M</Text>
    //           </View>
    //         </View>
    //         <View style={styles.custBorder} />
    //       </>
    //     )}
    //   </List.Accordion>

    //   <List.Accordion
    //     title="Color:Brown"
    //     expanded={expandedimg}
    //     style={{
    //       backgroundColor: '#f6f1eb',
    //       paddingTop: -5,
    //       borderBottomWidth: expandedimg ? 0 : 1,
    //       borderBottomColor: '#D8D8D8',
    //     }}
    //     onPress={() => setExpandedimg(!expandedimg)}>
    //     {expandedimg && (
    //       <>
    //         <View style={styles.custView}>
    //           <Image source={Dummyproduct1}></Image>
    //           <Image source={Dummyproduct2}></Image>
    //         </View>
    //         <View style={styles.custBorder} />
    //       </>
    //     )}
    //   </List.Accordion>

    //   <List.Accordion
    //     title="Product details"
    //     expanded={expandedproductDetail}
    //     style={{
    //       backgroundColor: '#f6f1eb',
    //       paddingTop: -5,
    //       borderBottomWidth: expandedproductDetail ? 0 : 1,
    //       borderBottomColor: '#D8D8D8',
    //     }}
    //     onPress={() => setProductDetail(!expandedproductDetail)}>
    //     {expandedproductDetail && (
    //       <>
    //         <View style={styles.custView}>
    //           <Text>
    //             {' '}
    //             Lorem Ipsum is simply dummy text of the printing and typesetting
    //             industry{' '}
    //           </Text>
    //         </View>
    //         <View style={styles.custBorder} />
    //       </>
    //     )}
    //   </List.Accordion>

    //   <List.Accordion
    //     title="Delivery And Returns"
    //     expanded={expandedproductreturn}
    //     style={{
    //       backgroundColor: '#f6f1eb',
    //       paddingTop: -5,
    //     }}
    //     onPress={() => setProductReturn(!expandedproductreturn)}>
    //     {expandedproductreturn && (
    //       <>
    //         <View style={styles.custView}>
    //           <Text>
    //             {' '}
    //             Lorem Ipsum is simply dummy text of the printing and typesetting
    //             industry{' '}
    //           </Text>
    //         </View>
    //         <View style={styles.custBorder} />
    //       </>
    //     )}
    //   </List.Accordion>
    // </List.Section>
    // ??????????????????????????????????????????
    <List.Section>
      {attributes?.map(item => (
        <List.Accordion
          title={item.name}
          expanded={item.name === "size" }
         
          style={{
            backgroundColor: '#f6f1eb',
            paddingTop: -5,
            borderBottomWidth: expandedSize ? 0 : 1,
            borderBottomColor: '#D8D8D8',
            fontFamily: 'Intrepid Regular',
          }}></List.Accordion>
      ))}
    </List.Section>
  );
};

export default DummyAccordion;

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
