import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {AddRideActions} from '../../reducer';
import {GroupsFlatlist} from '../../../../../components/Groups';
import {colors, sheet} from '../../../../../styles';

const SelectGroup = ({dispatch}) => {
  const groups = useSelector(state => state.accountReducer.groups);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    color: colors.orange,
    ...sheet.textSemiBold,
    marginBottom: 20,
  },
});

export default SelectGroup;
