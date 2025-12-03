import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Gallery from "./pages/Gallery";
import Team from "./pages/Team";
import Events from "./pages/Events";
import Programs from "./pages/Programs";
import ProgramDetails from "./pages/ProgramDetails";
import GetInvolved from "./pages/GetInvolved";
import Volunteer from "./pages/Volunteer";
import Impact from "./pages/Impact";
import Contact from "./pages/Contact";
import Donate from "./pages/Donate";
import NotFound from "./pages/NotFound";

// Admin Pages
import DashboardFAQ from "./admin/pages/adminDashboard";
import CreateFAQ from "./admin/pages/faq/createFAQ";
import UpdateFAQ from "./admin/pages/faq/updateFAQ";
import { FAQProvider } from "./admin/context/FAQContext";
import { GalleryProvider } from "./admin/context/GalleryContext";
import CreateGallery from "./admin/pages/gallery/createGallery";
import { TeamProvider } from "./admin/context/TeamContext";
import CreateTeam from "./admin/pages/team/createTeam";
import UpdateTeam from "./admin/pages/team/updateTeam";
import { CourseProvider } from "./admin/context/CourseContext";
import CreateCourse from "./admin/pages/course/createCourse";
import UpdateCourse from "./admin/pages/course/updateCourse";
import { BankTransferProvider } from "./admin/context/BankTransferContext";
import CreateBankTransfer from "./admin/pages/bankTransfer/createBankTransfer";
import EditBankTransfer from "./admin/pages/bankTransfer/editBankTransfer";
import { CaseStudyProvider } from "./admin/context/CaseStudyContext";
import CreateCaseStudy from "./admin/pages/caseStudy/createCaseStudy";
import UpdateCaseStudy from "./admin/pages/caseStudy/updateCaseStudy";
import { HeroProvider } from "./admin/context/HeroContext";
import CreateHero from "./admin/pages/hero/createHero";
import UpdateHero from "./admin/pages/hero/updateHero";
import { OurStoryProvider } from "./admin/context/OurStoryContext";
import CreateOurStory from "./admin/pages/ourStory/createOurStory";
import UpdateOurStory from "./admin/pages/ourStory/updateOurStory";
import { SuccessStoriesProvider } from "./admin/context/SuccessStoriesContext";
import CreateSuccessStories from "./admin/pages/successStories/createSuccessStories";
import UpdateSuccessStories from "./admin/pages/successStories/updateSuccessStories";
import { VolunteerProvider } from "./admin/context/VolunteerContext";
import CreateVolunteer from "./admin/pages/volunteer/createVolunteer";

const App = () => {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="pt-16">
        {/* pt-16 = space for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/team" element={<Team />} />
          <Route path="/events" element={<Events />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:slug" element={<ProgramDetails />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <FAQProvider>
                <GalleryProvider>
                  <TeamProvider>
                    <CourseProvider>
                      <BankTransferProvider>
                        <CaseStudyProvider>
                          <HeroProvider>
                            <OurStoryProvider>
                              <SuccessStoriesProvider>
                                <VolunteerProvider>
                                  <Routes>
                                    <Route path="/" element={<DashboardFAQ />} />
                                    <Route path="/faq/create" element={<CreateFAQ />} />
                                    <Route path="/faq/edit/:id" element={<UpdateFAQ />} />
                                    <Route path="/gallery/create" element={<CreateGallery />} />
                                    <Route path="/team/create" element={<CreateTeam />} />
                                    <Route path="/team/edit/:id" element={<UpdateTeam />} />
                                    <Route path="/course/create" element={<CreateCourse />} />
                                    <Route path="/course/edit/:id" element={<UpdateCourse />} />
                                    <Route path="/bank-transfer/create" element={<CreateBankTransfer />} />
                                    <Route path="/bank-transfer/edit/:id" element={<EditBankTransfer />} />
                                    <Route path="/case-study/create" element={<CreateCaseStudy />} />
                                    <Route path="/case-study/edit/:id" element={<UpdateCaseStudy />} />
                                    <Route path="/hero/create" element={<CreateHero />} />
                                    <Route path="/hero/edit/:id" element={<UpdateHero />} />
                                    <Route path="/our-story/create" element={<CreateOurStory />} />
                                    <Route path="/our-story/edit/:id" element={<UpdateOurStory />} />
                                    <Route path="/success-stories/create" element={<CreateSuccessStories />} />
                                    <Route path="/success-stories/edit/:id" element={<UpdateSuccessStories />} />
                                    <Route path="/volunteer/create" element={<CreateVolunteer />} />
                                  </Routes>
                                </VolunteerProvider>
                              </SuccessStoriesProvider>
                            </OurStoryProvider>
                          </HeroProvider>
                        </CaseStudyProvider>
                      </BankTransferProvider>
                    </CourseProvider>
                  </TeamProvider>
                </GalleryProvider>
              </FAQProvider>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </Router >
  );
};

export default App;
