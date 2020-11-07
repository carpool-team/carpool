import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';
import {StandardButton} from '../../../components/common/buttons';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {RidesList} from '../../../components/Driver';

const DriversRides = ({navigation}) => {
  const [isUpcoming, setIsUpcoming] = useState(true);
  const [data, setData] = useState([]);

  const driversRides = useSelector(state => state.driverReducer.driversRides);
  const driversPastRides = useSelector(
    state => state.driverReducer.driversPastRides,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (driversRides.data && driversPastRides.data) {
      if (isUpcoming) {
        setData([...driversRides.data]);
      } else {
        setData([...driversPastRides.data]);
      }
    }
  }, [isUpcoming, driversRides, driversPastRides]);

  const onRefresh = () => {
    dispatch(actions.getDriversRides());
    dispatch(actions.getDriversPastRides());
  };

  const onItemPress = ride => {
    navigation.navigate('DriversRideDetails', {ride});
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={[sheet.rowCenterSplit, styles.topRow]}>
          <StandardButton
            color={isUpcoming ? '#fff' : colors.blue}
            onPress={() => setIsUpcoming(true)}
            title="Upcoming"
            width="45%"
            backgroundColor={isUpcoming ? colors.blue : undefined}
          />
          <StandardButton
            color={!isUpcoming ? '#fff' : colors.blue}
            onPress={() => setIsUpcoming(false)}
            title="Historic"
            width="45%"
            backgroundColor={!isUpcoming ? colors.blue : undefined}
          />
        </View>
        <View style={styles.flatlistWrapper}>
          <RidesList
            data={data}
            loading={driversRides.loading || driversPastRides.loading}
            onRefresh={onRefresh}
            onItemPress={onItemPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    paddingTop: 36,
  },
  topRow: {
    width: '100%',
    paddingHorizontal: 16,
  },
  flatlistWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 36,
    width: '100%',
  },
});

export default DriversRides;
