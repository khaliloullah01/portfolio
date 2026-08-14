

(function () {
  'use strict';

  
  
  
  window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 800);
    }
  });

  
  
  
  (function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    const connectionDistance = 120;
    const maxConnections = 3;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    
    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance && connections < maxConnections) {
            const opacity = (1 - distance / connectionDistance) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
            connections++;
          }
        }
      }
    }

    
    let animationId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      drawConnections();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });
  })();

  
  
  
  (function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveNav() {
      const scrollPos = window.scrollY + 150;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', setActiveNav);
    setActiveNav(); 
  })();

  
  
  
  (function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  })();

  
  
  
  (function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();

  
  
  
  (function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + '%';
    });
  })();

  
  
  
  (function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const words = [
      'Développement Web',
      'Administration Linux',
      'Réseaux',
      'Sécurité Informatique',
      'Cybersécurité',
      'Cryptographie',
      'Data Science',
      'Intelligence Artificielle'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000; 
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; 
      }

      setTimeout(type, typingSpeed);
    }

    
    setTimeout(type, 1500);
  })();

  
  
  
  (function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  })();

  
  
  
  (function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    if (!skillBars.length) return;

    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          if (width) {
            setTimeout(() => {
              bar.style.width = width;
            }, 200);
          }
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
  })();

  
  
  
  (function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-target'));
          const duration = 2000; 
          const step = Math.ceil(target / (duration / 16));
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current >= target) {
              counter.textContent = target;
              return;
            }
            counter.textContent = current;
            requestAnimationFrame(updateCounter);
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  })();

  
  
  
  (function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    if (!filterButtons.length || !projectItems.length) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectItems.forEach(item => {
          const categories = item.getAttribute('data-category') || '';

          if (filter === 'all' || categories.includes(filter)) {
            item.style.display = 'block';
            
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.transition = 'all 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 400);
          }
        });
      });
    });
  })();

  
  
  
  (function addProjectGithubLinks() {
    const githubUrl = 'https://github.com/khaliloullah01';
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
      if (card.querySelector('.project-links')) return;

      const links = document.createElement('div');
      links.className = 'project-links';
      links.innerHTML = `<a href="${githubUrl}" target="_blank" rel="noopener" title="Voir le profil GitHub"><i class="fab fa-github"></i><span>Voir sur GitHub</span></a>`;
      card.querySelector('.project-content')?.appendChild(links);
    });
  })();

  
  
  
  (function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nom = form.querySelector('[name="nom"]').value.trim();
      const email = form.querySelector('[name="email"]').value.trim();
      const sujet = form.querySelector('[name="sujet"]').value.trim();
      const message = form.querySelector('[name="message"]').value.trim();

      if (!nom || !email || !sujet || !message) {
        alert('Veuillez remplir tous les champs du formulaire.');
        return;
      }

      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Veuillez entrer une adresse email valide.');
        return;
      }

      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Merci ' + nom + ' ! Votre message a bien été envoyé. Je vous répondrai dès que possible à ' + email + '.');
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  })();

  
  
  
  (function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - navHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          
          const navbarCollapse = document.querySelector('.navbar-collapse');
          if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
          }
        }
      });
    });
  })();

  
  
  
  (function initParallax() {
    const heroSection = document.getElementById('accueil');
    if (!heroSection) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
          heroContent.style.opacity = 1 - (scrollY / window.innerHeight) * 0.8;
        }
      }
    });
  })();

  
  
  
  
  

  
  
  
  (function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.src && !img.src.includes('placehold.co') && !img.src.includes('ui-avatars.com')) {
        const preloadImg = new Image();
        preloadImg.src = img.src;
      }
    });
  })();

  
  
  
  console.log('%c🔒 Portfolio de Ibrahima Khalilou-llah SYLLA', 'color: #00d4ff; font-size: 18px; font-weight: bold;');
  console.log('%cÉtudiant TDSI · Cybersécurité · Cryptographie · IA · Data Science', 'color: #8b5cf6; font-size: 12px;');
  console.log('%cContact: khaliloullahsylla@gmail.com', 'color: #6e7681; font-size: 11px;');

})();
