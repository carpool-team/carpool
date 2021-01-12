import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../../styles';
import {styles} from './index.styles';
import {ListEmptyComponent} from '../../common/lists';

const ThreeGroupsList = ({groups, onItemPress, loading}) => (
  <View style={styles.container}>
    {!!groups ? (
      groups.slice(0, 3).map(group => (
        <TouchableOpacity
          onPress={() => onItemPress(group)}
          key={group.groupId}
          style={styles.button}>
          <Icon name="circle" color={colors.orange} size={12} />
          <Text style={styles.name}>{group.name}</Text>
        </TouchableOpacity>
      ))
    ) : loading ? null : (
      <ListEmptyComponent title="you are not a member of any group yet" />
    )}
  </View>
);

export default ThreeGroupsList;
