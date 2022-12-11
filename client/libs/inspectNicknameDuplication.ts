import { client } from './client';

interface IError {
  response: {
    data: {
      status: number;
    };
  };
}
export const inspectNicknameDuplication = async (
  nickname: string,
  editNickname: string,
) => {
  if (nickname !== editNickname) {
    try {
      await client.post('/api/auth/nickname', {
        nickname: editNickname,
      });
    } catch (error) {
      const customError = error as IError;
      switch (customError.response.data.status) {
        case 400:
          alert('닉네임은 최소 1글자, 최대 7글자, 자음, 모음 불가입니다');
          break;
        case 409:
          alert('죄송합니다 중복된 닉네임이네요 😭');
          break;
        default:
          alert('알 수 없는 오류가 다시 시도해 주세요 😭');
      }
    }
  }
};
