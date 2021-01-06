import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {colors} from '../../../styles';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {styles} from './index.styles';

const NewInvitations = ({onPress, count}) =>
  !!count && (
    <TouchableOpacity onPress={onPress} style={styles.invitations}>
      <Text style={styles.count}>{`${count} new invitation${
        count > 1 ? 's' : ''
      }`}</Text>
      <MaterialIcon name="group-add" color={colors.green} size={32} />
    </TouchableOpacity>
  );

export default NewInvitations;
