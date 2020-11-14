import React from 'react';
import {View} from 'react-native';
import {colors} from '../../../styles';
import {useNavigation} from '@react-navigation/core';
import {StandardButton} from '../../../components/common/buttons';

const Preferences = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StandardButton
        width="65%"
        onPress={() => navigation.navigate('SearchLocation')}
        color={colors.blue}
        title="Add location"
      />
      <StandardButton
        width="65%"
        onPress={() => navigation.navigate('FindRoute')}
        color={colors.blue}
        title="Find route"
        style={{marginTop: 54}}
      />
    </View>
  );
};

export default Preferences;
