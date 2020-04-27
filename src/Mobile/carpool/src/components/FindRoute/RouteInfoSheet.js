import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {vh, vw} from '../../utils/constants';
import colors from '../../styles/colors';
import sheet from '../../styles/sheet';
import BottomSheet from 'reanimated-bottom-sheet';

const RouteInfoSheet = ({route}) => {
  const _renderContent = () => {
    const {duration, distance} = route;

    return (
      <View style={styles.content}>
        <View style={sheet.rowCenter}>
          <Text>
            <Text style={styles.distance}>{(distance / 1000).toFixed(1)}</Text>
            <Text style={styles.kilometers}> km</Text>
          </Text>
        </View>
        <View style={sheet.rowCenter}>
          <Text>
            <Text style={styles.duration}>{Math.round(duration / 60)}</Text>
            <Text style={styles.minutes}> min</Text>
          </Text>
        </View>
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
    paddingTop: 1 * vh,
    paddingBottom: 6 * vh,
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
});

export default RouteInfoSheet;
