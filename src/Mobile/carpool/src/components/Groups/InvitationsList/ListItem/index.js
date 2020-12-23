import React from 'react';
import {View, Text} from 'react-native';
import UpView from '../../../common/UpView';
import colors from '../../../../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {CircleButton} from '../../../common/buttons';
import {styles} from './index.styles';

const ListItem = ({item, onAccept, onDecline}) => {
  return (
    <UpView borderRadius={16} style={styles.card}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {item.groupDto.name}
          </Text>
          <Text style={styles.author}>{`${item.invitingUser.firstName} ${
            item.invitingUser.lastName
          } invited you`}</Text>
        </View>
        <View style={styles.content}>
          <MaterialIcon name="group" size={40} color={colors.grayDark} />
          <Text style={styles.members}>{item.groupDto.userCount}</Text>
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

export default ListItem;
