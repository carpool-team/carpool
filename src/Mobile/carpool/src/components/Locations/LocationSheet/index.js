import React from 'react';
import {View, Text} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {colors, sheet} from '../../../styles';
import {StandardButton} from '../../common/buttons';
import {styles} from './index.styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const LocationSheet = ({_onSelect, _onGoBack, location}) => {
  const _renderContent = () => (
    <View style={styles.content}>
      <View style={sheet.rowCenter}>
        <Icon
          name="map-marker"
          size={40}
          color={colors.blue}
          style={styles.marker}
        />
        <Text style={styles.placeName}>{location.place_name}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <StandardButton
          color={colors.red}
          title="Go back"
          onPress={_onGoBack}
          width="45%"
        />
        <StandardButton
          color={colors.green}
          title="Select"
          onPress={_onSelect}
          width="45%"
        />
      </View>
    </View>
  );

  const _renderHeader = () => <View style={styles.header} />;

  return (
    <BottomSheet
      snapPoints={[0, 225]}
      initialSnap={1}
      renderContent={_renderContent}
      renderHeader={_renderHeader}
    />
  );
};

export default LocationSheet;
