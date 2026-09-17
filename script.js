const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.desktop-nav');

if (menuButton && navigation) {
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

  window.addEventListener('resize', () => {
    if (window.innerWidth > 700) {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('mobile-open');
    }
  });
}

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    const serviceField = document.querySelector('[name="service"]');
    if (serviceField) serviceField.value = link.dataset.service;
  });
});

const bookingForm = document.querySelector('#booking-form');
const formMessage = document.querySelector('.form-message');
const languageToggle = document.querySelector('.language-toggle');
const phoneInput = bookingForm ? bookingForm.querySelector('[name="phone"]') : null;
const dateInput = bookingForm ? bookingForm.querySelector('[name="date"]') : null;
const today = new Date();
const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
let currentLanguage = 'ar';

const translations = {
  ar: {
    brand: 'د. كوثر رامي', navigation: ['الخدمات', 'احجز موعدك', 'تواصل معنا'], appointment: 'احجز موعدك',
    heroEyebrow: 'رعاية مريحة · مواعيد مرنة', heroTitle: 'رعاية أسنان', heroTitleEm: 'مريحة لك.', heroIntro: 'رعاية أسنان واضحة ومريحة، مع حجز سريع يناسب وقتك.',
    location: 'الغردقة · مصر', hours: 'السبت - الخميس<br>09:00 - 21:00', daily: 'نستقبل حجوزاتك يومياً', explore: 'اكتشف خدماتنا', approachLabel: 'رعاية مريحة', approachTitle: 'رعاية مريحة', approachTitleEm: 'ومشاورة واضحة.', approachText: 'نسمعك أولاً، نشرح لك كل الخيارات ببساطة، ونضع خطة علاج مناسبة لاحتياجاتك ووقتك.', startBooking: 'ابدأ بحجز موعد', servicesLabel: 'خدماتنا', servicesTitle: 'كل ما تحتاجه<br>لأسنان صحية.',
    serviceNames: ['الكشف والتنظيف', 'تجميل الأسنان', 'علاج وترميم'], serviceTexts: ['فحص دوري وتنظيف احترافي للحفاظ على صحة فمك.', 'حلول متقدمة لتحسين مظهر أسنانك وزيادة ثقتك.', 'علاجات دقيقة لاستعادة الراحة والوظيفة بشكل لطيف.'], timeOptions: ['10:00 صباحاً', '01:00 ظهراً', '05:00 مساءً', '08:00 مساءً'], bookNow: 'احجز الآن',
    bookingLabel: 'حجز موعد', bookingTitle: 'اختار ميعادك', bookingTitleEm: 'واحنا نهتم بالباقي.', bookingText: 'املأ البيانات وسنتواصل معك لتأكيد الموعد.', name: 'الاسم بالكامل', namePlaceholder: 'اكتب اسمك', phone: 'رقم الهاتف', service: 'الخدمة', chooseService: 'اختر الخدمة', date: 'التاريخ', time: 'الوقت', chooseTime: 'اختر الوقت', confirm: 'تأكيد طلب الحجز',
    contactLabel: 'تواصل معنا', contactTitle: 'محتاج مساعدة؟', contactTitleEm: 'كلمنا مباشرة.', whatsapp: 'واتساب', whatsappLabel: 'التواصل عبر واتساب', whatsappTitle: 'تواصل معنا عبر واتساب', footerBooking: 'الحجز', comfort: 'راحتك أولاً.', toggle: 'English', toggleLabel: 'Switch to English', direction: 'rtl', htmlLang: 'ar', title: 'د. كوثر رامي | احجز موعدك', message: (name, phone) => `تم استلام طلبك يا ${name}، سنتواصل معك على ${phone} لتأكيد الموعد.`
  },
  en: {
    brand: 'Dr. Kawthar Ramy', navigation: ['Services', 'Book an appointment', 'Contact'], appointment: 'Book an appointment',
    heroEyebrow: 'Comfortable care · Flexible appointments', heroTitle: 'Dental care', heroTitleEm: 'made easy.', heroIntro: 'Clear, comfortable dental care with quick booking that fits your schedule.',
    location: 'Hurghada · Egypt', hours: 'Saturday - Thursday<br>09:00 - 21:00', daily: 'Appointments available daily', explore: 'Explore services', approachLabel: 'Comfortable care', approachTitle: 'Comfortable care', approachTitleEm: 'with clear guidance.', approachText: 'We listen first, explain every option clearly, and build a treatment plan around your needs and schedule.', startBooking: 'Start booking', servicesLabel: 'Our services', servicesTitle: 'Everything you need<br>for healthy teeth.',
    serviceNames: ['Checkup and cleaning', 'Cosmetic dentistry', 'Restorative care'], serviceTexts: ['Regular checkups and professional cleaning to keep your teeth healthy.', 'Advanced solutions to enhance your confidence and overall look.', 'Gentle, precise treatments that restore comfort and function.'], timeOptions: ['10:00 AM', '01:00 PM', '05:00 PM', '08:00 PM'], bookNow: 'Book now',
    bookingLabel: 'Book an appointment', bookingTitle: 'Choose your time', bookingTitleEm: 'we will handle the rest.', bookingText: 'Fill in your details and we will contact you to confirm your appointment.', name: 'Full name', namePlaceholder: 'Enter your name', phone: 'Phone number', service: 'Service', chooseService: 'Choose a service', date: 'Date', time: 'Time', chooseTime: 'Choose a time', confirm: 'Confirm booking request',
    contactLabel: 'Contact us', contactTitle: 'Need help?', contactTitleEm: 'Call us directly.', whatsapp: 'WhatsApp', whatsappLabel: 'Contact us on WhatsApp', whatsappTitle: 'Contact us via WhatsApp', footerBooking: 'Booking', comfort: 'Your comfort comes first.', toggle: 'العربية', toggleLabel: 'التبديل إلى العربية', direction: 'ltr', htmlLang: 'en', title: 'Dr. Kawthar Ramy | Book an appointment', message: (name, phone) => `Thanks, ${name}. We will contact you at ${phone} to confirm your appointment.`
  }
};

function setLeadingText(element, value) {
  if (!element) return;
  const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
  if (textNode) textNode.textContent = ` ${value} `;
}

function applyLanguage(language) {
  const text = translations[language];
  if (!text) return;

  currentLanguage = language;
  document.documentElement.lang = text.htmlLang;
  document.documentElement.dir = text.direction;
  document.title = text.title;

  const brandLabels = document.querySelectorAll('.brand span:last-child');
  brandLabels.forEach((element) => { element.textContent = text.brand; });

  const nav = document.querySelector('nav');
  if (nav) nav.setAttribute('aria-label', language === 'ar' ? 'القائمة الرئيسية' : 'Main navigation');

  document.querySelectorAll('.desktop-nav a').forEach((element, index) => {
    if (text.navigation[index]) element.textContent = text.navigation[index];
  });

  const headerCta = document.querySelector('.header-cta');
  if (headerCta) setLeadingText(headerCta, text.appointment);

  const heroPrimaryButton = document.querySelector('.hero .primary-button');
  if (heroPrimaryButton) setLeadingText(heroPrimaryButton, text.appointment);

  if (languageToggle) {
    languageToggle.textContent = text.toggle;
    languageToggle.setAttribute('aria-label', text.toggleLabel);
  }

  const heroEyebrow = document.querySelector('.hero .eyebrow');
  if (heroEyebrow) setLeadingText(heroEyebrow, text.heroEyebrow);

  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const first = heroTitle.firstChild;
    if (first) first.textContent = `${text.heroTitle} `;
    const em = heroTitle.querySelector('em');
    if (em) em.textContent = text.heroTitleEm;
  }

  const heroIntro = document.querySelector('.hero-intro');
  if (heroIntro) heroIntro.textContent = text.heroIntro;

  const heroImg = document.querySelector('.hero-image img');
  if (heroImg) heroImg.alt = language === 'ar' ? 'طبيب أسنان يتحدث مع مريض' : 'Dentist talking with a patient';

  const heroNoteFirst = document.querySelector('.hero-note span:first-child');
  if (heroNoteFirst) heroNoteFirst.textContent = text.location;

  const heroNoteSecond = document.querySelector('.hero-note span:last-child');
  if (heroNoteSecond) heroNoteSecond.innerHTML = text.hours;

  const heroMetaText = document.querySelector('.hero-meta span:first-child');
  if (heroMetaText) heroMetaText.textContent = text.daily;

  const scrollLabel = document.querySelector('.scroll-label');
  if (scrollLabel) setLeadingText(scrollLabel, text.explore);

  const statementLabel = document.querySelector('.statement .section-label span:last-child');
  if (statementLabel) statementLabel.textContent = text.approachLabel;

  const statementTitle = document.querySelector('.statement h2');
  if (statementTitle) {
    const first = statementTitle.firstChild;
    if (first) first.textContent = `${text.approachTitle} `;
    const em = statementTitle.querySelector('em');
    if (em) em.textContent = text.approachTitleEm;
  }

  const statementText = document.querySelector('.statement-content p');
  if (statementText) statementText.textContent = text.approachText;

  const textLink = document.querySelector('.text-link');
  if (textLink) setLeadingText(textLink, text.startBooking);

  const servicesLabel = document.querySelector('.section-heading .section-label span:last-child');
  if (servicesLabel) servicesLabel.textContent = text.servicesLabel;

  const servicesHeading = document.querySelector('.section-heading p');
  if (servicesHeading) servicesHeading.innerHTML = text.servicesTitle;

  document.querySelectorAll('.work-item').forEach((item, index) => {
    const title = item.querySelector('h3');
    const copy = item.querySelector('p');
    const cta = item.querySelector('a');

    if (title) title.textContent = text.serviceNames[index] || title.textContent;
    if (copy) copy.textContent = text.serviceTexts[index] || copy.textContent;
    if (cta) {
      cta.dataset.service = text.serviceNames[index] || cta.dataset.service;
      setLeadingText(cta, text.bookNow);
    }
  });

  document.querySelectorAll('[name="service"] option').forEach((option, index) => {
    option.textContent = index === 0 ? text.chooseService : (text.serviceNames[index - 1] || option.textContent);
    option.value = option.textContent;
  });

  document.querySelectorAll('[name="time"] option').forEach((option, index) => {
    option.textContent = index === 0 ? text.chooseTime : (text.timeOptions[index - 1] || option.textContent);
    option.value = option.textContent;
  });

  const bookingEyebrow = document.querySelector('.booking .eyebrow');
  if (bookingEyebrow) setLeadingText(bookingEyebrow, text.bookingLabel);

  const bookingTitle = document.querySelector('.booking h2');
  if (bookingTitle) {
    const first = bookingTitle.firstChild;
    if (first) first.textContent = `${text.bookingTitle} `;
    const em = bookingTitle.querySelector('em');
    if (em) em.textContent = text.bookingTitleEm;
  }

  const bookingIntroText = document.querySelector('.booking-intro > p:last-child');
  if (bookingIntroText) bookingIntroText.textContent = text.bookingText;

  const setFieldLabel = (selector, labelText) => {
    const field = document.querySelector(selector);
    if (!field) return;
    const label = field.closest('label');
    if (label) {
      const textNode = [...label.childNodes].find((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (textNode) textNode.textContent = labelText;
      else label.insertBefore(document.createTextNode(labelText), field);
      return;
    }

    const fallback = field.previousElementSibling || field.previousSibling;
    if (fallback) fallback.textContent = labelText;
  };

  const nameField = document.querySelector('[name="name"]');
  if (nameField) {
    setFieldLabel('[name="name"]', text.name);
    nameField.placeholder = text.namePlaceholder;
  }

  setFieldLabel('[name="phone"]', text.phone);
  setFieldLabel('[name="service"]', text.service);
  setFieldLabel('[name="date"]', text.date);
  setFieldLabel('[name="time"]', text.time);

  const submitButton = bookingForm ? bookingForm.querySelector('button[type="submit"]') : null;
  if (submitButton) setLeadingText(submitButton, text.confirm);

  const contactEyebrow = document.querySelector('.contact .eyebrow');
  if (contactEyebrow) setLeadingText(contactEyebrow, text.contactLabel);

  const contactTitle = document.querySelector('.contact h2');
  if (contactTitle) {
    const first = contactTitle.firstChild;
    if (first) first.textContent = `${text.contactTitle} `;
    const em = contactTitle.querySelector('em');
    if (em) em.textContent = text.contactTitleEm;
  }

  const whatsappLabel = document.querySelector('.whatsapp-label');
  if (whatsappLabel) whatsappLabel.textContent = text.whatsapp;

  document.querySelectorAll('.whatsapp-link, .whatsapp-float').forEach((element) => {
    element.setAttribute('aria-label', text.whatsappLabel);
  });

  const floatWhatsapp = document.querySelector('.whatsapp-float');
  if (floatWhatsapp) floatWhatsapp.title = text.whatsappTitle;

  const footerLinks = document.querySelectorAll('.site-footer div a');
  footerLinks.forEach((element, index) => {
    const labels = [text.navigation[0], text.footerBooking, text.navigation[2]];
    if (labels[index]) element.textContent = labels[index];
  });

  const contactLocation = document.querySelector('.contact-details span:first-child');
  if (contactLocation) contactLocation.textContent = text.location;

  const copyright = document.querySelector('.contact-details span:last-child');
  if (copyright) copyright.textContent = language === 'ar' ? '© 2026 د. كوثر رامي' : '© 2026 Dr. Kawthar Ramy';

  const comfortText = document.querySelector('.mono');
  if (comfortText) comfortText.textContent = text.comfort;
}

if (languageToggle) {
  languageToggle.addEventListener('click', () => {
    applyLanguage(currentLanguage === 'ar' ? 'en' : 'ar');
    if (menuButton && navigation) {
      menuButton.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('mobile-open');
    }
  });
}

if (phoneInput) {
  phoneInput.maxLength = 11;
  phoneInput.setAttribute('aria-invalid', 'false');
}

if (dateInput) {
  dateInput.min = localToday;
}

function validateAppointmentDate() {
  if (!dateInput) return true;

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

if (dateInput) {
  dateInput.addEventListener('input', validateAppointmentDate);
  dateInput.addEventListener('change', validateAppointmentDate);
}

function validatePhoneNumber() {
  if (!phoneInput) return true;

  const digits = phoneInput.value.replace(/\D/g, '').slice(0, 11);
  phoneInput.value = digits;

  if (digits.length === 0) {
    if (formMessage) formMessage.textContent = '';
    phoneInput.setCustomValidity('');
    phoneInput.setAttribute('aria-invalid', 'false');
    return true;
  }

  if (!/^01\d{9}$/.test(digits)) {
    phoneInput.setCustomValidity(currentLanguage === 'ar' ? 'يجب أن يبدأ رقم الهاتف بـ 01 ويكون 11 رقم.' : 'Phone number must start with 01 and contain 11 digits.');
    phoneInput.setAttribute('aria-invalid', 'true');
    if (formMessage) {
      formMessage.textContent = currentLanguage === 'ar' ? 'رقم الهاتف يجب أن يبدأ بـ 01 ويكون 11 رقم.' : 'Phone number must start with 01 and contain 11 digits.';
    }
    return false;
  }

  phoneInput.setCustomValidity('');
  phoneInput.setAttribute('aria-invalid', 'false');
  if (formMessage) formMessage.textContent = '';
  return true;
}

if (phoneInput) {
  phoneInput.addEventListener('input', validatePhoneNumber);
  phoneInput.addEventListener('blur', validatePhoneNumber);
}

if (bookingForm) {
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
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.style.opacity = '0.7';
    }

    fetch(bookingForm.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    })
      .then((response) => {
        if (!response.ok) throw new Error('Request failed');
        if (formMessage) formMessage.textContent = translations[currentLanguage].message(formData.get('name'), formData.get('phone'));
        bookingForm.reset();
        phoneInput?.setAttribute('aria-invalid', 'false');
        phoneInput?.setCustomValidity('');
      })
      .catch(() => {
        if (formMessage) {
          formMessage.textContent = currentLanguage === 'ar' ? 'تعذر إرسال الطلب حالياً. تواصل معنا عبر واتساب.' : 'The request could not be sent. Please contact us on WhatsApp.';
        }
      })
      .finally(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.style.opacity = '';
        }
      });
  });
}

applyLanguage('ar');
