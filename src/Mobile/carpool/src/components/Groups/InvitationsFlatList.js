import React from 'react';
import {FlatList, RefreshControl, StyleSheet} from 'react-native';
import InvitationListItem from './InvitationListItem';
import colors from '../../styles/colors';
import {ListEmptyComponent} from '../common/lists';

const InvitationsFlatList = ({data, loading, onAccept, onDecline}) => (
  <FlatList
    data={data}
    style={styles.flatlist}
    contentContainerStyle={styles.contentContainer}
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
    ListEmptyComponent={
      <ListEmptyComponent
        title="You don't have any invitations"
        onRefresh={() => null}
      />
    }
  />
);

const styles = StyleSheet.create({
  flatlist: {
    width: '100%',
  },
  contentContainer: {
    paddingTop: 54,
    paddingHorizontal: 16,
  },
});

export default InvitationsFlatList;
