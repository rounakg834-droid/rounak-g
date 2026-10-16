import { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  ChevronUp,
  Code2,
  Cpu,
  GraduationCap,
  Menu,
  Palette,
  SearchCheck,
  Sparkles,
  X,
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

const skills = [
  { name: 'HTML', label: 'Structure', mark: '01', icon: Braces },
  { name: 'CSS', label: 'Visual design', mark: '02', icon: Palette },
  { name: 'JavaScript', label: 'Interactivity', mark: '03', icon: Code2 },
  { name: 'C', label: 'Programming', mark: '04', icon: Cpu },
  { name: 'Git', label: 'Version control', mark: '05', icon: Code2 },
  { name: 'GitHub', label: 'Collaboration', mark: '06', icon: Sparkles },
]

const projects = [
  {
    number: '01',
    title: 'Full-Stack E-Commerce Store',
    description: 'A proposed shopping experience connecting discovery, checkout, and account tools in one polished storefront.',
    features: ['Product search', 'Category filters', 'Cart', 'Authentication', 'Order history', 'Proposed test-mode payments'],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    visual: 'store',
    previewLabel: 'RG / STORE',
    metric: 'CURATED GOODS',
  },
  {
    number: '02',
    title: 'AI-Powered Business Dashboard',
    description: 'A proposed analytics workspace that brings core business signals and an AI assistant into one view.',
    features: ['Analytics', 'Interactive charts', 'Business metrics', 'Proposed AI assistant'],
    stack: ['React', 'TypeScript', 'Recharts', 'AI API'],
    visual: 'dashboard',
    previewLabel: 'NORTHSTAR / OVERVIEW',
    metric: '+18.6%',
  },
  {
    number: '03',
    title: 'Booking & Reservation System',
    description: 'A proposed booking flow for browsing availability, choosing a time, and managing reservations.',
    features: ['Calendar', 'Time-slot selection', 'Booking management', 'Proposed notifications'],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    visual: 'booking',
    previewLabel: 'STUDIO / AVAILABILITY',
    metric: 'THU 24',
  },
  {
    number: '04',
    title: 'High-End Animated Landing Page',
    description: 'A proposed brand landing page shaped by cinematic motion, considered typography, and expressive details.',
    features: ['Cinematic animation', 'Premium typography', 'Responsive design', 'Visual effects'],
    stack: ['React', 'TypeScript', 'GSAP', 'CSS'],
    visual: 'landing',
    previewLabel: 'FORM / STUDIO',
    metric: 'MAKE AN IMPRESSION',
  },
  {
    number: '05',
    title: 'Real Estate Property Listing Platform',
    description: 'A proposed property discovery platform with flexible search and rich visual listing pages.',
    features: ['Property search', 'Advanced filters', 'Image galleries', 'Proposed map integration'],
    stack: ['React', 'TypeScript', 'Node.js', 'Maps API'],
    visual: 'estate',
    previewLabel: 'ATLAS / PROPERTIES',
    metric: '01—24 LISTINGS',
  },
  {
    number: '06',
    title: 'Online Course Platform',
    description: 'A proposed learning space for discovering courses, watching lessons, and keeping track of progress.',
    features: ['Course categories', 'Video lessons', 'Progress tracking', 'Proposed student/admin roles'],
    stack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    visual: 'course',
    previewLabel: 'FIELDNOTES / LEARN',
    metric: 'LESSON 04 / 12',
  },
  {
    number: '07',
    title: 'Restaurant QR Menu & WhatsApp Ordering',
    description: 'A proposed mobile-first menu that lets diners browse dishes and prepare an order for WhatsApp.',
    features: ['Digital menu', 'Food categories', 'Shopping cart', 'Proposed WhatsApp ordering'],
    stack: ['React', 'TypeScript', 'WhatsApp API', 'CSS'],
    visual: 'restaurant',
    previewLabel: 'TABLE / MENU',
    metric: 'FRESH FROM THE KITCHEN',
  },
  {
    number: '08',
    title: 'SEO-Optimized Lead Generation Website',
    description: 'A proposed service website designed to explain an offering clearly and guide visitors toward contact.',
    features: ['Service pages', 'Contact forms', 'Blog concept', 'SEO-friendly structure'],
    stack: ['React', 'TypeScript', 'Node.js', 'SEO'],
    visual: 'leads',
    previewLabel: 'NORTH / ADVISORY',
    metric: 'GROW WITH CLARITY',
  },
]

const milestones = [
  {
    phase: 'NOW',
    title: 'Computer Science & Engineering',
    place: 'Diploma in progress · Lovely Professional University',
    description:
      'Developing a foundation in Computer Science & Engineering through programming and practical software projects.',
  },
  {
    phase: 'IN PRACTICE',
    title: 'Learning by building',
    place: 'Web development · Programming fundamentals',
    description:
      'Exploring software development and programming by building projects and practicing with HTML, CSS, JavaScript, C, Git, and GitHub.',
  },
  {
    phase: 'NEXT',
    title: 'Keep exploring',
    place: 'One concept, one project at a time',
    description:
      'Growing steadily through curiosity, practice, and a willingness to learn something new.',
  },
]

const particles = Array.from({ length: 26 }, (_, index) => ({
  left: `${(index * 37 + 13) % 100}%`,
  top: `${(index * 61 + 9) % 100}%`,
  size: `${index % 5 === 0 ? 4 : 2}px`,
  animationDelay: `${(index % 9) * -0.7}s`,
}))

function AnimatedWords({ text }: { text: string }) {
  return (
    <>
      {text.split(/\s+/).map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 ? ' ' : null}
          <span className="word-window">
            <span className="word-inner">{word}</span>
          </span>
        </Fragment>
      ))}
    </>
  )
}

function ProjectPreview({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className={`concept-preview concept-preview--${project.visual}`} aria-hidden="true">
      <div className="preview-chrome">
        <span className="preview-brand-mark">R.</span>
        <span className="preview-label">{project.previewLabel}</span>
        <span className="preview-chrome-dot" />
      </div>
      {project.visual === 'store' && (
        <div className="store-preview">
          <div className="preview-copy">
            <small>OBJECTS FOR EVERY DAY</small>
            <strong>Less, but<br />better.</strong>
            <span>DISCOVER COLLECTION <ArrowUpRight size={12} /></span>
          </div>
          <div className="store-product">
            <i className="store-vase" />
            <span>FORM Nº 04</span>
            <b>$ 68</b>
          </div>
          <div className="preview-search"><i /> Search the collection</div>
        </div>
      )}
      {project.visual === 'dashboard' && (
        <div className="dashboard-preview">
          <div className="preview-metric"><small>NET REVENUE</small><strong>$48,290</strong><span>↗ 18.6%</span></div>
          <div className="preview-bars">
            {[34, 48, 40, 68, 56, 78, 61, 90, 70, 100, 82, 112].map((height, index) => (
              <i key={index} style={{ height: `${height}px` }} />
            ))}
          </div>
          <div className="dashboard-legend"><i /> REVENUE <span>LAST 12 MONTHS</span></div>
          <div className="dashboard-assistant"><Sparkles size={13} /> Ask your AI analyst <ArrowUpRight size={12} /></div>
        </div>
      )}
      {project.visual === 'booking' && (
        <div className="booking-preview">
          <div className="booking-calendar">
            <div><span>SEPTEMBER 2026</span><ArrowRight size={12} /></div>
            <div className="calendar-days">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => <i key={i}>{day}</i>)}</div>
            <div className="calendar-dates">{Array.from({ length: 14 }, (_, i) => <i className={i === 9 ? 'is-selected' : ''} key={i}>{i + 14}</i>)}</div>
          </div>
          <div className="booking-slots">
            <small>AVAILABLE TIMES</small>
            <span>09:30 AM</span><span className="is-selected">11:00 AM</span><span>01:30 PM</span>
            <b>CONFIRM BOOKING <ArrowUpRight size={11} /></b>
          </div>
        </div>
      )}
      {project.visual === 'landing' && (
        <div className="landing-preview">
          <span className="landing-orb" />
          <small>CREATIVE PARTNER · EST. MMXXIV</small>
          <strong>Make room<br />for <em>what&apos;s next.</em></strong>
          <span className="landing-cta">EXPLORE OUR APPROACH <ArrowUpRight size={11} /></span>
          <span className="landing-index">01 — 04</span>
        </div>
      )}
      {project.visual === 'estate' && (
        <div className="estate-preview">
          <div className="estate-main-image"><span>01 / 08</span><i /></div>
          <div className="estate-side-images"><i /><i /></div>
          <div className="estate-search">
            <span>LOCATION <b>Brooklyn, NY</b></span>
            <span>TYPE <b>For sale</b></span>
            <span className="estate-search-button"><SearchCheck size={14} /></span>
          </div>
          <div className="estate-caption"><strong>Quiet spaces,<br />considered living.</strong><span>VIEW 24 HOMES ↗</span></div>
        </div>
      )}
      {project.visual === 'course' && (
        <div className="course-preview">
          <div className="course-video"><span className="course-play"><ArrowRight size={16} /></span><small>LESSON 04 · 12:38</small></div>
          <div className="course-info">
            <small>DESIGN FOUNDATIONS</small>
            <strong>Building a visual<br />language</strong>
            <div className="course-progress"><i /><span>42% COMPLETE</span></div>
            <div className="course-module"><span>04</span> Color, contrast &amp; composition <b>12:38</b></div>
          </div>
        </div>
      )}
      {project.visual === 'restaurant' && (
        <div className="restaurant-preview">
          <div className="restaurant-menu">
            <small>ALL DAY · SEASONAL</small>
            <strong>Good food,<br /><em>good company.</em></strong>
            <div className="restaurant-categories"><span>POPULAR</span><span>SMALL PLATES</span><span>MAINS</span></div>
            <div className="restaurant-dish"><i /><span><b>Roasted garden bowl</b><small>Herbs · grains · citrus</small></span><strong>$16</strong></div>
            <div className="restaurant-dish"><i /><span><b>House sourdough</b><small>Whipped cultured butter</small></span><strong>$8</strong></div>
          </div>
          <div className="restaurant-cart"><span>YOUR ORDER <b>02</b></span><strong>$24.00</strong><span className="whatsapp-cta">ORDER ON WHATSAPP <ArrowUpRight size={11} /></span></div>
          <span className="restaurant-qr"><i /><small>SCAN TO MENU</small></span>
        </div>
      )}
      {project.visual === 'leads' && (
        <div className="leads-preview">
          <div className="leads-nav"><span>NA / ADVISORY</span><span>ABOUT&nbsp;&nbsp; SERVICES&nbsp;&nbsp; INSIGHTS</span></div>
          <div className="leads-copy">
            <small>STRATEGY FOR WHAT&apos;S NEXT</small>
            <strong>Build a business<br />with <em>momentum.</em></strong>
            <span>Good work starts with a clear conversation.</span>
            <b>LET&apos;S TALK <ArrowUpRight size={11} /></b>
          </div>
          <div className="leads-side-note">INSIGHT / 001<br />A PRACTICAL GUIDE TO GROWTH</div>
        </div>
      )}
      <span className="preview-bottom-label">{project.metric}</span>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [portraitAvailable, setPortraitAvailable] = useState(true)
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null)

  useEffect(() => {
    if (!activeProject) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveProject(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [activeProject])

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0
      document.documentElement.style.setProperty('--scroll-progress', String(progress))
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    let active = true
    let refreshFrame = 0
    const refreshTriggers = () => {
      window.cancelAnimationFrame(refreshFrame)
      refreshFrame = window.requestAnimationFrame(() => {
        if (active) ScrollTrigger.refresh()
      })
    }
    const images = Array.from(document.querySelectorAll('img'))
    images.forEach((image) => {
      image.addEventListener('load', refreshTriggers)
      image.addEventListener('error', refreshTriggers)
    })
    window.addEventListener('load', refreshTriggers)
    window.addEventListener('resize', refreshTriggers)
    void document.fonts?.ready.then(() => {
      if (active) refreshTriggers()
    })

    const desktopMotion = gsap.matchMedia()
    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro
        .fromTo(
          '.hero-kicker',
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
        )
        .fromTo(
          '.hero-letter',
          { autoAlpha: 0, yPercent: 110, rotateX: -70, z: -80, filter: 'blur(14px)' },
          {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            z: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            stagger: 0.06,
            clearProps: 'filter,transform',
          },
          '-=0.25',
        )
        .fromTo(
          '.hero-intro, .hero-actions, .hero-side-note',
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.12 },
          '-=0.4',
        )
        .fromTo(
          '.portrait-frame',
          { autoAlpha: 0, clipPath: 'inset(15% 15% 15% 15% round 45%)' },
          {
            autoAlpha: 1,
            clipPath: 'inset(0% 0% 0% 0% round 1rem)',
            duration: 1.15,
          },
          '-=0.85',
        )
        .fromTo(
          '.portrait-frame img',
          { clipPath: 'inset(0 0 100% 0)', scale: 1.12 },
          {
            clipPath: 'inset(0 0 0% 0)',
            scale: 1,
            duration: 1.1,
            ease: 'power2.out',
            clearProps: 'clipPath,transform',
          },
          '-=0.95',
        )

      gsap.utils.toArray<HTMLElement>('.reveal').forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 54, filter: 'blur(9px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              end: 'bottom 18%',
              toggleActions: 'play none play reverse',
              invalidateOnRefresh: true,
            },
            clearProps: 'filter,transform',
          },
        )
      })

      gsap.utils
        .toArray<HTMLElement>('.word-reveal-group')
        .forEach((group) => {
          gsap.fromTo(
            group.querySelectorAll<HTMLElement>('.word-inner'),
            { autoAlpha: 0, yPercent: 115, rotateX: -24, filter: 'blur(8px)' },
            {
              autoAlpha: 1,
              yPercent: 0,
              rotateX: 0,
              filter: 'blur(0px)',
              duration: 0.82,
              stagger: 0.075,
              ease: 'power3.out',
              clearProps: 'filter,transform',
              scrollTrigger: {
                trigger: group,
                start: 'top 86%',
                end: 'bottom 18%',
                toggleActions: 'play none play reverse',
                invalidateOnRefresh: true,
              },
            },
          )
        })

      gsap.utils.toArray<HTMLElement>('.section-topline').forEach((element) => {
        gsap.fromTo(
          element.querySelectorAll('span'),
          { autoAlpha: 0, y: 10 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              end: 'bottom 20%',
              toggleActions: 'play none play reverse',
              invalidateOnRefresh: true,
            },
            clearProps: 'filter,transform',
          },
        )
      })

      gsap.fromTo(
        '.skill-card',
        { autoAlpha: 0, y: 28, rotateX: -8 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 84%',
            end: 'bottom 15%',
            toggleActions: 'play none play reverse',
            invalidateOnRefresh: true,
          },
          clearProps: 'filter,transform',
        },
      )

      gsap.fromTo(
        '.project-card',
        { autoAlpha: 0, y: 58, filter: 'blur(8px)' },
        {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 84%',
            end: 'bottom 15%',
            toggleActions: 'play none play reverse',
            invalidateOnRefresh: true,
          },
          clearProps: 'filter,transform',
        },
      )

      gsap.utils.toArray<HTMLElement>('.project-card').forEach((card) => {
        const preview = card.querySelector<HTMLElement>('.concept-preview')
        const previewGrid = card.querySelector<HTMLElement>('.preview-grid')

        if (preview) {
          gsap.fromTo(
            preview,
            { clipPath: 'inset(8% 7% 8% 7% round 1rem)', scale: 1.04 },
            {
              clipPath: 'inset(0% 0% 0% 0% round 0rem)',
              scale: 1,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                end: 'bottom 14%',
                toggleActions: 'play none play reverse',
                invalidateOnRefresh: true,
              },
              clearProps: 'clipPath,transform',
            },
          )
        }

        if (previewGrid) {
          gsap.to(previewGrid, {
            yPercent: -15,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          })
        }

        gsap.fromTo(
          card.querySelectorAll<HTMLElement>('.project-meta, .project-details > p, .concept-stack'),
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 78%',
              end: 'bottom 14%',
              toggleActions: 'play none play reverse',
              invalidateOnRefresh: true,
            },
            clearProps: 'transform',
          },
        )
      })

      gsap.fromTo(
        '.about-photo img',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.1,
          ease: 'power2.out',
          clearProps: 'clipPath',
          scrollTrigger: {
            trigger: '.about-photo',
            start: 'top 78%',
            end: 'bottom 18%',
            toggleActions: 'play none play reverse',
            invalidateOnRefresh: true,
          },
        },
      )

      gsap.to('.about-photo', {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-photo',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.8,
        },
      }      )

      gsap.fromTo(
        '.timeline-marker',
        { scale: 0.65, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.55,
          stagger: 0.18,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 78%',
            end: 'bottom 16%',
            toggleActions: 'play none play reverse',
            invalidateOnRefresh: true,
          },
        },
      )

      gsap.fromTo(
        '.timeline-track',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline',
            start: 'top 76%',
            end: 'bottom 65%',
            scrub: 0.7,
          },
        },
      )

      gsap.fromTo(
        '.email-link',
        { autoAlpha: 0, x: 22 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact',
            start: 'top 76%',
            end: 'bottom 15%',
            toggleActions: 'play none play reverse',
            invalidateOnRefresh: true,
          },
        },
      )

      desktopMotion.add('(min-width: 761px)', () => {
        gsap.to('.hero-orbit', {
          rotate: 360,
          duration: 44,
          repeat: -1,
          ease: 'none',
          transformOrigin: '50% 50%',
        })

        gsap.to('.hero-orbit', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })

        gsap.to('.portrait-frame', {
          yPercent: -7,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        })

        gsap.to('.about-photo', {
          yPercent: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: '.about-photo',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        })

        if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
          const cursor = document.querySelector<HTMLElement>('.cursor-glow')
          const followCursor = (event: PointerEvent) => {
            if (cursor) {
              cursor.style.left = `${event.clientX}px`
              cursor.style.top = `${event.clientY}px`
              cursor.classList.add('is-visible')
            }
          }
          const hideCursor = () => cursor?.classList.remove('is-visible')
          window.addEventListener('pointermove', followCursor, { passive: true })
          window.addEventListener('pointerleave', hideCursor)

          const tiltCards = gsap.utils.toArray<HTMLElement>('.skill-card, .project-card')
          const cleanups = tiltCards.map((card) => {
            const moveCard = (event: PointerEvent) => {
              const bounds = card.getBoundingClientRect()
              const x = (event.clientX - bounds.left) / bounds.width
              const y = (event.clientY - bounds.top) / bounds.height
              card.style.setProperty('--pointer-x', `${x * 100}%`)
              card.style.setProperty('--pointer-y', `${y * 100}%`)
              card.style.setProperty('--tilt-x', `${(x - 0.5) * 5}deg`)
              card.style.setProperty('--tilt-y', `${(0.5 - y) * 5}deg`)
            }
            const resetCard = () => {
              card.style.setProperty('--tilt-x', '0deg')
              card.style.setProperty('--tilt-y', '0deg')
            }
            card.addEventListener('pointermove', moveCard, { passive: true })
            card.addEventListener('pointerleave', resetCard)
            return () => {
              card.removeEventListener('pointermove', moveCard)
              card.removeEventListener('pointerleave', resetCard)
            }
          })

          const magneticButtons = gsap.utils.toArray<HTMLElement>(
            '.button-primary, .email-link',
          )
          const cleanMagnetic = magneticButtons.map((button) => {
            const xTo = gsap.quickTo(button, '--magnetic-x', {
              duration: 0.25,
              ease: 'power2.out',
            })
            const yTo = gsap.quickTo(button, '--magnetic-y', {
              duration: 0.25,
              ease: 'power2.out',
            })
            const moveButton = (event: PointerEvent) => {
              const bounds = button.getBoundingClientRect()
              xTo((event.clientX - bounds.left - bounds.width / 2) * 0.08)
              yTo((event.clientY - bounds.top - bounds.height / 2) * 0.08)
            }
            const resetButton = () => {
              xTo(0)
              yTo(0)
            }
            button.addEventListener('pointermove', moveButton, { passive: true })
            button.addEventListener('pointerleave', resetButton)
            return () => {
              button.removeEventListener('pointermove', moveButton)
              button.removeEventListener('pointerleave', resetButton)
            }
          })

          return () => {
            window.removeEventListener('pointermove', followCursor)
            window.removeEventListener('pointerleave', hideCursor)
            cleanups.forEach((cleanup) => cleanup())
            cleanMagnetic.forEach((cleanup) => cleanup())
            cursor?.classList.remove('is-visible')
          }
        }
      })

      const story = gsap.timeline({
        scrollTrigger: {
          trigger: '.story-section',
          start: 'top top',
          end: () => `+=${window.matchMedia('(min-width: 900px)').matches ? window.innerHeight : Math.max(window.innerHeight * 0.55, 420)}`,
          scrub: 1,
        },
      })
      story
        .fromTo(
          '.story-eyebrow',
          { autoAlpha: 0, y: 55 },
          { autoAlpha: 1, y: 0, stagger: 0.16, ease: 'power2.out' },
        )
        .fromTo(
          '.story-orbit',
          { scale: 0.7, rotate: -30, autoAlpha: 0 },
          { scale: 1, rotate: 0, autoAlpha: 1, ease: 'power2.out' },
          '<',
        )
        .fromTo(
          '.story-last-line',
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, ease: 'power2.out' },
          '+=0.12',
        )
    })
    refreshTriggers()

    return () => {
      active = false
      window.cancelAnimationFrame(refreshFrame)
      images.forEach((image) => {
        image.removeEventListener('load', refreshTriggers)
        image.removeEventListener('error', refreshTriggers)
      })
      window.removeEventListener('load', refreshTriggers)
      window.removeEventListener('resize', refreshTriggers)
      desktopMotion.revert()
      context.revert()
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
    <div className="cursor-glow" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Rounak Gupta home">
          <span className="brand-mark">R.</span>
          <span className="brand-name">ROUNAK GUPTA</span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {[
            ['About', '#about'],
            ['Skills', '#skills'],
            ['Work', '#projects'],
            ['Journey', '#journey'],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            Let&apos;s talk <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <section className="hero" id="home" aria-labelledby="hero-title">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-particles" aria-hidden="true">
          {particles.map((particle, index) => (
            <i key={index} style={particle} />
          ))}
        </div>
        <div className="hero-orbit" aria-hidden="true">
          <span />
        </div>
        <div className="hero-content">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span className="status-dot" /> COMPUTER SCIENCE &amp; ENGINEERING
            </p>
            <h1 id="hero-title" aria-label="Rounak Gupta">
              <span className="hero-name-line">
                {'ROUNAK'.split('').map((letter, index) => (
                  <span className="hero-letter" aria-hidden="true" key={`${letter}-${index}`}>
                    {letter}
                  </span>
                ))}
              </span>
              <span className="hero-name-line hero-name-outline">
                {'GUPTA'.split('').map((letter, index) => (
                  <span className="hero-letter" aria-hidden="true" key={`${letter}-${index}`}>
                    {letter}
                  </span>
                ))}
                <span className="hero-period hero-letter" aria-hidden="true">.</span>
              </span>
            </h1>
            <p className="hero-intro">
              <span>Computer Science &amp; Engineering</span>
              {' | '}
              Developer
              {' | '}
              Project Builder
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore my work <ArrowDown size={16} />
              </a>
              <a className="text-link" href="#about">
                A little about me <ArrowRight size={15} />
              </a>
            </div>
          </div>
          <div className="hero-portrait-wrap">
            <div className="portrait-frame">
              {portraitAvailable ? (
                <img
                  src="/assets/rounak.jpg"
                  alt="Portrait of Rounak Gupta"
                  decoding="async"
                  fetchPriority="high"
                  onError={() => setPortraitAvailable(false)}
                />
              ) : (
                <div className="portrait-placeholder" aria-label="Portrait photo placeholder">
                  <span>RG</span>
                  <small>PORTRAIT</small>
                </div>
              )}
              <div className="portrait-caption">
                <span>ROUNAK GUPTA</span>
                <span>BUILDING IN PROGRESS <i /></span>
              </div>
            </div>
            <p className="hero-side-note">
              <span>01 / 06</span> A curious mind, an open canvas.
            </p>
          </div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown size={14} />
        </a>
        <span className="hero-index" aria-hidden="true">PORTFOLIO — 2026</span>
      </section>

      <section className="about section-pad" id="about">
        <div className="section-topline reveal">
          <span>01 — A LITTLE ABOUT ME</span>
          <span>GETTING TO KNOW THE PERSON BEHIND THE PROJECTS</span>
        </div>
        <div className="about-layout">
          <div className="about-photo-wrap reveal">
            <div className="about-photo">
              {portraitAvailable ? (
                <img
                  src="/assets/rounak.jpg"
                  alt="Rounak Gupta"
                  loading="lazy"
                  decoding="async"
                  onError={() => setPortraitAvailable(false)}
                />
              ) : (
                <div className="portrait-placeholder about-placeholder" aria-label="Portrait photo placeholder">
                  <span>RG</span>
                  <small>YOUR PHOTO GOES HERE</small>
                </div>
              )}
              <span className="photo-corner photo-corner-tl" />
              <span className="photo-corner photo-corner-br" />
            </div>
            <p className="photo-note"><span>FIG. 01</span> A face to the name.</p>
          </div>
          <div className="about-copy">
            <p className="eyebrow reveal">HELLO, I&apos;M ROUNAK</p>
            <h2 className="section-heading word-reveal-group">
              <AnimatedWords text="At the start of" />
              <br />
              <span><AnimatedWords text="something good." /></span>
            </h2>
            <p className="about-body reveal">
              I&apos;m Rounak Gupta, exploring Computer Science &amp; Engineering at Lovely
              Professional University. I&apos;m interested in software development,
              programming, and building practical projects that turn ideas into working
              solutions.
            </p>
            <p className="about-body about-body-muted reveal">
              This portfolio is a snapshot of what I&apos;m learning and making right now —
              with plenty more still ahead.
            </p>
            <div className="education-chip reveal">
              <span className="chip-icon"><GraduationCap size={19} /></span>
              <span>
                <small>EDUCATION IN PROGRESS</small>
                <strong>Computer Science &amp; Engineering</strong>
                <small>Diploma in Computer Science &amp; Engineering</small>
                <small>Lovely Professional University</small>
              </span>
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </section>

      <section className="skills section-pad" id="skills">
        <div className="section-topline reveal">
          <span>02 — MY TOOLKIT</span>
          <span>THE BASICS I&apos;M GROWING WITH</span>
        </div>
        <div className="skills-heading">
          <h2 className="section-heading word-reveal-group">
            <AnimatedWords text="Tools of the" /> <span><AnimatedWords text="trade." /></span>
          </h2>
          <p className="reveal">Learning, practicing, and getting a little better every day.</p>
        </div>
        <div className="skills-grid">
          {skills.map(({ name, label, mark, icon: Icon }) => (
            <article className="skill-card" key={name}>
              <div className="skill-card-top">
                <span>{mark}</span>
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <h3>{name}</h3>
              <p>{label}</p>
              <span className="skill-card-line" />
            </article>
          ))}
        </div>
        <p className="skills-footnote reveal"><span /> A growing toolkit — not a finished list.</p>
      </section>

      <section className="projects section-pad" id="projects">
        <div className="section-topline reveal">
          <span>03 — PROJECT CONCEPTS</span>
          <span>PROPOSED IDEAS · DESIGNED TO BE BUILT</span>
        </div>
        <div className="projects-heading">
          <h2 className="section-heading word-reveal-group">
            <AnimatedWords text="Ideas taking" /> <span><AnimatedWords text="shape." /></span>
          </h2>
          <p className="reveal">Eight proposed digital experiences, each imagined with a distinct purpose and visual direction.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="project-art">
                <span className="preview-grid" aria-hidden="true" />
                <ProjectPreview project={project} />
                <span className="project-number">{project.number} / 08</span>
              </div>
              <div className="project-details">
                <div className="project-meta">
                  <span>PROJECT CONCEPT</span>
                  <span>{project.number}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.features.map((feature) => <span key={feature}>{feature}</span>)}
                </div>
                <div className="concept-stack">
                  <small>SUGGESTED STACK</small>
                  <span>{project.stack.join(' · ')}</span>
                </div>
                <button
                  className="project-link concept-open"
                  type="button"
                  onClick={() => setActiveProject(project)}
                  aria-haspopup="dialog"
                >
                  View Concept <ArrowUpRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {activeProject && (
        <div
          className="concept-panel-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveProject(null)
          }}
        >
          <section
            className="concept-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="concept-panel-title"
          >
            <button
              className="concept-panel-close"
              type="button"
              onClick={() => setActiveProject(null)}
              aria-label="Close concept details"
            >
              <X size={19} />
            </button>
            <p className="eyebrow">PROJECT CONCEPT / {activeProject.number}</p>
            <h2 id="concept-panel-title">{activeProject.title}</h2>
            <p className="concept-panel-description">{activeProject.description}</p>
            <div className="concept-panel-block">
              <h3>Concept features</h3>
              <ul>{activeProject.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </div>
            <div className="concept-panel-block">
              <h3>Suggested technology stack</h3>
              <div className="project-tags">{activeProject.stack.map((technology) => <span key={technology}>{technology}</span>)}</div>
            </div>
            <p className="concept-panel-note">Proposed concept — not a claim of a completed application.</p>
          </section>
        </div>
      )}

      <section className="journey section-pad" id="journey">
        <div className="section-topline reveal">
          <span>04 — THE JOURNEY</span>
          <span>NO SHORTCUTS, JUST FORWARD</span>
        </div>
        <div className="journey-layout">
          <div className="journey-intro">
            <p className="eyebrow reveal">LEARNING IN MOTION</p>
            <h2 className="section-heading word-reveal-group">
              <AnimatedWords text="Every step" /> <span><AnimatedWords text="counts." /></span>
            </h2>
            <p className="journey-note reveal">
              My Computer Science &amp; Engineering journey is taking shape through
              programming, practical projects, and steady learning.
            </p>
            <div className="journey-stamp reveal">
              <span className="stamp-ring">ALWAYS<br />LEARNING</span>
              <Sparkles size={16} />
            </div>
          </div>
          <div className="timeline">
            <span className="timeline-track" aria-hidden="true" />
            {milestones.map(({ phase, title, place, description }, index) => (
              <article className="timeline-item reveal" key={phase}>
                <div className="timeline-marker"><span>0{index + 1}</span></div>
                <div className="timeline-content">
                  <span className="timeline-phase">{phase}</span>
                  <h3>{title}</h3>
                  <p className="timeline-place">{place}</p>
                  <p className="timeline-description">{description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="section-topline reveal">
          <span>05 — OPEN DOOR</span>
          <span>QUESTIONS, IDEAS, OR A SIMPLE HELLO</span>
        </div>
        <div className="contact-layout">
          <div>
            <p className="eyebrow reveal">LET&apos;S CONNECT</p>
            <h2 className="contact-heading word-reveal-group">
              <AnimatedWords text="Good things" />
              <br />
              <span><AnimatedWords text="start with hello." /></span>
            </h2>
          </div>
          <div className="contact-aside reveal">
            <p>I&apos;m always glad to hear from people who are building, learning, or curious.</p>
            <a className="email-link" href="mailto:rounakg834@gmail.com">
              <span>rounakg834@gmail.com</span>
              <ArrowUpRight size={20} />
            </a>
            <p className="contact-response">A direct line to my inbox.</p>
          </div>
        </div>
      </section>

      <section className="story-section">
        <div className="story-pin">
          <div className="story-grain" aria-hidden="true" />
          <div className="story-orbit" aria-hidden="true">
            <span className="orbit-core">RG</span>
            <i className="orbit-dot" />
          </div>
          <div className="story-copy">
            <p className="story-eyebrow">THE NEXT CHAPTER IS UNWRITTEN</p>
            <h2 className="story-headline word-reveal-group">
              <AnimatedWords text="Still learning." />
              <br />
              <span><AnimatedWords text="Still becoming." /></span>
            </h2>
            <p className="story-last-line">And that&apos;s the exciting part.</p>
            <a className="story-contact-link" href="mailto:rounakg834@gmail.com">
              SAY HELLO <ArrowUpRight size={15} />
            </a>
          </div>
          <span className="story-coordinate" aria-hidden="true">31°15&apos; N&nbsp; 75°42&apos; E</span>
        </div>
      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#home">R<span>.</span>G</a>
        <p>CSE <span>·</span> MADE WITH CURIOSITY <span>·</span> ROUNAK GUPTA</p>
        <a className="back-to-top" href="#home" aria-label="Back to top">
          BACK TO TOP <ChevronUp size={15} />
        </a>
      </footer>
    </main>
  )
}

export default App
