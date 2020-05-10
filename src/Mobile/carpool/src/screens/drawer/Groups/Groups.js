import React from 'react';
import {SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import {vw, vh} from '../../../utils/constants';
import UpView from '../../../components/common/UpView';
import sheet from '../../../styles/sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import colors from '../../../styles/colors';
import GroupListItem from '../../../components/Groups/GroupListItem';
import GroupsFlatList from '../../../components/Groups/GroupsFlatList';
import {exampleGroups} from '../../../examples/groups';

const Groups = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: 4 * vh,
        }}>
        <TouchableOpacity
          style={{
            ...sheet.rowCenterSplit,
            width: '100%',
            marginBottom: 4 * vh,
            paddingHorizontal: 4 * vw,
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
        <GroupsFlatList
          data={exampleGroups}
          loading={false}
          onItemPress={console.log}
        />
      </View>
    </SafeAreaView>
  );
};

export default Groups;
