import React from 'react';
import {Image} from 'react-native';

const PreviewImage = ({uri}) => {
  return <Image source={uri}></Image>;
};

export default PreviewImage;
