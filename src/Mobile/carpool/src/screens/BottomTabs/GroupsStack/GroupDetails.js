import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import sheet from '../../../styles/sheet';
import colors from '../../../styles/colors';
import UpView from '../../../components/common/UpView';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {parseCoords} from '../../../utils/coords';
import {GoBack, Header} from '../../../components/navigation';
import {PointMinimap} from '../../../components/Route';
import {useReverseGeocoding} from '../../../hooks';
import {SafeScroll} from '../../../components/common/wrappers';
import * as actions from '../../../store/actions';
import {useDispatch} from 'react-redux';

const GroupDetails = ({navigation, route}) => {
  const [group, setGroup] = useState(null);
  const [placeName, setPlaceName] = useState(null);

  const [results, loading, error, _getPlaceName] = useReverseGeocoding();

  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      setGroup(route.params.group);
      _getPlaceName(parseCoords(route.params.group.location));
    }
    navigation.setOptions({
      headerLeft: () => (
        <GoBack onPress={() => navigation.navigate('Groups')} />
      ),
      header: props => <Header {...props} hideSwitch />,
    });
  }, []);

  useEffect(() => {
    if (results) {
      results.body.features.length &&
        setPlaceName(results.body.features[0].place_name);
    }
  }, [results]);

  const onLeaveGroup = () => {
    Alert.alert(
      'Warning!',
      `Are you sure you want to leave ${group.name}? This cannot be undone`,
      [
        {
          text: 'Cancel',
          style: 'default',
        },
        {
          text: 'Leave group',
          style: 'destructive',
          onPress: () => {
            dispatch(actions.leaveGroup(group.groupId)).then(() => {
              navigation.goBack();
            });
          },
        },
      ],
    );
  };

  return group ? (
    <SafeScroll minHeight={500}>
      <View style={styles.upperContainer}>
        <View style={styles.topRow}>
          <Text style={styles.name} numberOfLines={1}>
            {group.name}
          </Text>
          <TouchableOpacity onPress={onLeaveGroup}>
            <MaterialIcon name="exit-to-app" color={colors.orange} size={32} />
          </TouchableOpacity>
        </View>
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
        <View style={styles.addressWrapper}>
          <Icon
            name="map-marker"
            color={colors.blue}
            size={32}
            style={styles.icon}
          />
          {loading ? (
            <ActivityIndicator color={colors.blue} size="small" />
          ) : (
            <Text numberOfLines={2} style={styles.placeName}>
              {placeName}
            </Text>
          )}
        </View>
        <View style={styles.flexed}>
          <PointMinimap coordinates={parseCoords(group.location)} />
        </View>
      </View>
    </SafeScroll>
  ) : null;
};

const styles = StyleSheet.create({
  upperContainer: {
    flex: 1,
    paddingTop: 18,
  },
  topRow: {
    ...sheet.rowCenterSplit,
    paddingHorizontal: 16,
  },
  name: {
    ...sheet.textBold,
    color: colors.grayDark,
    fontSize: 25,
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
    fontSize: 30,
  },
  rides: {
    ...sheet.textMedium,
    color: colors.green,
    fontSize: 16,
  },
  totalMembers: {
    ...sheet.textBold,
    color: colors.blue,
    fontSize: 30,
  },
  members: {
    ...sheet.textMedium,
    color: colors.blue,
    fontSize: 16,
  },
  cardGrid: {
    paddingTop: 16,
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
    height: 100,
  },
  flexed: {
    flex: 1,
  },
  addressWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    ...sheet.rowCenter,
  },
  icon: {
    marginRight: 12,
  },
  placeName: {
    ...sheet.textMedium,
    color: colors.grayDark,
    fontSize: 16,
    flex: 1,
  },
});

export default GroupDetails;
