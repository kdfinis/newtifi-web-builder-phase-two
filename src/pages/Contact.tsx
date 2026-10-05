import React, { useState } from 'react';
import { Mail, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import Button from '@/components/Button';
import PageHero from '@/components/PageHero';
import { urlFactory } from '@/lib/urls/UrlFactory';
import { buildApiUrl } from '@/lib/urls';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [mapActive, setMapActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch(buildApiUrl('/contact'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Contact request failed');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setError('');
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError("We couldn't send your message. Email info@newtifi.com.");
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    'w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-base text-newtifi-navy transition-[border-color,box-shadow] duration-150 ease-out-strong focus:border-newtifi-navy focus:outline-none focus:ring-2 focus:ring-newtifi-navy/20';
  const labelClasses = 'mb-1.5 block text-sm text-gray-700';

  const luxembourgTiles = [
    { value: 'EU Capital', desc: 'Direct access to EU policymakers and regulators' },
    { value: '5+ Languages', desc: 'Multilingual professional environment' },
    { value: '€6.2T AUM', desc: "Europe's largest investment fund center" },
  ];

  return (
    <div className="bg-white">
      <PageHero
        title="Contact"
        lede="We would love to hear from you. Get in touch to explore partnerships, submissions, or general inquiries."
      />

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl text-newtifi-navy">We’d love to hear from you</h2>
              <p className="mt-4 text-base leading-relaxed text-gray-600 text-pretty">
                Whether you’re exploring partnerships, submitting research, or looking to get involved, our team will get back to you promptly. Reach out by email or send us a short message below.
              </p>
            </div>

            <ul className="space-y-4 text-base text-newtifi-navy">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[#008f96]" aria-hidden="true" />
                <a
                  href={urlFactory.getEmailUrl('info@newtifi.com')}
                  className="underline decoration-newtifi-teal/50 underline-offset-4 transition-colors duration-150 ease-out-strong fine:hover:decoration-newtifi-navy"
                >
                  info@newtifi.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#008f96]" aria-hidden="true" />
                <div>
                  <p className="text-sm text-gray-500">Mailing address</p>
                  <p>14 rue Jean-Pierre Biermann</p>
                  <p>L-1268 Luxembourg</p>
                </div>
              </li>
            </ul>

            <Button variant="secondary" href={urlFactory.getWhatsAppUrl('352621815753')} aria-label="Chat on WhatsApp">
              WhatsApp
            </Button>

            {success && (
              <div role="status" className="flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-800">
                <CheckCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <p>Your message has been sent successfully!</p>
              </div>
            )}
            {error && (
              <div role="alert" className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-red-800">
                <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="surface-card grid grid-cols-1 gap-5 p-6 md:grid-cols-2 md:p-8">
              <div>
                <label htmlFor="contact-name" className={labelClasses}>Name</label>
                <input id="contact-name" type="text" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className={inputClasses} />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClasses}>Email</label>
                <input id="contact-email" type="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required className={inputClasses} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="contact-subject" className={labelClasses}>Subject</label>
                <input id="contact-subject" type="text" name="subject" value={formData.subject} onChange={handleChange} className={inputClasses} />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="contact-message" className={labelClasses}>Message</label>
                <textarea id="contact-message" name="message" rows={5} value={formData.message} onChange={handleChange} required className={inputClasses} />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" disabled={isSubmitting} fullWidth>
                  {isSubmitting ? 'Sending' : 'Send message'}
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="relative h-[420px] overflow-hidden rounded-2xl shadow-card md:h-[520px]">
              <iframe
                src={urlFactory.getOpenStreetMapEmbedUrl()}
                width="100%"
                height="100%"
                style={{ border: 0, pointerEvents: mapActive ? 'auto' : 'none' }}
                loading="lazy"
                title="New Technologies & Investment Funds Institute Location Map (OpenStreetMap)"
              ></iframe>
              {!mapActive && (
                <button
                  type="button"
                  onClick={() => setMapActive(true)}
                  className="absolute inset-0 flex items-center justify-center bg-transparent transition-colors duration-150 ease-out-strong fine:hover:bg-black/5"
                >
                  <span className="rounded-lg bg-white px-4 py-2 text-sm text-gray-700 shadow-card">Click to interact with map</span>
                </button>
              )}
            </div>
            <a
              href={urlFactory.getOpenStreetMapUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-newtifi-navy underline decoration-newtifi-teal underline-offset-4 transition-colors duration-150 ease-out-strong fine:hover:decoration-newtifi-navy"
            >
              Open full map
            </a>
            <img
              src="/images/uploads/kirchberg-fort-thungen.jpg"
              alt="Luxembourg cityscape"
              loading="lazy"
              className="photo hidden aspect-[4/3] w-full rounded-2xl object-cover shadow-card lg:block"
            />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="overflow-hidden rounded-2xl bg-newtifi-navy text-white">
            <img
              src="/images/uploads/adolphe-bridge-luxembourg.jpg"
              alt="Adolphe Bridge, Luxembourg"
              loading="lazy"
              className="h-64 w-full object-cover md:h-80"
            />
            <div className="p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl">Luxembourg innovation powerhouse</h2>
              <p className="mt-4 mb-8 max-w-3xl text-base text-white/80 text-pretty">
                Luxembourg's strategic advantages make it the ideal location for NewTIFI's mission to connect technology and finance.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {luxembourgTiles.map((tile) => (
                  <div key={tile.value} className="rounded-xl bg-white/5 p-5 ring-1 ring-inset ring-white/10">
                    <p className="text-xl text-newtifi-teal">{tile.value}</p>
                    <p className="mt-2 text-sm text-white/80">{tile.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white pb-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-2xl md:text-3xl text-newtifi-navy">About NewTIFI</h2>
              <div className="space-y-4 text-base leading-relaxed text-gray-700">
                <p className="text-pretty">New Technologies & Investment Funds Institute (NewTIFI) connects research, industry, and policy to accelerate innovation that serves the public good.</p>
                <p className="text-pretty">We publish peer‑reviewed journals and practitioner insights, support talent through scholarships and mentorships, and engage with institutions to promote innovation‑friendly regulation.</p>
                <p className="text-pretty">Based in Luxembourg, we collaborate with universities, financial institutions, and technology leaders to translate research into practical outcomes that benefit society and markets.</p>
              </div>
            </div>
            <div className="self-start rounded-2xl bg-gray-50 p-6 md:p-8">
              <h3 className="mb-3 text-base font-bold text-newtifi-navy">What we do</h3>
              <ul className="list-disc space-y-2 pl-5 text-base text-gray-700 marker:text-newtifi-teal">
                <li>Research publishing and editorial support</li>
                <li>Events, workshops, and practitioner roundtables</li>
                <li>Scholarships, internships, and mentorships</li>
                <li>Policy engagement and thought leadership</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
