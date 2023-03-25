import { GetServerSideProps, NextPage } from 'next';
import { toast } from 'react-toastify';

import { Footer } from '@components/common/Footer';
import { Header } from '@components/common/Header';
import { Loader } from '@components/common/Loader';
import { Seo } from '@components/common/Seo';

import { AuthResp } from '@type/login';

import { useCheckAuth } from '../../../hooks/useCheckAuth';
import { authCheckCode } from 'api/authCheckAndSetCodeApi';
import { Input } from '@components/common/Input';

const CheckAuthCode: NextPage = () => {
  const {
    register,
    handleSubmit,
    isSubmitting,
    setIsSubmitting,
    router,
    setEmail,
  } = useCheckAuth();

  const onValid = async ({ email, authKey }: AuthResp) => {
    try {
      authCheckCode(email, authKey);
      setIsSubmitting(true);
      setEmail(email);
      toast.success('임시 비밀번호가 발급되었습니다! 메일을 확인해주세요.😉');
      router.push('/login');
    } catch (error) {
      console.error('error', error);
      toast.error(
        '이메일이나 인증번호가 올바르게 입력되었는지 확인해주세요.🥲',
      );
    }
  };
  return (
    <>
      <Seo title="비밀번호 찾기 - 인증번호 확인" />
      <Header />
      <main className="flex flex-col justify-center items-center h-[79vh] bg-white">
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col mx-auto justify-center items-start mt-10 space-y-2"
        >
          <Input
            label="이메일"
            type="text"
            placeholder="이메일을 입력해주세요."
            register={{ ...register('email', { required: true }) }}
          />
          <Input
            label="인증번호"
            type="text"
            placeholder="인증번호를 입력하세요."
            register={{ ...register('authKey', { required: true }) }}
          />
          <button className="bg-main-yellow bg-opacity-80 py-3 w-full rounded-[20px] font-bold mb-5 hover:bg-main-yellow">
            {isSubmitting ? <Loader /> : '임시 비밀번호 발급'}
          </button>
          <p className="text-center relative top-20 font-bold text-xl">
            {isSubmitting ? <span>임시 비밀번호 전송 중....</span> : null}
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const content = context.req.url?.split('/')[1];
  return {
    props: {
      content,
    },
  };
};

export default CheckAuthCode;
