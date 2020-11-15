import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, sheet} from '../../styles';
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
          width={100}
        />
      </View>
    );
  };

  const _renderHeader = () => <View style={styles.header} />;

  return (
    <BottomSheet
      snapPoints={[0, 135]}
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
    paddingTop: 18,
    paddingBottom: 45,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  distance: {
    ...sheet.textSemiBold,
    fontSize: 28,
    color: colors.blue,
  },
  kilometers: {
    ...sheet.textSemiBold,
    fontSize: 18,
    color: colors.blue,
  },
  duration: {
    ...sheet.textSemiBold,
    fontSize: 28,
    color: colors.grayDark,
  },
  minutes: {
    ...sheet.textSemiBold,
    fontSize: 18,
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
    borderTopRightRadius: 80,
    borderTopLeftRadius: 80,
    height: 22,
  },
  button: {
    width: 100,
    height: 54,
  },
  goBack: {
    color: colors.red,
    fontSize: 20,
    ...sheet.textBold,
  },
});

export default RouteInfoSheet;
