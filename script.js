// Get the arrow element
const scrollArrow = document.getElementById('scrollArrow');

// Smooth scroll to second section when arrow is clicked
scrollArrow.addEventListener('click', function() {
  const secondPage = document.getElementById('secondPage');
  secondPage.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

// Optional: Add fade-in effect when scrolling to second page
document.addEventListener('scroll', function() {
  const secondPage = document.getElementById('secondPage');
  const rect = secondPage.getBoundingClientRect();
  if (rect.top <= window.innerHeight * 0.8) {
    secondPage.style.opacity = '1';
    secondPage.style.transform = 'translateY(0)';
  }
});

// Initialize second page style for animation
document.addEventListener('DOMContentLoaded', function() {
  const secondPage = document.getElementById('secondPage');

  secondPage.style.opacity = '0';
  secondPage.style.transform = 'translateY(30px)';
  secondPage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

// Add scroll behavior for navigation buttons (Page 4)
document.querySelectorAll('.nav-button').forEach(button => {
  button.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      // Reset previous animations (optional)
      targetSection.style.opacity = '0.5';
      targetSection.style.transform = 'translateY(20px)';
      
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Optional: fade-in animation on arrival
      setTimeout(() => {
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'translateY(0)';
      }, 300);
    }
  });
});

// 🎒 School Archive: Subject Dropdown (Only activates on #schoolArchive page)
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Check if we're actually on the School Archive page
    const schoolArchiveSection = document.getElementById('schoolArchive');
    if (!schoolArchiveSection) return; // ✅ Exit early if not present

    // Get elements — only proceed if they exist
    const subjectSelect = document.getElementById('subjectSelect');
    const activitiesList = document.getElementById('activitiesList');
    
    if (!subjectSelect || !activitiesList) return; // ✅ Safety check

    // 📚 Subject data (modify as needed)
    const subjectData = {
      INTREG: [
        { title: "HANDS ON ACTIVITY 1", pdf: "Activities/INTREG/PRELIM/HANDS ON ACTIVITY 1.pdf" },
        { title: "HANDS ON ACTIVITY 2", pdf: "Activities/INTREG/PRELIM/HANDS ON ACTIVITY 2.png" },
        { title: "HANDS ON ACTIVITY 3", pdf: "Activities/INTREG/PRELIM/HANDS ON ACTIVITY 3.png" },
        { title: "PRELIM EXAM", pdf: "Activities/INTREG/PRELIM/PRELIM EXAM_BSIT-3B-Group-4-Cemetery.pdf" },
        //MIDTERM
        { title: "HANDS ON ACTIVITY 5", pdf: "Activities/INTREG/MIDTERM/HANDS ON ACTIVITY 5.pdf" },
        { title: "HANDS ON ACTIVITY 6", pdf: "Activities/INTREG/MIDTERM/HANDS ON ACTIVITY 6.pdf" },
        { title: "HANDS ON ACTIVITY 7", pdf: "Activities/INTREG/MIDTERM/HANDS ON ACTIVITY 7.pdf" },
        { title: "MIDTERM EXAM", pdf: "Activities/INTREG/MIDTERM/ALIZA_MIDTERM_PRACTICAL_EXAMINATION.pdf" },
      ],
      WEBSYTEM: [
        { title: "LAB ON ACTIVITY 1", pdf: "Activities/WEB SYTEM/PRELIM/ALIZA_ANGHELA_LabActivityNum1_(1).docx" },
        { title: "LAB ON ACTIVITY 2", pdf: "Activities/WEB SYTEM/PRELIM/ALIZA_ANGHELA_LabActivityNum2_-_Copy.docx" },
        { title: "LAB ON ACTIVITY 3", pdf: "Activities/WEB SYTEM/PRELIM/Aliza_anghela_LABActivitynum3(2).pdf" },
        //MIDTERM
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

   // 🔄 Handle subject selection
subjectSelect.addEventListener('change', function() {
  const selected = this.value;
  activitiesList.innerHTML = '';

  if (selected && subjectData[selected]) {
    subjectData[selected].forEach(item => {
      const el = document.createElement('div');
      el.className = 'activity-item';
      el.textContent = item.title; // ← still shows title

      // 🔗 Make it clickable
      el.style.cursor = 'pointer';
      el.addEventListener('click', function() {
        if (item.pdf) {
          window.open(item.pdf, '_blank'); // Opens in new tab
          // Or use: window.location.href = item.pdf; (same tab)
          // Or: window.open(item.pdf, '_blank', 'noopener,noreferrer');
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

    // ▶️ Trigger initial placeholder
    subjectSelect.dispatchEvent(new Event('change'));

  } catch (error) {
    console.warn('School Archive script not loaded — likely not on correct page.');
  }
});

// Art Works Gallery: Modal Popup Logic
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const closeModal = document.querySelector('.close');

  // Open modal on click
  galleryItems.forEach(item => {
    item.addEventListener('click', function() {
      const imgSrc = this.querySelector('img').src;
      const title = this.getAttribute('data-title') || 'Untitled';
      const desc = this.getAttribute('data-desc') || 'No description available.';
      
      modalImg.src = imgSrc;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent scroll
    });
  });

  // Close modal on X click
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scroll
  });

  // Close modal on outside click
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