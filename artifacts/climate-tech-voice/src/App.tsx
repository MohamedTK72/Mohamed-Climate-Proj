import { useEffect, useState } from 'react';

// روابط القائمة الرئيسية داخل الصفحة.
const links = [
  { id: 'about', text: 'عن الموضوع' },
  { id: 'technology', text: 'التكنولوجيا' },
  { id: 'action', text: 'ماذا أستطيع أن أفعل؟' },
  { id: 'support', text: 'التبرع والمصادر' },
];

// خطوات صغيرة يمكن تنفيذها في البيت أو المدرسة.
const actions = [
  {
    title: 'أوفر الكهرباء',
    text: 'أغلق الأجهزة والأنوار عندما لا أحتاج إليها.',
  },
  {
    title: 'أقلل هدر الماء',
    text: 'أستخدم الماء بحرص وأخبر من حولي بأهمية ذلك.',
  },
  {
    title: 'أتعلم وأشارك',
    text: 'أقرأ من مصادر موثوقة وأشارك ما أتعلمه مع زملائي.',
  },
  {
    title: 'أحافظ على المكان',
    text: 'أحافظ على نظافة الشارع والمدرسة وأهتم بالنباتات.',
  },
];

function moveTo(sectionId: string) {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [doneActions, setDoneActions] = useState<number[]>([]);

  // ضبط اتجاه الصفحة وعنوانها عند فتح الموقع.
  useEffect(() => {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.title = 'صوت المتفوقين من أجل المناخ';
  }, []);

  // تغيير لون الموقع بين الوضع العادي والليلي.
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  function toggleAction(index: number) {
    setDoneActions((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  function closeMenuAndMove(sectionId: string) {
    moveTo(sectionId);
    setMenuOpen(false);
  }

  return (
    <div className="site">
      <header className="topbar">
        <div className="container topbar-content">
          <button
            className="brand"
            data-testid="button-brand"
            onClick={() => moveTo('home')}
          >
            <span className="brand-mark">م</span>
            <span>
              <strong>صوت المتفوقين</strong>
              <small>من أجل المناخ</small>
            </span>
          </button>

          <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
            {links.map((link) => (
              <button
                data-testid={`link-${link.id}`}
                key={link.id}
                onClick={() => closeMenuAndMove(link.id)}
              >
                {link.text}
              </button>
            ))}
          </nav>

          <div className="topbar-buttons">
            <button
              className="theme-button"
              data-testid="button-theme"
              onClick={() => setDarkMode((current) => !current)}
              aria-label="تغيير ألوان الموقع"
            >
              {darkMode ? '☀' : '◐'}
            </button>
            <button
              className="menu-button"
              data-testid="button-menu"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="فتح القائمة"
            >
              {menuOpen ? '×' : '☰'}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="container hero-content">
            <div className="hero-text">
              <p className="small-label">مشروع طالب من مدرسة المتفوقين</p>
              <h1>
                المناخ موضوع يخصنا
                <span>كلنا.</span>
              </h1>
              <p className="intro-text">
                أنا محمد توفيق سعيد، طالب مهتم بالتغيرات المناخية. عملت هذا
                الموقع لأشارك أفكاري عن المشكلة، وعن الأشياء التي يمكن أن تساعد
                فيها التكنولوجيا.
              </p>
              <div className="hero-buttons">
                <button
                  className="primary-button"
                  data-testid="button-learn"
                  onClick={() => moveTo('about')}
                >
                  اقرأ عن الموضوع
                </button>
                <button
                  className="secondary-button"
                  data-testid="button-action"
                  onClick={() => moveTo('action')}
                >
                  ابدأ بخطوة بسيطة
                </button>
              </div>
            </div>

            <div className="hero-drawing" aria-label="رسم بسيط للأرض والشمس">
              <div className="sun" />
              <div className="earth">
                <span className="land land-one" />
                <span className="land land-two" />
              </div>
              <p>الأرض بيتنا<br />ونحن مسؤولون عنها</p>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container">
            <p className="small-label">01 / المشكلة</p>
            <div className="section-heading">
              <h2>ما الذي يحدث للمناخ؟</h2>
              <p>
                التغير المناخي يعني أن درجات الحرارة والطقس يتغيران مع الوقت.
                السبب الأكبر هو زيادة الغازات الناتجة عن حرق الوقود والنشاط
                الصناعي.
              </p>
            </div>

            <div className="simple-cards">
              <article className="info-card">
                <span className="card-number">01</span>
                <h3>حرارة أعلى</h3>
                <p>ارتفاع الحرارة يؤثر على الناس والحيوانات والنباتات.</p>
              </article>
              <article className="info-card">
                <span className="card-number">02</span>
                <h3>مياه أقل</h3>
                <p>الجفاف وتغير المطر قد يجعلان الحصول على الماء أصعب.</p>
              </article>
              <article className="info-card">
                <span className="card-number">03</span>
                <h3>طقس غير منتظم</h3>
                <p>قد تزيد موجات الحر والسيول والعواصف في بعض الأماكن.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="technology" className="section technology-section">
          <div className="container">
            <p className="small-label light-label">02 / دور التكنولوجيا</p>
            <div className="section-heading light-heading">
              <h2>كيف يمكن للتكنولوجيا أن تساعد؟</h2>
              <p>
                التكنولوجيا ليست الحل الوحيد، لكنها تساعدنا على فهم المشكلة
                وتقليل الضرر والاستعداد بشكل أفضل.
              </p>
            </div>

            <div className="technology-list">
              <article className="technology-item">
                <strong>الطاقة الشمسية</strong>
                <p>
                  استخدام الشمس لإنتاج الكهرباء يقلل الاعتماد على الوقود
                  ويساعد في تقليل التلوث.
                </p>
              </article>
              <article className="technology-item">
                <strong>حساسات وبيانات</strong>
                <p>
                  يمكن لحساسات بسيطة قياس الحرارة وجودة الهواء ومساعدتنا على
                  معرفة ما يحدث حولنا.
                </p>
              </article>
              <article className="technology-item">
                <strong>زراعة أفضل</strong>
                <p>
                  تساعد التكنولوجيا في توفير الماء ومتابعة النباتات والمحاصيل
                  في الظروف الصعبة.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="action" className="section action-section">
          <div className="container action-layout">
            <div>
              <p className="small-label">03 / دوري أنا</p>
              <h2>التغيير لا يحتاج أن يبدأ بشيء كبير.</h2>
              <p className="section-text">
                كل شخص يستطيع أن يبدأ من مكانه. اختر خطوة أو أكثر من القائمة،
                وحاول أن تستمر عليها.
              </p>
            </div>

            <div className="checklist">
              {actions.map((action, index) => {
                const isDone = doneActions.includes(index);
                return (
                  <button
                    className={isDone ? 'check-item done' : 'check-item'}
                    data-testid={`button-check-${index}`}
                    key={action.title}
                    onClick={() => toggleAction(index)}
                  >
                    <span className="check-circle">{isDone ? '✓' : ''}</span>
                    <span>
                      <strong>{action.title}</strong>
                      <small>{action.text}</small>
                    </span>
                  </button>
                );
              })}
              <p className="progress-text" data-testid="text-progress">
                أنجزت {doneActions.length} من {actions.length} خطوات
              </p>
            </div>
          </div>
        </section>

        <section id="support" className="section support-section">
          <div className="container">
            <p className="small-label">04 / مصادر ومساعدة</p>
            <div className="support-heading">
              <h2>إذا أردت معرفة المزيد</h2>
              <p>
                هذه روابط لمواقع ومؤسسات تهتم بالمناخ. يمكنك القراءة أو التبرع
                إذا كان ذلك مناسباً لك.
              </p>
            </div>

            <div className="resource-list">
              <a
                data-testid="link-unep"
                href="https://www.unep.org/interactives/climate-action/"
                target="_blank"
                rel="noreferrer"
              >
                <span>برنامج الأمم المتحدة للبيئة</span>
                <small>معلومات عن العمل المناخي ←</small>
              </a>
              <a
                data-testid="link-climate-reality"
                href="https://www.climaterealityproject.org/donate"
                target="_blank"
                rel="noreferrer"
              >
                <span>Climate Reality Project</span>
                <small>رابط للتبرع ودعم التوعية ←</small>
              </a>
              <a
                data-testid="link-greengrants"
                href="https://www.greengrants.org/donate/"
                target="_blank"
                rel="noreferrer"
              >
                <span>Global Greengrants Fund</span>
                <small>دعم مبادرات البيئة المحلية ←</small>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <div>
            <h2>صوت المتفوقين من أجل المناخ</h2>
            <p>موقع تعليمي بسيط عن التغير المناخي والتكنولوجيا.</p>
          </div>
          <div className="student-info">
            <strong>محمد توفيق سعيد | Mohamed Tawfik Saeed</strong>
            <p>الطالب بمدرسة المتفوقين الثانوية بنين بعين شمس (MAS)</p>
          </div>
        </div>
        <div className="container copyright">
          جميع الحقوق محفوظة لمحمد توفيق سعيد © 2026
        </div>
      </footer>
    </div>
  );
}

export default App;