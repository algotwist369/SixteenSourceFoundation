import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Hero from "../components/home/Hero";
import FeaturedPrograms from "../components/home/FeaturedPrograms";
import TrainingCourses from "../components/home/TrainingCourses";
import organizationData from "../data/organization.json";
import homeData from "../data/homeData.json";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "", className = "text-4xl md:text-5xl font-bold text-white mb-2" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${end}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [end]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <span id={`counter-${end}`} className={className}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const Home = () => {
  const { tagline, mission, stats, team, values } = organizationData;
  const [activeFaq, setActiveFaq] = useState(null);

  const galleryImages = homeData.gallery.images;
  const faqs = homeData.faq.questions;

  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (src) => {
    setSelectedImage(src);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />


      {/* Gallery Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[99rem] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {homeData.gallery.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {homeData.gallery.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
                onClick={() => openImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-64 object-fit transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <h3 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center font-semibold">
                    {image.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/gallery">
              <Button variant="outline" size="lg">
                View Full Gallery
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox / Popup */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closeImage}
        >
          <div className="relative">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
            />
            <button
              onClick={closeImage}
              className="absolute top-2 right-2 bg-white text-gray-800 px-3 py-1 rounded-full font-bold hover:bg-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Training & Courses Section */}
      <TrainingCourses />

      {/* Team Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-[99rem] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {homeData.team.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {homeData.team.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
            {team.slice(0, 4).map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 text-center"
              >
                <div className="mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-green-100"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 font-medium text-sm mb-3">
                  {member.role}
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p className="truncate">{member.email}</p>
                  <p>{member.phone}</p>
                </div>
              </div>
            ))}
          </div>


          <div className="text-center mt-10">
            <Link to="/team">
              <Button variant="outline" size="lg">
                Meet Full Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-500 to-green-600">
        <div className="max-w-[99rem] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              {homeData.impact.title}
            </h2>
            <p className="text-xl text-white/90">
              {homeData.impact.description}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: parseInt(stats.livesImpacted.replace(/[^\d]/g, '')), label: "Lives Impacted", suffix: "+" },
              { number: parseInt(stats.childrenEducated.replace(/[^\d]/g, '')), label: "Children Educated", suffix: "+" },
              { number: parseInt(stats.volunteers.replace(/[^\d]/g, '')), label: "Volunteers", suffix: "+" },
              { number: parseInt(stats.communities.replace(/[^\d]/g, '')), label: "Villages", suffix: "+" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 transition-all"
              >
                <AnimatedCounter
                  end={stat.number}
                  duration={2000 + i * 500}
                  suffix={stat.suffix}
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                />
                <p className="text-white text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-[99rem] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              {homeData.faq.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {homeData.faq.description}
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={`faq-${index}`} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left font-semibold text-gray-800 hover:bg-green-50 transition-colors flex justify-between items-start"
                >
                  <span className="text-left pr-4 leading-relaxed">{faq.question}</span>
                  <span className={`text-green-600 transform transition-transform duration-300 flex-shrink-0 mt-1 ${activeFaq === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100">
                    <div className="pt-4">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Additional Help Section */}
          <div className="mt-16 text-center">
            <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our team is here to help. Reach out to us for personalized assistance.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact">
                  <Button variant="primary" size="lg">
                    Contact Us
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button variant="outline" size="lg">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {homeData.contact.title}
          </h2>
          <p className="text-xl text-white/90 mb-10">
            {homeData.contact.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button variant="primary" size="lg" className="bg-green-700 hover:bg-green-800">
                Contact Us
              </Button>
            </Link>
            <Link to="/donate">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-gray-900">
                Donate Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
