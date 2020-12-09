import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

const readData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);

    return value;
  } catch (e) {
    console.log(e);
  }
};

const removeData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

const STORAGE_KEYS = {
  token: 'TOKEN',
  refreshToken: 'REFRESH_TOKEN',
  userId: 'USER_ID',
};

export {STORAGE_KEYS, storeData, readData, removeData};
