import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import sheet from '../../../styles/sheet';
import colors from '../../../styles/colors';
import UpView from '../../../components/common/UpView';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {parseCoords} from '../../../utils/coords';
import {GoBack} from '../../../components/navigation';
import {PointMinimap} from '../../../components/Route';

const GroupDetails = ({navigation, route}) => {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    if (route.params) {
      setGroup(route.params.group);
    }
  }, []);

  navigation.setOptions({
    headerLeft: () => <GoBack onPress={() => navigation.navigate('Groups')} />,
  });

  return group ? (
    <SafeAreaView style={styles.flexed}>
      <View style={styles.upperContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {group.name}
        </Text>
        <View style={styles.statsRow}>
          <View style={sheet.columnCenter}>
            <Text style={styles.totalRides}>
              {group.rideCount ? group.rideCount : 0}
            </Text>
            <Text style={styles.rides}>total rides</Text>
          </View>
          <View style={sheet.columnCenter}>
            <Text style={styles.totalMembers}>
              {group.userCount ? group.userCount : 0}
            </Text>
            <Text style={styles.members}>members</Text>
          </View>
        </View>
        <View style={styles.cardGrid}>
          <UpView borderRadius={8} style={styles.upview} onPress={() => null}>
            <View style={styles.cardContent}>
              <MaterialIcon name="settings" size={40} color={colors.blue} />
              <Text style={styles.cardLabel}>Settings</Text>
            </View>
          </UpView>
          <UpView borderRadius={8} style={styles.upview} onPress={() => null}>
            <View style={styles.cardContent}>
              <Ionicon name="ios-car" size={40} color={colors.blue} />
              <Text style={styles.cardLabel}>Your rides</Text>
            </View>
          </UpView>
        </View>
        <View style={styles.flexed}>
          <PointMinimap coordinates={parseCoords(group.location)} />
        </View>
      </View>
    </SafeAreaView>
  ) : null;
};

const styles = StyleSheet.create({
  upperContainer: {
    flex: 1,
    paddingTop: 18,
  },
  name: {
    ...sheet.textBold,
    color: colors.grayDark,
    fontSize: 32,
    paddingHorizontal: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 18,
    paddingHorizontal: 16,
  },
  totalRides: {
    ...sheet.textBold,
    color: colors.green,
    fontSize: 40,
  },
  rides: {
    ...sheet.textBold,
    color: colors.green,
    fontSize: 18,
  },
  totalMembers: {
    ...sheet.textBold,
    color: colors.blue,
    fontSize: 40,
  },
  members: {
    ...sheet.textBold,
    color: colors.blue,
    fontSize: 18,
  },
  cardGrid: {
    marginVertical: 27,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardLabel: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 20,
  },
  upview: {
    width: '48%',
    height: 135,
  },
  flexed: {
    flex: 1,
  },
});

export default GroupDetails;
