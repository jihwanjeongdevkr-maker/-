
import React from 'react';
import { ServiceCategory, ServiceDetail } from '../types';

const Services: React.FC = () => {
  const services: ServiceDetail[] = [
    {
      id: ServiceCategory.PSYCHOLOGY,
      title: '심리상담',
      description: '일상에서 느끼는 우울, 불안, 스트레스를 다룹니다. 내면의 목소리에 집중하여 심리적 안정을 되찾을 수 있도록 돕습니다.',
      imageUrl: 'https://picsum.photos/id/225/800/600',
    },
    {
      id: ServiceCategory.CAREER,
      title: '진로상담',
      description: '나에게 맞는 길은 무엇일까 고민하는 학생과 직장인들을 위해 성격 유형과 적성을 분석하고 미래를 설계합니다.',
      imageUrl: 'https://picsum.photos/id/352/800/600',
    },
    {
      id: ServiceCategory.RELATIONSHIP,
      title: '연애상담',
      description: '관계에서 반복되는 문제, 이별의 아픔, 건강한 소통 방식을 찾고 싶은 분들을 위한 맞춤 솔루션을 제공합니다.',
      imageUrl: 'https://picsum.photos/id/1004/800/600',
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">상담 분야</h2>
          <p className="text-gray-600">당신의 고민에 맞는 전문 상담을 선택해 보세요.</p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <div key={service.id} className={`flex flex-col md:flex-row items-center gap-12 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="w-full md:w-1/2">
                <img src={service.imageUrl} alt={service.title} className="rounded-3xl shadow-lg w-full h-[400px] object-cover" />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <h3 className="text-3xl font-bold text-teal-800">{service.title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-teal-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    개별 맞춤 상담 커리큘럼
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-teal-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    과학적 검사 및 분석 도구 활용
                  </li>
                  <li className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-teal-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    지속적인 사후 관리 프로그램
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
