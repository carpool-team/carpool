import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {colors} from '../../../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './index.styles';

const ListItem = ({item, onItemPress}) => (
  <TouchableOpacity onPress={() => onItemPress(item)} style={styles.container}>
    <Icon name="circle" color={colors.blue} size={12} />
    <Text style={styles.name}>{item.name}</Text>
  </TouchableOpacity>
);

export default ListItem;
