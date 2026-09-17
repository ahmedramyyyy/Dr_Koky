const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.desktop-nav');
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('mobile-open', !isOpen);
});

document.querySelectorAll('.desktop-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('mobile-open');
  });
});

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('[name="service"]').value = link.dataset.service;
  });
});

const bookingForm = document.querySelector('#booking-form');
const formMessage = document.querySelector('.form-message');
const languageToggle = document.querySelector('.language-toggle');
const phoneInput = bookingForm.querySelector('[name="phone"]');
const dateInput = bookingForm.querySelector('[name="date"]');
const today = new Date();
const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
phoneInput.maxLength = 11;
phoneInput.setAttribute('aria-invalid', 'false');
dateInput.min = localToday;
let currentLanguage = 'ar';

const translations = {
  ar: {
    brand: 'د. كوثر رامي', navigation: ['الخدمات', 'احجز موعدك', 'تواصل معنا'], appointment: 'احجز موعدك',
    heroEyebrow: 'رعاية مريحة · مواعيد مرنة', heroTitle: 'ابتسامتك', heroTitleEm: 'تستاهل الأفضل.', heroIntro: 'رعاية أسنان واضحة ومريحة، مع حجز سريع يناسب وقتك.',
    location: 'الغردقة · مصر', hours: 'السبت - الخميس<br>09:00 - 21:00', daily: 'نستقبل حجوزاتك يومياً', explore: 'اكتشف خدماتنا', approachLabel: 'طريقتنا', approachTitle: 'رعاية تشعرك', approachTitleEm: 'بالراحة.', approachText: 'نسمعك أولاً، نشرح لك كل الخيارات ببساطة، ونضع خطة علاج مناسبة لاحتياجاتك ووقتك.', startBooking: 'ابدأ بحجز موعد', servicesLabel: 'خدماتنا', servicesTitle: 'كل ما تحتاجه<br>لابتسامة صحية.',
    serviceNames: ['الكشف والتنظيف', 'تجميل الأسنان', 'علاج وترميم'], serviceTexts: ['فحص دوري وتنظيف احترافي للحفاظ على صحة ابتسامتك.', 'حلول طبيعية لتحسين شكل ابتسامتك وزيادة ثقتك.', 'علاجات دقيقة لاستعادة الراحة والوظيفة بشكل لطيف.'], timeOptions: ['10:00 صباحاً', '01:00 ظهراً', '05:00 مساءً', '08:00 مساءً'], bookNow: 'احجز الآن',
    bookingLabel: 'حجز موعد', bookingTitle: 'اختار ميعادك', bookingTitleEm: 'واحنا نهتم بالباقي.', bookingText: 'املأ البيانات وسنتواصل معك لتأكيد الموعد.', name: 'الاسم بالكامل', namePlaceholder: 'اكتب اسمك', phone: 'رقم الهاتف', service: 'الخدمة', chooseService: 'اختر الخدمة', date: 'التاريخ', time: 'الوقت', chooseTime: 'اختر الوقت', confirm: 'تأكيد طلب الحجز',
    contactLabel: 'تواصل معنا', contactTitle: 'محتاج مساعدة؟', contactTitleEm: 'كلمنا مباشرة.', whatsapp: 'واتساب', whatsappLabel: 'التواصل عبر واتساب', whatsappTitle: 'تواصل معنا عبر واتساب', footerBooking: 'الحجز', comfort: 'راحتك أولاً.', toggle: 'English', toggleLabel: 'Switch to English', direction: 'rtl', htmlLang: 'ar', title: 'د. كوثر رامي | احجز موعدك', message: (name, phone) => `تم استلام طلبك يا ${name}، سنتواصل معك على ${phone} لتأكيد الموعد.`
    , trust: ['شرح واضح قبل كل خطوة', 'مواعيد مرنة تناسب يومك', 'اهتمام حقيقي براحتك'], trustLabel: 'لماذا تختار عيادتنا', faqLabel: 'أسئلة شائعة', faqTitle: 'كل التفاصيل<br>قبل زيارتك.', faqQuestions: ['هل أحتاج إلى حجز مسبق؟', 'كيف يتم تأكيد الموعد؟', 'هل يمكنني اختيار خدمة مختلفة عند الزيارة؟'], faqAnswers: ['نعم، الحجز المسبق يساعدنا على تخصيص الوقت المناسب لك وتقليل وقت الانتظار.', 'بعد إرسال الطلب سنتواصل معك هاتفياً أو عبر واتساب لتأكيد اليوم والوقت.', 'بالتأكيد. نبدأ بفحص بسيط ونشرح لك الخيارات المناسبة قبل اتخاذ أي قرار.'], datePast: 'اختر تاريخاً من اليوم أو تاريخاً لاحقاً.', fridayUnavailable: 'العيادة مغلقة يوم الجمعة، اختر يوماً من السبت إلى الخميس.'
  },
  en: {
    brand: 'Dr. Kawthar Ramy', navigation: ['Services', 'Book an appointment', 'Contact'], appointment: 'Book an appointment',
    heroEyebrow: 'Comfortable care · Flexible appointments', heroTitle: 'Your smile', heroTitleEm: 'deserves the best.', heroIntro: 'Clear, comfortable dental care with quick booking that fits your schedule.',
    location: 'Hurghada · Egypt', hours: 'Saturday - Thursday<br>09:00 - 21:00', daily: 'Appointments available daily', explore: 'Explore services', approachLabel: 'Our approach', approachTitle: 'Care that feels', approachTitleEm: 'comfortable.', approachText: 'We listen first, explain every option clearly, and build a treatment plan around your needs and schedule.', startBooking: 'Start booking', servicesLabel: 'Our services', servicesTitle: 'Everything you need<br>for a healthy smile.',
    serviceNames: ['Checkup and cleaning', 'Cosmetic dentistry', 'Restorative care'], serviceTexts: ['Regular checkups and professional cleaning to keep your smile healthy.', 'Natural-looking solutions to improve your smile and confidence.', 'Gentle, precise treatments that restore comfort and function.'], timeOptions: ['10:00 AM', '01:00 PM', '05:00 PM', '08:00 PM'], bookNow: 'Book now',
    bookingLabel: 'Book an appointment', bookingTitle: 'Choose your time', bookingTitleEm: 'we will handle the rest.', bookingText: 'Fill in your details and we will contact you to confirm your appointment.', name: 'Full name', namePlaceholder: 'Enter your name', phone: 'Phone number', service: 'Service', chooseService: 'Choose a service', date: 'Date', time: 'Time', chooseTime: 'Choose a time', confirm: 'Confirm booking request',
    contactLabel: 'Contact us', contactTitle: 'Need help?', contactTitleEm: 'Call us directly.', whatsapp: 'WhatsApp', whatsappLabel: 'Contact us on WhatsApp', whatsappTitle: 'Contact us via WhatsApp', footerBooking: 'Booking', comfort: 'Your comfort comes first.', toggle: 'العربية', toggleLabel: 'التبديل إلى العربية', direction: 'ltr', htmlLang: 'en', title: 'Dr. Kawthar Ramy | Book an appointment', message: (name, phone) => `Thanks, ${name}. We will contact you at ${phone} to confirm your appointment.`
    , trust: ['Clear guidance at every step', 'Appointments that fit your day', 'Care that puts you first'], trustLabel: 'Why choose our clinic', faqLabel: 'Frequently asked', faqTitle: 'Everything to know<br>before your visit.', faqQuestions: ['Do I need to book in advance?', 'How is my appointment confirmed?', 'Can I choose a different service during my visit?'], faqAnswers: ['Yes. Booking ahead helps us reserve the right time for you and reduce waiting.', 'After you submit the request, we will contact you by phone or WhatsApp to confirm the day and time.', 'Of course. We start with a simple checkup and explain the right options before any decision.'], datePast: 'Choose today or a later date.', fridayUnavailable: 'The clinic is closed on Fridays. Choose a day from Saturday to Thursday.'
  }
};

function setLeadingText(element, value) {
  const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (textNode) textNode.textContent = ` ${value} `;
}

function applyLanguage(language) {
  const text = translations[language];
  currentLanguage = language;
  document.documentElement.lang = text.htmlLang;
  document.documentElement.dir = text.direction;
  document.title = text.title;
  document.querySelectorAll('.brand span:last-child').forEach((element) => { element.textContent = text.brand; });
  document.querySelector('nav').setAttribute('aria-label', language === 'ar' ? 'القائمة الرئيسية' : 'Main navigation');
  document.querySelectorAll('.desktop-nav a').forEach((element, index) => { element.textContent = text.navigation[index]; });
  setLeadingText(document.querySelector('.header-cta'), text.appointment);
  setLeadingText(document.querySelector('.hero .primary-button'), text.appointment);
  languageToggle.textContent = text.toggle;
  languageToggle.setAttribute('aria-label', text.toggleLabel);
  setLeadingText(document.querySelector('.hero .eyebrow'), text.heroEyebrow);
  document.querySelector('.hero h1').firstChild.textContent = `${text.heroTitle} `;
  document.querySelector('.hero h1 em').textContent = text.heroTitleEm;
  document.querySelector('.hero-intro').textContent = text.heroIntro;
  document.querySelector('.hero-image img').alt = language === 'ar' ? 'طبيب أسنان يتحدث مع مريض' : 'Dentist talking with a patient';
  document.querySelector('.hero-note span:first-child').textContent = text.location;
  document.querySelector('.hero-note span:last-child').innerHTML = text.hours;
  document.querySelector('.hero-meta span:first-child').textContent = text.daily;
  setLeadingText(document.querySelector('.scroll-label'), text.explore);
  document.querySelector('.statement .section-label span:last-child').textContent = text.approachLabel;
  document.querySelector('.statement h2').firstChild.textContent = `${text.approachTitle} `;
  document.querySelector('.statement h2 em').textContent = text.approachTitleEm;
  document.querySelector('.statement-content p').textContent = text.approachText;
  setLeadingText(document.querySelector('.text-link'), text.startBooking);
  document.querySelectorAll('.trust-item span').forEach((element, index) => { element.textContent = text.trust[index]; });
  document.querySelector('.trust-strip').setAttribute('aria-label', text.trustLabel);
  document.querySelector('.section-heading .section-label span:last-child').textContent = text.servicesLabel;
  document.querySelector('.section-heading p').innerHTML = text.servicesTitle;
  document.querySelectorAll('.work-item').forEach((item, index) => {
    item.querySelector('h3').textContent = text.serviceNames[index];
    item.querySelector('p').textContent = text.serviceTexts[index];
    item.querySelector('a').dataset.service = text.serviceNames[index];
    setLeadingText(item.querySelector('a'), text.bookNow);
  });
  document.querySelectorAll('[name="service"] option').forEach((option, index) => {
    option.textContent = index === 0 ? text.chooseService : text.serviceNames[index - 1];
    option.value = option.textContent;
  });
  document.querySelectorAll('[name="time"] option').forEach((option, index) => {
    option.textContent = index === 0 ? text.chooseTime : text.timeOptions[index - 1];
    option.value = option.textContent;
  });
  setLeadingText(document.querySelector('.booking .eyebrow'), text.bookingLabel);
  document.querySelector('.booking h2').firstChild.textContent = `${text.bookingTitle} `;
  document.querySelector('.booking h2 em').textContent = text.bookingTitleEm;
  document.querySelector('.booking-intro > p:last-child').textContent = text.bookingText;
  document.querySelector('[name="name"]').previousSibling.textContent = text.name;
  document.querySelector('[name="name"]').placeholder = text.namePlaceholder;
  document.querySelector('[name="phone"]').previousSibling.textContent = text.phone;
  document.querySelector('[name="service"]').previousSibling.textContent = text.service;
  document.querySelector('[name="service"] option:first-child').textContent = text.chooseService;
  document.querySelector('[name="date"]').previousSibling.textContent = text.date;
  document.querySelector('[name="time"]').previousSibling.textContent = text.time;
  document.querySelector('[name="time"] option:first-child').textContent = text.chooseTime;
  setLeadingText(document.querySelector('#booking-form button'), text.confirm);
  setLeadingText(document.querySelector('.contact .eyebrow'), text.contactLabel);
  document.querySelector('.contact h2').firstChild.textContent = `${text.contactTitle} `;
  document.querySelector('.contact h2 em').textContent = text.contactTitleEm;
  document.querySelector('.whatsapp-label').textContent = text.whatsapp;
  document.querySelectorAll('.whatsapp-link, .whatsapp-float').forEach((element) => {
    element.setAttribute('aria-label', text.whatsappLabel);
  });
  document.querySelector('.whatsapp-float').title = text.whatsappTitle;
  document.querySelectorAll('.site-footer div a').forEach((element, index) => { element.textContent = [text.navigation[0], text.footerBooking, text.navigation[2]][index]; });
  document.querySelector('.contact-details span:first-child').textContent = text.location;
  document.querySelector('.contact-details span:last-child').textContent = language === 'ar' ? '© 2026 د. كوثر رامي' : '© 2026 Dr. Kawthar Ramy';
  document.querySelector('.mono').textContent = text.comfort;
  document.querySelector('.faq .section-label span:last-child').textContent = text.faqLabel;
  document.querySelector('.faq .section-heading p').innerHTML = text.faqTitle;
  document.querySelectorAll('.faq-item').forEach((item, index) => {
    const heading = item.querySelector('h3');
    const copy = item.querySelector('p');
    if (heading) heading.textContent = text.faqQuestions[index];
    if (copy) copy.textContent = text.faqAnswers[index];
  });
}

languageToggle.addEventListener('click', () => {
  applyLanguage(currentLanguage === 'ar' ? 'en' : 'ar');
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('mobile-open');
});

function validateAppointmentDate() {
  dateInput.setCustomValidity('');
  if (!dateInput.value) return true;
  if (dateInput.value < localToday) {
    dateInput.setCustomValidity(translations[currentLanguage].datePast);
    return false;
  }
  const selectedDate = new Date(`${dateInput.value}T12:00:00`);
  if (selectedDate.getDay() === 5) {
    dateInput.setCustomValidity(translations[currentLanguage].fridayUnavailable);
    return false;
  }
  return true;
}

dateInput.addEventListener('input', validateAppointmentDate);
dateInput.addEventListener('change', validateAppointmentDate);

function validatePhoneNumber() {
  const digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
  phoneInput.value = digits;

  if (digits.length === 0) {
    formMessage.textContent = '';
    phoneInput.setCustomValidity('');
    phoneInput.setAttribute('aria-invalid', 'false');
    return true;
  }

  if (!/^01\d{9}$/.test(digits)) {
    phoneInput.setCustomValidity(currentLanguage === 'ar' ? 'يجب أن يبدأ رقم الهاتف بـ 01 ويكون 11 رقم.' : 'Phone number must start with 01 and contain 11 digits.');
    phoneInput.setAttribute('aria-invalid', 'true');
    formMessage.textContent = currentLanguage === 'ar' ? 'رقم الهاتف يجب أن يبدأ بـ 01 ويكون 11 رقم.' : 'Phone number must start with 01 and contain 11 digits.';
    return false;
  }

  phoneInput.setCustomValidity('');
  phoneInput.setAttribute('aria-invalid', 'false');
  formMessage.textContent = '';
  return true;
}

phoneInput.addEventListener('input', () => {
  validatePhoneNumber();
});
phoneInput.addEventListener('blur', () => {
  validatePhoneNumber();
});

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const phoneIsValid = validatePhoneNumber();
  const dateIsValid = validateAppointmentDate();
  if (!phoneIsValid || !dateIsValid || !bookingForm.checkValidity()) {
    bookingForm.reportValidity();
    return;
  }
  const formData = new FormData(bookingForm);
  const submitButton = bookingForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.style.opacity = '0.7';
  fetch(bookingForm.action, { method: 'POST', body: formData, headers: { Accept: 'application/json' } })
    .then((response) => {
      if (!response.ok) throw new Error('Request failed');
      formMessage.textContent = translations[currentLanguage].message(formData.get('name'), formData.get('phone'));
      bookingForm.reset();
      phoneInput.setAttribute('aria-invalid', 'false');
      phoneInput.setCustomValidity('');
    })
    .catch(() => {
      formMessage.textContent = currentLanguage === 'ar' ? 'تعذر إرسال الطلب حالياً. تواصل معنا عبر واتساب.' : 'The request could not be sent. Please contact us on WhatsApp.';
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.style.opacity = '';
    });
});
