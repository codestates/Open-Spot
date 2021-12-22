export const initialState = {
  isLoginTab: null,
  // isUser: false
  userInfo: {
    isLogin: false,
    role: null,
    name: null,
    email: null,
    profile: 'hdjsd.png', // 'https://api.open-spot.tk/profile.png'
    oauthLogin: null
  },
  myFavoriteMarkers: [
    {
      compId: '118393445',
      compName: '어글리 베이커리',
      compAddr: '서울시 성북구 ',
      compCall: '000-0000-0000',
      tag: '베이커리',
      desc: '매일매일 맛있는 빵이 가득 !',
      lat: '33',
      lon: '126',
      isPark: 0,
      isBook: 1
    }
  ],
  myStoreMarkers: [
    {
      compId: '118393445',
      compName: '어글리 베이커리',
      compAddr: '서울시 성북구 ',
      compCall: '000-0000-0000',
      tag: '베이커리',
      desc: '매일매일 맛있는 빵이 가득 !',
      lat: '33',
      lon: '126',
      isPark: 0,
      isBook: 1
    }
  ]
};
