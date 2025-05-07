// Import the translations and project data
import { translations, projectsDataTranslations } from './translations.js';

// Project data reference - actual data comes from translations.js
let projectsData = [];

// DOM Elements
const projectsGrid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Function to update projects based on language
export function updateProjectsLanguage(lang) {
    // Update projects data from translations
    projectsData = projectsDataTranslations[lang] || projectsDataTranslations['fr'];
    
    // Update filter buttons text
    document.querySelectorAll('.filter-btn').forEach(button => {
        const filterType = button.getAttribute('data-filter');
        const transKey = `projects-filter-${filterType}`;
        if (translations[lang] && translations[lang][transKey]) {
            button.textContent = translations[lang][transKey];
        }
    });
    
    // Re-create project cards with new language
    const activeFilter = document.querySelector('.filter-btn.active');
    const currentFilter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
    filterProjects(currentFilter);
}

// Create project cards and append to the grid
function createProjectCards(projects) {
    projectsGrid.innerHTML = ''; // Clear existing cards
    
    if (projects.length === 0) {
        const currentLang = localStorage.getItem('language') || 'fr';
        const noResultsText = translations[currentLang]['projects-no-results'];
        
        projectsGrid.innerHTML = `
            <div class="no-projects">
                <p>${noResultsText}</p>
            </div>
        `;
        return;
    }
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.setAttribute('data-category', project.category);
        
        // Create tags HTML
        const tagsHTML = project.tags.map(tag => `
            <span class="project-tag">${tag}</span>
        `).join('');
        
        // Create link HTML with proper checks
        const demoLink = project.demoLink && project.demoLink !== '#' && project.demoLink !== ''
            ? `<a href="${project.demoLink}" class="project-link" target="_blank" rel="noopener" aria-label="Voir la démo">
                 <i class="fas fa-external-link-alt"></i>
               </a>` 
            : '';
            
        const codeLink = project.codeLink && project.codeLink !== '#' 
            ? `<a href="${project.codeLink}" class="project-link" target="_blank" rel="noopener" aria-label="Voir le code">
                 <i class="fab fa-github"></i>
               </a>` 
            : '';
        
        projectCard.innerHTML = `
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
                <div class="project-links">
                    ${demoLink}
                    ${codeLink}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
        
        // Add click event to whole card to open demo if available
        if (project.demoLink && project.demoLink !== '#' && project.demoLink !== '') {
            projectCard.addEventListener('click', (e) => {
                // Don't trigger if clicking on a link already
                if (!e.target.closest('.project-link')) {
                    window.open(project.demoLink, '_blank', 'noopener');
                }
            });
            projectCard.classList.add('clickable');
        }
    });
}

// Filter projects based on category
function filterProjects(category) {
    let filteredProjects;
    
    if (category === 'all') {
        filteredProjects = projectsData;
    } else {
        filteredProjects = projectsData.filter(project => project.category === category);
    }
    
    createProjectCards(filteredProjects);
    
    // Add animation class to new cards
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('animated');
        });
    }, 100);
}

// Initialize projects and add event listeners to filter buttons
export function initProjects() {
    // Set initial projects data based on current language
    const currentLang = localStorage.getItem('language') || 'fr';
    projectsData = projectsDataTranslations[currentLang] || projectsDataTranslations['fr'];
    
    // Initially display all projects
    createProjectCards(projectsData);
    
    // Add animation class to cards
    setTimeout(() => {
        document.querySelectorAll('.project-card').forEach(card => {
            card.classList.add('animated');
        });
    }, 100);
    
    // Add click event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the filter category
            const filterCategory = button.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(filterCategory);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initProjects); 