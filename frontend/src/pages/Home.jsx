import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Hero from "../components/home/Hero";
import FeaturedPrograms from "../components/home/FeaturedPrograms";
import OurImpact from "../components/home/OurImpact";
import organizationData from "../data/organization.json";

const Home = () => {
  const { tagline, mission, stats } = organizationData;

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Mission Statement */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            {tagline}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {mission}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/about">
              <Button variant="primary" size="lg">
                Learn About Us
              </Button>
            </Link>
            <Link to="/impact">
              <Button variant="outline" size="lg">
                See Our Impact
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <FeaturedPrograms />

      {/* Impact Stats */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-500 to-green-600">
        <div className="max-w-[99rem] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Impact By Numbers
            </h2>
            <p className="text-xl text-white/90">
              Real results from our dedicated work in communities
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: stats.livesImpacted, label: "Lives Impacted" },
              { number: stats.childrenEducated, label: "Children Educated" },
              { number: stats.volunteers, label: "Volunteers" },
              { number: stats.communities, label: "Villages" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 transition-all"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </h3>
                <p className="text-white text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact Gallery */}
      <OurImpact />

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Your support—whether through donations, volunteering, or spreading awareness—
            helps us reach more communities and transform more lives.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/donate">
              <Button variant="primary" size="lg" className="bg-green-600 hover:bg-green-700">
                Donate Now
              </Button>
            </Link>
            <Link to="/volunteer">
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-gray-900">
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
