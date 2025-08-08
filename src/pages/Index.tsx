import React from 'react';
import { useNavigate } from 'react-router-dom';

const placeholderImages = [
  '/assets/images/team/delphine-filsack.jpg',
  '/assets/images/team/karlo-definis.jpg',
  '/assets/images/energy-tech.jpg',
  '/assets/images/fin-tech.jpg',
  '/assets/images/food-tech.jpg',
  '/assets/images/health-tech.jpg',
];

export default function LearnMoreAboutUs() {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-newtifi-teal/10 pb-20">
      <section className="container mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-4xl font-bold text-newtifi-navy mb-8 text-center">Learn More About Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full mb-12">
            <div className="flex flex-col gap-8 justify-center">
              <div>
                <h2 className="text-2xl font-semibold text-newtifi-navy mb-2">Why we exist</h2>
                <p className="text-base text-gray-700">NewTIFI exists to empower scientific breakthroughs that create lasting impact for a sustainable and equitable future. We champion researchers and visionaries, providing support to help translate transformative ideas into real-world solutions – advancing healthcare, food security, sustainable resources, and financial systems for the long-term benefit of society</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-newtifi-navy mb-2">What we do</h2>
                <p className="text-base text-gray-700">We are an international non-profit organisation, incorporated in Luxembourg and dedicated to scientific, educational, and social progress. We publish peer-reviewed journals and applied reviews, organise conferences and working groups, and foster dialogue at the intersection of new technologies and financial innovation. Our activities span Finance, HealthTech, FoodTech, EnergyTech, FinTech, and related fields where research meets real-world impact.</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-newtifi-navy mb-2">Who we work with</h2>
                <p className="text-base text-gray-700">We connect researchers, entrepreneurs, policymakers, legal and financial experts, and industry leaders across disciplines and borders. We welcome both Institutional and Individual Members committed to advancing the public interest in HealthTech, FoodTech, EnergyTech, FinTech, and beyond. We bring together a global network of researchers, students, entrepreneurs, policymakers, legal and financial professionals, and institutional partners. Whether through scholarship programs, mentorships, or internships, we serve as a platform for those driving responsible innovation and systemic change</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-newtifi-navy mb-2">How we sustain impact</h2>
                <p className="text-base text-gray-700">All profits realised by NewTIFI are used to fund Doctoral Scholarships. Our commitment is to talent and long-term impact – supporting those who are shaping solutions to 21st century challenges with courage and intellect</p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-newtifi-navy mb-2">What makes us different</h2>
                <p className="text-base text-gray-700">NewTIFI is more than an institute – it is a movement. We operate under Luxembourg’s 2023 non-profit Act. Our governance ensures transparency, our publishing model ensures independence, and our mission ensures relevance – for generations to come. Our vision is anchored in research, powered by people, and guided by principle</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 items-center justify-center">
              {placeholderImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Placeholder"
                  className="rounded-2xl shadow-md w-full object-cover max-h-48 border border-gray-100"
                />
              ))}
            </div>
          </div>
          <button
            className="mt-8 px-8 py-4 bg-newtifi-navy text-white rounded-xl text-base font-semibold shadow hover:bg-newtifi-teal transition"
            onClick={() => navigate('/who-we-are')}
          >
            Meet our Senior Leadership
          </button>
        </div>
      </section>
    </main>
  );
}
