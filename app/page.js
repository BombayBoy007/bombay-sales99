"use client";

import { useEffect, useState } from "react";

const DEFAULT_STORE = {
  brand: "BomBaySales@99",
  tagline: "Go Bambaiya Way ...😎! Shop never Stop 🛑",
  heroText: "Your Bombay-style affiliate storefront — discover a product, tap Get Now, and shop directly on the merchant website.",
  logo: "/logo.png",
  phone: "",
  whatsapp: "",
  instagram: "",
  email: "",
  footerNote: "Affiliate links may earn us a commission at no extra cost to you.",
  sections: [
    ["colaba-craze", "Colaba Craze"], ["churchgate-vibe", "Churchgate Vibe"], ["bhuleshwar-jewels", "Bhuleshwar Jewels"], ["lamington-techs", "Lamington Techs"],
    ["dadar-deals", "Dadar Deals"], ["bandra-buzz", "Bandra Buzz"], ["andheri-bazaar", "Andheri Bazaar"], ["chembur-tote", "Chembur ToTe"]
  ].map(([id, title], s) => ({ id, title, products: [1,2,3].map((n) => ({ id: s * 3 + n, name: `Product ${n}`, price: "", badge: "", image: "", link: "", blurb: "" })) }))
};

export default function Page() {
  const [store, setStore] = useState(DEFAULT_STORE);
  const [admin, setAdmin] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const loadStore = async () => {
    const r = await fetch(`/api/store?t=${Date.now()}`, { cache: "no-store" });
    if (!r.ok) throw new Error("Store could not be loaded");
    setStore(await r.json());
  };

  useEffect(() => {
    loadStore().catch(() => setMessage("Store is temporarily unavailable."));
    fetch("/api/admin/session", { cache: "no-store" }).then((r) => r.ok && setAdmin(true));
  }, []);

  const login = async () => {
    setBusy(true); setMessage("");
    try {
      const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password }) });
      if (!r.ok) throw new Error("Invalid password");
      setAdmin(true); setLoginOpen(false); setEditorOpen(true); setPassword("");
    } catch { setMessage("Invalid owner password."); }
    finally { setBusy(false); }
  };

  const logout = async () => { await fetch("/api/admin/logout", { method: "POST" }); setAdmin(false); setEditorOpen(false); };

  const updateProduct = (si, pi, field, value) => setStore((s) => {
    const sections = s.sections.map((section, i) => i === si ? { ...section, products: section.products.map((p, j) => j === pi ? { ...p, [field]: value } : p) } : section);
    return { ...s, sections };
  });

  const save = async () => {
    setBusy(true); setMessage("");
    try {
      const r = await fetch("/api/store", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(store) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "Save failed");
      setStore(data.store); setMessage("Saved online. Visitors will receive the new data on refresh.");
    } catch (e) { setMessage(e.message); }
    finally { setBusy(false); }
  };

  return <div className="site">
    <header className="nav glass">
      <a className="logo-link" href="#top" aria-label="BomBaySales home"><img src={store.logo || "/logo.png"} alt="BomBaySales@99" /></a>
      <nav><a href="#collections">Collections</a><a href="#contact">Contact</a></nav>
      <div className="nav-actions">
        {admin ? <button className="owner-btn" onClick={() => setEditorOpen(true)}>Edit Storefront</button> : <button className="owner-login" onClick={() => setLoginOpen(true)}>Owner Login</button>}
      </div>
    </header>

    <main id="top">
      <section className="hero glass">
        <div className="hero-copy"><span className="eyebrow">100% Affiliate Storefront</span><h1>{store.tagline}</h1><p>{store.heroText}</p><div className="hero-actions"><a className="primary" href="#collections">Shop Collections</a>{store.whatsapp && <a className="secondary" href={store.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>}</div></div>
        <div className="hero-logo"><img src={store.logo || "/logo.png"} alt="BomBaySales@99 logo" /></div>
      </section>

      <section id="collections" className="collections">
        {store.sections.map((section) => <section className="collection glass" key={section.id}><div className="section-head"><div><span>Bombay Market Edit</span><h2>{section.title}</h2></div><b>{section.products.length} products</b></div><div className="product-row">
          {section.products.map((product) => <article className="product glass" key={product.id}><div className="product-image">{product.image ? <img src={product.image} alt={product.name} loading="lazy" /> : <div className="no-image">Product image URL<br/>not added yet</div>}</div><div className="product-info">{product.badge && <small>{product.badge}</small>}<h3>{product.name || "Product"}</h3>{product.price && <strong>{product.price}</strong>} {product.link ? <a className="get-now" href={product.link} target="_blank" rel="noopener noreferrer sponsored">Get Now ↗</a> : <span className="get-now disabled">Add product link</span>}</div></article>)}
        </div></section>)}
      </section>
    </main>

    <footer id="contact" className="footer glass"><div><img src={store.logo || "/logo.png"} alt="BomBaySales@99"/><p>{store.footerNote}</p><p className="disclaimer">THIS IS AN AFFILIATE MARKETING WEBSITE ONLY. PRODUCTS, ORDERS, PAYMENTS AND SHIPPING ARE HANDLED BY THE MERCHANT WEBSITE.</p></div><div className="contact-links">{store.phone && <a href={`tel:${store.phone}`}>{store.phone}</a>}{store.whatsapp && <a href={store.whatsapp}>WhatsApp</a>}{store.instagram && <a href={store.instagram}>Instagram</a>}{store.email && <a href={`mailto:${store.email}`}>{store.email}</a>}</div></footer>

    {loginOpen && <div className="overlay" onClick={() => setLoginOpen(false)}><div className="login glass" onClick={(e) => e.stopPropagation()}><h2>Owner Access</h2><p>Password required to edit the storefront.</p><input type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()} placeholder="Owner password"/><button className="primary wide" onClick={login} disabled={busy}>{busy ? "Checking…" : "Unlock"}</button>{message && <p className="status">{message}</p>}</div></div>}

    {editorOpen && admin && <aside className="editor glass"><div className="editor-head"><div><span>Owner only</span><h2>Edit Storefront</h2></div><button onClick={() => setEditorOpen(false)}>✕</button></div><div className="editor-body"><label>Brand<input value={store.brand} onChange={(e) => setStore({ ...store, brand: e.target.value })}/></label><label>Tagline<input value={store.tagline} onChange={(e) => setStore({ ...store, tagline: e.target.value })}/></label><label>Hero text<textarea value={store.heroText} onChange={(e) => setStore({ ...store, heroText: e.target.value })}/></label>{store.sections.map((section, si) => <div className="edit-section" key={section.id}><h3>{section.title}</h3>{section.products.map((product, pi) => <div className="edit-product" key={product.id}><b>Product {pi + 1}</b><label>Name<input value={product.name} onChange={(e) => updateProduct(si, pi, "name", e.target.value)}/></label><label>Price<input value={product.price} onChange={(e) => updateProduct(si, pi, "price", e.target.value)} placeholder="₹999"/></label><label>Product image URL<input value={product.image} onChange={(e) => updateProduct(si, pi, "image", e.target.value)} placeholder="https://…/image.jpg"/></label><label>Merchant / affiliate product URL<input value={product.link} onChange={(e) => updateProduct(si, pi, "link", e.target.value)} placeholder="https://amazon.in/..."/></label><label>Badge<input value={product.badge} onChange={(e) => updateProduct(si, pi, "badge", e.target.value)} placeholder="New / Hot / Best seller"/></label></div>)}</div>)}</div><div className="editor-foot"><span>{message}</span><button className="primary" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save Changes Online"}</button><button className="secondary" onClick={logout}>Log out</button></div></aside>}
  </div>;
}
