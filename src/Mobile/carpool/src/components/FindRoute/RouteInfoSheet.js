import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {vh, vw} from '../../utils/constants';
import colors from '../../styles/colors';
import sheet from '../../styles/sheet';
import BottomSheet from 'reanimated-bottom-sheet';
import {useNavigation} from '@react-navigation/core';
import {StandardButton} from '../common/buttons';

const RouteInfoSheet = ({route, onGoBack}) => {
  const navigation = useNavigation();

  const _renderContent = () => {
    const {duration, distance} = route;

    const minutes = Math.round(duration / 60);
    const hours = (minutes - (minutes % 60)) / 60;
    const extraMinutes = minutes % 60;

    const renderTime = () => {
      return minutes > 60 ? (
        <Text>
          <Text style={styles.duration}>{hours}</Text>
          <Text style={styles.minutes}>h </Text>
          <Text style={styles.duration}>{extraMinutes}</Text>
          <Text style={styles.minutes}>min</Text>
        </Text>
      ) : (
        <Text>
          <Text style={styles.duration}>{minutes}</Text>
          <Text style={styles.minutes}> min</Text>
        </Text>
      );
    };

    const kilometers = (distance / 1000).toFixed(0);
    const meters = (distance / 1000).toFixed(1) * 1000;

    const renderDistance = () => {
      return kilometers < 1 ? (
        <Text>
          <Text style={styles.distance}>{meters}</Text>
          <Text style={styles.kilometers}>m</Text>
        </Text>
      ) : (
        <Text>
          <Text style={styles.distance}>{kilometers}</Text>
          <Text style={styles.kilometers}>km</Text>
        </Text>
      );
    };

    return (
      <View style={styles.content}>
        <View style={sheet.rowCenter}>{renderDistance()}</View>
        <View style={sheet.rowCenter}>{renderTime()}</View>
        <StandardButton
          color={colors.red}
          onPress={onGoBack ? onGoBack : () => navigation.goBack()}
          title="Go back"
          width={25 * vw}
        />
      </View>
    );
  };

  const _renderHeader = () => <View style={styles.header}></View>;

  return (
    <BottomSheet
      snapPoints={[0, 15 * vh]}
      initialSnap={1}
      renderContent={_renderContent}
      renderHeader={_renderHeader}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.background,
    height: '100%',
    paddingTop: 2 * vh,
    paddingBottom: 5 * vh,
    paddingHorizontal: 8 * vw,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  distance: {
    ...sheet.textSemiBold,
    fontSize: 7 * vw,
    color: colors.blue,
  },
  kilometers: {
    ...sheet.textSemiBold,
    fontSize: 4.5 * vw,
    color: colors.blue,
  },
  duration: {
    ...sheet.textSemiBold,
    fontSize: 7 * vw,
    color: colors.grayDark,
  },
  minutes: {
    ...sheet.textSemiBold,
    fontSize: 4.5 * vw,
    color: colors.grayDark,
  },
  header: {
    backgroundColor: colors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
    borderTopRightRadius: 20 * vw,
    borderTopLeftRadius: 20 * vw,
    height: 2.5 * vh,
  },
  button: {
    width: 25 * vw,
    height: 6 * vh,
  },
  goBack: {
    color: colors.red,
    fontSize: 2.25 * vh,
    ...sheet.textBold,
  },
});

export default RouteInfoSheet;
