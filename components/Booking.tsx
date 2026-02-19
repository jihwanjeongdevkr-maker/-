
import React, { useState } from 'react';
import { CounselingType, BookingData } from '../types';
import { GoogleGenAI } from '@google/genai';

const Booking: React.FC = () => {
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    age: '',
    location: '',
    email: '',
    story: '',
    type: CounselingType.IN_PERSON,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. 심리 상담사의 따뜻한 위로 메시지를 Gemini를 통해 생성
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const prompt = `당신은 '마음안식 스튜디오'의 따뜻하고 전문적인 심리상담사입니다. 다음 사연을 보낸 내담자에게 보낼 아주 짧고(2-3문장) 공감적인 답장을 작성해주세요. 내담자의 이름(${formData.name})을 언급하며 다독여주세요. 사연: ${formData.story}`;
      
      const aiPromise = ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: '당신은 따뜻하고 전문적인 한국인 심리 상담사입니다. 내담자의 감정을 수용하고 격려하는 부드러운 말투를 사용하세요.',
        }
      });

      // 2. Formspree를 통한 실제 데이터 전송
      const formspreePromise = fetch('https://formspree.io/f/maqdbglj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `[마음안식 상담신청] ${formData.name}님의 신청건`
        })
      });

      // AI 생성과 폼 전송을 동시에 진행하여 사용자 대기 시간 최적화
      const [aiResult, formResult] = await Promise.all([aiPromise, formspreePromise]);

      if (!formResult.ok) {
        throw new Error('Formspree submission failed');
      }

      setAiResponse(aiResult.text || '소중한 사연 감사합니다. 곧 연락드리겠습니다.');
      setSubmitted(true);
    } catch (error) {
      console.error('Booking Error:', error);
      alert('접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-20 max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-teal-50">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">상담 신청이 완료되었습니다!</h2>
          <p className="text-gray-600 mb-8">
            입력해주신 메일({formData.email})로 관리자가 확인 후 24시간 이내에 연락드리겠습니다.
          </p>
          {aiResponse && (
            <div className="bg-teal-50 p-6 rounded-2xl text-left mb-8 border-l-4 border-teal-500 italic text-teal-900">
              "{aiResponse}"
              <p className="mt-2 text-sm text-teal-700 font-bold">- 마음안식 상담진 드림</p>
            </div>
          )}
          <button 
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                age: '',
                location: '',
                email: '',
                story: '',
                type: CounselingType.IN_PERSON,
              });
              setAiResponse(null);
            }}
            className="text-teal-600 font-bold hover:underline"
          >
            새로 신청하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">상담 예약 신청</h2>
          <p className="text-gray-600">당신의 이야기를 들려주세요. 함께 길을 찾아보겠습니다.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">성함</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="홍길동"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">나이</label>
              <input
                required
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="25"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">거주 지역</label>
              <input
                required
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="서울시 강남구"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일 주소</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상담 진행 방식</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: CounselingType.IN_PERSON }))}
                className={`py-3 rounded-xl border-2 transition-all font-medium ${
                  formData.type === CounselingType.IN_PERSON
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-500 hover:border-teal-200'
                }`}
              >
                대면 상담
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: CounselingType.VIDEO }))}
                className={`py-3 rounded-xl border-2 transition-all font-medium ${
                  formData.type === CounselingType.VIDEO
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-gray-200 text-gray-500 hover:border-teal-200'
                }`}
              >
                화상 상담
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">상담 사연</label>
            <textarea
              required
              name="story"
              value={formData.story}
              onChange={handleChange}
              rows={5}
              placeholder="상담을 원하는 이유나 고민 내용을 자유롭게 적어주세요."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all outline-none resize-none"
            ></textarea>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all shadow-lg ${
              isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 active:transform active:scale-95'
            }`}
          >
            {isSubmitting ? '전송 중...' : '상담 신청 제출'}
          </button>
          
          <p className="text-center text-xs text-gray-400">
            제출된 정보는 상담 관리를 위해서만 사용되며, 개인정보 처리방침에 따라 보호됩니다.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Booking;
