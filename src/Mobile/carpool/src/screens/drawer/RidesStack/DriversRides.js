import React, {useState, useContext, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';
import {vh, vw} from '../../../utils/constants';
import {StandardButton} from '../../../components/common/buttons';
import {
  DriverContext,
  createGetDriversRides,
  createGetDriversPastRides,
} from '../../../context/DriverContext';
import DriversRidesFlatList from '../../../components/Driver/DriversRidesFlatList';

const DriversRides = () => {
  const [isUpcoming, setIsUpcoming] = useState(true);
  const [data, setData] = useState([]);

  const {
    driverState: {driversRides, driversPastRides},
    dispatch,
  } = useContext(DriverContext);

  const onRefresh = () => {
    createGetDriversRides(dispatch);
    createGetDriversPastRides(dispatch);
  };

  useEffect(() => {
    if (isUpcoming) {
      setData([...driversRides.data]);
    } else {
      setData([...driversPastRides.data]);
    }
  }, [isUpcoming]);

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
          <DriversRidesFlatList
            data={data}
            loading={driversRides.loading || driversPastRides.loading}
            onRefresh={onRefresh}
            onItemPress={console.log}
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
    paddingTop: 4 * vh,
  },
  topRow: {
    width: '100%',
    paddingHorizontal: 4 * vw,
  },
  flatlistWrapper: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 4 * vh,
    width: '100%',
  },
});

export default DriversRides;
