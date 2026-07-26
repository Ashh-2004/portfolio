document.addEventListener('DOMContentLoaded', () => {
    // Retrieve portfolioData safely from window or module context
    const data = (typeof portfolioData !== 'undefined' ? portfolioData : (window.portfolioData || {}));

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
    } else {
        if (themeIcon) themeIcon.textContent = '🌙';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.textContent = '🌙';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.textContent = '☀️';
            }
        });
    }

    // Safely populate Hero Section
    const personalInfo = data.personalInfo || {};
    const contact = data.contact || {};

    const nameEl = document.getElementById('hero-name');
    if (nameEl) nameEl.textContent = personalInfo.name || 'M Ashish Ramana';

    const titleEl = document.getElementById('hero-title');
    if (titleEl) {
        const titleStr = personalInfo.title || 'Data Analyst';
        const taglineStr = personalInfo.tagline ? ` // ${personalInfo.tagline}` : '';
        titleEl.textContent = `${titleStr}${taglineStr}`;
    }
    
    // Populate Hero Contact Links
    const heroContactLinks = document.getElementById('hero-contact-links');
    if (heroContactLinks) {
        heroContactLinks.innerHTML = '';
        if (contact.github) heroContactLinks.innerHTML += `<a href="${contact.github}" target="_blank" rel="noopener noreferrer" class="contact-link label">GitHub</a>`;
        if (contact.linkedin) heroContactLinks.innerHTML += `<a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-link label">LinkedIn</a>`;
        if (contact.email) heroContactLinks.innerHTML += `<a href="mailto:${contact.email}" class="contact-link label">Email</a>`;
    }
    
    // Populate About
    const aboutEl = document.getElementById('about-text');
    if (aboutEl) aboutEl.textContent = personalInfo.about || '';

    // Populate Experience
    const experienceContainer = document.getElementById('experience-container');
    if (experienceContainer) {
        experienceContainer.innerHTML = '';
        const expList = Array.isArray(data.experience) ? data.experience : [];
        if (expList.length > 0) {
            expList.forEach(exp => {
                experienceContainer.innerHTML += `
                    <div class="education-item">
                        <span class="label">${exp.duration || ''}</span>
                        <p class="body" style="font-weight: 500;">${exp.role || ''}</p>
                        <p class="body text-secondary">${exp.company || ''}</p>
                        ${exp.description ? `<p class="body text-secondary" style="font-size: 0.95rem; margin-top: 8px;">${exp.description}</p>` : ''}
                    </div>
                `;
            });
        } else {
            experienceContainer.innerHTML = `<p class="body text-secondary" style="font-style: italic; font-size: 0.9rem;">Seeking entry-level opportunities to build experience.</p>`;
        }
    }

    // Populate Education
    const educationContainer = document.getElementById('education-container');
    if (educationContainer) {
        educationContainer.innerHTML = '';
        const eduList = Array.isArray(data.education) ? data.education : [];
        eduList.forEach(edu => {
            educationContainer.innerHTML += `
                <div class="education-item">
                    <span class="label">${edu.duration || ''}</span>
                    <p class="body" style="font-weight: 500;">${edu.degree || ''}</p>
                    <p class="body text-secondary">${edu.institution || ''}</p>
                </div>
            `;
        });
    }

    // Populate Skills
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = '';
        const skillsList = Array.isArray(data.skills) ? data.skills : [];
        skillsList.forEach(skillCategory => {
            const rawItems = skillCategory.items;
            const items = Array.isArray(rawItems) ? rawItems : (typeof rawItems === 'string' ? [rawItems] : []);
            const tagsHtml = items.map(item => `<span class="skill-tag">${item}</span>`).join('');
            skillsContainer.innerHTML += `
                <div class="skill-category">
                    <h3 class="label">${skillCategory.category || 'Skills'}</h3>
                    <div class="skill-tags">
                        ${tagsHtml}
                    </div>
                </div>
            `;
        });
    }

    // Populate Projects
    const projectsContainer = document.getElementById('projects-container');
    if (projectsContainer) {
        projectsContainer.innerHTML = '';
        const projectsList = Array.isArray(data.projects) ? data.projects : [];
        
        projectsList.forEach((project, index) => {
            // Defensively process technologies array
            const rawTech = project.technologies;
            const techs = Array.isArray(rawTech) ? rawTech : (typeof rawTech === 'string' ? [rawTech] : []);
            const techHtml = techs.map(tech => `<span class="label">${tech}</span>`).join('');
            
            // Project Title & Description
            const title = project.title || 'Untitled Project';
            const description = project.description ? `<p class="body project-desc">${project.description}</p>` : '';
            const metrics = project.metrics ? `<p class="body project-metrics">${project.metrics}</p>` : '';
            
            // Separate Links: GitHub Repo vs Live Project Demo
            const githubUrl = project.githubLink || project.link || '';
            const liveUrl = project.liveLink || project.demoLink || githubUrl || '';

            // Buttons HTML
            const githubText = project.linkText || 'View Code';
            
            let buttonsArr = [];
            if (githubUrl) {
                buttonsArr.push(`<a href="${githubUrl}" target="_blank" rel="noopener noreferrer" class="button-outline label">${githubText}</a>`);
            }
            if (project.liveLink && project.liveLink !== githubUrl) {
                buttonsArr.push(`<a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" class="button-primary label" style="padding: 10px 20px;">Live Demo ↗</a>`);
            }
            if (buttonsArr.length === 0 && liveUrl) {
                buttonsArr.push(`<a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="button-outline label">View Project ↗</a>`);
            }
            if (buttonsArr.length === 0) {
                buttonsArr.push(`<span class="button-outline label disabled-btn">In Progress</span>`);
            }

            const buttonsHtml = `<div style="display: flex; gap: 12px; flex-wrap: wrap;">${buttonsArr.join('')}</div>`;

            // Mockup / Visual HTML
            const innerVisual = project.image 
                ? `<img src="${project.image}" alt="${title}">`
                : `<div class="mockup-placeholder"><span class="label project-mockup-text">Project Visual ${index + 1}</span></div>`;

            // Clickable Image Mockup Wrapper pointing directly to liveUrl (Live Working Project Link)
            const isDistinctLiveLink = Boolean(project.liveLink && project.liveLink !== githubUrl);
            const overlayBadgeText = isDistinctLiveLink ? 'Open Live Demo ↗' : 'Open Project Link ↗';

            const mockupWrapperHtml = liveUrl
                ? `<a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="project-mockup-link" title="Open Live Project: ${title}">
                    <div class="project-mockup">
                        ${innerVisual}
                        <div class="project-mockup-overlay">
                            <span class="label overlay-badge">${overlayBadgeText}</span>
                        </div>
                    </div>
                   </a>`
                : `<div class="project-mockup">
                    ${innerVisual}
                   </div>`;

            projectsContainer.innerHTML += `
                <div class="project-card">
                    <div class="project-content">
                        <h3>${title}</h3>
                        ${techHtml ? `<div class="project-tech">${techHtml}</div>` : ''}
                        ${description}
                        ${metrics}
                        ${buttonsHtml}
                    </div>
                    ${mockupWrapperHtml}
                </div>
            `;
        });
    }

    // Populate Certifications
    const certsContainer = document.getElementById('certs-container');
    if (certsContainer) {
        certsContainer.innerHTML = '';
        const certList = Array.isArray(data.certifications) ? data.certifications : [];
        certList.forEach(cert => {
            const certStr = String(cert || '');
            const parts = certStr.split(' – ');
            const title = parts[0] || certStr;
            const issuer = parts.length > 1 ? parts[1] : '';
            const badgeHtml = issuer ? `<div class="project-tech"><span class="label">${issuer}</span></div>` : '';

            certsContainer.innerHTML += `
                <div class="cert-card">
                    <h3 style="font-size: 1.5rem; font-weight: 500; letter-spacing: -0.025em; margin-bottom: 8px;">${title}</h3>
                    ${badgeHtml}
                </div>
            `;
        });
    }

    // Populate Footer
    const resumeBtn = document.getElementById('resume-btn');
    if (resumeBtn) resumeBtn.href = personalInfo.resumeLink || '#';

    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const footerContactLinks = document.getElementById('footer-contact-links');
    if (footerContactLinks) {
        footerContactLinks.innerHTML = '';
        if (contact.github) footerContactLinks.innerHTML += `<a href="${contact.github}" target="_blank" rel="noopener noreferrer" class="contact-link label">GitHub</a>`;
        if (contact.linkedin) footerContactLinks.innerHTML += `<a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-link label">LinkedIn</a>`;
        if (contact.email) footerContactLinks.innerHTML += `<a href="mailto:${contact.email}" class="contact-link label">Email</a>`;
    }
});
