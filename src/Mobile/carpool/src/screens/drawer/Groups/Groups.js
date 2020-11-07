import React, {useEffect} from 'react';
import {SafeAreaView, TouchableOpacity, View, Text} from 'react-native';
import sheet from '../../../styles/sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../styles/colors';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {GroupsList} from '../../../components/Groups';

const Groups = ({navigation}) => {
  const groups = useSelector(store => store.accountReducer.groups);
  const invitations = useSelector(store => store.accountReducer.invitations);
  const dispatch = useDispatch();

  const onItemPress = item => {
    navigation.navigate('GroupDetails', {group: item});
  };

  const onRefresh = () => {
    dispatch(actions.getGroups());
    dispatch(actions.getInvitations());
  };

  useEffect(() => {
    onRefresh();
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
            paddingHorizontal: 16,
          }}
          onPress={() => navigation.navigate('Invitations')}>
          <Text
            style={{
              ...sheet.textSemiBold,
              fontSize: 14,
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
        {getInvitations(invitations.data ? invitations.data.length : 0)}
        <GroupsList
          data={groups.data}
          loading={groups.loading}
          onItemPress={onItemPress}
          onRefresh={onRefresh}
        />
      </View>
    </SafeAreaView>
  );
};

export default Groups;
