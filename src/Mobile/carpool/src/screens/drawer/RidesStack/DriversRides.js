import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {colors, sheet} from '../../../styles';
import {StandardButton} from '../../../components/common/buttons';
import {Rides, PastRides} from '../../../components/Driver';

const DriversRides = () => {
  const [isUpcoming, setIsUpcoming] = useState(true);

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
        {isUpcoming ? <Rides /> : <PastRides />}
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
});

export default DriversRides;
