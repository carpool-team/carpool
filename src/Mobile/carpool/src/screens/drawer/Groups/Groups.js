import React from 'react';
import {SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import {vw, vh} from '../../../utils/constants';
import UpView from '../../../components/common/UpView';
import sheet from '../../../styles/sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../styles/colors';

const Groups = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingHorizontal: 4 * vw,
          paddingTop: 4 * vh,
        }}>
        <TouchableOpacity
          style={{
            ...sheet.rowCenterSplit,
            width: '100%',
            marginBottom: 4 * vh,
          }}
          onPress={() => navigation.navigate('Invitations')}>
          <Text
            style={{
              ...sheet.textSemiBold,
              fontSize: 4 * vw,
              color: colors.blue,
            }}>
            1 new invitation
          </Text>
          <Icon name="group-add" size={8 * vw} color={colors.grayDark} />
        </TouchableOpacity>
        <UpView
          borderRadius={4 * vw}
          style={{width: '100%', height: 100}}></UpView>
      </View>
    </SafeAreaView>
  );
};

export default Groups;
