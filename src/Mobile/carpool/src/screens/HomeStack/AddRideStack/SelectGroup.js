import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {GroupsFlatlist} from '../../../components/Locations';

const SelectGroup = () => {
  const groups = useSelector(state => state.accountReducer.groups);

  let grps = groups.data
    ? groups.data.map(group => ({...group, place_name: group.name}))
    : [];

  console.log(groups);
  console.log(grps);

  return (
    <SafeAreaView style={{flex: 1}}>
      <GroupsFlatlist
        data={groups.data}
        loading={groups.loading}
        onItemPress={console.log}
      />
    </SafeAreaView>
  );
};

export default SelectGroup;
