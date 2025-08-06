console.log('슬라이더 코드 시작');
  const sliderContainer = document.querySelector('.slider-container');
  const slider = document.getElementById('proof-slider');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (!sliderContainer || !slider || !prevBtn || !nextBtn) {
    console.error('슬라이더 관련 요소를 찾을 수 없습니다.');
} else {
  const slidesData = [
    { name: '김OO 설계사', description: '입사 6개월 만에 월 수입 1000만원 돌파!' },
    { name: '박OO 설계사', description: '주부에서 시작해 억대 연봉 달성' },
    { name: '이OO 설계사', description: '비전공자에서 1년 만에 지점장 승진!' },
    { name: '최OO 설계사', description: '20대 초반, 첫 직장에서 월 800만원 달성' },
    { name: '정OO 설계사', description: '경력 단절 후 재취업, 안정적 수입 확보' },
    { name: '유OO 설계사', description: '육아와 병행하며 연 1억 수입 달성' },
    { name: '오OO 설계사', description: '퇴사 후 도전, 3개월 급여 2000만원 수령' },
    { name: '장OO 설계사', description: '전문 교육 후 첫 달에 급여 500만원' },
    { name: '한OO 설계사', description: '1:1 코칭으로 빠른 성장, 팀원 5명 확보' },
    { name: '송OO 설계사', description: '파트타임으로 시작, 월 300만원 꾸준히 달성' },
    { name: '임OO 설계사', description: '비전공자에서 6개월 만에 우수설계사 선정' },
    { name: '배OO 설계사', description: '경력 1년차, 월평균 900만원 유지' },
  ];

  let currentIndex = 0;
  let isMoving = false;
  const slideCount = slidesData.length;
  let autoPlayInterval = null;
  let initialOffset = 0;
  let slideWidth = 0;
  const cloneCount = 5;

  // 1. 슬라이드 데이터로 HTML 생성
  slider.innerHTML = slidesData.map(item => `
    <div class="slide">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    </div>
  `).join('');

  const slides = slider.querySelectorAll('.slide');
  if (slides.length > 0) {
  const initSlider = () => {
      // slideWidth 계산
      if (window.innerWidth <= 600) {
        // 모바일에서는 뷰포트의 실제 width로 강제
        slideWidth = sliderContainer.querySelector('.slider-viewport').offsetWidth;
      } else {
        slideWidth = slides[0].offsetWidth + 20; // 기존 PC용
      }
    
      // 2. 무한 슬라이드를 위한 클론 생성 및 배치
      const allSlides = slider.querySelectorAll('.slide');
      allSlides.forEach(s => {
          if(s.classList.contains('clone')) s.remove();
      });

      if (slideCount > 0) {
          for (let i = 0; i < cloneCount; i++) {
            const backIndex = (slideCount - 1 - i + slideCount) % slideCount;
            const frontIndex = i % slideCount;
            const backClone = slides[backIndex].cloneNode(true);
            backClone.classList.add('clone');
            slider.insertBefore(backClone, slider.firstChild);
            const frontClone = slides[frontIndex].cloneNode(true);
            frontClone.classList.add('clone');
            slider.appendChild(frontClone);
          }
      }

      // 3. 초기 위치 설정 (클론 영역으로)
      initialOffset = -(slideWidth * cloneCount);
      slider.style.transition = 'none';
      slider.style.transform = `translateX(${initialOffset}px)`;
      currentIndex = 0;
  }
  
  const moveSlider = (direction) => {
    if (isMoving) return;
    isMoving = true;
    slider.style.transition = 'transform 0.5s ease-in-out';
    
    currentIndex += direction === 'next' ? 1 : -1;
    let offset = initialOffset - (slideWidth * currentIndex);
    slider.style.transform = `translateX(${offset}px)`;

    const handleTransitionEnd = () => {
      if (currentIndex >= slideCount) {
        slider.style.transition = 'none';
        currentIndex = 0;
        offset = initialOffset;
        slider.style.transform = `translateX(${offset}px)`;
      } else if (currentIndex < 0) {
        slider.style.transition = 'none';
        currentIndex = slideCount - 1;
        offset = initialOffset - (slideWidth * currentIndex);
        slider.style.transform = `translateX(${offset}px)`;
      }
      isMoving = false;
    };
    slider.addEventListener('transitionend', handleTransitionEnd, { once: true });
  }

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
      moveSlider('next');
    }, 3000); // 3초 간격
  }

  const stopAutoPlay = () => {
    clearInterval(autoPlayInterval);
  }
  
  const handleManualNavigation = (direction) => {
      moveSlider(direction);
      stopAutoPlay();
      startAutoPlay();
  }

  nextBtn.addEventListener('click', () => handleManualNavigation('next'));
  prevBtn.addEventListener('click', () => handleManualNavigation('prev'));

  sliderContainer.addEventListener('mouseenter', stopAutoPlay);
  sliderContainer.addEventListener('mouseleave', startAutoPlay);

  // 화면 리사이즈 대응 로직 추가
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        stopAutoPlay();
        initSlider();
        startAutoPlay();
    }, 250); // 0.25초 후에 실행
  });
  
  initSlider();
  startAutoPlay();
  }
}

// 상담 신청하기 버튼 스무스 스크롤
const ctaBtn = document.querySelector('.cta-btn');
const contactForm = document.getElementById('contact-form');
if (ctaBtn && contactForm) {
  ctaBtn.addEventListener('click', function(e) {
    e.preventDefault();
    contactForm.scrollIntoView({ behavior: 'smooth' });
  });
}

// 내 첫달 급여 미리 확인해 보기 계산기
const salaryInput = document.getElementById('salary-input');
const salaryBtn = document.getElementById('salary-btn');
const salaryResult = document.getElementById('salary-result');
const salaryExtraMsg = document.getElementById('salary-extra-msg');

if (salaryInput && salaryBtn && salaryResult && salaryExtraMsg) {
  salaryBtn.addEventListener('click', function() {
    const value = parseInt(salaryInput.value, 10);
    if (isNaN(value) || value <= 0) {
      salaryResult.textContent = '보험료를 올바르게 입력해 주세요.';
      salaryExtraMsg.style.display = 'none';
      return;
    }
    const result = value * 8;
    salaryResult.textContent = `예상 첫달 급여: ${result}만원`;
    salaryExtraMsg.style.display = 'block';
      });
}

// 무료 상담 신청 폼 제출 시 구글폼에 전송하고 알림 띄우기
const gform = document.getElementById('gform');
if (gform) {
  gform.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 폼 데이터 수집
    const formData = new FormData(gform);
    
    // 숨겨진 iframe 생성하여 구글폼에 전송
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.name = 'hidden-iframe';
    document.body.appendChild(iframe);
    
    // 폼의 target을 iframe으로 설정
    gform.target = 'hidden-iframe';
    
    // 폼 제출
    gform.submit();
    
    // 알림 띄우기
    alert('상담 신청이 완료되었습니다! 담당자가 곧 연락드릴 예정입니다.');
    
    // iframe 제거
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 1000);
  });
}
