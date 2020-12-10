import React from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../../store/actions';
import {InvitationsList} from '../../../components/Groups';

const Invitations = ({navigation}) => {
  const invitations = useSelector(store => store.accountReducer.invitations);
  const dispatch = useDispatch();

  const onAccept = item => {
    dispatch(actions.acceptInvitation(item.id))
      .then(res => {
        console.log('SUCCESS');
      })
      .catch(err => alert('Error ocurred'));
  };

  const onDecline = async item => {
    dispatch(actions.declineInvitation(item.id))
      .then(res => {
        console.log('SUCCESS');
      })
      .catch(err => alert('Error ocurred'));
  };

  const onRefresh = () => dispatch(actions.getInvitations());

  return (
    <SafeAreaView style={{flex: 1}}>
      <InvitationsList
        data={invitations.data}
        loading={invitations.loading}
        onDecline={onDecline}
        onAccept={onAccept}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default Invitations;
