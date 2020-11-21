import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {colors, sheet} from '../../../styles';
import {StandardButton} from '../../../components/common/buttons';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {RidesList, WeekPicker, WeekRidesList} from '../../../components/Driver';
import {getDates} from '../../../utils/date';

const DriversRides = ({navigation}) => {
  const [isUpcoming, setIsUpcoming] = useState(true);
  const [data, setData] = useState([]);

  const [offset, setOffset] = useState(0);
  const [dateRange, setDateRange] = useState(getDates(offset).range);
  const [weekDays, setWeekDays] = useState(getDates(offset).week);

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

  useEffect(() => {
    onRefreshRides();
  }, [offset]);

  const onRefreshRides = () => {
    const {firstDay, lastDay, range, week} = getDates(offset);
    setDateRange(range);
    setWeekDays([...week]);
    // dispatch(actions.getShifts({ firstDay, lastDay }));
  };

  const onRefresh = () => {
    dispatch(actions.getDriversRides());
    dispatch(actions.getDriversPastRides());
  };

  const onItemPress = ride => {
    navigation.navigate('DriversRideDetails', {ride});
  };

  const onIncrement = () => setOffset(offset => offset + 1);

  const onDecrement = () => setOffset(offset => offset - 1);

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
        <WeekPicker
          onDecrement={onDecrement}
          onIncrement={onIncrement}
          dateRange={dateRange}
          offset={offset}
        />
        <ScrollView
          style={{
            flex: 1,
            width: '100%',
          }}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              colors={[colors.blue]}
              refreshing={driversRides.loading}
              tintColor={colors.blue}
            />
          }>
          <WeekRidesList weekDays={weekDays} rides={driversRides.data} />
        </ScrollView>
        {/* <View style={styles.flatlistWrapper}>
          <RidesList
            data={data}
            loading={driversRides.loading || driversPastRides.loading}
            onRefresh={onRefresh}
            onItemPress={onItemPress}
          />
        </View> */}
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
