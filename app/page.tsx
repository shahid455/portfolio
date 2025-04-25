import Navbar from "@/components/navbar"
import Hero from "@/components/sections/hero"
import About from "@/components/sections/about"
import Projects from "@/components/sections/projects"
import Skills from "@/components/sections/skills"
import Achievements from "@/components/sections/achievements"
import Contact from "@/components/sections/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section id="home" className="min-h-screen">
        <Hero />
      </section>

      <section id="about" className="py-20">
        <About />
      </section>

      <section id="projects" className="py-20 bg-gradient-to-b from-background to-background/80">
        <Projects />
      </section>

      <section id="skills" className="py-20">
        <Skills />
      </section>

      <section id="achievements" className="py-20 bg-gradient-to-b from-background/80 to-background">
        <Achievements />
      </section>

      <section id="contact" className="py-20">
        <Contact />
      </section>

      <Footer />
    </main>
  )
}
