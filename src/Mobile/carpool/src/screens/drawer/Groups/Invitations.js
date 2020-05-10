import React from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';
import UpView from '../../../components/common/UpView';
import {vw, vh} from '../../../utils/constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../../styles/colors';
import sheet from '../../../styles/sheet';
import {CircleButton} from '../../../components/common/buttons';
import InvitationsFlatList from '../../../components/Groups/InvitationsFlatList';
import {exampleInvitations} from '../../../examples/groups';

const Invitations = ({navigation}) => {
  const renderAlert = () => {
    Alert.alert(
      'Warning!',
      'Are you sure you want to decline this invitation?',
      [
        {
          text: 'Decline',
          onPress: () => null,
          style: 'destructive',
        },
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
      ],
    );
  };

  const onAccept = item => {
    console.log(item);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <InvitationsFlatList
        data={exampleInvitations}
        loading={false}
        onDecline={renderAlert}
        onAccept={onAccept}
      />
    </SafeAreaView>
  );
};

export default Invitations;
