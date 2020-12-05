import React, {useContext, useEffect} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {GroupsFlatlist} from '../../../components/Locations';
import {colors, sheet} from '../../../styles';
import {AddRideContext, AddRideContextActions} from './context';

const SelectGroup = ({navigation}) => {
  const groups = useSelector(state => state.accountReducer.groups);

  const {addRideState, dispatch} = useContext(AddRideContext);

  useEffect(() => {
    if (addRideState.group) {
      navigation.navigate('SelectDirection');
    }
  }, [addRideState]);

  const onItemPress = item => {
    dispatch({type: AddRideContextActions.SET_GROUP, payload: item});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Select a group</Text>
        <GroupsFlatlist
          data={groups.data}
          loading={groups.loading}
          onItemPress={onItemPress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
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
