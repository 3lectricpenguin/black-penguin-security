/**
 * 24/7 Bail Bonds - Interactive Global Controller
 * Handles mobile menus, smooth scroll transitions, process timelines,
 * local county search/filters, form validations, and blog readers.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Header
  const header = document.querySelector('.header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
  }

  // 2. Mobile Responsive Navigation Toggle
  const hamburger = document.querySelector('.hamburger-toggle');
  const navbarNav = document.querySelector('.navbar-nav');
  if (hamburger && navbarNav) {
    const toggleNav = (forceClose = false) => {
      if (forceClose) {
        hamburger.classList.remove('active');
        navbarNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      } else {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        hamburger.classList.toggle('active');
        navbarNav.classList.toggle('active');
        document.body.classList.toggle('nav-open', !isExpanded);
      }
    };

    hamburger.addEventListener('click', () => {
      toggleNav();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
        if (navbarNav.classList.contains('active')) {
          toggleNav(true);
        }
      }
    });

    // Close menu when clicking navigation links (except dropdown toggles on mobile)
    const allNavLinks = document.querySelectorAll('.nav-link, .dropdown-item, .dropdown-callout-btn');
    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (link.classList.contains('dropdown-toggle') && window.innerWidth <= 1200) {
          return; // Do not close menu on mobile dropdown toggle
        }
        toggleNav(true);
      });
    });

    // Mobile Dropdown Accordion Toggle
    const dropdownToggles = document.querySelectorAll('.has-dropdown > .dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 1200) {
          e.preventDefault();
          const parent = toggle.closest('.has-dropdown');
          const isOpen = parent.classList.contains('open');
          // Close other open dropdowns if any
          document.querySelectorAll('.has-dropdown.open').forEach(item => {
            if (item !== parent) item.classList.remove('open');
          });
          parent.classList.toggle('open');
          toggle.setAttribute('aria-expanded', !isOpen);
        }
      });
    });
  }

  // 3. Smooth Scroll for Anchor Links
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 90; // offset for sticky header
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. Step-by-Step Timeline Scroll-Triggered Active State
  const processSteps = document.querySelectorAll('.process-step');
  if (processSteps.length > 0 && 'IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.1
    };

    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          processSteps.forEach(step => step.classList.remove('active'));
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    processSteps.forEach(step => stepObserver.observe(step));
  }

  // 5. Locations Interactive Search & Filter
  const searchInput = document.getElementById('locationSearch');
  const filterPills = document.querySelectorAll('.pill-tab');
  const locationCards = document.querySelectorAll('.county-card');
  const noResultsMsg = document.getElementById('noLocationsFound');

  if (locationCards.length > 0) {
    let currentFilter = 'All';
    let searchQuery = '';

    const filterLocations = () => {
      let visibleCount = 0;

      locationCards.forEach(card => {
        const stateAttr = card.getAttribute('data-state');
        const textContent = card.textContent.toLowerCase();

        const matchesSearch = textContent.includes(searchQuery);
        const matchesFilter = currentFilter === 'All' || stateAttr === currentFilter;

        if (matchesSearch && matchesFilter) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (noResultsMsg) {
        noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        filterLocations();
      });
    }

    filterPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilter = pill.getAttribute('data-filter');
        filterLocations();
      });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const stateParam = urlParams.get('state');
    if (stateParam) {
      const formatted = stateParam.charAt(0).toUpperCase() + stateParam.slice(1).toLowerCase();
      if (formatted === 'Michigan' || formatted === 'Ohio') {
        currentFilter = formatted;
        filterPills.forEach(p => p.classList.remove('active'));
        const activePill = Array.from(filterPills).find(p => p.getAttribute('data-filter') === formatted);
        if (activePill) activePill.classList.add('active');
      }
    }
    filterLocations();
  }

  // 6. Generic Form Validation and Success Overlay Popup
  const handleFormValidation = (formId, submitCallback) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Clear previous error messages & styles
      const existingErrors = form.querySelectorAll('.error-msg');
      existingErrors.forEach(err => err.remove());

      const requiredInputs = form.querySelectorAll('[required]');
      requiredInputs.forEach(input => {
        input.style.borderColor = '';
        
        let isFieldValid = true;
        let errorMsg = 'This field is required.';

        if (input.type === 'checkbox' && !input.checked) {
          isFieldValid = false;
          errorMsg = 'You must agree before submitting.';
        } else if (!input.value.trim()) {
          isFieldValid = false;
        } else if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value.trim())) {
            isFieldValid = false;
            errorMsg = 'Please enter a valid email address.';
          }
        } else if (input.type === 'tel') {
          const phoneRegex = /^\+?[\d\s-()]{7,20}$/;
          if (!phoneRegex.test(input.value.trim())) {
            isFieldValid = false;
            errorMsg = 'Please enter a valid phone number.';
          }
        }

        if (!isFieldValid) {
          isValid = false;
          input.style.borderColor = 'var(--color-error)';
          
          const error = document.createElement('span');
          error.className = 'error-msg';
          error.style.color = 'var(--color-error)';
          error.style.fontSize = '0.8rem';
          error.style.marginTop = '4px';
          error.style.display = 'block';
          error.style.fontWeight = '500';
          error.textContent = errorMsg;

          if (input.type === 'checkbox') {
            input.closest('.form-checkbox-row').after(error);
          } else {
            input.after(error);
          }
        }
      });

      if (isValid && submitCallback) {
        submitCallback(form);
      }
    });
  };

  // Setup Standard Contact Form
  const successModal = document.getElementById('successModal');
  const modalClose = document.getElementById('modalClose');

  if (successModal) {
    const showSuccessModal = (detailsHTML) => {
      const successDetails = document.getElementById('successDetails');
      if (successDetails) {
        successDetails.innerHTML = detailsHTML;
      }
      successModal.classList.add('active');
    };

    // Initialize Contact Page Form Validation
    handleFormValidation('contactForm', (form) => {
      const nameVal = document.getElementById('fullName').value.trim();
      const phoneVal = document.getElementById('phoneNumber').value.trim();
      const emailVal = document.getElementById('emailAddress').value.trim();
      
      const detailsHTML = `
        <strong>Submission Details:</strong><br>
        Name: ${nameVal}<br>
        Phone: ${phoneVal}<br>
        Email: ${emailVal}
      `;
      showSuccessModal(detailsHTML);
      form.reset();
    });

    // Initialize Attorney Partnership Form Validation
    handleFormValidation('attorneyForm', (form) => {
      const attorneyName = document.getElementById('attorneyName').value.trim();
      const barNumber = document.getElementById('barNumber').value.trim();
      const clientName = document.getElementById('clientName').value.trim();
      const phoneVal = document.getElementById('attorneyPhone').value.trim();
      
      const detailsHTML = `
        <strong>Attorney Request Details:</strong><br>
        Counsel: ${attorneyName} (Bar #${barNumber})<br>
        Client: ${clientName}<br>
        Direct Phone: ${phoneVal}
      `;
      showSuccessModal(detailsHTML);
      form.reset();
    });

    // Close Modal Event Handler
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        successModal.classList.remove('active');
      });
    }

    // Close Modal on backdrop click
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
      }
    });
  }

  // 7. Interactive Blog Reader Modal
  const blogModal = document.getElementById('blogModal');
  const blogModalClose = document.getElementById('blogModalClose');
  const readArticleBtns = document.querySelectorAll('.read-article-btn');

  if (blogModal && readArticleBtns.length > 0) {
    readArticleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const articleId = btn.getAttribute('data-article-id');
        const articleElement = document.getElementById(articleId);
        
        if (articleElement) {
          const title = articleElement.querySelector('.article-title').textContent;
          const meta = articleElement.querySelector('.article-meta').innerHTML;
          const fullContent = articleElement.querySelector('.article-full-text').innerHTML;
          
          document.getElementById('blogModalTitle').textContent = title;
          document.getElementById('blogModalMeta').innerHTML = meta;
          document.getElementById('blogModalBody').innerHTML = fullContent;
          
          blogModal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Lock scroll
        }
      });
    });

    const closeBlogModal = () => {
      blogModal.classList.remove('active');
      document.body.style.overflow = ''; // Unlock scroll
    };

    if (blogModalClose) {
      blogModalClose.addEventListener('click', closeBlogModal);
    }

    blogModal.addEventListener('click', (e) => {
      if (e.target === blogModal) {
        closeBlogModal();
      }
    });
  }

  // 8. Digital Bail Application Calculator & Form Handler
  const courtBailInput = document.getElementById('courtBailAmount');
  const liveFeeEstimate = document.getElementById('liveFeeEstimate');

  if (courtBailInput && liveFeeEstimate) {
    courtBailInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value) || 0;
      const fee = val * 0.10;
      liveFeeEstimate.textContent = '$' + fee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });
  }

  const appSuccessModal = document.getElementById('appSuccessModal');
  const appModalClose = document.getElementById('appModalClose');

  if (appSuccessModal) {
    handleFormValidation('bailAppForm', (form) => {
      const defName = document.getElementById('defFullName').value.trim();
      const facility = document.getElementById('jailFacility').value.trim();
      const amountVal = parseFloat(document.getElementById('courtBailAmount').value) || 0;
      const estFee = amountVal * 0.10;
      const signerName = document.getElementById('signerName').value.trim();
      const signerPhone = document.getElementById('signerPhone').value.trim();
      const signature = document.getElementById('digitalSignature').value.trim();

      const detailsHTML = `
        <strong>Application Logged:</strong><br>
        • Defendant: ${defName}<br>
        • Facility: ${facility}<br>
        • Bail Amount: $${amountVal.toLocaleString()}<br>
        • Est. 10% Premium: $${estFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<br>
        • Co-Signer: ${signerName} (${signerPhone})<br>
        • Digital Signature: <em>"${signature}"</em>
      `;

      const appSuccessDetails = document.getElementById('appSuccessDetails');
      if (appSuccessDetails) {
        appSuccessDetails.innerHTML = detailsHTML;
      }

      appSuccessModal.classList.add('active');
      form.reset();
      if (liveFeeEstimate) {
        liveFeeEstimate.textContent = '$0.00';
      }
    });

    if (appModalClose) {
      appModalClose.addEventListener('click', () => {
        appSuccessModal.classList.remove('active');
      });
    }

    appSuccessModal.addEventListener('click', (e) => {
      if (e.target === appSuccessModal) {
        appSuccessModal.classList.remove('active');
      }
    });
  }
});

