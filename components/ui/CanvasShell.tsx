'use client';

import Hero from '@/components/sections/Hero';
import ProofStrip from '@/components/sections/ProofStrip';
import WhoIHelp from '@/components/sections/WhoIHelp';
import About from '@/components/sections/About';
import Enginity from '@/components/sections/Enginity';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import HowItWorks from '@/components/sections/HowItWorks';
import Blog from '@/components/sections/Blog';
import Courses from '@/components/sections/Courses';
import YouTube from '@/components/sections/YouTube';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import FinalCta from '@/components/sections/FinalCta';
import Footer from '@/components/sections/Footer';
import Navbar from '@/components/sections/Navbar';
import ChatWidget from '@/components/chat/ChatWidget';
import Cursor from '@/components/ui/Cursor';
import Analytics from '@/components/ui/Analytics';

export default function CanvasShell(props: any) {
  const { lang, profile, projects, services, testimonials, videos, courses, socials, posts } = props;

  return (
    <>
      <Cursor />
      <Analytics />
      <Navbar lang={lang} socials={socials} />
      <main>
        <div className="relative z-10 space-y-0">
          <Hero lang={lang} profile={profile} />
          <ProofStrip lang={lang} />
          <WhoIHelp lang={lang} />
          <Services lang={lang} services={services} />
          <Projects lang={lang} projects={projects} />
          <HowItWorks lang={lang} />
          <Enginity lang={lang} />
          <Testimonials lang={lang} testimonials={testimonials} />
          <About lang={lang} profile={profile} />
          <Blog lang={lang} posts={posts} />
          <Courses lang={lang} courses={courses} />
          <YouTube lang={lang} videos={videos} />
          <Contact lang={lang} profile={profile} socials={socials} />
          <FinalCta lang={lang} />
        </div>
      </main>
      <Footer lang={lang} profile={profile} />
      <ChatWidget lang={lang} webhook={profile.n8nWebhook} />
    </>
  );
}
