import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {StandardButton} from '../../../../components/common/buttons';
import {colors} from '../../../../styles';
import * as actions from '../../../../store/actions';
import {useDispatch} from 'react-redux';

const Settings = () => {
  const dispatch = useDispatch();

  const onLogout = () => dispatch(actions.logoutUser());

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text>TODO: Settings</Text>
        <StandardButton color={colors.red} onPress={onLogout} title="Logout" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Settings;
