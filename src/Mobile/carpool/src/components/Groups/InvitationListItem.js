import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import UpView from '../common/UpView';
import sheet from '../../styles/sheet';
import colors from '../../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {CircleButton} from '../common/buttons';

const InvitationListItem = ({item, onAccept, onDecline}) => {
  return (
    <UpView borderRadius={16} style={styles.card}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {item.group.name}
          </Text>
          <Text style={styles.author}>John Doe invited you</Text>
        </View>
        <View style={styles.content}>
          <MaterialIcon name="group" size={40} color={colors.grayDark} />
          <Text style={styles.members}>{item.group.userCount}</Text>
          <View style={styles.bottomRow}>
            <CircleButton
              size={56}
              icon={<MaterialIcon name="close" size={32} color={colors.red} />}
              style={styles.circleButton}
              onPress={() => onDecline(item)}
            />
            <CircleButton
              size={56}
              icon={
                <MaterialIcon name="check" size={32} color={colors.green} />
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
    height: 160,
    marginBottom: 36,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    ...sheet.textSemiBold,
    fontSize: 20,
    color: colors.grayVeryDark,
  },
  author: {
    ...sheet.textRegular,
    fontSize: 14,
    color: colors.grayDark,
  },
  members: {
    ...sheet.textSemiBold,
    fontSize: 20,
    marginLeft: 8,
    color: colors.blue,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  },
  header: {
    width: '100%',
  },
  content: {
    ...sheet.rowCenter,
  },
  circleButton: {
    marginRight: 16,
  },
});

export default InvitationListItem;
