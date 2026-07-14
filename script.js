// M ONE SPACE - Premium Interaction Logic

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Cinematic Luxury Loader Logic
    document.body.classList.add('loader-active');
    
    const loaderElement = document.getElementById('luxury-loader');
    const particlesContainer = document.getElementById('loader-particles');
    
    // Generate background floating gold particles
    if (particlesContainer) {
        const particleCount = 35;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('loader-particle');
            
            // Randomize position and animation properties
            const randomX = Math.random() * 100; // %
            const randomSize = Math.random() * 2 + 1.5; // 1.5px to 3.5px
            const randomDuration = Math.random() * 2.5 + 3.5; // 3.5s to 6s
            const randomDelay = Math.random() * 2.5; // 0s to 2.5s
            const randomOpacity = Math.random() * 0.4 + 0.3; // 0.3 to 0.7
            
            particle.style.left = `${randomX}%`;
            particle.style.width = `${randomSize}px`;
            particle.style.height = `${randomSize}px`;
            particle.style.animationDuration = `${randomDuration}s`;
            particle.style.animationDelay = `${randomDelay}s`;
            particle.style.opacity = randomOpacity;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Deactivate Loader after cinematic animation completes (approx 3.2 seconds)
    if (loaderElement) {
        setTimeout(() => {
            loaderElement.classList.add('fade-out');
            document.body.classList.remove('loader-active');
            
            // Remove from DOM completely after fade transition finishes (800ms)
            setTimeout(() => {
                loaderElement.style.display = 'none';
            }, 800);
        }, 3200);
    }

    // 1. Transparent Header Transition on Scroll
    const header = document.getElementById('header-nav');
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Run once at load

    // 2. Fullscreen Overlay Navigation Drawer Toggle
    const menuTrigger = document.getElementById('menu-trigger-btn');
    const overlayMenu = document.getElementById('overlay-nav-menu');
    const overlayClose = document.getElementById('overlay-close-btn');
    const overlayLinks = document.querySelectorAll('.overlay-nav-item');

    if (menuTrigger && overlayMenu) {
        menuTrigger.addEventListener('click', () => {
            overlayMenu.style.display = 'flex';
            setTimeout(() => {
                overlayMenu.classList.add('active');
            }, 10);
        });

        const closeMenu = () => {
            overlayMenu.classList.remove('active');
            setTimeout(() => {
                overlayMenu.style.display = 'none';
            }, 500);
        };

        if (overlayClose) {
            overlayClose.addEventListener('click', closeMenu);
        }

        // Close menu when a link inside it is clicked
        overlayLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // 3. Scroll Reveal Animation using Intersection Observer (Reactive to scrolling both ways)
    const revealElements = document.querySelectorAll('.reveal');
    
    // Auto-assign left/right animations to alternating sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const reveals = section.querySelectorAll('.reveal');
        reveals.forEach(reveal => {
            if (!reveal.classList.contains('reveal-left') && 
                !reveal.classList.contains('reveal-right') && 
                !reveal.classList.contains('reveal-scale')) {
                // Alternate directions based on section index
                if (index % 2 === 0) {
                    reveal.classList.add('reveal-left');
                } else {
                    reveal.classList.add('reveal-right');
                }
            }
        });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Remove active class when scrolling away to react dynamically to scroll
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Properties Tab Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state in tabs
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            propertyCards.forEach(card => {
                const cardBhk = card.getAttribute('data-bhk');
                
                // Hide with transition, then display change
                if (filterValue === 'all' || cardBhk === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 5. Exclusive Accordion Toggles for FAQs
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const panel = item.querySelector('.faq-panel');
        
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-panel').style.maxHeight = null;
            });
            
            // Toggle clicked item
            if (!isActive) {
                item.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });

    // 6. Direct Click Anchor Smooth Scroll Adjustment
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 90; // offset height of header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6b. Interactive Services Selector Logic
    const serviceSelectors = document.querySelectorAll('.service-selector-card');
    const showcaseNum = document.getElementById('showcase-num');
    const showcaseTitle = document.getElementById('showcase-title');
    const showcaseDesc = document.getElementById('showcase-desc');
    const showcaseBullets = document.getElementById('showcase-bullets');

    if (serviceSelectors.length > 0) {
        serviceSelectors.forEach(selector => {
            const handleServiceSelect = () => {
                // Clear active from all selectors
                serviceSelectors.forEach(s => s.classList.remove('active'));
                selector.classList.add('active');

                // Read attributes
                const id = selector.getAttribute('data-id');
                const num = selector.getAttribute('data-num');
                const title = selector.getAttribute('data-title');
                const desc = selector.getAttribute('data-desc');
                const bulletsStr = selector.getAttribute('data-bullets');
                const bullets = bulletsStr ? bulletsStr.split('|') : [];

                // Cross-fade images
                const bgImages = document.querySelectorAll('.showcase-bg-image');
                bgImages.forEach(img => img.classList.remove('active'));
                const activeImg = document.getElementById(`showcase-img-${id}`);
                if (activeImg) {
                    activeImg.classList.add('active');
                }

                // Update text elements
                if (showcaseNum) showcaseNum.innerText = num;
                if (showcaseTitle) showcaseTitle.innerText = title;
                if (showcaseDesc) showcaseDesc.innerText = desc;

                // Update bullets
                if (showcaseBullets) {
                    showcaseBullets.innerHTML = '';
                    bullets.forEach(bulletText => {
                        const li = document.createElement('li');
                        li.innerText = bulletText;
                        showcaseBullets.appendChild(li);
                    });
                }
            };

            // Trigger on hover for desktop, click for touch/selection
            selector.addEventListener('mouseenter', handleServiceSelect);
            selector.addEventListener('click', handleServiceSelect);
        });
    }



    // 6d. Redesigned Premium About Us Interactive Storytelling Tabs
    const aboutTabButtons = document.querySelectorAll('.about-tab-btn');
    const aboutTabPanes = document.querySelectorAll('.tab-pane');

    aboutTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            aboutTabButtons.forEach(b => b.classList.remove('active'));
            aboutTabPanes.forEach(pane => {
                pane.classList.remove('active');
                pane.style.display = 'none';
                pane.style.opacity = '0';
            });

            // Activate current tab button
            btn.classList.add('active');

            // Find matching pane
            const targetId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById(targetId);

            if (targetPane) {
                targetPane.style.display = 'block';
                // Trigger reflow for CSS transition
                targetPane.offsetHeight;
                setTimeout(() => {
                    targetPane.classList.add('active');
                    targetPane.style.opacity = '1';
                }, 10);
            }
        });
    });

    // 6d. 3D Interactive Mouse-Tilt Card Parallax Effect
    const cardTrigger = document.getElementById('about-3d-card-trigger');
    const cardImg = document.getElementById('about-3d-img');
    const floatBadges = document.querySelectorAll('.floating-glass-badge');

    if (cardTrigger) {
        cardTrigger.addEventListener('mousemove', (e) => {
            const rect = cardTrigger.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate inside element
            const y = e.clientY - rect.top;  // y coordinate inside element
            
            // Calculate tilt angle values (-12deg to +12deg)
            const rotateX = ((rect.height / 2) - y) / (rect.height / 2) * 12;
            const rotateY = (x - (rect.width / 2)) / (rect.width / 2) * 12;

            // Apply 3D rotate to main wrapper
            cardTrigger.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            // Subtle counter-translation/parallax to inner image
            if (cardImg) {
                cardImg.style.transform = `scale(1.05) translateX(${-rotateY * 0.5}px) translateY(${rotateX * 0.5}px)`;
            }

            // Apply parallax shift to floating glass badges
            floatBadges.forEach(badge => {
                const speed = parseFloat(badge.style.getPropertyValue('--parallax-speed')) || 0.2;
                badge.style.transform = `translateX(${rotateY * speed * 8}px) translateY(${-rotateX * speed * 8}px)`;
            });
        });

        cardTrigger.addEventListener('mouseleave', () => {
            // Reset transforms on mouse leave
            cardTrigger.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            if (cardImg) {
                cardImg.style.transform = `scale(1) translateX(0) translateY(0)`;
            }
            floatBadges.forEach(badge => {
                badge.style.transform = `translateX(0) translateY(0)`;
            });
        });
    }

    // 6e. Core Commitments Glow follower tracking coordinates
    const glowCards = document.querySelectorAll('.glow-card');
    glowCards.forEach(card => {
        card.style.setProperty('--mouse-x', `50%`);
        card.style.setProperty('--mouse-y', `50%`);
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// 7. Hero Search Filtering & Routing Action
function triggerSearch() {
    const selectedBhk = document.getElementById('search-bhk').value;
    const selectedType = document.getElementById('search-type').value;
    const selectedBudget = document.getElementById('search-budget').value;
    
    const cards = document.querySelectorAll('.property-card');
    let matchesCount = 0;

    cards.forEach(card => {
        const bhk = card.getAttribute('data-bhk');
        const price = parseInt(card.getAttribute('data-price'), 10);
        
        let bhkMatch = (selectedBhk === 'all' || bhk === selectedBhk);
        
        // Budget match boundaries
        let budgetMatch = true;
        if (selectedBudget === 'under-80') {
            budgetMatch = (price < 8000000);
        } else if (selectedBudget === '80-1.5') {
            budgetMatch = (price >= 8000000 && price <= 15000000);
        } else if (selectedBudget === 'above-1.5') {
            budgetMatch = (price > 15000000);
        }

        if (bhkMatch && budgetMatch) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            matchesCount++;
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });

    // Scroll to the property listing container
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
        const headerOffset = 90;
        const elementPosition = propertiesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Temporarily highlight the category matching the BHK
    const tabs = document.querySelectorAll('.filter-btn');
    tabs.forEach(tab => {
        const filterVal = tab.getAttribute('data-filter');
        if (filterVal === selectedBhk) {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        }
    });
}


// 8. Lead Consultation Form Submission Handler
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('form-name').value;
    const phone = document.getElementById('form-phone').value;
    const serviceSelect = document.getElementById('form-service');
    const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
    const message = document.getElementById('form-message').value;
    const msgAlert = document.getElementById('form-response-msg') || document.getElementById('contact-response-msg');
    const submitBtn = document.getElementById('form-submit-button') || document.getElementById('btn-callback-submit');

    if (submitBtn) {
        submitBtn.innerText = "Processing Details...";
        submitBtn.disabled = true;
    }

    // Send via Web3Forms API
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: '4ebe44e9-2378-42f8-978c-a84b5fe17a4d',
            name: name,
            phone: phone,
            subject: 'New Consultation Request - M ONE SPACE',
            from_name: 'M ONE SPACE Website',
            service: serviceName,
            message: message || 'No message provided'
        })
    })
    .then(async (response) => {
        if (response.status == 200) {
            // Show structured success feedback
            if (msgAlert) {
                msgAlert.style.display = "block";
                msgAlert.innerHTML = `<strong>Consultation Requested!</strong><br>Thank you, ${name}. Maulik Patel's consulting office will contact you via <strong>Phone call</strong> on <strong>${phone}</strong> shortly regarding your interest in: <em>"${serviceName}"</em>.`;
            }
            // Reset form
            const form = document.getElementById('consultation-form');
            if (form) form.reset();
        } else {
            if (msgAlert) {
                msgAlert.style.display = "block";
                msgAlert.innerHTML = `<strong>Submission Error!</strong><br>Something went wrong. Please connect with us directly via WhatsApp.`;
            }
        }
    })
    .catch(error => {
        if (msgAlert) {
            msgAlert.style.display = "block";
            msgAlert.innerHTML = `<strong>Connection Error!</strong><br>Failed to reach server. Please connect with us directly via WhatsApp.`;
        }
    })
    .finally(() => {
        if (submitBtn) {
            submitBtn.innerText = "Submit Callback";
            submitBtn.disabled = false;
        }
        // Fade alert out after 10s
        setTimeout(() => {
            if (msgAlert) msgAlert.style.display = "none";
        }, 10000);
    });
}

// 9. Enquiry Modal Dialog Operations
const modal = document.getElementById('enquiry-modal-dialog');
const modalTitle = document.getElementById('modal-project-title');
const modalHiddenField = document.getElementById('modal-hidden-project-name');
const modalResponse = document.getElementById('modal-response-msg');

function openEnquiryModal(projectName) {
    if (modal) {
        modalHiddenField.value = projectName;
        modalTitle.innerText = `Enquire: ${projectName}`;
        if (modalResponse) modalResponse.style.display = "none";
        modal.style.display = "flex";
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

function closeEnquiryModal() {
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = "none";
            const form = document.getElementById('modal-enquiry-form');
            if (form) form.reset();
        }, 300);
    }
}

// Modal Submission Handler
function handleModalSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('modal-name').value;
    const phone = document.getElementById('modal-phone').value;
    const email = document.getElementById('modal-email').value;
    const projectName = modalHiddenField.value;
    const msgAlert = document.getElementById('modal-response-msg');
    const submitBtn = document.getElementById('btn-modal-submit');

    if (submitBtn) {
        submitBtn.innerText = "Sending Request...";
        submitBtn.disabled = true;
    }

    // Send via Web3Forms API
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: '4ebe44e9-2378-42f8-978c-a84b5fe17a4d',
            name: name,
            phone: phone,
            email: email || 'Not provided',
            subject: `New Project Enquiry: ${projectName} - M ONE SPACE`,
            from_name: 'M ONE SPACE Website',
            project: projectName,
            message: `Interested in: ${projectName}\nEmail: ${email || 'Not provided'}`
        })
    })
    .then(async (response) => {
        if (response.status == 200) {
            if (msgAlert) {
                msgAlert.style.display = "block";
                msgAlert.innerHTML = `<strong>Enquiry Saved!</strong><br>Thank you, ${name}. Our dedicated channel team has scheduled an update for you regarding <strong>${projectName}</strong>. We'll connect with you via <strong>Phone call</strong> on <strong>${phone}</strong>.`;
            }
            
            const form = document.getElementById('modal-enquiry-form');
            if (form) form.reset();

            // Auto close modal after brief delay
            setTimeout(() => {
                closeEnquiryModal();
            }, 5000);
        } else {
            if (msgAlert) {
                msgAlert.style.display = "block";
                msgAlert.innerHTML = `<strong>Submission Error!</strong><br>Something went wrong. Please try again.`;
            }
        }
    })
    .catch(error => {
        if (msgAlert) {
            msgAlert.style.display = "block";
            msgAlert.innerHTML = `<strong>Connection Error!</strong><br>Failed to reach server. Please try again.`;
        }
    })
    .finally(() => {
        if (submitBtn) {
            submitBtn.innerText = "Submit Callback";
            submitBtn.disabled = false;
        }
    });
}

// Close Modal when clicking outer backdrop
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeEnquiryModal();
    }
});

// WhatsApp direct submissions
function handleWhatsAppSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('consultation-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const name = document.getElementById('form-name').value;
    const phone = document.getElementById('form-phone').value;
    const serviceSelect = document.getElementById('form-service');
    const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
    const message = document.getElementById('form-message').value;

    const formattedMessage = `Hello M ONE SPACE, I would like to request a consultation.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${serviceName}\n*Message:* ${message || 'None'}`;
    const whatsappUrl = `https://wa.me/919601126500?text=${encodeURIComponent(formattedMessage)}`;
    
    window.open(whatsappUrl, '_blank');
}

function handleModalWhatsAppSubmit(event) {
    event.preventDefault();
    
    const form = document.getElementById('modal-enquiry-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    const name = document.getElementById('modal-name').value;
    const phone = document.getElementById('modal-phone').value;
    const email = document.getElementById('modal-email').value;
    const projectName = document.getElementById('modal-hidden-project-name').value;

    const formattedMessage = `Hello M ONE SPACE, I am interested in the project: *${projectName}*.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email || 'Not provided'}`;
    const whatsappUrl = `https://wa.me/919601126500?text=${encodeURIComponent(formattedMessage)}`;
    
    window.open(whatsappUrl, '_blank');
}

// 10. Dedicated About Page Animations & Interactive Testimonials
let testimonialIndex = 0;
let testimonialAutoPlay;

function showTestimonial(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (slides.length === 0) return; // Exit if not on about.html
    
    if (index >= slides.length) {
        testimonialIndex = 0;
    } else if (index < 0) {
        testimonialIndex = slides.length - 1;
    } else {
        testimonialIndex = index;
    }
    
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
    });
    
    slides[testimonialIndex].classList.add('active');
    if (dots[testimonialIndex]) dots[testimonialIndex].classList.add('active');
}

function nextTestimonial() {
    showTestimonial(testimonialIndex + 1);
}

function prevTestimonial() {
    showTestimonial(testimonialIndex - 1);
}

function setTestimonial(index) {
    clearInterval(testimonialAutoPlay);
    showTestimonial(index);
    startTestimonialTimer();
}

function startTestimonialTimer() {
    testimonialAutoPlay = setInterval(nextTestimonial, 8000);
}

// Consultation Planner Data
const plannerData = {
    construction: {
        title: "New Construction Booking Checklist",
        mid: {
            checklist: [
                "Developer RERA registration number verification",
                "Sanctioned builder layout plans review",
                "Draft booking form terms audit",
                "Allotment letter signature check",
                "First booking check verification logs"
            ],
            step: "Schedule initial virtual session to select inventory plots within authorized builder inventory lists."
        },
        premium: {
            checklist: [
                "Full Title clearance certification search",
                "Escrow account transaction authorization logs",
                "Builder-buyer agreement draft audit",
                "Development milestone payment schedule checklist",
                "Municipality utility layout permit verification"
            ],
            step: "Arrange physical site visit with Maulik Patel's executive advisor to review unit layouts."
        },
        elite: {
            checklist: [
                "Comprehensive independent title search report (30 years)",
                "Elite launch discount allocations confirmation",
                "Bespoke payment schedule terms configuration",
                "RERA escrow balance compliance check",
                "Construction quality structural audit certifications verification"
            ],
            step: "Connect directly with Maulik Patel via VIP priority booking layout planning session."
        }
    },
    bungalows: {
        title: "Standalone Bungalows Blueprint",
        mid: {
            checklist: [
                "Non-Agricultural (NA) land permit search",
                "Plot boundaries alignment check",
                "Local municipal plan approvals",
                "Society registration draft check"
            ],
            step: "Schedule site verification coordinates check with our layout planning auditor."
        },
        premium: {
            checklist: [
                "Complete NA permit validation report",
                "Independent land registry ownership clearances check",
                "Utility water-power source layout sanction review",
                "Architectural drawing structural clearance checks"
            ],
            step: "Initiate site visit with land clearance certificates matching sessions."
        },
        elite: {
            checklist: [
                "Pre-buy independent land title search verification (30 years)",
                "Bespoke designer boundary limits validation clearances",
                "Municipality drainage-road access permit clearance review",
                "Full developer indemnity contract configuration audits"
            ],
            step: "Schedule a direct consultation with Maulik Patel to verify premium independent plots."
        }
    },
    resales: {
        title: "Premium Resale Verification",
        mid: {
            checklist: [
                "Original sale deed tracking search",
                "Society NOC clearance receipt checks",
                "Share certificate verification check",
                "Utility payment balance status"
            ],
            step: "Submit ownership documents copy to our legal advisory panel."
        },
        premium: {
            checklist: [
                "Non-encumbrance certificate validation (13 years)",
                "Society mutation entries checking",
                "Mortgage liability bank release clearance check",
                "Property tax registry status search"
            ],
            step: "Schedule buyer-seller alignment meeting for title terms confirmation."
        },
        elite: {
            checklist: [
                "Complete Non-encumbrance report (30 years)",
                "Full original chain of agreements validation",
                "Certified structural stability audits review",
                "Bespoke property valuation matrix checking"
            ],
            step: "Arrange a priority document ledger audit with Maulik Patel."
        }
    },
    leases: {
        title: "Corporate rentals & Leases Plan",
        mid: {
            checklist: [
                "Draft standard lease contract template",
                "Security deposit escrow balance verification",
                "Property inventory checklist log",
                "Society tenant rules NOC check"
            ],
            step: "Configure standard e-agreement terms check."
        },
        premium: {
            checklist: [
                "Registered lease deed terms auditing",
                "Power of Attorney signature validation search",
                "Custom indemnity covenants check",
                "Police notification coordinates verification"
            ],
            step: "Draft lease agreement with specific corporate indemnity clauses."
        },
        elite: {
            checklist: [
                "Custom multi-year registered lease deed drafting",
                "Elite tenant background profile validation checks",
                "Corporate bank guarantee verification log",
                "Full property utility restoration safety audits"
            ],
            step: "Schedule board-level lease clearance negotiation meeting with Maulik Patel."
        }
    },
    registry: {
        title: "Registry & Stamp duty Filings",
        mid: {
            checklist: [
                "Stamp duty online calculation check",
                "Buyer-seller PAN-Aadhaar coordinates check",
                "Online token booking details",
                "Index-2 print copy submission format"
            ],
            step: "Upload transaction deeds draft copy for stamp calculation."
        },
        premium: {
            checklist: [
                "Deed draft proofing and audit checks",
                "Tax payment records (TDS certificate check)",
                "Registrar token scheduling logistics",
                "Indexation records archiving layout"
            ],
            step: "Submit draft deed to local registrar panel validation."
        },
        elite: {
            checklist: [
                "VIP registrar room priority scheduling coordinates",
                "Bespoke stamp saving layout options audit",
                "Complex power of attorney title registry clearances check",
                "Full post-registration name updates coordinates (Municipal/Electricity)"
            ],
            step: "Initiate elite registration logistics planning session with Maulik Patel."
        }
    }
};

function updateServicePlanner() {
    const serviceSelect = document.getElementById('planner-service');
    const budgetSelect = document.getElementById('planner-budget');
    if (!serviceSelect || !budgetSelect) return;

    const selectedService = serviceSelect.value;
    const selectedBudget = budgetSelect.value;

    const data = plannerData[selectedService];
    if (!data) return;

    const titleEl = document.getElementById('planner-title');
    const checklistEl = document.getElementById('planner-checklist');
    const stepEl = document.getElementById('planner-step-text');

    if (titleEl) titleEl.innerText = data.title;
    
    if (checklistEl) {
        checklistEl.innerHTML = '';
        const levelData = data[selectedBudget];
        if (levelData && levelData.checklist) {
            levelData.checklist.forEach(item => {
                const li = document.createElement('li');
                li.className = 'planner-checklist-item';
                li.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:16px; height:16px; margin-top:2px; flex-shrink:0; color:var(--accent-gold);"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>${item}</span>
                `;
                checklistEl.appendChild(li);
            });
        }
    }

    if (stepEl) {
        const levelData = data[selectedBudget];
        if (levelData) {
            stepEl.innerText = levelData.step;
        }
    }
}

function handlePlannerWhatsAppSubmit(event) {
    event.preventDefault();
    
    const nameEl = document.getElementById('planner-name');
    const phoneEl = document.getElementById('planner-phone');
    if (!nameEl || !phoneEl) return;

    if (!nameEl.value || !phoneEl.value) {
        alert("Please enter both your name and contact number to request your action plan.");
        nameEl.focus();
        return;
    }

    const name = nameEl.value;
    const phone = phoneEl.value;
    
    const serviceSelect = document.getElementById('planner-service');
    const budgetSelect = document.getElementById('planner-budget');
    const serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;
    const budgetName = budgetSelect.options[budgetSelect.selectedIndex].text;

    // Get checklist items to include in the WhatsApp text
    const checklistItems = [];
    document.querySelectorAll('#planner-checklist li span').forEach(el => {
        checklistItems.push("- " + el.innerText);
    });
    
    const nextStep = document.getElementById('planner-step-text').innerText;

    const formattedMessage = `Hello M ONE SPACE,\n\nI am requesting my custom Advisory Blueprint action plan.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Service:* ${serviceName}\n*Transaction Class:* ${budgetName}\n\n*Required Checklist Documents:*\n${checklistItems.join('\n')}\n\n*Next Advisory Step:*\n${nextStep}`;
    const whatsappUrl = `https://wa.me/919601126500?text=${encodeURIComponent(formattedMessage)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Auto-run when document loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialise testimonial cycle if slides exist
    const slides = document.querySelectorAll('.testimonial-slide');
    if (slides.length > 0) {
        showTestimonial(0);
        startTestimonialTimer();
    }
    
    // Initialise Consultation Planner default values
    updateServicePlanner();

    // Scroll listener for about page hero banner parallax zoom
    window.addEventListener('scroll', () => {
        const aboutHero = document.querySelector('.about-hero-banner');
        if (aboutHero) {
            const scrollPos = window.pageYOffset;
            aboutHero.style.backgroundPosition = `center ${scrollPos * 0.3}px`;
        }
    });
});

// Dynamic category filtering logic for projects portfolio page
function setProjectFilter(category, button) {
    // Update active tab button style classes
    const tabs = document.querySelectorAll('.filter-tab-btn');
    if (tabs) {
        tabs.forEach(tab => tab.classList.remove('active'));
    }
    if (button) {
        button.classList.add('active');
    }

    // Filter project cards visibility
    const cards = document.querySelectorAll('.premium-project-card');
    if (!cards) return;

    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            // Show card with fade & scale animation
            card.style.display = 'flex';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        } else {
            // Hide card
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 400); // match CSS transitions
        }
    });
}

// Global active gallery state
let currentGalleryImages = [];
let currentGalleryIndex = 0;

function openProjectGallery(imagesArray) {
    if (!imagesArray || imagesArray.length === 0) return;
    currentGalleryImages = imagesArray;
    currentGalleryIndex = 0;
    
    const modal = document.getElementById('gallery-modal');
    const activeImg = document.getElementById('gallery-active-img');
    const counter = document.getElementById('gallery-counter');
    
    if (!modal || !activeImg) return;
    
    // Set initial image content & size metadata
    activeImg.src = currentGalleryImages[currentGalleryIndex];
    if (counter) {
        counter.innerText = `1 / ${currentGalleryImages.length}`;
    }
    
    // Open modal animation flow
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 50);
    
    // Prevent document body scrolling
    document.body.classList.add('modal-open');
}

function closeProjectGallery() {
    const modal = document.getElementById('gallery-modal');
    if (!modal) return;
    
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 400);
    
    // Re-enable document body scrolling
    document.body.classList.remove('modal-open');
}

function nextGalleryImage() {
    if (currentGalleryImages.length <= 1) return;
    
    const activeImg = document.getElementById('gallery-active-img');
    const counter = document.getElementById('gallery-counter');
    if (!activeImg) return;
    
    activeImg.style.transform = 'scale(0.97)';
    activeImg.style.opacity = '0.5';
    
    setTimeout(() => {
        currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
        activeImg.src = currentGalleryImages[currentGalleryIndex];
        if (counter) {
            counter.innerText = `${currentGalleryIndex + 1} / ${currentGalleryImages.length}`;
        }
        activeImg.style.transform = 'scale(1)';
        activeImg.style.opacity = '1';
    }, 150);
}

function prevGalleryImage() {
    if (currentGalleryImages.length <= 1) return;
    
    const activeImg = document.getElementById('gallery-active-img');
    const counter = document.getElementById('gallery-counter');
    if (!activeImg) return;
    
    activeImg.style.transform = 'scale(0.97)';
    activeImg.style.opacity = '0.5';
    
    setTimeout(() => {
        currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
        activeImg.src = currentGalleryImages[currentGalleryIndex];
        if (counter) {
            counter.innerText = `${currentGalleryIndex + 1} / ${currentGalleryImages.length}`;
        }
        activeImg.style.transform = 'scale(1)';
        activeImg.style.opacity = '1';
    }, 150);
}
