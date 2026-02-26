import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import menuItems, { categories, stats, whyUs } from './data/menu'

/* ───────── CART CONTEXT ───────── */
const CartCtx = createContext()

function useCart() { return useContext(CartCtx) }

function CartProvider({ children }) {
    const [items, setItems] = useState([])
    const [open, setOpen] = useState(false)

    const add = (product) => {
        setItems(prev => {
            const found = prev.find(i => i.id === product.id)
            if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
            return [...prev, { ...product, qty: 1 }]
        })
    }

    const update = (id, delta) => {
        setItems(prev =>
            prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
                .filter(i => i.qty > 0)
        )
    }

    const count = items.reduce((s, i) => s + i.qty, 0)

    return (
        <CartCtx.Provider value={{ items, open, setOpen, add, update, count }}>
            {children}
        </CartCtx.Provider>
    )
}

/* ───────── SCROLL REVEAL HOOK ───────── */
function useReveal(ref) {
    useEffect(() => {
        const el = ref?.current
        if (!el) return
        const targets = el.querySelectorAll('.reveal')
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
        }, { threshold: 0.1 })
        targets.forEach(t => obs.observe(t))
        return () => obs.disconnect()
    }, [ref])
}

/* ═══════════════════════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════════════════════ */
function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', fn, { passive: true })
        return () => window.removeEventListener('scroll', fn)
    }, [])

    const links = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Menu', href: '#menu' },
        { label: 'Contact', href: '#contact' },
    ]

    const go = (href) => {
        setMobileOpen(false)
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
                <a className="navbar-logo" href="#home" onClick={e => { e.preventDefault(); go('#home') }}>
                    <img src="/logo.png" alt="Fadi's Bites" />
                </a>

                <ul className="nav-links">
                    {links.map(l => (
                        <li key={l.label}>
                            <a href={l.href} onClick={e => { e.preventDefault(); go(l.href) }}>{l.label}</a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="https://wa.me/916282070065"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="nav-cta"
                        >
                            Order Now
                        </a>
                    </li>
                </ul>

                <button
                    className={`hamburger${mobileOpen ? ' open' : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Menu"
                >
                    <span /><span /><span />
                </button>
            </nav>

            <div className={`mobile-overlay${mobileOpen ? ' open' : ''}`}>
                {links.map(l => (
                    <a key={l.label} href={l.href} onClick={e => { e.preventDefault(); go(l.href) }}>
                        {l.label}
                    </a>
                ))}
                <a
                    href="https://wa.me/916282070065"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-cta"
                    style={{ marginTop: '1rem' }}
                >
                    Order Now
                </a>
            </div>
        </>
    )
}

/* ═══════════════════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
    return (
        <section id="home" className="hero">
            <div className="hero-bg" />
            <div className="hero-content">
                <div className="hero-badge">🌿 Authentic Kerala Snacks</div>
                <h1 className="hero-title">
                    Fadi's <span className="red">Bites</span>
                </h1>
                <p className="hero-tagline">Baked with Love, Spiced with Culture!</p>
                <p className="hero-desc">
                    Premium ready-to-cook snacks crafted from the finest Kerala ingredients.
                    Where tradition meets modern convenience — one bite at a time.
                </p>
                <div className="hero-btns">
                    <a href="#menu" className="btn-primary" onClick={e => { e.preventDefault(); document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' }) }}>
                        Explore Menu
                    </a>
                    <a href="#contact" className="btn-outline" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
                        Get in Touch
                    </a>
                </div>
            </div>
            <div className="scroll-hint">
                <div className="scroll-mouse" />
                SCROLL
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════════════════ */
function About() {
    const ref = useRef()
    useReveal(ref)
    return (
        <section id="about" className="about-section" ref={ref}>
            <div className="container">
                <div className="about-grid">
                    <div className="about-img-wrap reveal">
                        <img
                            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
                            alt="Kerala cuisine spread"
                        />
                        <div className="about-img-accent" />
                    </div>
                    <div className="about-text reveal reveal-d1">
                        <p className="section-label">Our Story</p>
                        <h2 className="section-title">
                            From Malabar's Kitchen to <span className="gradient-text">Your Table</span>
                        </h2>
                        <p>
                            Born in the heart of Edappal, Kerala, <strong>Fadi's Food Corp.</strong> brings
                            you the authentic flavours of Malabar — frozen fresh and ready to cook in minutes.
                        </p>
                        <p>
                            Every snack is handcrafted using traditional recipes passed through generations,
                            with only the finest all-natural ingredients. No preservatives, no shortcuts.
                        </p>
                        <p style={{ fontStyle: 'italic', color: 'var(--gold)' }}>
                            "Baked with Love, Spiced with Culture."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════════
   STATS
   ═══════════════════════════════════════════════════════════════ */
function Stats() {
    const ref = useRef()
    useReveal(ref)
    return (
        <section className="stats-section" ref={ref}>
            <div className="container">
                <div className="stats-grid">
                    {stats.map(s => (
                        <div key={s.label} className="reveal">
                            <div className="stat-num">{s.num}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════════
   MENU CARD
   ═══════════════════════════════════════════════════════════════ */
function MenuCard({ item, idx }) {
    const { add } = useCart()
    return (
        <div className="menu-card" style={{ animation: `fadeInUp .5s var(--ease) ${idx * .05}s both` }}>
            <div className="menu-card-img-wrap">
                <img src={item.image} alt={item.name} className="menu-card-img" />
                {item.badge && <span className="menu-card-badge">{item.badge}</span>}
            </div>
            <div className="menu-card-body">
                <div className="menu-card-tag">{item.tag}</div>
                <h3 className="menu-card-name">{item.name}</h3>
                <p className="menu-card-desc">{item.desc}</p>
                <div className="menu-card-footer">
                    <button className="btn-add" onClick={() => add(item)}>+ Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

/* ═══════════════════════════════════════════════════════════════
   MENU
   ═══════════════════════════════════════════════════════════════ */
function Menu() {
    const [filter, setFilter] = useState('All')
    const ref = useRef()
    useReveal(ref)
    const list = filter === 'All' ? menuItems : menuItems.filter(i => i.category === filter)

    return (
        <section id="menu" className="menu-section" ref={ref}>
            <div className="container">
                <div className="menu-header reveal">
                    <p className="section-label">Our Irresistible Snack Range</p>
                    <h2 className="section-title">
                        Savory Snacks <span className="gradient-text">(Ready to Cook)</span>
                    </h2>
                </div>

                <div className="filter-bar reveal">
                    {categories.map(c => (
                        <button
                            key={c}
                            className={`filter-btn${filter === c ? ' active' : ''}`}
                            onClick={() => setFilter(c)}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className="menu-grid">
                    {list.map((item, i) => (
                        <MenuCard key={item.id} item={item} idx={i} />
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════════
   WHY US
   ═══════════════════════════════════════════════════════════════ */
function WhyUs() {
    const ref = useRef()
    useReveal(ref)
    return (
        <section className="why-section" ref={ref}>
            <div className="container">
                <div className="why-header reveal">
                    <p className="section-label">Why Choose Us</p>
                    <h2 className="section-title">
                        The <span className="gradient-text">Fadi's</span> Promise
                    </h2>
                </div>
                <div className="why-grid">
                    {whyUs.map((w, i) => (
                        <div key={w.title} className={`why-card reveal reveal-d${Math.min(i % 3 + 1, 3)}`}>
                            <div className="why-icon">{w.icon}</div>
                            <h3>{w.title}</h3>
                            <p>{w.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════════════════ */
function Contact() {
    const [form, setForm] = useState({ name: '', phone: '', message: '' })
    const [sent, setSent] = useState(false)
    const ref = useRef()
    useReveal(ref)

    const submit = (e) => {
        e.preventDefault()
        const msg = `Hi Fadi's! 👋\n\nName: ${form.name}\nPhone: ${form.phone}\nMessage: ${form.message}`
        window.open(`https://wa.me/916282070065?text=${encodeURIComponent(msg)}`, '_blank')
        setSent(true)
        setTimeout(() => setSent(false), 3000)
    }

    return (
        <section id="contact" className="contact-section" ref={ref}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <p className="section-label reveal">Get In Touch</p>
                    <h2 className="section-title reveal reveal-d1">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                </div>

                <div className="contact-grid">
                    <div className="contact-info reveal">
                        <h3>We'd love to hear from you ✨</h3>

                        <div className="contact-item">
                            <div className="contact-icon">📍</div>
                            <div>
                                <div className="c-label">Location</div>
                                <div className="c-value">Aalam Dweep, Edappal<br />Malappuram – Kerala</div>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">📞</div>
                            <div>
                                <div className="c-label">Phone</div>
                                <div className="c-value">
                                    <a href="tel:+916282070065">+91 62820 70065</a><br />
                                    <a href="tel:+918921537418">+91 89215 37418</a>
                                </div>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">✉️</div>
                            <div>
                                <div className="c-label">Email</div>
                                <div className="c-value"><a href="mailto:info@fadisfoodcorp.com">info@fadisfoodcorp.com</a></div>
                            </div>
                        </div>

                        <div className="contact-item">
                            <div className="contact-icon">🏷️</div>
                            <div>
                                <div className="c-label">FSSAI License</div>
                                <div className="c-value">11325004000143</div>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem' }}>
                            <a
                                href="https://wa.me/916282070065"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                💬 WhatsApp Us
                            </a>
                        </div>
                    </div>

                    <div className="contact-form-card reveal reveal-d2">
                        <h3>Send a Message</h3>
                        <form onSubmit={submit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Your Name</label>
                                    <input type="text" placeholder="John Doe" value={form.name} onChange={e => setForm(v => ({ ...v, name: e.target.value }))} required />
                                </div>
                                <div className="form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" placeholder="+91 00000 00000" value={form.phone} onChange={e => setForm(v => ({ ...v, phone: e.target.value }))} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Your Message</label>
                                <textarea placeholder="I'd like to order..." value={form.message} onChange={e => setForm(v => ({ ...v, message: e.target.value }))} required />
                            </div>
                            <button type="submit" className="btn-submit">
                                {sent ? '✅ Redirecting to WhatsApp...' : '📤 Send via WhatsApp'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════════════════ */
function Footer() {
    const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div>
                        <div className="footer-logo">
                            <img src="/logo.png" alt="Fadi's Bites" />
                        </div>
                        <p className="footer-desc">
                            Premium ready-to-cook snacks from the heart of Malabar, Kerala.
                            Baked with love, spiced with culture.
                        </p>
                        <span className="footer-fssai">FSSAI: 11325004000143</span>
                    </div>

                    <div>
                        <div className="footer-col-title">Quick Links</div>
                        <ul className="footer-links">
                            {[['Home', '#home'], ['About', '#about'], ['Menu', '#menu'], ['Contact', '#contact']].map(([l, h]) => (
                                <li key={l}><a href={h} onClick={e => { e.preventDefault(); go(h) }}>{l}</a></li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className="footer-col-title">Contact</div>
                        <ul className="footer-links">
                            <li><a href="tel:+916282070065">+91 62820 70065</a></li>
                            <li><a href="tel:+918921537418">+91 89215 37418</a></li>
                            <li><a href="mailto:info@fadisfoodcorp.com">info@fadisfoodcorp.com</a></li>
                            <li><span style={{ color: 'var(--text-3)', fontSize: '.82rem' }}>Edappal, Malappuram, Kerala</span></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="footer-copy">© {new Date().getFullYear()} Fadi's Food Corp. All rights reserved.</p>
                    <div className="footer-socials">
                        <a href="https://wa.me/916282070065" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="WhatsApp">💬</a>
                        <a href="mailto:info@fadisfoodcorp.com" className="social-btn" aria-label="Email">✉️</a>
                        <a href="tel:+916282070065" className="social-btn" aria-label="Call">📞</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

/* ═══════════════════════════════════════════════════════════════
   CART DRAWER
   ═══════════════════════════════════════════════════════════════ */
function CartDrawer() {
    const { items, open, setOpen, update, count } = useCart()

    const checkout = () => {
        if (items.length === 0) return
        let msg = "Hi Fadi's! 👋 I'd like to place an order:\n\n"
        items.forEach(i => { msg += `• ${i.qty}x ${i.name}\n` })
        msg += '\nPlease confirm availability and price. Thank you!'
        window.open(`https://wa.me/916282070065?text=${encodeURIComponent(msg)}`, '_blank')
        setOpen(false)
    }

    return (
        <>
            {/* Floating Cart Button */}
            <button className="cart-fab" onClick={() => {
                if (count === 0) {
                    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' })
                } else {
                    setOpen(true)
                }
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {count > 0 && <span className="cart-count">{count}</span>}
            </button>

            {/* Drawer */}
            <div className={`cart-overlay${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
                <div className="cart-drawer" onClick={e => e.stopPropagation()}>
                    <div className="cart-head">
                        <h2>Your Order ({count})</h2>
                        <button className="cart-x" onClick={() => setOpen(false)}>×</button>
                    </div>

                    <div className="cart-body">
                        {items.length === 0 ? (
                            <div className="cart-empty">
                                <span style={{ fontSize: '3rem' }}>🛒</span>
                                <p>Your cart is empty. Browse the menu!</p>
                            </div>
                        ) : (
                            items.map(item => (
                                <div key={item.id} className="cart-row">
                                    <img src={item.image} alt={item.name} />
                                    <div className="cart-row-info">
                                        <h4>{item.name}</h4>
                                        <p>{item.tag}</p>
                                    </div>
                                    <div className="cart-qty">
                                        <button className="qty-btn" onClick={() => update(item.id, -1)}>−</button>
                                        <span style={{ fontWeight: 600, width: '20px', textAlign: 'center' }}>{item.qty}</span>
                                        <button className="qty-btn" onClick={() => update(item.id, 1)}>+</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {items.length > 0 && (
                        <div className="cart-foot">
                            <div className="cart-total">
                                <span>Items</span>
                                <span>{count}</span>
                            </div>
                            <button className="btn-wa-checkout" onClick={checkout}>
                                💬 Order via WhatsApp
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

/* ═══════════════════════════════════════════════════════════════
   APP
   ═══════════════════════════════════════════════════════════════ */
export default function App() {
    return (
        <CartProvider>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Stats />
                <Menu />
                <WhyUs />
                <Contact />
            </main>
            <Footer />
            <CartDrawer />
        </CartProvider>
    )
}
