import React, { useEffect, useMemo, useState } from 'react'

const photos = {
  hero: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=2200&q=88',
  hand: 'https://images.unsplash.com/photo-1608506375591-b90e1f955e4b?auto=format&fit=crop&w=1800&q=88',
  finish: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1800&q=88',
  dark: 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1800&q=88',
  cabin: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=88',
  line: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1800&q=88',
  road: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1800&q=88',
}

const treatments = [
  {
    name: 'Hand Wash',
    copy: 'A considered exterior clean for regular upkeep — bodywork, glass, wheels and the finishing details handled by hand.',
    image: photos.hand,
  },
  {
    name: 'Inside + Out',
    copy: 'Exterior care paired with a focused cabin reset for the cars that need both sides brought back into shape.',
    image: photos.cabin,
  },
  {
    name: 'Deep Detail',
    copy: 'A more thorough reset for tired interiors, neglected surfaces and vehicles that need time rather than shortcuts.',
    image: photos.dark,
  },
]

const gallery = [photos.finish, photos.hand, photos.cabin, photos.line, photos.road, photos.dark]

function useRouter() {
  const [path, setPath] = useState(window.location.pathname || '/')
  useEffect(() => {
    const pop = () => setPath(window.location.pathname || '/')
    window.addEventListener('popstate', pop)
    return () => window.removeEventListener('popstate', pop)
  }, [])
  const go = (to) => {
    if (to !== path) window.history.pushState({}, '', to)
    setPath(to)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return [path, go]
}

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>
}

function Brand({ go }) {
  return <button className="brand" onClick={() => go('/')} aria-label="LUMA home"><span className="brand-dot"></span><span>LUMA</span><small>CAR CARE</small></button>
}

function Header({ path, go }) {
  const [open, setOpen] = useState(false)
  const nav = (to) => { go(to); setOpen(false) }
  return <header className={path === '/' ? 'header hero-header' : 'header'}>
    <Brand go={go}/>
    <nav className={open ? 'nav open' : 'nav'}>
      <button className={path === '/treatments' ? 'active' : ''} onClick={() => nav('/treatments')}>Treatments</button>
      <button className={path === '/method' ? 'active' : ''} onClick={() => nav('/method')}>Method</button>
      <button className={path === '/gallery' ? 'active' : ''} onClick={() => nav('/gallery')}>Gallery</button>
      <button className={path === '/contact' ? 'active' : ''} onClick={() => nav('/contact')}>Contact</button>
    </nav>
    <button className="header-cta" onClick={() => nav('/book')}>Book care <Arrow/></button>
    <button className="menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation"><i></i><i></i></button>
  </header>
}

function Footer({ go }) {
  return <footer className="footer">
    <div className="footer-call">
      <p>Ready when the car is.</p>
      <button onClick={() => go('/book')}>Book your visit <Arrow/></button>
    </div>
    <div className="footer-grid">
      <div>
        <div className="footer-logo">LUMA<span></span></div>
        <p>Hand wash and detailing, presented with the same care as the finish itself.</p>
      </div>
      <div><small>Explore</small><button onClick={() => go('/treatments')}>Treatments</button><button onClick={() => go('/method')}>Method</button><button onClick={() => go('/gallery')}>Gallery</button></div>
      <div><small>Visit</small><button onClick={() => go('/contact')}>Contact</button><button onClick={() => go('/book')}>Book care</button></div>
    </div>
    <div className="footer-base"><span>© 2026 LUMA Car Care</span><span>Concept brand — business details added at launch.</span></div>
  </footer>
}

function Home({ go }) {
  return <main>
    <section className="home-hero">
      <img src={photos.hero} alt="Car being carefully hand washed"/>
      <div className="hero-film"></div>
      <div className="hero-copy reveal first">
        <h1>Care that leaves<br/><em>a quieter impression.</em></h1>
        <p>Thoughtful hand washing and detailing for cars you still turn around to look at.</p>
        <button className="pill light" onClick={() => go('/book')}>Book car care <Arrow/></button>
      </div>
      <div className="hero-note reveal second"><span>Hand wash</span><span>Interior care</span><span>Detailing</span></div>
    </section>

    <section className="statement section reveal-on-scroll">
      <p className="kicker">LUMA CAR CARE</p>
      <div className="statement-grid">
        <h2>Less rush.<br/>More attention.</h2>
        <div><p>We built LUMA around the details people notice after the wash is finished: clear glass, clean edges, properly dressed tyres, tidy touch points and a finish that feels complete.</p><button className="text-button" onClick={() => go('/method')}>How we work <Arrow/></button></div>
      </div>
      <figure className="wide-image"><img src={photos.finish} alt="Glossy car bodywork after cleaning"/></figure>
    </section>

    <section className="treatment-home section dark-section">
      <div className="section-title reveal-on-scroll"><p className="kicker warm">TREATMENTS</p><h2>Choose what the car needs today.</h2></div>
      <div className="treatment-list">
        {treatments.map((item) => <article className="treatment-row reveal-on-scroll" key={item.name}>
          <div className="treatment-photo"><img src={item.image} alt=""/></div>
          <div className="treatment-copy"><h3>{item.name}</h3><p>{item.copy}</p><button onClick={() => go('/treatments')}>View treatment <Arrow/></button></div>
        </article>)}
      </div>
    </section>

    <section className="method-preview section reveal-on-scroll">
      <div className="method-copy"><p className="kicker">THE METHOD</p><h2>Good work is mostly what you refuse to rush.</h2><p>We keep the process simple: understand the condition, choose the right level of care, work methodically, and inspect the finish before handover.</p><button className="pill outline" onClick={() => go('/method')}>See our method <Arrow/></button></div>
      <div className="method-image"><img src={photos.hand} alt="Car detailer working by hand"/></div>
    </section>

    <section className="gallery-preview section">
      <div className="gallery-heading reveal-on-scroll"><div><p className="kicker">RECENT FINISHES</p><h2>The work, without the sales pitch.</h2></div><button className="text-button" onClick={() => go('/gallery')}>Open gallery <Arrow/></button></div>
      <div className="gallery-strip">{gallery.slice(0,4).map((src,i)=><figure className="reveal-on-scroll" key={src}><img src={src} alt={`Car care finish ${i+1}`}/></figure>)}</div>
    </section>
  </main>
}

function PageHero({ eyebrow, title, italic, copy, image, align='left' }) {
  return <section className={`page-hero ${align}`}>
    <img src={image} alt=""/>
    <div className="page-hero-blend"></div>
    <div className="page-hero-copy reveal first"><p className="kicker">{eyebrow}</p><h1>{title}<br/><em>{italic}</em></h1><p>{copy}</p></div>
  </section>
}

function Treatments({ go }) {
  return <main>
    <PageHero eyebrow="TREATMENTS" title="Care shaped around" italic="the condition." copy="No long menu of add-ons. Start with what the car needs and choose the level of care that makes sense." image={photos.finish}/>
    <section className="treatment-page section">
      {treatments.map((item, i)=><article className={`treatment-feature reveal-on-scroll ${i%2 ? 'reverse':''}`} key={item.name}>
        <figure><img src={item.image} alt=""/></figure>
        <div><h2>{item.name}</h2><p>{item.copy}</p><p className="soft">Final inclusions and timing are confirmed before booking so there are no surprises when the car arrives.</p><button className="pill outline" onClick={() => go('/book')}>Request this treatment <Arrow/></button></div>
      </article>)}
    </section>
  </main>
}

function Method({ go }) {
  return <main>
    <PageHero eyebrow="THE METHOD" title="The finish starts" italic="before the water." copy="Good detailing is less about theatre and more about sequence, patience and knowing where not to cut corners." image={photos.hand} align="right"/>
    <section className="method-steps section">
      <article className="reveal-on-scroll"><span>Assess</span><h2>Start with the actual condition.</h2><p>We look at what is genuinely needed before choosing products or deciding how much time the job deserves.</p></article>
      <article className="reveal-on-scroll"><span>Work</span><h2>Move through the car methodically.</h2><p>Wheels, bodywork, glass, touch points and finishing details are handled in a deliberate order rather than rushed together.</p></article>
      <article className="reveal-on-scroll"><span>Inspect</span><h2>Look again before handover.</h2><p>The last few minutes matter. We check the areas that change how complete the result feels.</p></article>
    </section>
    <section className="method-dark reveal-on-scroll"><img src={photos.dark} alt="Dark car finish"/><div><p className="kicker warm">THE STANDARD</p><h2>Clean is the baseline.<br/><em>Complete is the goal.</em></h2><button className="pill light" onClick={() => go('/book')}>Book car care <Arrow/></button></div></section>
  </main>
}

function Gallery() {
  return <main>
    <section className="simple-title section"><p className="kicker">GALLERY</p><h1>Look closely.</h1><p>Finish, texture, reflection and the small details that make a clean car feel properly done.</p></section>
    <section className="gallery-grid section">{gallery.map((src,i)=><figure className={`reveal-on-scroll g${i+1}`} key={src}><img src={src} alt={`LUMA car care gallery ${i+1}`}/><figcaption>{['Bodywork','Hand wash','Cabin','Lines','Finish','Final check'][i]}</figcaption></figure>)}</section>
  </main>
}

function Contact({ go }) {
  return <main>
    <PageHero eyebrow="CONTACT" title="Talk to us about" italic="the car." copy="Questions before booking are welcome. Live phone, address and opening hours are added when the concept is connected to a real business." image={photos.line}/>
    <section className="contact-sheet section reveal-on-scroll">
      <div><h2>Start a conversation.</h2><p>For a real launch, replace the placeholders below with the business contact details and preferred messaging channel.</p></div>
      <div className="contact-list"><p><span>Call / message</span><strong>Business number</strong></p><p><span>Visit</span><strong>Car-care location</strong></p><p><span>Opening hours</span><strong>Schedule confirmed at launch</strong></p><button className="pill dark" onClick={() => go('/book')}>Book care <Arrow/></button></div>
    </section>
  </main>
}

function Book() {
  return <main className="book-page">
    <section className="book-intro reveal first"><p className="kicker warm">BOOK CARE</p><h1>Tell us what the car needs.</h1><p>This concept form is ready to connect to email, WhatsApp or a booking platform when the real business details are supplied.</p></section>
    <section className="book-form-wrap section reveal-on-scroll">
      <form className="book-form" onSubmit={(e)=>e.preventDefault()}>
        <label>Name<input placeholder="Your name"/></label>
        <label>Contact<input placeholder="Phone or email"/></label>
        <label>Vehicle<input placeholder="Make / model"/></label>
        <label>Treatment<select defaultValue=""><option value="" disabled>Select a treatment</option>{treatments.map(x=><option key={x.name}>{x.name}</option>)}</select></label>
        <label className="full">Anything we should know?<textarea rows="5" placeholder="Current condition, problem areas, preferred day…"></textarea></label>
        <button className="pill dark" type="submit">Send request <Arrow/></button>
      </form>
      <figure><img src={photos.cabin} alt="Car interior"/></figure>
    </section>
  </main>
}

function NotFound({ go }) { return <main className="not-found"><h1>Wrong turn.</h1><p>This page is not part of the LUMA concept.</p><button className="pill dark" onClick={()=>go('/')}>Back home <Arrow/></button></main> }

export default function App() {
  const [path, go] = useRouter()
  const Page = useMemo(() => ({'/':Home,'/treatments':Treatments,'/method':Method,'/gallery':Gallery,'/contact':Contact,'/book':Book}[path] || NotFound), [path])

  useEffect(() => {
    document.title = ({'/':'LUMA — Car Care','/treatments':'Treatments — LUMA','/method':'Method — LUMA','/gallery':'Gallery — LUMA','/contact':'Contact — LUMA','/book':'Book Care — LUMA'}[path] || 'LUMA — Car Care')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const els = [...document.querySelectorAll('.reveal-on-scroll')]
    const io = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')), { threshold:.14 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [path])

  useEffect(() => {
    const timer = setTimeout(() => document.body.classList.add('page-ready'), 30)
    return () => { clearTimeout(timer); document.body.classList.remove('page-ready') }
  }, [path])

  return <div className="app"><Header path={path} go={go}/><Page go={go}/><Footer go={go}/></div>
}
