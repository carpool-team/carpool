import React, {useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {AddRideActions} from '../../reducer';
import {GroupsFlatlist} from '../../../../../components/Groups';
import {styles} from './index.styles';

const SelectGroup = ({dispatch}) => {
  const groups = useSelector(state => state.accountReducer.groups);

  useEffect(() => {
    if (groups.error) {
      Alert.alert(
        'Error',
        'An error ocurred when trying to fetch groups from the server. Please try again.',
        [
          {
            text: 'Ok',
            style: 'default',
          },
        ],
      );
    }
  }, [groups]);

  const onItemPress = item => {
    dispatch({type: AddRideActions.SET_GROUP, payload: item});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a group</Text>
      <GroupsFlatlist
        data={groups.data}
        loading={groups.loading}
        onItemPress={onItemPress}
      />
    </View>
  );
};

export default SelectGroup;
