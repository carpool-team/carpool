import React, {useContext} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import InvitationsFlatList from '../../../components/Groups/InvitationsFlatList';
import {
  AccountContext,
  createGetUserInvitations,
  createGetUserGroups,
} from '../../../context/AccountContext';
import {apiRequest} from '../../../utils/apiRequest';
import {METHODS, ENDPOINTS} from '../../../hooks';

const Invitations = ({navigation}) => {
  const {accountState, dispatch} = useContext(AccountContext);
  const {data: invitations, loading} = accountState.invitations;

  const onAccept = async item => {
    try {
      const response = await apiRequest(
        METHODS.PUT,
        ENDPOINTS.CHANGE_INVITATION_STATE,
        {
          id: item.id,
          isAccepted: true,
        },
      );

      // console.log(response);
      createGetUserInvitations(dispatch);
      createGetUserGroups(dispatch);
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  const onDecline = async item => {
    try {
      const response = await apiRequest(
        METHODS.PUT,
        ENDPOINTS.CHANGE_INVITATION_STATE,
        {
          id: item.id,
          isAccepted: false,
        },
      );

      //console.log(response);
      createGetUserInvitations(dispatch);
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <InvitationsFlatList
        data={invitations}
        loading={loading}
        onDecline={onDecline}
        onAccept={onAccept}
      />
    </SafeAreaView>
  );
};

export default Invitations;
