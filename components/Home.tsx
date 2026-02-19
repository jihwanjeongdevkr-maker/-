
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://picsum.photos/id/431/1920/1080" 
          alt="Peaceful background" 
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            당신의 지친 마음이<br />쉬어갈 수 있는 곳
          </h1>
          <p className="text-xl text-teal-50 mb-8 max-w-2xl mx-auto">
            청소년부터 노년기까지, 우리 모두의 삶에는 위로가 필요한 순간이 있습니다.<br />
            마음안식 스튜디오가 당신의 곁에서 함께하겠습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/booking" className="bg-teal-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-teal-700 transition-all shadow-lg">
              상담 신청하기
            </Link>
            <Link to="/services" className="bg-white text-teal-700 px-8 py-3 rounded-full text-lg font-medium hover:bg-gray-100 transition-all shadow-lg">
              상담 분야 보기
            </Link>
          </div>
        </div>
      </div>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">왜 '마음안식'인가요?</h2>
            <div className="w-16 h-1 bg-teal-500 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">전문적인 상담진</h3>
              <p className="text-gray-600 leading-relaxed">경험 많은 공인 상담사들이 귀하의 고민을 깊이 있게 듣고 공감합니다.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">유연한 진행 방식</h3>
              <p className="text-gray-600 leading-relaxed">대면 상담은 물론, 전국 어디서나 편안하게 화상 상담을 받으실 수 있습니다.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">철저한 비밀 보장</h3>
              <p className="text-gray-600 leading-relaxed">모든 상담 내용은 윤리 규정에 따라 안전하고 철저하게 비밀이 유지됩니다.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
