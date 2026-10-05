"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "bombay-sales99-storefront-v1";
const DEFAULT_ADMIN_PASSWORD = "BombaySales99@2026";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

const defaultData = {
  brand: "BomBay Sales99",
  tagline: "Curated Mumbai picks. Click. Shop. Save.",
  heroText:
    "Fresh finds from the city's most vibrant corners — handpicked, trendy, and ready to ship.",
  phone: "+91 98765 43210",
  whatsapp: "https://wa.me/919876543210",
  instagram: "https://instagram.com/bombaysales99",
  email: "hello@bombaysales99.com",
  footerNote:
    "Affiliate links may earn us a small commission at no extra cost to you.",
  sections: [
    {
      id: "colaba-craze",
      title: "Colaba Craze",
      products: [
        {
          id: 1,
          name: "Colaba Sunset Tote",
          price: "₹799",
          badge: "Top Pick",
          image:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/colaba-sunset-tote",
          blurb: "A stylish everyday carry built for city walks and coffee runs."
        },
        {
          id: 2,
          name: "Marine Drive Mug",
          price: "₹499",
          badge: "Hot",
          image:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/marine-drive-mug",
          blurb: "Minimal, bold, and perfect for your desk or kitchen shelf."
        },
        {
          id: 3,
          name: "Fort Street Lamp",
          price: "₹1,299",
          badge: "New",
          image:
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/fort-street-lamp",
          blurb: "Warm ambient light that turns every room into a vibe."
        }
      ]
    },
    {
      id: "churghgate-vibes",
      title: "Churghgate Vibes",
      products: [
        {
          id: 4,
          name: "Churghgate Street Print",
          price: "₹649",
          badge: "Trending",
          image:
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/churghgate-print",
          blurb: "Bold artwork inspired by the energy of old Mumbai roads."
        },
        {
          id: 5,
          name: "Heritage Tote",
          price: "₹899",
          badge: "Classic",
          image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/heritage-tote",
          blurb: "Utility, style, and a city-ready statement in one carry."
        },
        {
          id: 6,
          name: "Late Night Scarf",
          price: "₹699",
          badge: "Fresh",
          image:
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/late-night-scarf",
          blurb: "Texture-rich, comfortable, and easy to style all year."
        }
      ]
    },
    {
      id: "bhuleshwar-jewels",
      title: "Bhuleshwar Jewels",
      products: [
        {
          id: 7,
          name: "Gold Thread Earrings",
          price: "₹1,499",
          badge: "Featured",
          image:
            "https://images.unsplash.com/photo-1617038220319-276d3cfab534?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/gold-thread-earrings",
          blurb: "Elegant hand-finished earrings for festive and everyday wear."
        },
        {
          id: 8,
          name: "Pearl Charm Ring",
          price: "₹1,099",
          badge: "Limited",
          image:
            "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/pearl-charm-ring",
          blurb: "A soft feminine finish with statement energy."
        },
        {
          id: 9,
          name: "Temple Glow Set",
          price: "₹2,199",
          badge: "Best Seller",
          image:
            "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/temple-glow-set",
          blurb: "A luxe jewelry pairing designed for festive styling."
        }
      ]
    },
    {
      id: "lamington-techs",
      title: "Lamington Techs",
      products: [
        {
          id: 10,
          name: "Pocket Projector",
          price: "₹4,999",
          badge: "Smart Buy",
          image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/pocket-projector",
          blurb: "Portable entertainment for movie nights and presentations."
        },
        {
          id: 11,
          name: "Audio Beam Speaker",
          price: "₹2,799",
          badge: "Popular",
          image:
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/audio-beam-speaker",
          blurb: "Room-filling sound in a compact setup."
        },
        {
          id: 12,
          name: "Travel Charger Pro",
          price: "₹999",
          badge: "Essentials",
          image:
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/travel-charger-pro",
          blurb: "Fast charging, compact form, and universal convenience."
        }
      ]
    },
    {
      id: "dadar-deals",
      title: "Dadar Deals",
      products: [
        {
          id: 13,
          name: "Station Style Backpack",
          price: "₹1,799",
          badge: "Daily Use",
          image:
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/station-backpack",
          blurb: "Built for movement, commute, and daily hustle."
        },
        {
          id: 14,
          name: "Commuter Sling",
          price: "₹1,199",
          badge: "Modern",
          image:
            "https://images.unsplash.com/photo-1524545195613-4d1a6f5e965e?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/commuter-sling",
          blurb: "Minimal profile, maximum utility for the city flow."
        },
        {
          id: 15,
          name: "Metro Plug Kit",
          price: "₹699",
          badge: "Must Have",
          image:
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/metro-plug-kit",
          blurb: "Smart everyday essentials for frequent travelers."
        }
      ]
    },
    {
      id: "bandra-buzz",
      title: "Bandra Buzz",
      products: [
        {
          id: 16,
          name: "Bandra Beach Flask",
          price: "₹899",
          badge: "Summer",
          image:
            "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/bandra-flask",
          blurb: "Premium insulation for long walks and sunset evenings."
        },
        {
          id: 17,
          name: "Coastal Sunglasses",
          price: "₹1,399",
          badge: "New",
          image:
            "https://images.unsplash.com/photo-1577803947579-9f7d9aeb5507?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/coastal-sunglasses",
          blurb: "Clean lines, standout finish, easy daily wear."
        },
        {
          id: 18,
          name: "Sea Breeze Hoodie",
          price: "₹1,799",
          badge: "Fresh Drop",
          image:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/sea-breeze-hoodie",
          blurb: "Raw comfort for breeze-filled evenings and casual city style."
        }
      ]
    },
    {
      id: "andheri-bazaar",
      title: "Andheri Bazaar",
      products: [
        {
          id: 19,
          name: "Andheri Desk Lamp",
          price: "₹1,249",
          badge: "Work Setup",
          image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/andheri-desk-lamp",
          blurb: "A sleek desk glow for your productive hours."
        },
        {
          id: 20,
          name: "Creative Mouse Pad",
          price: "₹549",
          badge: "Desk Joy",
          image:
            "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/creative-mouse-pad",
          blurb: "Everyday comfort that adds style to your workstation."
        },
        {
          id: 21,
          name: "Urban Desk Mat",
          price: "₹799",
          badge: "Trending",
          image:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/urban-desk-mat",
          blurb: "Minimal, durable, and made for modern setups."
        }
      ]
    },
    {
      id: "chembur-chill",
      title: "Chembur Chill",
      products: [
        {
          id: 22,
          name: "City Chill Mat",
          price: "₹699",
          badge: "Relax",
          image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/city-chill-mat",
          blurb: "Comfort-first home accessory for slower evenings."
        },
        {
          id: 23,
          name: "Evening Throw",
          price: "₹1,299",
          badge: "Cozy",
          image:
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/evening-throw",
          blurb: "A warm touch for quiet nights and lazy weekends."
        },
        {
          id: 24,
          name: "Citrus Diffuser",
          price: "₹1,099",
          badge: "Fresh Mood",
          image:
            "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
          link: "https://example.com/aff/citrus-diffuser",
          blurb: "Light, bright, and instantly calming."
        }
      ]
    }
  ]
};

export default function Page() {
  const [store, setStore] = useState(defaultData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStore(parsed);
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }, [store]);

  const handleAdminLogin = () => {
    if (adminPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowAdminPanel(true);
      setPasswordError("");
      setAdminPassword("");
    } else {
      setPasswordError("Invalid password. Try again.");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowAdminPanel(false);
    setAdminPassword("");
  };

  const updateSectionTitle = (sectionIndex, value) => {
    const copy = [...store.sections];
    copy[sectionIndex] = { ...copy[sectionIndex], title: value };
    setStore({ ...store, sections: copy });
  };

  const updateProduct = (sectionIndex, productIndex, field, value) => {
    const copy = [...store.sections];
    copy[sectionIndex].products[productIndex] = {
      ...copy[sectionIndex].products[productIndex],
      [field]: value
    };
    setStore({ ...store, sections: copy });
  };

  const updateBrandField = (field, value) => {
    setStore({ ...store, [field]: value });
  };

  return (
    <div className="page-shell">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />
      <div className="bg-orb orb-three" />

      <header className="topbar glass">
        <div className="brand-wrap">
          <div className="brand-badge">B</div>
          <span>{store.brand}</span>
        </div>

        <nav className="top-links">
          <a href="#featured">Featured</a>
          <a href="#collections">Collections</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="topbar-actions">
          <a className="cta-mini" href={store.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          {!isAdmin && (
            <button className="admin-btn" onClick={() => setShowAdminPanel(true)}>
              Edit
            </button>
          )}
          {isAdmin && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </header>

      <main className="container">
        <section className="hero glass" id="featured">
          <div className="hero-copy">
            <span className="eyebrow">Curated Mumbai finds</span>
            <h1>{store.brand}</h1>
            <p>{store.heroText}</p>

            <div className="hero-actions">
              <a href="#collections" className="primary-btn">
                Explore Now
              </a>
              <a href={store.instagram} className="ghost-btn" target="_blank" rel="noreferrer">
                Follow Us
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>8</strong>
                <span>City sections</span>
              </div>
              <div>
                <strong>24</strong>
                <span>Curated picks</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Affiliate-ready</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-panel glass">
              <div className="mini-card">
                <span>Featured Drop</span>
                <h3>City Curve Collection</h3>
                <p>Fresh picks from Colaba to Chembur.</p>
              </div>
              <div className="visual-grid">
                {store.sections.slice(0, 4).map((section) => (
                  <div className="visual-tag" key={section.id}>
                    {section.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="collection-wrap" id="collections">
          {store.sections.map((section) => (
            <div className="shop-section glass" key={section.id}>
              <div className="section-head">
                <div>
                  <span className="section-kicker">Mumbai Edit</span>
                  <h2>{section.title}</h2>
                </div>
                <span className="section-count">{section.products.length} picks</span>
              </div>

              <div className="products-scroller">
                {section.products.map((product) => (
                  <article className="product-card glass" key={product.id}>
                    <div className="product-image-wrap">
                      <img src={product.image} alt={product.name} />
                    </div>

                    <div className="product-body">
                      <span className="tag">{product.badge}</span>
                      <h3>{product.name}</h3>
                      <p>{product.blurb}</p>

                      <div className="product-meta">
                        <strong>{product.price}</strong>
                        <a href={product.link} target="_blank" rel="noreferrer">
                          Get Now
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </main>

      <footer className="footer glass" id="contact">
        <div className="footer-brand">
          <h3>{store.brand}</h3>
          <p>{store.footerNote}</p>
        </div>

        <div className="footer-links">
          <a href={`tel:${store.phone}`}>{store.phone}</a>
          <a href={store.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={store.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={`mailto:${store.email}`}>{store.email}</a>
        </div>
      </footer>

      {showAdminPanel && !isAdmin && (
        <div className="admin-modal-overlay" onClick={() => setShowAdminPanel(false)}>
          <div className="admin-login glass" onClick={(e) => e.stopPropagation()}>
            <h3>Author Login</h3>
            <p>Enter your password to edit the storefront</p>
            <input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
            />
            {passwordError && <p className="error-msg">{passwordError}</p>}
            <div className="modal-actions">
              <button className="primary-btn" onClick={handleAdminLogin}>
                Unlock Dashboard
              </button>
              <button className="ghost-btn" onClick={() => setShowAdminPanel(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isAdmin && showAdminPanel && (
        <div className="admin-panel glass">
          <div className="admin-header">
            <h3>Edit Storefront</h3>
            <button className="close-btn" onClick={handleLogout}>✕</button>
          </div>

          <div className="admin-tabs">
            <h4>📱 Site Settings</h4>
            <label>
              Brand Name
              <input
                value={store.brand}
                onChange={(e) => updateBrandField("brand", e.target.value)}
              />
            </label>
            <label>
              Hero Text
              <textarea
                rows={3}
                value={store.heroText}
                onChange={(e) => updateBrandField("heroText", e.target.value)}
              />
            </label>
            <label>
              Phone
              <input
                value={store.phone}
                onChange={(e) => updateBrandField("phone", e.target.value)}
              />
            </label>
            <label>
              WhatsApp Link
              <input
                value={store.whatsapp}
                onChange={(e) => updateBrandField("whatsapp", e.target.value)}
              />
            </label>
            <label>
              Instagram Link
              <input
                value={store.instagram}
                onChange={(e) => updateBrandField("instagram", e.target.value)}
              />
            </label>
            <label>
              Email
              <input
                value={store.email}
                onChange={(e) => updateBrandField("email", e.target.value)}
              />
            </label>
          </div>

          <div className="admin-products-section">
            <h4>🛍️ Edit Products & Sections</h4>
            {store.sections.map((section, sectionIndex) => (
              <div key={section.id} className="section-editor">
                <h5>{section.title}</h5>
                <label className="section-title-edit">
                  Section Title:
                  <input
                    value={section.title}
                    onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
                  />
                </label>

                {section.products.map((product, productIndex) => (
                  <div className="product-editor" key={product.id}>
                    <div className="product-editor-header">
                      <h6>Product {productIndex + 1}</h6>
                    </div>

                    <label>
                      Product Name
                      <input
                        value={product.name}
                        onChange={(e) =>
                          updateProduct(sectionIndex, productIndex, "name", e.target.value)
                        }
                      />
                    </label>

                    <label>
                      Price
                      <input
                        value={product.price}
                        onChange={(e) =>
                          updateProduct(sectionIndex, productIndex, "price", e.target.value)
                        }
                      />
                    </label>

                    <label>
                      Badge (e.g., Hot, New, Top Pick)
                      <input
                        value={product.badge}
                        onChange={(e) =>
                          updateProduct(sectionIndex, productIndex, "badge", e.target.value)
                        }
                      />
                    </label>

                    <label>
                      Product Image URL
                      <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={product.image}
                        onChange={(e) =>
                          updateProduct(sectionIndex, productIndex, "image", e.target.value)
                        }
                      />
                    </label>

                    <label>
                      Affiliate Link
                      <input
                        type="url"
                        placeholder="https://amazon.in/..."
                        value={product.link}
                        onChange={(e) =>
                          updateProduct(sectionIndex, productIndex, "link", e.target.value)
                        }
                      />
                    </label>

                    <label>
                      Description
                      <textarea
                        rows={2}
                        value={product.blurb}
                        onChange={(e) =>
                          updateProduct(sectionIndex, productIndex, "blurb", e.target.value)
                        }
                      />
                    </label>

                    {product.image && (
                      <div className="image-preview">
                        <small>Preview:</small>
                        <img src={product.image} alt={product.name} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
