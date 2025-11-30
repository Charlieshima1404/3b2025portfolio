// Scroll arrow: smooth scroll to intro section
const scrollArrow = document.getElementById('scrollArrow');

scrollArrow.addEventListener('click', function() {
  const secondPage = document.getElementById('secondPage');
  secondPage.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

// Fade-in animation trigger when secondPage enters viewport
document.addEventListener('scroll', function() {
  const secondPage = document.getElementById('secondPage');
  const rect = secondPage.getBoundingClientRect();
  if (rect.top <= window.innerHeight * 0.8) {
    secondPage.style.opacity = '1';
    secondPage.style.transform = 'translateY(0)';
  }
});

// Set up initial fade-in animation state for secondPage
document.addEventListener('DOMContentLoaded', function() {
  const secondPage = document.getElementById('secondPage');

  secondPage.style.opacity = '0';
  secondPage.style.transform = 'translateY(30px)';
  secondPage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

// Navigation buttons: scroll + fade-in to target sections
document.querySelectorAll('.nav-button').forEach(button => {
  button.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      // Optional: reset for re-entrance animation
      targetSection.style.opacity = '0.5';
      targetSection.style.transform = 'translateY(20px)';
      
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Fade in after scroll
      setTimeout(() => {
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'translateY(0)';
      }, 300);
    }
  });
});

// School Archive: subject dropdown → activity list → open PDFs
document.addEventListener('DOMContentLoaded', function() {
  try {
    const schoolArchiveSection = document.getElementById('schoolArchive');
    if (!schoolArchiveSection) return; // Skip if not on this page

    const subjectSelect = document.getElementById('subjectSelect');
    const activitiesList = document.getElementById('activitiesList');
    
    if (!subjectSelect || !activitiesList) return; // Skip if elements missing

    // Activity data per subject
    const subjectData = {
      INTREG: [
        { title: "HANDS ON ACTIVITY 1", pdf: "Activities/INTREG/PRELIM/HANDS ON ACTIVITY 1.pdf" },
        { title: "HANDS ON ACTIVITY 2", pdf: "Activities/INTREG/PRELIM/HANDS ON ACTIVITY 2.png" },
        { title: "HANDS ON ACTIVITY 3", pdf: "Activities/INTREG/PRELIM/HANDS ON ACTIVITY 3.png" },
        { title: "PRELIM EXAM", pdf: "Activities/INTREG/PRELIM/PRELIM EXAM_BSIT-3B-Group-4-Cemetery.pdf" },
        { title: "HANDS ON ACTIVITY 5", pdf: "Activities/INTREG/MIDTERM/HANDS ON ACTIVITY 5.pdf" },
        { title: "HANDS ON ACTIVITY 6", pdf: "Activities/INTREG/MIDTERM/HANDS ON ACTIVITY 6.pdf" },
        { title: "HANDS ON ACTIVITY 7", pdf: "Activities/INTREG/MIDTERM/HANDS ON ACTIVITY 7.pdf" },
        { title: "MIDTERM EXAM", pdf: "Activities/INTREG/MIDTERM/ALIZA_MIDTERM_PRACTICAL_EXAMINATION.pdf" },
      ],
      WEBSYTEM: [
        { title: "LAB ON ACTIVITY 1", pdf: "Activities/WEB SYTEM/PRELIM/ALIZA_ANGHELA_LabActivityNum1_(1).docx" },
        { title: "LAB ON ACTIVITY 2", pdf: "Activities/WEB SYTEM/PRELIM/ALIZA_ANGHELA_LabActivityNum2_-_Copy.docx" },
        { title: "LAB ON ACTIVITY 3", pdf: "Activities/WEB SYTEM/PRELIM/Aliza_anghela_LABActivitynum3(2).pdf" },
        { title: "MIDTERM LAB ON ACTIVITY 1", pdf: "Activities/WEB SYTEM/FINAL/ALIZA_MIDTERM_LAB_ACTIVITY_1(2).pdf" },
        { title: "MIDTERM LAB ON ACTIVITY 2", pdf: "Activities/WEB SYTEM/FINAL/ALIZA_Midterm_-_Lab_Activity2_The_Javascript_Basics(2).pdf" },
        { title: "MIDTERM LAB ON ACTIVITY 3", pdf: "Activities/WEB SYTEM/FINAL/Midterm_-_Lab_Activity3_The_Javascript_Basics.pdf" },
      ],
      DATAINFO: [
        { title: "Reviewing Statistical Applications in Research Papers", pdf: "Activities/DATA&INFO/PRELIM/Reviewing_Statistical_Applications_in_Research_Papers_ALIZA_BSIT3B.pdf" },
        { title: "Identifying Variables in Qualitative and Quantitative Research Papers", pdf: "Activities/DATA&INFO/PRELIM/Identifying_Variables_in_Qualitative_and_Quantitative_Research_Papers.pdf" },
        { title: "Checking Research Papers and Their Methods of Data Collection", pdf: "Activities/DATA&INFO/PRELIM/Aliza_BSIT3B_Checking_Research_Papers_and_Their_Methods_of_Data_Collection.pdf" },
        { title: "Descriptive Statistics — Mean, Variance, and Standard Deviation", pdf: "Activities/DATA&INFO/PRELIM/Descriptive_Statistics.pdf" },
        { title: "Exploring Non-Random Sampling in Research", pdf: "Activities/DATA&INFO/PRELIM/Exploring_Non-Random_Sampling_in_Research.pdf" },
        { title: "Analyzing How Research Papers Present Their Data", pdf: "Activities/DATA&INFO/PRELIM/Analyzing_How_Research_Papers_Present_Their_Data.pdf" },
        { title: "Frequency Distribution with Datasets", pdf: "Activities/DATA&INFO/PRELIM/aliza_Frequency_Distribution_with_Datasets(2).pdf" },
        { title: "Group Activity: ISO 25010 Evaluation Tool", pdf: "Activities/DATA&INFO/PRELIM/Group Activity_ ISO 25010 Evaluation Tool_group3.pdf" },
        { title: "Group Activity: Analysis and Interpretation of ISO 25010 Criteria Results", pdf: "Activities/DATA&INFO/PRELIM/Group Activity_ Analysis and Interpretation of ISO 25010 Criteria Results.pdf" },
      ],
    };

    // Update activity list when subject changes
    subjectSelect.addEventListener('change', function() {
      const selected = this.value;
      activitiesList.innerHTML = '';

      if (selected && subjectData[selected]) {
        subjectData[selected].forEach(item => {
          const el = document.createElement('div');
          el.className = 'activity-item';
          el.textContent = item.title;

          el.style.cursor = 'pointer';
          el.addEventListener('click', function() {
            if (item.pdf) {
              window.open(item.pdf, '_blank');
            }
          });

          activitiesList.appendChild(el);
        });
      } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'placeholder-text';
        placeholder.textContent = 'Select a subject to view activities.';
        activitiesList.appendChild(placeholder);
      }
    });

    // Show placeholder on load
    subjectSelect.dispatchEvent(new Event('change'));

  } catch (error) {
    console.warn('School Archive script not loaded — likely not on correct page.');
  }
});

// Art gallery: image modal with title/description
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeModal = document.querySelector('.close');

  // Open modal with selected item’s data
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const title = this.getAttribute('data-title') || 'Untitled';
      const desc = this.getAttribute('data-desc') || 'No description available.';
      
      modalImg.src = imgSrc;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  // Close on X click
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Close on click outside image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
});



//WARNING

// === Fullscreen Warning Overlay ===
(function() {
  // Config
  const MIN_WIDTH = 1024;    // Adjust based on your layout's needs
  const MIN_HEIGHT = 600;    // e.g., avoid ultra-short windows
  const AUTO_HIDE_DELAY = 5000; // ms (set to 0 to disable auto-hide)

  let overlay = null;
  let hideTimer = null;

  function createOverlay() {
    if (overlay) return;
    
    overlay = document.createElement('div');
    overlay.id = 'resize-warning';
    overlay.innerHTML = `
      <div class="resize-warning-content">
        <p>⚠️ Please use full window for the best experience.</p>
        <button id="resize-close">&times;</button>
      </div>
    `;
    document.body.appendChild(overlay);

    // Close button
    document.getElementById('resize-close').onclick = hideOverlay;

    // Style via JS (so no CSS file changes needed — but you can move to CSS later)
    const style = document.createElement('style');
    style.textContent = `
      #resize-warning {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.76);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
      }
      #resize-warning.active {
        opacity: 1;
        pointer-events: all;
      }
      .resize-warning-content {
        background: #1a1a1a;
        color: #fff;
        padding: 1.2rem 2rem;
        border-radius: 8px;
        text-align: center;
        max-width: 90%;
        box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        position: relative;
        font-family: Arial, sans-serif;
      }
      .resize-warning-content p {
        margin: 0 2rem 0 0;
        font-size: 1.1rem;
        line-height: 1.4;
      }
      #resize-close {
        position: absolute;
        top: 8px; right: 12px;
        background: rgba(217, 200, 43, 1);
        color: white;
        border: none;
        width: 28px; height: 28px;
        border-radius: 50%;
        font-size: 18px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #resize-close:hover {
        background: rgba(217, 200, 43, 1);
      }
    `;
    document.head.appendChild(style);
  }

  function showOverlay() {
    createOverlay();
    overlay.classList.add('active');

    // Auto-hide after delay (optional)
    if (AUTO_HIDE_DELAY > 0) {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(hideOverlay, AUTO_HIDE_DELAY);
    }
  }

  function hideOverlay() {
    if (overlay) {
      overlay.classList.remove('active');
      // Optional: remove element after fade-out (or keep for reuse)
      // setTimeout(() => overlay && overlay.remove(), 300);
    }
    clearTimeout(hideTimer);
  }

  function checkSize() {
    const isTooSmall = window.innerWidth < MIN_WIDTH || window.innerHeight < MIN_HEIGHT;
    if (isTooSmall) {
      showOverlay();
    } else {
      hideOverlay();
    }
  }

  // Debounce for resize events (improves performance)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(checkSize, 250); // delay 250ms after resize ends
  });

  // Initial check on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkSize);
  } else {
    checkSize();
  }

})();