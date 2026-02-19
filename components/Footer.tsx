
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <h3 className="text-white text-2xl font-bold mb-4">마음안식 심리상담 스튜디오</h3>
            <p className="max-w-sm mb-4">
              우리는 모든 이의 마음이 평온을 되찾고 자신만의 삶의 궤적을 그려나갈 수 있도록 돕습니다.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">연락처</h4>
            <ul className="space-y-2">
              <li>📍 서울특별시 강남구 테헤란로 123</li>
              <li>📞 010-1234-5678</li>
              <li>✉️ info@mind-rest.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">운영 시간</h4>
            <ul className="space-y-2">
              <li>평일: 09:00 - 17:00</li>
              <li>토요일: 10:00 - 16:00</li>
              <li>일요일/공휴일: 휴무</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2024 마음안식 심리상담 스튜디오. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
