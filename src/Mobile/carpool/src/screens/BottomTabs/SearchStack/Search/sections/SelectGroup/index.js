import React, {useEffect} from 'react';
import {View, Text, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {GroupsFlatlist} from '../../../../../../components/Groups';
import {styles} from './index.styles';

const SelectGroup = ({onSubmit}) => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a group</Text>
      <GroupsFlatlist
        data={groups.data}
        loading={groups.loading}
        onItemPress={onSubmit}
      />
    </View>
  );
};

export default SelectGroup;
