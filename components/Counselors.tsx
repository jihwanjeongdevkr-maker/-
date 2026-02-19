
import React from 'react';

const Counselors: React.FC = () => {
  const counselors = [
    {
      name: '김마음 원장',
      role: '대표 상담사 / 임상심리전문가',
      bio: '지난 15년간 다양한 연령대의 내담자들과 소통하며 마음의 상처를 치유해 왔습니다. 인간 중심 상담을 기반으로 따뜻한 위로를 전달합니다.',
      expertise: ['트라우마 치료', '우울/불안 장애', '가족 상담'],
      image: 'https://picsum.photos/id/64/400/500',
    },
    {
      name: '이안식 상담사',
      role: '시니어 상담사 / 진로 코치',
      bio: '불확실한 미래로 고민하는 청년들과 청소년들에게 명확한 가이드와 정서적 지지를 제공합니다.',
      expertise: ['진로 설계', '청소년 발달', '자존감 향상'],
      image: 'https://picsum.photos/id/91/400/500',
    },
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">함께하는 사람들</h2>
          <p className="text-gray-600">진심을 다해 귀하의 이야기를 듣겠습니다.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {counselors.map((c, idx) => (
            <div key={idx} className="flex flex-col md:flex-row bg-gray-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={c.image} alt={c.name} className="w-full md:w-64 h-80 object-cover" />
              <div className="p-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{c.name}</h3>
                  <p className="text-teal-600 font-medium">{c.role}</p>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{c.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {c.expertise.map((exp, i) => (
                    <span key={i} className="bg-white px-3 py-1 rounded-full text-sm text-teal-700 border border-teal-100">
                      #{exp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Counselors;
