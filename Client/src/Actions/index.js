export const SELECT_LOGIN_OR_SIGNIN = 'SELECT_LOGIN_OR_SIGNIN';
export const GET_USER_INFO = 'GET_USER_INFO';
export const SELECT_SOCIAL_LOGIN_BUTTON = 'SELECT_SOCIAL_LOGIN_BUTTON';
export const GET_MY_FAVORITE_MARKERS = 'GET_MY_FAVORITE_MARKERS';
export const GET_MY_STORE_MARKERS = 'GET_MY_STORE_MARKERS';

export const selectLoginOrSignin = (boolean) => ({
  type: SELECT_LOGIN_OR_SIGNIN,
  payload: boolean
});

export const getUserInfo = (userInfo) => ({
  type: GET_USER_INFO,
  payload: userInfo
});

export const selectSocialLoginBtn = (btnState) => ({
  type: SELECT_SOCIAL_LOGIN_BUTTON,
  payload: btnState
});

export const getMyFavoriteMarkers = (markerInfo) => ({
  type: GET_MY_FAVORITE_MARKERS,
  payload: {
    compId: markerInfo.id,
    compName: markerInfo.storeName,
    compAddr: markerInfo.address,
    compCall: markerInfo.callNum,
    tag: markerInfo.tagName,
    desc: markerInfo.description,
    lat: markerInfo.latitude,
    lon: markerInfo.longitude,
    isPark: markerInfo.parking,
    isBook: markerInfo.booking,
    fileName: markerInfo.fileName
  }
});

export const getMyStoreMarkers = (storeMarkerInfo) => ({
  type: GET_MY_STORE_MARKERS,
  payload: {
    compId: storeMarkerInfo.id,
    compName: storeMarkerInfo.storeName,
    compAddr: storeMarkerInfo.address,
    compCall: storeMarkerInfo.callNum,
    tag: storeMarkerInfo.tagName,
    desc: storeMarkerInfo.description,
    lat: storeMarkerInfo.latitude,
    lon: storeMarkerInfo.longitude,
    isPark: storeMarkerInfo.parking,
    isBook: storeMarkerInfo.booking,
    fileName: storeMarkerInfo.fileName
  }
});
