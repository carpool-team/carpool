import React, {useEffect} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {AccountSwitch} from '../../../../components/navigation';
import {sheet, colors} from '../../../../styles';
import {useDispatch} from 'react-redux';
import * as actions from '../../../../store/actions';
import {useActiveAccount} from '../../../../hooks';
import {DriversHome, PassengersHome} from '../../../../components/Home';

const Home = ({navigation}) => {
  const {activeAccount} = useActiveAccount();
  const isPassenger = activeAccount === 'passenger';

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getDriversRides());
    dispatch(actions.getUsersRides());
    dispatch(actions.getGroups());
  }, []);

  return isPassenger ? <PassengersHome /> : <DriversHome />;
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  topRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 8,
  },
  title: {
    ...sheet.textMedium,
    color: colors.grayVeryDark,
    fontSize: 20,
    paddingVertical: 8,
  },
  seeAll: {
    ...sheet.textMedium,
    color: colors.blue,
    fontSize: 16,
  },
  loadingWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
