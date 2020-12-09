import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../styles';
import {styles} from './index.styles';

const ThreeGroupsList = ({groups, onItemPress}) => (
  <View style={styles.container}>
    {groups.slice(0, 3).map(group => (
      <TouchableOpacity
        onPress={() => onItemPress(group)}
        key={group.id}
        style={styles.button}>
        <Icon name="circle" color={colors.orange} size={15} />
        <Text style={styles.name}>{group.name}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default ThreeGroupsList;
