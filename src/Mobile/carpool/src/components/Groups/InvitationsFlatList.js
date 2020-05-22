import React from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {vw, vh} from '../../utils/constants';
import InvitationListItem from './InvitationListItem';
import colors from '../../styles/colors';

const InvitationsFlatList = ({data, loading, onAccept, onDecline}) => {
  return (
    <FlatList
      data={data}
      style={{
        width: '100%',
      }}
      contentContainerStyle={{
        paddingTop: 6 * vh,
        paddingHorizontal: 4 * vw,
      }}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <InvitationListItem
          item={item}
          onAccept={onAccept}
          onDecline={onDecline}
        />
      )}
      refreshControl={
        <RefreshControl
          colors={[colors.green]}
          tintColor={colors.green}
          refreshing={loading}
        />
      }
    />
  );
};

export default InvitationsFlatList;
