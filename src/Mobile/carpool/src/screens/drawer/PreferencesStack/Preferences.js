import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../../styles/colors';
import UpView from '../../../components/common/UpView';
import sheet from '../../../styles/sheet';
import {vh} from '../../../utils/constants';
import {useNavigation} from '@react-navigation/core';

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
      <UpView
        style={{width: '65%', height: 6 * vh}}
        borderRadius={100}
        contentContainerStyle={sheet.center}
        onPress={() => navigation.navigate('SearchLocation')}>
        <Text
          style={{
            color: colors.blue,
            fontSize: 2.25 * vh,
            ...sheet.textBold,
          }}>
          Add location
        </Text>
      </UpView>
    </View>
  );
};

export default Preferences;
