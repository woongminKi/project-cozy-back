exports.TOKEN = {
  accessTokenLimit: '1h',
  refreshTokenLimit: '7d',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
};

exports.ERROR_MESSAGE = {
  jwtExpired: 'jwt expired',
  jwtMalformed: 'jwt malformed',
};

exports.MESSAGE = {
  GET_USER_INFO_FAIL:
    '유저 정보를 불러오는데 실패했습니다. 다시 로그인해주세요.',
  ALREADY_JOINED_USER: '이미 등록된 유저입니다.',
  USER_JOIN_SUCCESS: '유저 등록 성공',
  REGISTER_ROOM_INFO_FAIL: '방 생성하는데 실패했습니다.',
  REGISTER_ROOM_INFO_SUCCESS: '방 생성을 성공했습니다.',
  GET_ROOM_INFO_FAIL:
    '방 정보를 불러오는데 실패했습니다. 다시 방을 만들어주세요.',
  DELETE_ROOM_INFO_SUCCESS: '방이 삭제됐습니다.',
  UNAUTHORIZED_TOKEN: '유효하지 않은 토큰입니다.',
  EXPIRED_TOKEN: '토근이 만료 됐습니다. 새로 로그인 해주세요.',
  MALFORMED_TOKEN: '잘못 된 토큰입니다. 새로 로그인 해주세요.',
  GET_PARTICIPANT_USER_INFO_FAIL:
    '방에 참가한 유저 데이터 갖고 오는데 실패했습니다.',
  FORBIDDEN: 'Forbidden',
  NOT_FOUND: 'Not found',
};
