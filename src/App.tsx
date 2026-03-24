import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Zap, CheckCircle2 } from 'lucide-react';

const PAYMENT_ICONS = [
  { name: 'EcoCash', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/EcoCash_Logo.png/320px-EcoCash_Logo.png' },
  { name: 'InnBucks', url: 'https://innbucks.co.zw/wp-content/uploads/2022/03/InnBucks-Logo-01.png' },
  { name: 'Paynow', url: 'https://www.paynow.co.zw/Content/Images/logo.png' }
];

const OrderModal = ({ isOpen, onClose, initialTier }: { isOpen: boolean, onClose: () => void, initialTier: string }) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({ businessName: '', package: initialTier, whatsapp: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi ThriLLs! Project: ${formData.businessName}, Package: ${formData.package}, WhatsApp: ${formData.whatsapp}`;
    window.open(`https://wa.me/263774213484?text=${encodeURIComponent(msg)}`, '_blank');
    setStep('success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md" onClick={onClose}>
      <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8" onClick={e => e.stopPropagation()}>
        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-3xl font-black text-white uppercase italic">START YOUR <span className="gradient-text">SURGE</span></h3>
            <input type="text" placeholder="Business Name" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setFormData({...formData, businessName: e.target.value})} />
            <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" value={formData.package} onChange={e => setFormData({...formData, package: e.target.value})}>
              <option value="Spark">The Spark ($150)</option>
              <option value="Surge">The Surge ($450)</option>
              <option value="Rush">The Rush ($950)</option>
            </select>
            <input type="tel" placeholder="WhatsApp Number" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
            <button type="submit" className="w-full py-5 bg-gradient-to-r from-brand-yellow to-brand-pink text-black font-black rounded-xl uppercase">Start Project</button>
          </form>
        ) : (
          <div className="text-center py-12">
            <CheckCircle2 className="text-brand-yellow mx-auto mb-6" size={60} />
            <h3 className="text-3xl font-black text-white uppercase italic">SIGNAL LOCKED!</h3>
            <p className="text-white/60 mt-4">We'll WhatsApp you in 30 mins.</p>
            <button onClick={onClose} className="mt-8 px-8 py-3 border border-white/10 rounded-xl text-white font-black">CLOSE</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Spark');

  return (
    <HelmetProvider>
      <div className="bg-brand-bg text-white selection:bg-brand-yellow selection:text-black">
        <Helmet><title>ThriLLs Digital Agency | Web Design Zimbabwe</title></Helmet>
        
        {/* Navbar */}
        <nav className="fixed top-0 left-0 w-full z-50 py-6 bg-brand-bg/80 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-3"><Zap className="text-brand-yellow" size={28} /><span className="text-3xl font-script text-white">Thrills</span></div>
            <button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-brand-yellow to-brand-orange text-black px-8 py-3 rounded-2xl text-sm font-black uppercase">Get Wired</button>
          </div>
        </nav>

        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center px-6">
            <span className="inline-block px-6 py-2 rounded-full border border-brand-pink/30 bg-brand-pink/10 text-brand-pink text-xs font-black uppercase tracking-[0.4em] mb-8">Digital Adrenaline</span>
            <h1 className="text-6xl md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase italic mb-10">
              WE BUILD <span className="gradient-text">WEBSITES</span> THAT BREATHE FIRE.
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-white/70 mb-12">Boring corporate templates are dead. We build high-voltage digital experiences that convert like crazy.</p>
            <button onClick={() => setIsModalOpen(true)} className="px-12 py-6 bg-gradient-to-r from-brand-yellow via-brand-orange to-brand-pink text-black font-black uppercase rounded-2xl text-lg">Start Your Surge</button>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black text-center mb-20 uppercase italic tracking-tighter">CHOOSE YOUR <span className="gradient-text">VOLTAGE</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "THE SPARK", price: "150", features: ["1-Page Landing", "WhatsApp Integration", "Data-Lite"] },
                { name: "THE SURGE", price: "450", features: ["5-Page Site", "Full SEO", "5 Business Emails"] },
                { name: "THE RUSH", price: "950", features: ["Online Store", "EcoCash Ready", "AI Chatbot"] }
              ].map((tier) => (
                <div key={tier.name} className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col">
                  <h3 className="text-3xl font-black mb-4 italic">{tier.name}</h3>
                  <div className="text-5xl font-black mb-8 italic">${tier.price}</div>
                  <div className="space-y-4 mb-8 flex-grow">
                    {tier.features.map(f => <div key={f} className="flex items-center gap-3"><Zap size={14} className="text-brand-yellow" /><span>{f}</span></div>)}
                  </div>
                  <button onClick={() => { setSelectedTier(tier.name); setIsModalOpen(true); }} className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase">Select</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 border-t border-white/5 text-center">
          <div className="flex justify-center gap-8 mb-12">
            {PAYMENT_ICONS.map(icon => <img key={icon.name} src={icon.url} alt={icon.name} className="h-6 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />)}
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-white/20">© 2026 ThriLLs Zimbabwe. No subscriptions. Just results.</div>
        </footer>

        <OrderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initialTier={selectedTier} />
      </div>
    </HelmetProvider>
  );
                     }
