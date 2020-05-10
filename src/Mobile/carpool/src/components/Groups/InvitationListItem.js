import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import UpView from '../common/UpView';
import {vh, vw} from '../../utils/constants';
import sheet from '../../styles/sheet';
import colors from '../../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {CircleButton} from '../common/buttons';

const InvitationListItem = ({item, onAccept, onDecline}) => {
  return (
    <UpView borderRadius={4 * vw} style={styles.card}>
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
          }}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.author}>
            {`${item.author.firstName} ${item.author.lastName} invited you`}
          </Text>
        </View>
        <View style={{...sheet.rowCenter}}>
          <MaterialIcon name="group" size={10 * vw} color={colors.grayDark} />
          <Text style={styles.members}>{item.members}</Text>
          <View style={styles.bottomRow}>
            <CircleButton
              size={14 * vw}
              icon={
                <MaterialIcon name="close" size={8 * vw} color={colors.red} />
              }
              style={{marginRight: 4 * vw}}
              onPress={onDecline}
            />
            <CircleButton
              size={14 * vw}
              icon={
                <MaterialIcon name="check" size={8 * vw} color={colors.green} />
              }
              onPress={() => onAccept(item)}
            />
          </View>
        </View>
      </View>
    </UpView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 22 * vh,
  },
  container: {
    flex: 1,
    paddingTop: 2 * vh,
    paddingBottom: 4 * vh,
    paddingHorizontal: 5 * vw,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    ...sheet.textSemiBold,
    fontSize: 5 * vw,
    color: colors.grayVeryDark,
  },
  author: {
    ...sheet.textRegular,
    fontSize: 3.5 * vw,
    color: colors.grayDark,
  },
  members: {
    ...sheet.textSemiBold,
    fontSize: 5 * vw,
    marginLeft: 2 * vw,
    color: colors.blue,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
});

export default InvitationListItem;
