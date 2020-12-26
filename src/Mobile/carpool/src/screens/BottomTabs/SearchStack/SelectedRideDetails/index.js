import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Alert} from 'react-native';
import {GoBack} from '../../../../components/navigation';
import moment from 'moment';
import {colors} from '../../../../styles';
import {RouteMinimap} from '../../../../components/Route';
import {GroupWaypoints} from '../../../../components/Ride';
import {StandardButton} from '../../../../components/common/buttons';
import {styles} from './index.styles';
import * as actions from '../../../../store/actions';
import {useDispatch} from 'react-redux';

const SelectedRideDetails = ({navigation, route}) => {
  const {data, ride} = route.params;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <GoBack onPress={navigation.goBack} />,
    });
  }, []);

  const onSelect = () => {
    setLoading(true);
    dispatch(
      actions.createRideRequest({
        rideId: ride.rideId,
        rideOwnerId: ride.owner.id,
      }),
    )
      .then(() => {
        setLoading(false);
        Alert.alert('Sucess', 'You have successfully created a ride request.', [
          {
            text: 'Ok',
            style: 'default',
            onPress: () => navigation.navigate('RidesStack'),
          },
        ]);
      })
      .catch(err => {
        setLoading(false);
        Alert.alert(
          'Error',
          'An error ocurred when trying to join this ride. Please try again.',
          [
            {
              text: 'Ok',
              style: 'default',
              onPress: () => navigation.goBack(),
            },
          ],
        );
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.container}>
        <View style={styles.topRow}>
          <Text style={styles.time}>
            {moment(ride.rideDate).format('HH:mm')}
          </Text>
          <Text style={styles.date}>
            {moment(ride.rideDate).format('Do MMMM YYYY')}
          </Text>
        </View>
        <View style={styles.mapWrapper}>
          <RouteMinimap
            stops={
              ride.rideDirection
                ? [
                    {coordinates: ride.group.location},
                    data.location,
                    {coordinates: ride.location},
                  ]
                : [
                    {coordinates: ride.location},
                    data.location,
                    {coordinates: ride.group.location},
                  ]
            }
          />
        </View>
        <View style={styles.waypoints}>
          <GroupWaypoints
            group={ride.group}
            location={{coordinates: ride.location}}
            swap={ride.rideDirection}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <StandardButton
          title="Select"
          color={colors.green}
          onPress={onSelect}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectedRideDetails;
