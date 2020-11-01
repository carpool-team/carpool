import React from 'react';
import {View, Text} from 'react-native';
import {StandardButton} from '../../buttons';
import styles from './index.styles';

const ListEmptyComponent = ({title, onRefresh}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <StandardButton onPress={onRefresh} width={220} title="Try again" />
  </View>
);

export default ListEmptyComponent;
