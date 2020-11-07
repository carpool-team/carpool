import React from 'react';
import {SafeAreaView} from 'react-native';
import {apiRequest} from '../../../utils/apiRequest';
import {METHODS, ENDPOINTS} from '../../../hooks';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {InvitationsList} from '../../../components/Groups';

const Invitations = ({navigation}) => {
  const invitations = useSelector(store => store.accountReducer.invitations);
  const dispatch = useDispatch();

  const onAccept = async item => {
    try {
      // Not sure if it still works
      const response = await apiRequest(
        METHODS.PUT,
        ENDPOINTS.CHANGE_INVITATION_STATE(item.id),
        {
          groupInviteId: item.id,
          isAccepted: true,
        },
      );

      dispatch(actions.getInvitations());
      dispatch(actions.getGroups());
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

      dispatch(actions.getInvitations());
    } catch (err) {
      console.log('ERROR', err);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <InvitationsList
        data={invitations.data}
        loading={invitations.loading}
        onDecline={onDecline}
        onAccept={onAccept}
      />
    </SafeAreaView>
  );
};

export default Invitations;
