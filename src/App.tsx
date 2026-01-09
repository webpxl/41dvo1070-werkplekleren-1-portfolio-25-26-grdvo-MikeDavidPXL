import React, { useState, useEffect } from 'react';
import { Github, Instagram, Youtube, Twitter, Mail, Phone, MapPin, Download, ExternalLink, Menu, X } from 'lucide-react';

export function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'education', 'skills', 'portfolio', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold">
              <span className="hero-text-primary">Mike</span> David
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'Over Mij' },
                { id: 'education', label: 'Opleiding' },
                { id: 'skills', label: 'Skills' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'contact', label: 'Contact' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`px-3 py-2 rounded-full transition-all ${
                    activeSection === id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'Over Mij' },
                { id: 'education', label: 'Opleiding' },
                { id: 'skills', label: 'Skills' },
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'contact', label: 'Contact' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className="block w-full text-left px-3 py-2 text-foreground hover:bg-secondary rounded"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center hero-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold">
                Hey, ik ben <span className="hero-text-primary">Mike</span>
              </h1>
              <h2 className="text-2xl lg:text-3xl hero-text-secondary font-semibold">
                Student Web Development
              </h2>
              <p className="text-lg opacity-90 leading-relaxed">
                Student Digitale Vormgeving - Web aan Hogeschool PXL. 
                Gepassioneerd door moderne web technologieën en creatief design.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="https://github.com/M1KE1206" className="social-link" target="_blank" rel="noopener noreferrer">
                  <Github size={20} />
                </a>
                <a href="https://www.instagram.com/mike_david2006/" className="social-link" target="_blank" rel="noopener noreferrer">
                  <Instagram size={20} />
                </a>
                <a href="https://www.youtube.com/@m1k3_69" className="social-link" target="_blank" rel="noopener noreferrer">
                  <Youtube size={20} />
                </a>
                <a href="https://twitter.com/mikedvd2" className="social-link" target="_blank" rel="noopener noreferrer">
                  <Twitter size={20} />
                </a>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
                >
                  Contact
                </button>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="border border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Bekijk Werk
                </button>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-80 h-80 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center float-animation">
                <div className="w-72 h-72 bg-background rounded-full flex items-center justify-center">
                  <div className="text-6xl font-bold hero-text-primary">MD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="portfolio-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Over Mij</h2>
          <p className="section-subtitle">Leer mij wat beter kennen</p>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">Student Web Development</h3>
              <p className="mb-4">
                Ik ben student bij Hogeschool PXL en als richting doe ik Digitale Vormgeving - Web.
                Met een passie voor moderne web technologieën en creatief design werk ik aan
                innovatieve projecten die gebruikers inspireren.
              </p>
              <p className="mb-6">
                Mijn hobbies zijn: fitnessen, rondrijden met de scooter en met de auto.
                Vooral auto's interesseren mij heel erg. Ik hou er ook van om samen te zijn 
                met mijn vrienden en mijn vriendin.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div><strong>Naam:</strong> Mike David</div>
                  <div><strong>Opleiding:</strong> Digitale Vormgeving - Web</div>
                </div>
                <div className="space-y-2">
                  <div><strong>School:</strong> Hogeschool PXL</div>
                  <div><strong>Status:</strong> Student</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="portfolio-card text-center">
                <h4 className="text-3xl font-bold hero-text-primary mb-2">2+</h4>
                <p className="text-sm">Jaar Ervaring</p>
              </div>
              <div className="portfolio-card text-center">
                <h4 className="text-3xl font-bold hero-text-primary mb-2">10+</h4>
                <p className="text-sm">Projecten</p>
              </div>
              <div className="portfolio-card text-center">
                <h4 className="text-3xl font-bold hero-text-primary mb-2">5+</h4>
                <p className="text-sm">Technologieën</p>
              </div>
              <div className="portfolio-card text-center">
                <h4 className="text-3xl font-bold hero-text-primary mb-2">100%</h4>
                <p className="text-sm">Commitment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="portfolio-section bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Mijn Opleiding</h2>
          <p className="section-subtitle">Educational Journey</p>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative border-l-2 border-primary ml-6">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-date">2024 - Heden</div>
                  <h4 className="text-xl font-semibold mb-2">Hogeschool PXL</h4>
                  <p>Graduaat Digitale Vormgeving - Web. Focus op moderne web technologieën, responsive design en user experience.</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-date">2024</div>
                  <h4 className="text-xl font-semibold mb-2">Hogeschool PXL</h4>
                  <p>Professionele Bachelor Toegepaste Informatica. Eerste jaar succesvol afgerond met focus op programmeren en IT fundamentals.</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-date">2022 - 2024</div>
                  <h4 className="text-xl font-semibold mb-2">Wico Campus Neerpelt</h4>
                  <p>Informatica richting met stage ervaring in de IT sector. Ontwikkeling van technische vaardigheden en praktijkervaring.</p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-date">2018 - 2022</div>
                  <h4 className="text-xl font-semibold mb-2">Wico Campus Hamont</h4>
                  <p>STW richting. Eerste kennismaking met technische vakken en ontwikkeling van probleemoplossend denken.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="portfolio-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Mijn Skills</h2>
          <p className="section-subtitle">Technologieën waar ik mee werk</p>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h4 className="text-xl font-semibold mb-6">Frontend Technologies</h4>
              <div className="space-y-6">
                <SkillBar name="HTML5 & CSS3" percentage={90} />
                <SkillBar name="JavaScript" percentage={75} />
                <SkillBar name="React & TypeScript" percentage={70} />
                <SkillBar name="Tailwind CSS" percentage={85} />
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6">Design & Tools</h4>
              <div className="space-y-6">
                <SkillBar name="UI/UX Design" percentage={80} />
                <SkillBar name="Git & GitHub" percentage={75} />
                <SkillBar name="Responsive Design" percentage={90} />
                <SkillBar name="Figma" percentage={70} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-section bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Mijn Portfolio</h2>
          <p className="section-subtitle">Recent projecten waar ik aan gewerkt heb</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="Portfolio Website"
              description="Modern React portfolio met TypeScript en Tailwind"
              tech={["React", "TypeScript", "Tailwind"]}
            />
            <ProjectCard 
              title="E-commerce Platform"
              description="Responsive webshop met moderne UI/UX"
              tech={["HTML", "CSS", "JavaScript"]}
            />
            <ProjectCard 
              title="Dashboard App"
              description="Interactive dashboard met data visualisatie"
              tech={["React", "Chart.js", "API"]}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="portfolio-section">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">Laten we in contact komen</p>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">Neem Contact Op</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Mail className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">contact@mikedavid.dev</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold">Telefoon</p>
                    <p className="text-muted-foreground">+32 xxx xxx xxx</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="text-primary" size={24} />
                  <div>
                    <p className="font-semibold">Locatie</p>
                    <p className="text-muted-foreground">Limburg, België</p>
                  </div>
                </div>
              </div>
            </div>
            
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Je Naam"
                  className="w-full p-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
                <input
                  type="email"
                  placeholder="Je Email"
                  className="w-full p-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Onderwerp"
                className="w-full p-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
              <textarea
                placeholder="Je Bericht"
                rows={6}
                className="w-full p-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Verstuur Bericht
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 Mike David. Alle rechten voorbehouden.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://github.com/M1KE1206" className="hover:text-primary transition-colors">
                <Github size={20} />
              </a>
              <a href="https://www.instagram.com/mike_david2006/" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@m1k3_69" className="hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://twitter.com/mikedvd2" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Skill Bar Component
function SkillBar({ name, percentage }: { name: string; percentage: number }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-sm">{percentage}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

// Project Card Component
function ProjectCard({ title, description, tech }: { title: string; description: string; tech: string[] }) {
  return (
    <div className="portfolio-card group">
      <div className="bg-muted h-48 rounded-lg mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <ExternalLink className="text-muted-foreground group-hover:text-primary" size={48} />
      </div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tech.map((item, index) => (
          <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;
