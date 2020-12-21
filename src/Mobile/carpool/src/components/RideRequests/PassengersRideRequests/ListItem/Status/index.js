import React from 'react';
import {Text} from 'react-native';
import {styles} from './index.styles';

const Status = ({item}) => {
  if (item.isPending) {
    return <Text style={styles.pending}>Pending</Text>;
  }
  if (item.isAccepted) {
    return <Text style={styles.accepted}>Accepted</Text>;
  }
  return <Text style={styles.rejected}>Rejected</Text>;
};

export default Status;
