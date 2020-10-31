import React, {useContext, useEffect} from 'react';
import {SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import sheet from '../../../styles/sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../styles/colors';
import GroupsFlatList from '../../../components/Groups/GroupsFlatList';
import {
  AccountContext,
  createGetUserGroups,
  createGetUserInvitations,
} from '../../../context/AccountContext';

const Groups = ({navigation}) => {
  const {accountState, dispatch} = useContext(AccountContext);
  const {data: groups, loading} = accountState.groups;
  const {data: invitations, loading: invLoading} = accountState.invitations;

  const onItemPress = item => {
    navigation.navigate('GroupDetails', {group: item});
  };

  const onRefresh = () => {
    createGetUserGroups(dispatch);
    createGetUserInvitations(dispatch);
  };

  useEffect(() => {
    createGetUserInvitations(dispatch);
  }, []);

  const getInvitations = number => {
    if (number === 0) {
      return null;
    } else {
      return (
        <TouchableOpacity
          style={{
            ...sheet.rowCenterSplit,
            width: '100%',
            marginBottom: 36,
            paddingHorizontal: 8,
          }}
          onPress={() => navigation.navigate('Invitations')}>
          <Text
            style={{
              ...sheet.textSemiBold,
              fontSize: 8,
              color: colors.blue,
            }}>
            {`${number} new invitation${number > 1 ? 's' : ''}`}
          </Text>
          <Icon name="group-add" size={32} color={colors.grayDark} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: 36,
        }}>
        {getInvitations(invitations.length)}
        <GroupsFlatList
          data={groups}
          loading={loading}
          onItemPress={onItemPress}
          onRefresh={onRefresh}
        />
      </View>
    </SafeAreaView>
  );
};

export default Groups;
