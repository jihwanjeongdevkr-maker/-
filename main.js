import { GoogleGenAI } from '@google/genai';

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClosed = document.getElementById('menu-icon-closed');

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      mobileMenu.classList.remove('hidden');
      menuIconOpen.classList.remove('hidden');
      menuIconClosed.classList.add('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      menuIconOpen.classList.add('hidden');
      menuIconClosed.classList.remove('hidden');
    }
  }

  mobileMenuBtn.addEventListener('click', toggleMenu);

  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (isMenuOpen) toggleMenu();
    });
  });

  // Routing
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleRoute() {
    let hash = window.location.hash || '#/';
    
    // Hide all sections
    sections.forEach(sec => sec.classList.remove('active'));
    
    // Update nav links
    navLinks.forEach(link => {
      if (link.getAttribute('href') === hash) {
        link.classList.add('text-teal-600', 'font-bold');
        link.classList.remove('text-gray-600');
      } else {
        link.classList.remove('text-teal-600', 'font-bold');
        link.classList.add('text-gray-600');
      }
    });

    // Show active section
    let sectionId = 'page-home';
    if (hash === '#/counselors') sectionId = 'page-counselors';
    else if (hash === '#/services') sectionId = 'page-services';
    else if (hash === '#/booking') sectionId = 'page-booking';

    document.getElementById(sectionId).classList.add('active');
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', handleRoute);
  handleRoute(); // Initial route

  // Booking Form Logic
  const bookingForm = document.getElementById('booking-form');
  const btnInPerson = document.getElementById('btn-in-person');
  const btnVideo = document.getElementById('btn-video');
  const bookingTypeInput = document.getElementById('booking-type');
  const submitBtn = document.getElementById('submit-btn');

  const formView = document.getElementById('booking-form-view');
  const successView = document.getElementById('booking-success-view');
  const resetBtn = document.getElementById('reset-booking-btn');

  function setBookingType(type) {
    bookingTypeInput.value = type;
    if (type === 'IN_PERSON') {
      btnInPerson.className = 'booking-type-btn py-3 rounded-xl border-2 transition-all font-medium border-teal-600 bg-teal-50 text-teal-700';
      btnVideo.className = 'booking-type-btn py-3 rounded-xl border-2 transition-all font-medium border-gray-200 text-gray-500 hover:border-teal-200';
    } else {
      btnVideo.className = 'booking-type-btn py-3 rounded-xl border-2 transition-all font-medium border-teal-600 bg-teal-50 text-teal-700';
      btnInPerson.className = 'booking-type-btn py-3 rounded-xl border-2 transition-all font-medium border-gray-200 text-gray-500 hover:border-teal-200';
    }
  }

  btnInPerson.addEventListener('click', () => setBookingType('IN_PERSON'));
  btnVideo.addEventListener('click', () => setBookingType('VIDEO'));

  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData.entries());
    
    submitBtn.disabled = true;
    submitBtn.textContent = '전송 중...';
    submitBtn.classList.add('bg-gray-400', 'cursor-not-allowed');
    submitBtn.classList.remove('bg-teal-600', 'hover:bg-teal-700', 'active:transform', 'active:scale-95');

    try {
      const apiKey = process.env.API_KEY || '';
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `당신은 '마음안식 스튜디오'의 따뜻하고 전문적인 심리상담사입니다. 다음 사연을 보낸 내담자에게 보낼 아주 짧고(2-3문장) 공감적인 답장을 작성해주세요. 내담자의 이름(${data.name})을 언급하며 다독여주세요. 사연: ${data.story}`;
      
      const aiPromise = ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: '당신은 따뜻하고 전문적인 한국인 심리 상담사입니다. 내담자의 감정을 수용하고 격려하는 부드러운 말투를 사용하세요.',
        }
      });

      const formspreePromise = fetch('https://formspree.io/f/maqdbglj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          _subject: `[마음안식 상담신청] ${data.name}님의 신청건`
        })
      });

      const [aiResult, formResult] = await Promise.all([aiPromise, formspreePromise]);

      if (!formResult.ok) {
        throw new Error('Formspree submission failed');
      }

      const aiResponseText = aiResult.text || '소중한 사연 감사합니다. 곧 연락드리겠습니다.';
      
      // Show success view
      document.getElementById('success-email').textContent = data.email;
      document.getElementById('ai-response-text').textContent = aiResponseText;
      document.getElementById('ai-response-container').classList.remove('hidden');
      
      formView.classList.add('hidden');
      successView.classList.remove('hidden');

    } catch (error) {
      console.error('Booking Error:', error);
      alert('접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = '상담 신청 제출';
      submitBtn.classList.remove('bg-gray-400', 'cursor-not-allowed');
      submitBtn.classList.add('bg-teal-600', 'hover:bg-teal-700', 'active:transform', 'active:scale-95');
    }
  });

  resetBtn.addEventListener('click', () => {
    bookingForm.reset();
    setBookingType('IN_PERSON');
    formView.classList.remove('hidden');
    successView.classList.add('hidden');
    document.getElementById('ai-response-container').classList.add('hidden');
  });
});
