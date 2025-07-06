// pages/index.tsx
import React, { useState } from 'react';
import { Github, ExternalLink, Mail, Linkedin, Code, Menu, X } from 'lucide-react';

// Impor komponen dari folder components
import ProjectCard from '../pages/components/ProjectCard';
import Typewriter from '../pages/components/Typewriter';
import ThreeDText from '../pages/components/ThreeDText';
import RobotScene from '../pages//components/RobotScene'; // Tambahkan ini di bagian atas

// Definisi tipe untuk objek proyek
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  liveLink?: string; // Opsional
  githubLink?: string; // Opsional
}

const Home: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // State untuk mengelola status menu mobile

  // Data proyek Anda (ganti dengan proyek Vue.js Anda)
  const projects: Project[] = [
    {
      id: 1,
      title: 'Material Identifycation Managemen  System (MIMS)',
      description: 'Sebuah platform e-commerce lengkap yang dibangun dengan Vue.js, Vuex untuk manajemen state, dan Vue Router untuk navigasi. Fitur termasuk keranjang belanja, otentikasi pengguna, dan daftar produk dinamis.',
      image: 'https://placehold.co/600x400/1a202c/a0aec0?text=Managemen Material Identifycation System (MMIS)', // Ganti dengan URL gambar proyek Anda
      liveLink: 'https://example-ecommerce-vue.vercel.app', // Ganti dengan link live demo Anda
      githubLink: 'https://github.com/yourusername/ecommerce-vue-app', // Ganti dengan link GitHub Anda
    },
    {
      id: 2,
      title: 'SCM Marketplace (SMAR)',
      description: 'Dashboard admin responsif yang dikembangkan menggunakan Vue.js dan Chart.js untuk visualisasi data. Menampilkan grafik real-time, tabel yang dapat difilter, dan komponen UI yang dapat digunakan kembali.',
      image: 'https://placehold.co/600x400/1a202c/a0aec0?text=SCM Marketplace (SMAR)', // Ganti dengan URL gambar proyek Anda
      liveLink: 'https://example-admin-dashboard.netlify.app', // Ganti dengan link live demo Anda
      githubLink: 'https://github.com/yourusername/vue-admin-dashboard', // Ganti dengan link GitHub Anda
    },
    {
      id: 3,
      title: 'Vendor Management System (VMS)',
      description: 'Aplikasi daftar tugas sederhana dengan fitur CRUD (Create, Read, Update, Delete) yang terhubung ke Firebase Firestore untuk persistensi data secara real-time. Dibangun dengan Vue.js dan Vuefire.',
      image: 'https://placehold.co/600x400/1a202c/a0aec0?text=Vendor Management System (VMS)', // Ganti dengan URL gambar proyek Anda
      liveLink: 'https://example-todo-firebase.web.app', // Ganti dengan link live demo Anda
      githubLink: 'https://github.com/yourusername/vue-todo-firebase', // Ganti dengan link GitHub Anda
    },
    {
      id: 4,
      title: 'Aplikasi Gudang Online (AGO)',
      description: 'Situs web portofolio pribadi yang dirancang untuk menampilkan proyek dan keahlian. Menggunakan Vue.js untuk komponen interaktif dan animasi CSS untuk pengalaman pengguna yang halus.',
      image: 'https://placehold.co/600x400/1a202c/a0aec0?text=Aplikasi Gudang Online (AGO)', // Ganti dengan URL gambar proyek Anda
      liveLink: 'https://example-vue-portfolio.vercel.app', // Ganti dengan link live demo Anda
      githubLink: 'https://github.com/yourusername/my-vue-portfolio', // Ganti dengan link GitHub Anda
    },
  ];

  // Fungsi untuk menangani smooth scrolling saat mengklik tautan navigasi
  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault(); // Mencegah perilaku default tautan anchor
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setIsMenuOpen(false); // Tutup menu setelah mengklik tautan
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white font-inter">
      {/* Header - Fixed positioning for sticky navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 py-6 px-4 md:px-8 lg:px-16 bg-gray-900 shadow-lg">
        <nav className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-3xl font-bold text-green-400">
            <Code className="inline-block mr-2 w-7 h-7" />
            DxArya
          </a>
          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            <li>
              <a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, 'about')}
                className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium hover:scale-105 hover:-translate-y-1 inline-block hover:shadow-green-glow-sm"
              >
                Tentang
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, 'projects')}
                className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium hover:scale-105 hover:-translate-y-1 inline-block hover:shadow-green-glow-sm"
              >
                Proyek
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, 'contact')}
                className="text-gray-300 hover:text-green-400 transition-all duration-300 font-medium hover:scale-105 hover:-translate-y-1 inline-block hover:shadow-green-glow-sm"
              >
                Kontak
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-green-400 focus:outline-none hover:shadow-green-glow-sm rounded-full p-1"
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-950 bg-opacity-95 z-40 flex flex-col items-center justify-center space-y-8 md:hidden animate-fade-in">
          <ul className="flex flex-col items-center space-y-8">
            <li>
              <a
                href="#about"
                onClick={(e) => handleSmoothScroll(e, 'about')}
                className="text-gray-300 text-3xl font-bold hover:text-green-400 transition-colors duration-200 hover:shadow-green-glow-sm rounded-lg p-2"
              >
                Tentang
              </a>
            </li>
            <li>
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, 'projects')}
                className="text-gray-300 text-3xl font-bold hover:text-green-400 transition-colors duration-200 hover:shadow-green-glow-sm rounded-lg p-2"
              >
                Proyek
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, 'contact')}
                className="text-gray-300 text-3xl font-bold hover:text-green-400 transition-colors duration-200 hover:shadow-green-glow-sm rounded-lg p-2"
              >
                Kontak
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Main content wrapper - Padding-top untuk mencegah konten tersembunyi di bawah header fixed */}
      <div className="pt-20"> {/* Sesuaikan nilai pt-value berdasarkan tinggi header Anda */}
        {/* Hero Section */}
        <section className="relative z-10 h-screen flex items-center justify-center text-center bg-transparent px-4">
          <div>
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          {/* <div> */}
             <RobotScene />
          {/* </div> */}
          <div className="relative z-10 p-4 md:p-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4 animate-fade-in-up">
              Halo, Saya{' '}
              {/* Mengganti Typewriter dengan ThreeDText untuk nama */}
              <span className="text-green-400 inline-block w-full h-[20px] md:h-[30px] flex items-center justify-center">
                <ThreeDText text="DEXY ARYA" color="#00FF00" glowColor="#00FF00" />
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up delay-200">
              Seorang Pengembang Frontend yang bersemangat dengan fokus pada <span className="text-green-400 font-semibold inline-block">
                <Typewriter
                  phrases={[
                    'Vue.js',
                    'Nuxt.js',
                    'React.js',
                    'JavaScript (ES6+)',
                    'HTML5',
                    'CSS3',
                    'Tailwind CSS',
                    'Git & GitHub',
                    'RESTful APIs',
                    'UI/UX Design'
                  ]}
                  loop={true}
                  delay={150}
                  eraseDelay={100}
                  pause={1500}
                />
              </span> dan membangun pengalaman web yang elegan.
            </p>
            <a
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, 'projects')}
              className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-green-600 text-white text-base md:text-lg font-semibold rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 animate-fade-in-up delay-400 hover:shadow-green-glow"
            >
              Lihat Proyek Saya
              <ExternalLink className="w-4 h-4 ml-2 md:w-5 md:h-5 md:ml-3" />
            </a>
          </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-900 border-t border-b border-gray-800">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-400 mb-8 md:mb-12">Tentang Saya</h2>
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-1/3 flex justify-center">
                <img
                  src="https://media.licdn.com/dms/image/v2/C5603AQGKmme-RRNFdA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1618581043120?e=1757548800&v=beta&t=e1MCSEusDnFeFDswDFCHzhi3X8V9BHmaecrbEizZmTc"
                  alt="Foto Profil Anda"
                  className="rounded-full w-48 h-48 md:w-64 md:h-64 object-cover border-4 border-green-500 shadow-xl"
                />
              </div>
              <div className="md:w-2/3 text-gray-300 text-base md:text-lg leading-relaxed text-center md:text-left">
                <p className="mb-4">
                  Halo! Saya seorang pengembang frontend yang berdedikasi dengan pengalaman dalam membangun aplikasi web yang responsif dan berkinerja tinggi. Saya memiliki keahlian khusus dalam ekosistem Vue.js, termasuk Nuxt.js, Vuex, dan Vue Router.
                </p>
                <p className="mb-4">
                  Saya senang mengubah ide menjadi solusi digital yang fungsional dan menarik secara visual. Pendekatan saya berpusat pada penulisan kode yang bersih, modular, dan dapat diskalakan.
                </p>
                <p>
                  Selain coding, saya selalu mencari cara baru untuk meningkatkan keterampilan saya dan mengikuti tren teknologi terbaru. Mari berkolaborasi dalam proyek menarik berikutnya!
                </p>
                <div className="mt-6 md:mt-8">
                  <h3 className="text-xl md:text-2xl font-semibold text-green-400 mb-3 md:mb-4">Keahlian Saya</h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 text-sm">
                    <span className="bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-green-glow-sm">Vue.js</span>
                    <span className="bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-green-glow-sm">Nuxt.js</span>
                    <span className="bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-green-glow-sm">React.js</span>
                    <span className="bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-green-glow-sm">JavaScript (ES6+)</span>
                    <span className="bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-green-glow-sm">HTML5</span>
                    <span className="bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-green-glow-sm">CSS3</span>
                    <span className="bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-green-glow-sm">Tailwind CSS</span>
                    <span className="bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-green-glow-sm">Git & GitHub</span>
                    <span className="bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-green-glow-sm">RESTful APIs</span>
                    <span className="bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:shadow-green-glow-sm">UI/UX Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-950">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-400 mb-8 md:mb-12">Proyek-Proyek Saya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-20 px-4 md:px-8 lg:px-16 bg-gray-900 border-t border-gray-800">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-green-400 mb-6 md:mb-8">Hubungi Saya</h2>
            <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8">
              Tertarik untuk berkolaborasi atau hanya ingin menyapa? Jangan ragu untuk menghubungi saya!
            </p>
            <div className="flex flex-col items-center space-y-4 md:space-y-6">
              <a
                href="mailto:nama.email@example.com"
                className="inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 bg-green-600 text-white text-base md:text-lg font-medium rounded-full shadow-lg hover:bg-green-700 transition-colors duration-200 transform hover:scale-105 hover:shadow-green-glow"
              >
                <Mail className="w-5 h-5 mr-2 md:w-6 md:h-6 md:mr-3" />
                nama.email@example.com
              </a>
              <div className="flex space-x-5 md:space-x-6">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200 transform hover:scale-125 hover:shadow-green-glow-sm rounded-full p-1"
                >
                  <Github className="w-7 h-7 md:w-8 md:h-8" />
                </a>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200 transform hover:scale-125 hover:shadow-green-glow-sm rounded-full p-1"
                >
                  <Linkedin className="w-7 h-7 md:w-8 md:h-8" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 md:py-8 px-4 md:px-8 lg:px-16 bg-gray-950 text-center text-gray-500 text-xs md:text-sm border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} [Nama Anda]. Semua Hak Dilindungi Undang-Undang.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
