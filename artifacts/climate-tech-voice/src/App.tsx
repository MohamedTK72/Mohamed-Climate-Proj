import { useEffect, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowUpLeft, Check, ChevronDown, ExternalLink, Leaf, Menu, Moon, MoveDown, Sun, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { href: '#challenge', label: 'التحدي' },
  { href: '#solutions', label: 'التقنية' },
  { href: '#action', label: 'خطوتي' },
  { href: '#support', label: 'الدعم' },
];

const actions = [
  { id: 'energy', title: 'أراجع استهلاكي للطاقة', detail: 'أطفئ ما لا أستخدمه، وأختار الأجهزة الأكثر كفاءة.' },
  { id: 'water', title: 'أحمي كل قطرة', detail: 'أقلل الهدر وأتعلم كيف تعيش مدينتي مع شح المياه.' },
  { id: 'voice', title: 'أشارك المعرفة', detail: 'أرسل مصدراً موثوقاً أو أبدأ حواراً بلا تخويف.' },
  { id: 'nature', title: 'أترك مساحة للطبيعة', detail: 'أدعم زراعة الأنواع المحلية وأحترم موائلها.' },
];

const solutions = [
  { index: '01', title: 'طاقة ترى الشمس', text: 'ألواح شمسية فوق المدارس والمنازل ليست رفاهية؛ إنها طريقة أنظف لإنتاج الكهرباء، وتعليم عملي يظل فوق رؤوسنا كل يوم.', tag: 'MITIGATION', color: 'ochre' },
  { index: '02', title: 'مدن تتنفس', text: 'أسطح باردة، أشجار محلية، وخرائط حرارة مفتوحة تساعد الحي على النجاة من الأيام الأشد سخونة — قبل أن تصل.', tag: 'ADAPTATION', color: 'leaf' },
  { index: '03', title: 'بيانات في خدمة الناس', text: 'من الأقمار الصناعية إلى حساسات الهواء منخفضة التكلفة: المعرفة الدقيقة تجعل القرار العام أسرع وأعدل.', tag: 'OPEN DATA', color: 'clay' },
];

function scrollToId(href: string) {
  const target = document.querySelector(href);
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [nightMode, setNightMode] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.title = 'صوت من أجل المناخ — محمد توفيق سعيد';
    document.documentElement.classList.toggle('dark', nightMode);
  }, [nightMode]);

  const completedCount = completed.length;
  const progress = Math.round((completedCount / actions.length) * 100);
  const facts = [
    { number: '01', title: 'التغير ليس بعيداً', text: 'الحرارة في المدن تزداد أسرع مما يشعر به المتوسط العالمي. الظل والماء والتخطيط الذكي أدوات نجاة.' },
    { number: '02', title: 'الحل ليس اختراعاً واحداً', text: 'نحتاج مزيجاً من الطاقة النظيفة، وكفاءة الموارد، وحماية الطبيعة، وسياسات تحمي الأكثر عرضة.' },
    { number: '03', title: 'الصوت الصغير يبدأ سلسلة', text: 'سؤال جيد في المدرسة قد يتحول إلى قياس محلي، ثم مشروع، ثم قرار أفضل للحي كله.' },
  ];

  const toggleAction = (id: string) => {
    setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  };

  return (
    <div className={`site-shell noise min-h-[100dvh] ${nightMode ? 'night' : ''}`}>
      {/* Persistent navigation: anchors stay visible on desktop and collapse for mobile. */}
      <header className="fixed inset-x-0 top-0 z-30 border-b border-foreground/10 bg-background/88 backdrop-blur-xl">
        <div className="container-wide flex h-[74px] items-center justify-between gap-5">
          <button data-testid="button-brand-home" className="group flex items-center gap-3 text-right" onClick={() => scrollToId('#home')} aria-label="العودة إلى المقدمة">
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-foreground/25">
              <Leaf size={18} strokeWidth={1.5} className="text-secondary transition-transform group-hover:-rotate-12" />
              <span className="absolute -bottom-1 -left-1 h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="leading-none">
              <span className="block text-sm font-semibold">صوت من أجل المناخ</span>
              <span className="mono-label mt-1 block text-muted-foreground" dir="ltr">FIELD NOTE / 01</span>
            </span>
          </button>
          <nav className="hidden items-center gap-7 md:flex" aria-label="التنقل الرئيسي">
            {navItems.map((item) => (
              <button data-testid={`link-nav-${item.href.slice(1)}`} key={item.href} className="nav-link text-sm text-muted-foreground hover:text-foreground" onClick={() => scrollToId(item.href)}>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button data-testid="button-theme-toggle" className="icon-button flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 text-muted-foreground hover:border-accent hover:text-foreground" onClick={() => setNightMode((value) => !value)} aria-label={nightMode ? 'تشغيل ضوء النهار' : 'تشغيل الوضع الليلي'}>
              {nightMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <button data-testid="button-mobile-menu" className="icon-button flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 md:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}>
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
            <button data-testid="button-header-support" className="solid-button hidden rounded-full px-4 py-2 text-sm font-semibold sm:block" onClick={() => scrollToId('#support')}>كن جزءاً من الحل</button>
          </div>
        </div>
        <div className={`overflow-hidden border-t border-foreground/10 bg-background md:hidden ${menuOpen ? 'menu-open' : 'menu-closed'}`}>
          <nav className="container-wide flex flex-col gap-4" aria-label="قائمة الهاتف">
            {navItems.map((item) => (
              <button data-testid={`link-mobile-${item.href.slice(1)}`} key={item.href} className="text-right text-base text-muted-foreground hover:text-foreground" onClick={() => { scrollToId(item.href); setMenuOpen(false); }}>
                {item.label}
              </button>
            ))}
            <button data-testid="button-mobile-support" className="solid-button rounded-full px-4 py-3 text-sm font-semibold" onClick={() => { scrollToId('#support'); setMenuOpen(false); }}>كن جزءاً من الحل</button>
          </nav>
        </div>
      </header>

      <main>
        {/* Intro: a quiet but graphic “field instrument” replaces a stock hero image. */}
        <section id="home" className="paper-grid relative flex min-h-[780px] items-center pt-28">
          <div className="container-wide grid items-center gap-14 pb-24 pt-12 lg:grid-cols-[1.04fr_.96fr] lg:gap-8">
            <div className="relative z-10 max-w-2xl">
              <div className="reveal mb-7 flex items-center gap-3 text-secondary">
                <span className="mono-label" dir="ltr">MAS / CAIRO / 2025</span>
                <span className="h-px w-14 bg-secondary/60" />
                <span className="text-xs">دفتر ميداني مفتوح</span>
              </div>
              <h1 data-testid="text-hero-title" className="display-title reveal reveal-delay-1 text-[clamp(3.65rem,9vw,8.3rem)]">
                المستقبل<br /><span className="text-secondary">ليس قدراً.</span>
              </h1>
              <p data-testid="text-hero-description" className="reveal reveal-delay-2 mt-7 max-w-xl text-lg leading-[1.9] text-muted-foreground sm:text-xl">
                أكتب لأفهم. وأفهم لأتحرك.<br />
                هذه ملاحظاتي عن المناخ، والتقنية التي يمكن أن تساعدنا — عندما تخدم الناس والطبيعة معاً.
              </p>
              <div className="reveal reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
                <button data-testid="button-hero-challenge" className="solid-button inline-flex items-center gap-3 rounded-full px-5 py-3.5 text-sm font-semibold" onClick={() => scrollToId('#challenge')}>
                  اقرأ الملاحظة الأولى <ArrowLeft size={17} />
                </button>
                <button data-testid="button-hero-action" className="outline-button inline-flex items-center gap-3 rounded-full px-5 py-3.5 text-sm font-semibold" onClick={() => scrollToId('#action')}>
                  ابدأ بخطوة <MoveDown size={16} />
                </button>
              </div>
              <div className="reveal reveal-delay-4 mt-16 flex items-center gap-4 border-t border-foreground/15 pt-5 text-sm text-muted-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-secondary text-secondary">01</span>
                <span>من عين شمس، إلى أي مكان يفكر في الغد</span>
              </div>
            </div>
            <div className="relative mx-auto flex h-[380px] w-full max-w-[500px] items-center justify-center lg:h-[510px]">
              <div className="float-slow absolute h-[285px] w-[220px] rotate-[-18deg] rounded-[48%_52%_52%_48%] bg-secondary/15 blur-0 lg:h-[390px] lg:w-[300px]" />
              <div className="hero-orbit absolute h-[320px] w-[235px] lg:h-[440px] lg:w-[320px]" />
              <div className="hero-orbit-inner absolute h-[245px] w-[335px] lg:h-[340px] lg:w-[465px]" />
              <div className="sun-disc absolute right-[20%] top-[18%] h-12 w-12 rounded-full lg:right-[22%] lg:h-16 lg:w-16" />
              <div className="absolute bottom-[13%] left-[10%] h-40 w-32 rotate-[20deg] bg-secondary/80 leaf-cutout lg:h-56 lg:w-44" />
              <div className="absolute bottom-[24%] left-[23%] h-24 w-1 rotate-[-18deg] bg-foreground/50" />
              <div className="absolute left-[18%] top-[26%] w-32 -rotate-12 border-t border-dashed border-foreground/45 lg:w-48" />
              <div className="absolute right-[10%] top-[47%] max-w-[130px] text-left lg:right-[3%]">
                <span className="mono-label text-secondary" dir="ltr">OBSERVATION</span>
                <p className="mt-2 text-sm leading-7">كل تغيير كبير<br />يبدأ بملاحظة.</p>
              </div>
              <div className="absolute bottom-[4%] right-[15%] text-left">
                <span className="mono-label text-muted-foreground" dir="ltr">31° 12′ N</span>
                <p className="mt-1 text-xs text-muted-foreground">حيث أتعلم أن أرى</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-muted-foreground lg:flex">
            <span className="mono-label" dir="ltr">SCROLL TO EXPLORE</span>
            <span className="h-8 w-px bg-foreground/25" />
            <ArrowUpLeft size={15} />
          </div>
        </section>

        {/* Challenge section: three editorial facts instead of generic stat cards. */}
        <section id="challenge" className="section-pad bg-primary text-primary-foreground">
          <div className="container-wide">
            <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
              <div>
                <span className="mono-label text-accent" dir="ltr">01 / THE CHALLENGE</span>
                <h2 className="display-title mt-6 max-w-sm text-4xl sm:text-5xl">المناخ ليس خبراً.<br /><span className="text-accent">إنه مكاننا.</span></h2>
                <p className="mt-6 max-w-sm leading-8 text-primary-foreground/70">الحديث عن المناخ يصبح حقيقياً عندما نربطه بالماء الذي نشربه، والهواء الذي نتنفسه، والظل الذي نفتقده.</p>
                <button data-testid="button-climate-fact" className="outline-button mt-9 inline-flex items-center gap-3 rounded-full border-primary-foreground/30 px-4 py-3 text-sm hover:bg-primary-foreground/10" onClick={() => setFactIndex((value) => (value + 1) % facts.length)}>
                  ملاحظة أخرى <ArrowLeft size={16} />
                </button>
              </div>
              <div className="relative min-h-[330px] border-t border-primary-foreground/20 pt-7 lg:border-t-0 lg:border-r lg:pr-12 lg:pt-0">
                <div className="flex items-center justify-between">
                  <span className="mono-label text-primary-foreground/50" dir="ltr">FIELD NOTE {facts[factIndex].number}</span>
                  <span className="h-px w-20 bg-accent pulse-line" />
                </div>
                <div className="mt-16 max-w-2xl">
                  <p className="mono-label text-accent" dir="ltr">A QUESTION WORTH KEEPING</p>
                  <h3 data-testid="text-climate-fact-title" className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">{facts[factIndex].title}</h3>
                  <p data-testid="text-climate-fact-copy" className="mt-6 max-w-xl text-lg leading-9 text-primary-foreground/70">{facts[factIndex].text}</p>
                </div>
                <div className="absolute bottom-0 left-0 flex gap-2 lg:left-auto lg:right-12">
                  {facts.map((fact, index) => <button data-testid={`button-fact-${index}`} key={fact.number} aria-label={`الملاحظة ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === factIndex ? 'w-10 bg-accent' : 'w-4 bg-primary-foreground/30'}`} onClick={() => setFactIndex(index)} />)}
                </div>
              </div>
            </div>
            <div className="mt-20 grid border-t border-primary-foreground/20 pt-8 sm:grid-cols-3">
              <div className="border-primary-foreground/15 pb-7 sm:border-l sm:pb-0 sm:pl-7"><span className="mono-label text-primary-foreground/50" dir="ltr">01 — NOTICE</span><p className="mt-3 text-xl">نقيس ما يحدث</p></div>
              <div className="border-primary-foreground/15 pb-7 sm:border-l sm:px-7 sm:pb-0"><span className="mono-label text-primary-foreground/50" dir="ltr">02 — CHOOSE</span><p className="mt-3 text-xl">نختار ما ينفع</p></div>
              <div className="sm:pr-7"><span className="mono-label text-primary-foreground/50" dir="ltr">03 — SHARE</span><p className="mt-3 text-xl">نترك أثراً مشتركاً</p></div>
            </div>
          </div>
        </section>

        {/* Technology solutions: staggered rows make the page feel like a notebook index. */}
        <section id="solutions" className="section-pad">
          <div className="container-wide">
            <div className="flex flex-col justify-between gap-6 border-b border-foreground/15 pb-8 sm:flex-row sm:items-end">
              <div>
                <span className="mono-label text-secondary" dir="ltr">02 / TECHNOLOGY WITH CARE</span>
                <h2 className="display-title mt-5 text-4xl sm:text-6xl">التقنية ليست بطلاً.<br /><span className="text-secondary">هي أداة.</span></h2>
              </div>
              <p className="max-w-xs text-sm leading-7 text-muted-foreground">أفضل ابتكار هو الذي يخفف الضرر، ويزيد قدرة الناس على الفعل، ولا يترك أحداً خلفه.</p>
            </div>
            <div className="divide-y divide-foreground/15">
              {solutions.map((solution) => (
                <article data-testid={`card-solution-${solution.index}`} key={solution.index} className="group grid gap-6 py-9 transition-colors hover:bg-foreground/[.025] md:grid-cols-[100px_1fr_1fr_auto] md:items-center md:gap-8">
                  <span className="mono-label text-muted-foreground" dir="ltr">{solution.index}</span>
                  <h3 className="text-2xl font-semibold transition-colors group-hover:text-secondary sm:text-3xl">{solution.title}</h3>
                  <p className="max-w-md text-sm leading-8 text-muted-foreground">{solution.text}</p>
                  <span className={`w-fit rounded-full px-3 py-1.5 text-[10px] font-medium tracking-[.12em] ${solution.color === 'ochre' ? 'bg-accent/20 text-foreground' : solution.color === 'leaf' ? 'bg-secondary/20 text-foreground' : 'bg-destructive/15 text-destructive'}`} dir="ltr">{solution.tag}</span>
                </article>
              ))}
            </div>
            <div className="mt-10 grid gap-7 rounded-[2rem] bg-muted p-7 sm:grid-cols-[1fr_auto] sm:items-center sm:p-10">
              <div><span className="mono-label text-secondary" dir="ltr">A SMALL SYSTEM / BIG POSSIBILITY</span><h3 className="mt-3 text-2xl font-semibold">من شمس المدرسة، إلى شبكة معرفة.</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">تخيل أن تقيس كل مدرسة حرارة فصولها وجودة هوائها، ثم تشارك النتائج مع المدارس المجاورة. لا نحتاج أجهزة غامضة؛ نحتاج فضولاً منظماً.</p></div>
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-secondary/50 text-secondary"><span className="text-center text-xs leading-6">OPEN<br />LAB</span></div>
            </div>
          </div>
        </section>

        {/* Individual action: functional checklist gives the reader one tangible next move. */}
        <section id="action" className="section-pad border-y border-foreground/10 bg-muted/40">
          <div className="container-wide grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <span className="mono-label text-secondary" dir="ltr">03 / MY FIELD GUIDE</span>
              <h2 className="display-title mt-5 text-4xl sm:text-6xl">ما أفعله<br /><span className="text-secondary">هذا الأسبوع.</span></h2>
              <p className="mt-7 max-w-md leading-8 text-muted-foreground">لا أبحث عن الكمال. أبحث عن فعل يمكن تكراره، ومعلومة يمكن مشاركتها، ومكان يصبح أقدر على مواجهة القادم.</p>
              <div className="mt-10 max-w-md rounded-2xl border border-foreground/15 bg-card p-5">
                <div className="flex items-end justify-between"><span className="mono-label text-muted-foreground" dir="ltr">YOUR PROGRESS</span><span data-testid="text-action-progress" className="font-mono text-2xl text-secondary" dir="ltr">{progress}%</span></div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-secondary transition-all duration-500" style={{ width: `${progress}%` }} /></div>
                <p className="mt-3 text-xs text-muted-foreground">{completedCount === actions.length ? 'أحسنت. الآن شارك ما تعلمته.' : `أنجزت ${completedCount} من ${actions.length} خطوات — خطوة واحدة تكفي لتبدأ.`}</p>
              </div>
            </div>
            <div className="divide-y divide-foreground/15 border-y border-foreground/15">
              {actions.map((action, index) => {
                const done = completed.includes(action.id);
                return (
                  <button data-testid={`button-action-${action.id}`} key={action.id} className="check-row flex w-full items-start gap-5 py-6 text-right hover:bg-foreground/[.025]" data-done={done} onClick={() => toggleAction(action.id)}>
                    <span className="check-box mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-foreground/25 text-card transition-colors">{done && <Check size={15} strokeWidth={3} />}</span>
                    <span className="check-copy block"><span className="mono-label text-muted-foreground" dir="ltr">0{index + 1} / PRACTICE</span><span className="mt-1 block text-lg font-semibold">{action.title}</span><span className="mt-1 block text-sm leading-7 text-muted-foreground">{action.detail}</span></span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Support/resources: external links are intentionally explicit and credible. */}
        <section id="support" className="section-pad">
          <div className="container-wide">
            <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end">
              <div><span className="mono-label text-secondary" dir="ltr">04 / KEEP GOING</span><h2 className="display-title mt-5 max-w-3xl text-4xl sm:text-6xl">صوتك لا يحتاج<br /><span className="text-secondary">إلى إذن.</span></h2></div>
              <p className="max-w-md leading-8 text-muted-foreground">إن كنت تريد أن تفعل أكثر، ابدأ من مصدر موثوق. تعلّم، تبرّع إن استطعت، وادعم حلولاً يقودها الناس في الأماكن المتأثرة.</p>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {[
                { title: 'برنامج الأمم المتحدة للبيئة', label: 'تعلم من المصدر', href: 'https://www.unep.org/interactives/climate-action/' },
                { title: 'Climate Reality Project', label: 'ادعم التعليم المناخي', href: 'https://www.climaterealityproject.org/donate' },
                { title: 'Global Greengrants Fund', label: 'موّل قيادة محلية', href: 'https://www.greengrants.org/donate/' },
              ].map((resource, index) => (
                <a data-testid={`link-resource-${index}`} key={resource.title} className="resource-card group block rounded-[1.5rem] border border-foreground/15 bg-card p-6" href={resource.href} target="_blank" rel="noreferrer">
                  <div className="flex items-start justify-between gap-4"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-secondary"><ExternalLink size={17} /></span><span className="mono-label text-muted-foreground" dir="ltr">0{index + 1}</span></div>
                  <span className="mono-label mt-12 block text-secondary" dir="ltr">{resource.label}</span>
                  <h3 className="mt-3 text-xl font-semibold leading-8">{resource.title}</h3>
                  <span className="mt-8 flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">زيارة الرابط <ArrowLeft size={15} /></span>
                </a>
              ))}
            </div>
            <div className="mt-16 flex flex-col items-start justify-between gap-7 border-t border-foreground/15 pt-8 sm:flex-row sm:items-center">
              <div><p className="text-lg font-semibold">لست بحاجة إلى التبرع كي تبدأ.</p><p className="mt-2 text-sm text-muted-foreground">علّم شخصاً، أصلح شيئاً، واسأل سؤالاً أفضل.</p></div>
              <button data-testid="button-share-support" className="outline-button inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold" onClick={() => navigator.clipboard?.writeText(window.location.href)}>انسخ رابط هذه الصفحة <ArrowLeft size={16} /></button>
            </div>
          </div>
        </section>
      </main>

      {/* Student profile and footer: identity is part of the credibility of the statement. */}
      <footer className="bg-primary pb-8 pt-16 text-primary-foreground">
        <div className="container-wide">
          <div className="grid gap-12 border-b border-primary-foreground/20 pb-14 md:grid-cols-[1.2fr_.8fr]">
            <div><span className="mono-label text-accent" dir="ltr">A NOTE FROM THE MAKER</span><h2 className="mt-6 max-w-xl text-3xl font-semibold leading-[1.35] sm:text-5xl">«لا أريد مستقبلاً مثالياً.<br />أريد مستقبلاً يمكننا<br /><span className="text-accent">أن نصل إليه معاً.»</span></h2></div>
            <div className="md:border-r md:border-primary-foreground/20 md:pr-10"><div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-accent text-2xl font-semibold text-accent">م</div><p data-testid="text-student-credit" className="text-xl font-semibold">محمد توفيق سعيد | Mohamed Tawfik Saeed</p><p data-testid="text-school-credit" className="mt-3 max-w-sm text-sm leading-7 text-primary-foreground/65">الطالب بمدرسة المتفوقين الثانوية بنين بعين شمس (MAS)</p><p className="mt-7 text-sm leading-7 text-primary-foreground/65">موقع شخصي للتعلم والمشاركة. الآراء والمصادر هنا بداية حوار، وليست نهاية الطريق.</p></div>
          </div>
          <div className="flex flex-col justify-between gap-5 pt-7 text-sm text-primary-foreground/60 sm:flex-row sm:items-center"><span className="mono-label" dir="ltr">MADE WITH CURIOSITY / FOR A LIVABLE TOMORROW</span><button data-testid="button-footer-top" className="flex items-center gap-2 hover:text-primary-foreground" onClick={() => scrollToId('#home')}>العودة إلى البداية <ArrowUpLeft size={16} /></button></div>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;