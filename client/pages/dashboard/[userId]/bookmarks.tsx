import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';

import { renderingAtom } from '@atoms/renderingAtom';
import { userDashboardAtom } from '@atoms/userAtom';

import { client } from '@libs/client';

import { Footer } from '@components/common/Footer';
import { Header } from '@components/common/Header';
import { Seo } from '@components/common/Seo';
import { CarouselBookmarks } from '@components/dashboard/CarouselBookmarks';
import { CarouselReview } from '@components/dashboard/CarouselReview';
import {
  defaultAvatar,
  defaultUserDashboard,
} from '../../../libs/ defaultUserDashboard';
import AsideComponent from '@components/dashboard/AsideComponent';

const className = 'text-xl font-semibold hover:cursor-pointer';

const DashboardBookmarks: NextPage = () => {
  const rendering = useRecoilValue(renderingAtom);
  const [userDashboard, setUserDashboard] = useRecoilState(userDashboardAtom);
  const setDefaultUserDashboard = () => {
    setUserDashboard(defaultAvatar && defaultUserDashboard);
  };
  const [userId, setUserId] = useState<string | string[] | undefined>('');
  const router = useRouter();
  const getUser = async () => {
    try {
      if (userId) {
        const res = await client.get(`/api/users/${userId}/dashboard`);
        setUserDashboard(res.data);
      }
    } catch (error) {
      setDefaultUserDashboard();
    }
  };

  useEffect(() => {
    setUserId(router.query.userId);
  });

  useEffect(() => {
    getUser();
  }, [userId, rendering]);

  return (
    <>
      <Seo
        title={
          userDashboard.nickname !== '탈퇴한 유저'
            ? userDashboard.nickname
            : '대시보드'
        }
      />
      <Header />
      <main className="w-[1280px] min-h-screen mx-auto flex gap-12 mb-12">
        <AsideComponent />
        <div className="w-full">
          {/* <Grass /> */}
          <div className="mb-8 flex items-baseline">
            <div className="border-b-2 py-4 pr-6">
              <Link href={`/dashboard/${router.query.userId}`}>
                <span className={className}>❓ 나의 질문</span>
              </Link>
            </div>
            <div className="border-b-2 py-4 pr-6">
              <Link href={`/dashboard/${router.query.userId}/answers`}>
                <span className={className}>❗ 나의 답변</span>
              </Link>
            </div>
            <div className="border-b-2 py-4 pr-6 border-main-orange">
              <Link href={`/dashboard/${router.query.userId}/bookmarks`}>
                <span className="text-xl font-semibold hover:cursor-pointer">
                  🔖 북마크
                </span>
              </Link>
            </div>
          </div>
          <CarouselBookmarks />
          <div className="mt-20 mb-8">
            <span className="text-xl font-semibold">☀️ 응원 메세지</span>
          </div>
          <CarouselReview />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default DashboardBookmarks;
