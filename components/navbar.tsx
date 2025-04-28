"use client"

import { useState, useEffect } from "react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { motion } from "framer-motion"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Desktop Brand */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => scrollToSection("home")}
          className="hidden md:block text-2xl font-bold gradient-text cursor-pointer"
        >
          Shahidul Hasan
        </motion.div>

        {/* Mobile Brand */}
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => scrollToSection("home")}
          className="block md:hidden p-2 border-2 border-primary rounded-full text-lg font-extrabold gradient-text cursor-pointer"
        >
          SH
        </motion.div>


        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" onClick={() => scrollToSection("home")}>
            Home
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("about")}>
            About
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("projects")}>
            Projects
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("skills")}>
            Skills
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("achievements")}>
            Achievements
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection("contact")}>
            Contact
          </Button>
          <ModeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
          <ModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                <Button variant="ghost" onClick={() => scrollToSection("home")}>
                  Home
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection("about")}>
                  About
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection("projects")}>
                  Projects
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection("skills")}>
                  Skills
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection("achievements")}>
                  Achievements
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection("contact")}>
                  Contact
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  )
}
