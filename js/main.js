/* ============================================
   Kismat Dahal | Portfolio - Main JavaScript
   ============================================ */

(function() {

  // ── Navbar background on scroll ──
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 60) {
      var isLight = document.body.classList.contains('light-theme');
      navbar.style.background = isLight ? 'rgba(255,255,255,0.92)' : 'rgba(11,11,26,0.92)';
      navbar.style.backdropFilter = 'blur(8px)';
      navbar.style.borderBottom = isLight ? '1px solid rgba(0,0,0,0.06)' : '1px solid rgba(0,212,255,0.08)';
    } else {
      navbar.style.background = 'transparent';
      navbar.style.backdropFilter = 'none';
      navbar.style.borderBottom = 'none';
    }
  });

  // ── Hero Video: play/pause on scroll ──
  var video = document.getElementById('heroVideo');
  var hero = document.getElementById('home');
  if (video && hero) {
    var vidObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          video.play()['catch'](function(){});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.3 });
    vidObserver.observe(hero);
  }

  // ── Sound toggle for hero video ──
  var soundToggle = document.getElementById('soundToggle');
  var soundIconOff = document.getElementById('soundIconOff');
  var soundIconOn = document.getElementById('soundIconOn');
  if (soundToggle && video) {
    soundToggle.addEventListener('click', function() {
      video.muted = !video.muted;
      soundIconOff.classList.toggle('hidden');
      soundIconOn.classList.toggle('hidden');
      soundToggle.classList.toggle('sound-unmuted');
    });
  }

  // ── Mobile menu toggle ──
  var menuToggle = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // ── Contact form (sends email via FormSubmit.co) ──
  var form = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');
  var formBtn = document.getElementById('formSubmitBtn');
  if (form && formSuccess && formBtn) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      formBtn.disabled = true;
      formBtn.textContent = 'Sending...';
      var data = new FormData(form);
      data.append('_next', '');
      fetch('https://formsubmit.co/kismatdahal1@gmail.com', { method: 'POST', body: data })
        .then(function() {
          formSuccess.classList.remove('hidden');
          form.reset();
          formBtn.textContent = 'Send Message';
          formBtn.disabled = false;
        })
        .catch(function() {
          alert('Something went wrong. Please try again or email me directly.');
          formBtn.textContent = 'Send Message';
          formBtn.disabled = false;
        });
    });
  }

  // ── Active nav link on scroll ──
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  function updateActiveLink() {
    var current = '';
    sections.forEach(function(s) {
      if (window.scrollY >= s.offsetTop - 150) {
        current = s.getAttribute('id');
      }
    });
    navLinks.forEach(function(l) {
      l.style.color = l.getAttribute('href') === '#' + current ? '#00d4ff' : '';
    });
  }
  window.addEventListener('scroll', updateActiveLink);

  // ── Smooth anchor scroll ──
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Testimonial slider ──
  var track = document.getElementById('testimTrack');
  var prevBtn = document.getElementById('testimPrev');
  var nextBtn = document.getElementById('testimNext');
  if (track && prevBtn && nextBtn) {
    var idx = 0;
    var slides = track.querySelectorAll('.testim-slide');
    function go(n) {
      idx = (idx + n + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
    }
    prevBtn.addEventListener('click', function() { go(-1); });
    nextBtn.addEventListener('click', function() { go(1); });
    setInterval(function() { go(1); }, 5000);
  }

  // ── Stats counter animation ──
  var statNumbers = document.querySelectorAll('.stat-number');
  var counted = false;
  function countUp() {
    if (counted) return;
    var trigger = statNumbers[0];
    if (!trigger) return;
    var rect = trigger.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      counted = true;
      statNumbers.forEach(function(el) {
        var target = parseInt(el.getAttribute('data-count'));
        var current = 0;
        var step = Math.max(1, Math.floor(target / 60));
        var interval = setInterval(function() {
          current += step;
          if (current >= target) { current = target; clearInterval(interval); }
          el.textContent = current >= 1000
            ? (current / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
            : current;
        }, 25);
      });
    }
  }
  window.addEventListener('scroll', countUp);
  countUp();

  // ── 3D SKILL SPHERE (30% smaller + mouse drag rotation) ──
  var skillsData = [
    { icon: 'devicon-html5-plain',      label: 'HTML',        color: '#e34f26' },
    { icon: 'devicon-css3-plain',       label: 'CSS',         color: '#1572b6' },
    { icon: 'devicon-javascript-plain', label: 'JavaScript',  color: '#f7df1e' },
    { icon: 'devicon-typescript-plain', label: 'TypeScript',  color: '#3178c6' },
    { icon: 'devicon-react-plain',      label: 'React.js',    color: '#61dafb' },
    { icon: 'custom',                   label: 'Next.js',     color: '#ffffff',     char: '▲' },
    { icon: 'devicon-nodejs-plain',     label: 'Node.js',     color: '#339933' },
    { icon: 'custom',                   label: 'Express.js',  color: '#ffffff',     char: '⚡' },
    { icon: 'devicon-mongodb-plain',    label: 'MongoDB',     color: '#47a248' },
    { icon: 'devicon-postgresql-plain', label: 'PostgreSQL',  color: '#316192' },
    { icon: 'devicon-git-plain',        label: 'Git',         color: '#f05032' },
    { icon: 'devicon-github-plain',     label: 'GitHub',      color: '#ffffff' },
    { icon: 'custom',                   label: 'REST APIs',   color: '#00d4ff',     char: '⇌' },
    { icon: 'custom',                   label: 'Auth',        color: '#f97316',     char: '🔐' },
    { icon: 'devicon-docker-plain',     label: 'Docker',      color: '#2496ed' },
    { icon: 'devicon-amazonwebservices-plain-wordmark', label: 'AWS', color: '#ff9900' },
    { icon: 'devicon-googlecloud-plain', label: 'Google\nCloud', color: '#4285f4' },
    { icon: 'custom',                   label: 'Vercel',      color: '#ffffff',     char: '▲' },
    { icon: 'custom',                   label: 'Netlify',     color: '#00c7b7',     char: '☁' },
    { icon: 'custom',                   label: 'Render',      color: '#46e3b7',     char: '⚡' },
    { icon: 'devicon-python-plain',     label: 'Python',      color: '#3776ab' },
    { icon: 'devicon-java-plain',       label: 'Java',        color: '#007396' },
    { icon: 'devicon-cplusplus-plain',  label: 'C++',         color: '#00599c' },
    { icon: 'devicon-csharp-plain',     label: 'C#',          color: '#239120' },
    { icon: 'devicon-c-plain',          label: 'C',           color: '#a8b9cc' }
  ];

  // ── Build horizontal skill cards row ──
  var skillTrack = document.getElementById('skillTrack');
  if (skillTrack) {
    // Build 3 copies of cards for seamless chain
    for (var c = 0; c < 3; c++) {
      skillsData.forEach(function(skill) {
        var card = document.createElement('div');
        card.className = 'skill-card-h';
        var inner = '';
        if (skill.icon === 'custom') {
          inner += '<span class="custom-icon" style="color:' + skill.color + ';">' + (skill.char || '') + '</span>';
        } else {
          inner += '<i class="' + skill.icon + '" style="color:' + skill.color + ';"></i>';
        }
        inner += '<span class="card-label">' + skill.label.replace('\n', '<br>') + '</span>';
        card.innerHTML = inner;
        skillTrack.appendChild(card);
      });
    }
    // Continuous chain animation
    var skillsSection = document.getElementById('skills');
    var animId = null;
    var offset = 0;
    var speed = 0.5;
    var isPlaying = false;
    function chainLoop() {
      offset -= speed;
      var setW = skillTrack.scrollWidth / 3;
      if (Math.abs(offset) >= setW) { offset += setW; }
      skillTrack.style.transform = 'translateX(' + offset + 'px)';
      animId = requestAnimationFrame(chainLoop);
    }
    function startChain() {
      if (isPlaying) return;
      isPlaying = true;
      chainLoop();
    }
    function stopChain() {
      isPlaying = false;
      if (animId) { cancelAnimationFrame(animId); animId = null; }
    }
    var chainObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { startChain(); }
        else { stopChain(); }
      });
    }, { threshold: 0.2 });
    if (skillsSection) { chainObserver.observe(skillsSection); }
    // Pause on hover
    skillTrack.addEventListener('mouseenter', stopChain);
    skillTrack.addEventListener('mouseleave', function() {
      if (skillsSection) {
        var r = skillsSection.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) { startChain(); }
      }
    });
  }

  var sphereEl = document.getElementById('skillSphere');
  var sphereInner = document.getElementById('sphereInner');
  var total = skillsData.length;
  var radius = 180;
  var itemSize = 40;
  var goldenAngle = Math.PI * (3 - Math.sqrt(5));

  if (window.innerWidth <= 640) { radius = 140; itemSize = 34; }

  // Build sphere items
  var items = [];
  skillsData.forEach(function(skill, i) {
    var theta = goldenAngle * i;
    var phi = Math.acos(1 - 2 * (i + 0.5) / total);
    var thetaDeg = theta * 180 / Math.PI;
    var phiDeg = (phi * 180 / Math.PI) - 90;

    var item = document.createElement('div');
    item.className = 'sphere-item';
    item.style.transform = 'rotateY(' + thetaDeg + 'deg) rotateX(' + phiDeg + 'deg) translateZ(' + radius + 'px)';

    var inner = '';
    if (skill.icon === 'custom') {
      inner += '<div class="sphere-icon-custom" style="color:' + skill.color + ';">' + (skill.char || '') + '</div>';
    } else if (skill.icon) {
      inner += '<i class="' + skill.icon + '" style="color:' + skill.color + ';"></i>';
    }
    inner += '<span class="sphere-label">' + skill.label.replace('\n', '<br>') + '</span>';
    item.innerHTML = inner;
    sphereInner.appendChild(item);
    items.push({ el: item, theta: theta, phi: phi });
  });

  // ── Sphere rotation state ──
  var autoRotate = true;
  var rotY = 0;
  var rotX = 5;
  var isDragging = false;
  var prevX = 0, prevY = 0;

  function applyRotation() {
    sphereEl.style.transform = 'rotateY(' + rotY + 'deg) rotateX(' + rotX + 'deg)';
  }

  // Auto-rotation via requestAnimationFrame
  function autoSpin() {
    if (autoRotate && !isDragging) {
      rotY += 0.25;
      applyRotation();
    }
    requestAnimationFrame(autoSpin);
  }
  autoSpin();

  // ── Mouse drag ──
  sphereEl.addEventListener('mousedown', function(e) {
    isDragging = true;
    autoRotate = false;
    prevX = e.clientX;
    prevY = e.clientY;
    sphereEl.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    var dx = e.clientX - prevX;
    var dy = e.clientY - prevY;
    rotY += dx * 0.4;
    rotX += dy * 0.3;
    if (rotX > 30) rotX = 30;
    if (rotX < -30) rotX = -30;
    prevX = e.clientX;
    prevY = e.clientY;
    applyRotation();
  });

  document.addEventListener('mouseup', function() {
    if (isDragging) {
      isDragging = false;
      sphereEl.style.cursor = 'grab';
      autoRotate = true;
    }
  });

  // ── Touch support ──
  sphereEl.addEventListener('touchstart', function(e) {
    var t = e.touches[0];
    isDragging = true;
    autoRotate = false;
    prevX = t.clientX;
    prevY = t.clientY;
  }, { passive: true });

  document.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    var t = e.touches[0];
    var dx = t.clientX - prevX;
    var dy = t.clientY - prevY;
    rotY += dx * 0.4;
    rotX += dy * 0.3;
    if (rotX > 30) rotX = 30;
    if (rotX < -30) rotX = -30;
    prevX = t.clientX;
    prevY = t.clientY;
    applyRotation();
  }, { passive: true });

  document.addEventListener('touchend', function() {
    if (isDragging) {
      isDragging = false;
      autoRotate = true;
    }
  });

  // Responsive sphere rebuild
  function resizeSphere() {
    var w = window.innerWidth;
    var r = w <= 640 ? 140 : 180;
    var sz = w <= 640 ? 34 : 40;
    items.forEach(function(item) {
      var th = item.theta * 180 / Math.PI;
      var ph = (item.phi * 180 / Math.PI) - 90;
      item.el.style.transform = 'rotateY(' + th + 'deg) rotateX(' + ph + 'deg) translateZ(' + r + 'px)';
      item.el.style.width = sz + 'px';
      item.el.style.height = sz + 'px';
      item.el.style.left = 'calc(50% - ' + (sz / 2) + 'px)';
      item.el.style.top = 'calc(50% - ' + (sz / 2) + 'px)';
    });
  }
  window.addEventListener('resize', resizeSphere);

  // ── Certificate modal ──
  var certData = [
    {
      img: 'assets/images/im.jpeg',
      title: 'Hackathon Program Participation',
      org: 'Reliance Int\'l Academy (REN Science & IT Club)',
      date: '2026 (Magh, BS 2082)',
      desc: 'Collaborated in a competitive environment to engineer rapid, innovative technical solutions during the REN Science Fair, demonstrating problem-solving and teamwork under time constraints.'
    },
    {
      img: 'assets/images/im2.jpeg',
      title: 'Fullstack Development Workshop',
      org: 'Sunway College, Consultify & Leapfrog Connect',
      date: '2026 (Jestha, BS 2083)',
      desc: 'Completed an intensive 3-day bootcamp focused on modern full-stack workflows. Gained hands-on experience in building scalable web architectures and industry-standard deployment practices.'
    }
  ];

  var modal = document.getElementById('certModal');
  var modalImg = document.getElementById('modalImg');
  var modalTitle = document.getElementById('modalTitle');
  var modalOrg = document.getElementById('modalOrg');
  var modalDate = document.getElementById('modalDate');
  var modalDesc = document.getElementById('modalDesc');
  var modalClose = document.getElementById('modalClose');

  function openCertModal(idx) {
    var d = certData[idx];
    if (!d) return;
    modalImg.src = d.img;
    modalTitle.textContent = d.title;
    modalOrg.textContent = d.org;
    modalDate.textContent = d.date;
    modalDesc.textContent = d.desc;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('.cert-card-new').forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (e.target.closest('.cert-btn')) return;
      openCertModal(parseInt(this.getAttribute('data-cert')));
    });
    card.querySelector('.cert-btn').addEventListener('click', function(e) {
      e.stopPropagation();
      openCertModal(parseInt(this.closest('.cert-card-new').getAttribute('data-cert')));
    });
  });

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  if (modalClose) { modalClose.addEventListener('click', closeModal); }
  modal.addEventListener('click', function(e) {
    if (e.target === modal) { closeModal(); }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) { closeModal(); }
  });

  // ── Theme toggle ──
  var themeToggle = document.getElementById('themeToggle');
  var sunIcon = document.getElementById('sunIcon');
  var moonIcon = document.getElementById('moonIcon');
  var saved = localStorage.getItem('theme');

  function setTheme(light) {
    if (light) {
      document.body.classList.add('light-theme');
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      document.body.classList.remove('light-theme');
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
    localStorage.setItem('theme', light ? 'light' : 'dark');
  }

  if (saved === 'light') { setTheme(true); }
  else { setTheme(false); }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      setTheme(!document.body.classList.contains('light-theme'));
      // Update navbar bg if scrolled
      if (window.scrollY > 60) {
        window.dispatchEvent(new Event('scroll'));
      }
    });
  }

  // ── AOS (Animate On Scroll) initialization ──
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      offset: 120,
      duration: 800,
      easing: 'ease-in-out'
    });
  }

})();
