import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Alert} from 'react-native';
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
      header: props => <Header {...props} />,
    });
  }, []);

  useEffect(() => {
    if (results) {
      results.body.features.length &&
        setPlaceName(results.body.features[0].place_name);
    }
  }, [results]);

  useEffect(() => {
    group &&
      navigation.setOptions({
        title: group.name,
      });
  }, [group]);

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
            dispatch(actions.leaveGroup(group.groupId))
              .then(() => {
                navigation.goBack();
              })
              .catch(err => {
                // Soon to be 403
                if (err.status === 406) {
                  Alert.alert(
                    'Warning!',
                    'You cannot leave your own group. To delete one of your groups go to https://carpool.com.pl',
                    [
                      {
                        text: 'Ok',
                        style: 'default',
                      },
                    ],
                  );
                }
              });
          },
        },
      ],
    );
  };

  const onRidesPress = () => {
    navigation.navigate('GroupRides', {group});
  };

  return group ? (
    <SafeScroll minHeight={500}>
      <View style={styles.upperContainer}>
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
          <UpView
            borderRadius={8}
            style={styles.leaveUpView}
            onPress={onLeaveGroup}>
            <View style={styles.cardContent}>
              <MaterialIcon
                name="exit-to-app"
                color={colors.orange}
                size={32}
              />
              <Text style={styles.cardLabel}>Leave</Text>
            </View>
          </UpView>
          <UpView
            borderRadius={8}
            style={styles.ridesUpView}
            onPress={onRidesPress}>
            <View style={styles.cardContent}>
              <Ionicon name="ios-car" size={32} color={colors.blue} />
              <Text style={styles.cardLabel}>Rides</Text>
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
  },
  topRow: {
    ...sheet.rowCenterSplit,
    paddingHorizontal: 16,
  },
  name: {
    ...sheet.textBold,
    color: colors.grayDark,
    fontSize: 22,
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
    fontSize: 26,
  },
  rides: {
    ...sheet.textMedium,
    color: colors.green,
    fontSize: 14,
  },
  totalMembers: {
    ...sheet.textBold,
    color: colors.blue,
    fontSize: 26,
  },
  members: {
    ...sheet.textMedium,
    color: colors.blue,
    fontSize: 14,
  },
  cardGrid: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 16,
  },
  leaveUpView: {
    width: '35%',
    height: 80,
  },
  ridesUpView: {
    width: '60%',
    height: 80,
  },
  flexed: {
    flex: 1,
  },
  addressWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    ...sheet.rowCenter,
  },
  icon: {
    marginRight: 12,
  },
  placeName: {
    ...sheet.textSemiBold,
    color: colors.grayDark,
    fontSize: 14,
    flex: 1,
  },
});

export default GroupDetails;
