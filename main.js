import { portfolioData } from './portfolio-data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '☀️';
        }
    });

    // Populate Hero Section
    document.getElementById('hero-name').textContent = portfolioData.personalInfo.name;
    document.getElementById('hero-title').textContent = `${portfolioData.personalInfo.title} // ${portfolioData.personalInfo.tagline}`;
    
    // Populate Hero Contact Links
    const heroContactLinks = document.getElementById('hero-contact-links');
    if (portfolioData.contact.github) heroContactLinks.innerHTML += `<a href="${portfolioData.contact.github}" target="_blank" class="contact-link label">GitHub</a>`;
    if (portfolioData.contact.linkedin) heroContactLinks.innerHTML += `<a href="${portfolioData.contact.linkedin}" target="_blank" class="contact-link label">LinkedIn</a>`;
    
    // Populate About
    document.getElementById('about-text').textContent = portfolioData.personalInfo.about;

    // Populate Experience
    const experienceContainer = document.getElementById('experience-container');
    if (portfolioData.experience && portfolioData.experience.length > 0) {
        portfolioData.experience.forEach(exp => {
            experienceContainer.innerHTML += `
                <div class="education-item">
                    <span class="label">${exp.duration}</span>
                    <p class="body" style="font-weight: 500;">${exp.role}</p>
                    <p class="body text-secondary">${exp.company}</p>
                    ${exp.description ? `<p class="body text-secondary" style="font-size: 0.95rem; margin-top: 8px;">${exp.description}</p>` : ''}
                </div>
            `;
        });
    } else {
        experienceContainer.innerHTML = `<p class="body text-secondary" style="font-style: italic; font-size: 0.9rem;">Seeking entry-level opportunities to build experience.</p>`;
    }

    // Populate Education
    const educationContainer = document.getElementById('education-container');
    portfolioData.education.forEach(edu => {
        educationContainer.innerHTML += `
            <div class="education-item">
                <span class="label">${edu.duration}</span>
                <p class="body" style="font-weight: 500;">${edu.degree}</p>
                <p class="body text-secondary">${edu.institution}</p>
            </div>
        `;
    });

    // Populate Skills
    const skillsContainer = document.getElementById('skills-container');
    portfolioData.skills.forEach(skillCategory => {
        const tagsHtml = skillCategory.items.map(item => `<span class="skill-tag">${item}</span>`).join('');
        skillsContainer.innerHTML += `
            <div class="skill-category">
                <h3 class="label">${skillCategory.category}</h3>
                <div class="skill-tags">
                    ${tagsHtml}
                </div>
            </div>
        `;
    });

    // Populate Projects
    const projectsContainer = document.getElementById('projects-container');
    portfolioData.projects.forEach((project, index) => {
        const techHtml = project.technologies.map(tech => `<span class="label">${tech}</span>`).join('');
        
        // Use the image if provided, otherwise fallback to the text visual
        const visualHtml = project.image 
            ? `<img src="${project.image}" alt="${project.title}">`
            : `<span class="label project-mockup-text">Project Visual ${index + 1}</span>`;

        projectsContainer.innerHTML += `
            <div class="project-card">
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <div class="project-tech">
                        ${techHtml}
                    </div>
                    <p class="body project-desc">${project.description}</p>
                    <p class="body project-metrics">${project.metrics}</p>
                    <a href="${project.link}" target="_blank" class="button-outline label">${project.linkText}</a>
                </div>
                <div class="project-mockup">
                    ${visualHtml}
                </div>
            </div>
        `;
    });

    // Populate Certifications
    const certsContainer = document.getElementById('certs-container');
    portfolioData.certifications.forEach(cert => {
        // Split by the dash to separate title and issuer
        const parts = cert.split(' – ');
        const title = parts[0];
        const issuer = parts.length > 1 ? parts[1] : '';
        
        const badgeHtml = issuer ? `<div class="project-tech"><span class="label">${issuer}</span></div>` : '';

        certsContainer.innerHTML += `
            <div class="cert-card">
                <h3 style="font-size: 1.5rem; font-weight: 500; letter-spacing: -0.025em; margin-bottom: 8px;">${title}</h3>
                ${badgeHtml}
            </div>
        `;
    });

    // Populate Footer
    document.getElementById('resume-btn').href = portfolioData.personalInfo.resumeLink;
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    const footerContactLinks = document.getElementById('footer-contact-links');
    if (portfolioData.contact.github) footerContactLinks.innerHTML += `<a href="${portfolioData.contact.github}" target="_blank" class="contact-link label">GitHub</a>`;
    if (portfolioData.contact.linkedin) footerContactLinks.innerHTML += `<a href="${portfolioData.contact.linkedin}" target="_blank" class="contact-link label">LinkedIn</a>`;
    if (portfolioData.contact.email) footerContactLinks.innerHTML += `<a href="mailto:${portfolioData.contact.email}" class="contact-link label">Email</a>`;
});
