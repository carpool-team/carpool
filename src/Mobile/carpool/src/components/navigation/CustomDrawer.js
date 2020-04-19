import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import * as React from 'react';
import {Text, View} from 'react-native';
import {vw, vh} from '../../utils/constants';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

export default CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 2 * vh,
            borderBottomColor: colors.gray,
            borderBottomWidth: 0.1 * vh,
          }}>
          <View
            style={{
              width: 18 * vw,
              height: 18 * vw,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,
              backgroundColor: colors.background,
              borderRadius: 9999,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="user" color={colors.grayDark} size={10 * vw} />
          </View>
          <View
            style={{
              height: 18 * vw,
              flex: 1,
              paddingLeft: 4 * vw,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Text>John</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>5.00</Text>
              <Icon
                name="star"
                size={8 * vw}
                color={colors.yellow}
                style={{marginLeft: 2 * vw}}
              />
            </View>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
  // return (
  //   <DrawerContentScrollView {...props}>
  //     <DrawerItemList {...props} />
  //   </DrawerContentScrollView>
  // );
};
