const portfolioData = {
  personalInfo: {
    name: "M Ashish Ramana",
    title: "Data Analyst",
    tagline: "Bridging the gap between raw data and actionable intelligence.",
    about: "I am an aspiring data enthusiast passionate about data analytics, data science, machine learning, and AI. I specialize in translating complex datasets into clear, actionable insights using a strong foundation in Python, SQL, Power BI, and R. I thrive on building end-to-end data pipelines and predictive models to solve real-world problems.",
    resumeLink: "#" // Replace this with your actual Google Drive or Dropbox link
  },
  contact: {
    email: "ashishramana1708@gmail.com",
    phone: "+91 9964700146",
    linkedin: "https://www.linkedin.com/in/ashish-ramana-2ash4",
    github: "https://github.com/Ashh-2004", // Using base github profile
  },
  skills: [
    {
      category: "Programming & Queries",
      items: ["Python", "R", "SQL"]
    },
    {
      category: "Data Science & ML",
      items: ["Pandas", "NumPy", "Scikit-learn", "Statistical Analysis", "Classification Models", "NLP"]
    },
    {
      category: "Visualization & BI",
      items: ["Power BI", "Excel", "Matplotlib", "Dashboards", "DAX"]
    },
    {
      category: "Tools & APIs",
      items: ["Gemini API", "Hugging Face", "Git", "GitHub", "Jupyter"]
    }
  ],

  /*
    ========================================================================
    💡 HOW TO ADD A NEW PROJECT (WITH SEPARATE REPO & LIVE LINKS!):
    ========================================================================
    Copy and paste this block into the `projects` list below:

    {
      title: "My New Analytics Dashboard",
      technologies: ["Power BI", "Python", "SQL"],
      description: "A short description of what this project accomplishes.",
      metrics: "Optional key result (e.g. Improved accuracy by 25%).",
      
      githubLink: "https://github.com/Ashh-2004/your-repo", // GitHub repository URL
      liveLink: "https://your-live-demo-or-powerbi-url.com", // Live working app / PowerBI / Web demo URL (Opened when image is clicked!)
      linkText: "View Code", // Optional label for GitHub button
      
      image: "assets/dashboard.png" // Screenshot path or leave blank ""
    },
  */

  projects: [
     {
      title: "PathFinder AI",
      technologies: ["Python", "React", "NLP","spacy"],
      description: "AI-powered career guidance platform that analyzes resumes, identifies skill gaps, and generates personalized learning roadmaps based on a user's target role. It combines FastAPI, React, and LLM-powered recommendations to help users make informed career decisions through an interactive and intuitive interface.",
      metrics: "Built a full-stack AI platform with resume analysis, personalized career roadmaps, and role-based skill recommendations, reducing manual career planning effort by over 80% through automation.",
      githubLink: "https://github.com/Ashh-2004",
      liveLink: "https://ashh-2004.github.io/Pathfinder-AI/",
      linkText: "View on GitHub",
      image: "" // Leave empty for a sleek interactive mockup placeholder, or add image URL/file path
    },
    {
      title: "Telecom Customer Churn Analysis & Prediction",
      technologies: ["Python", "Scikit-learn", "Pandas"],
      description: "Analyzed telecom customer data to identify churn patterns and key retention drivers using statistical analysis. Built a highly accurate churn prediction model to support targeted customer retention strategies.",
      metrics: "Achieved 0.96 ROC-AUC and 90% recall on the prediction model.",
      githubLink: "https://github.com/Ashh-2004",
      liveLink: "https://github.com/Ashh-2004", // Update with live working app URL if available
      linkText: "View on GitHub",
      image: ""
    },
    {
      title: "Startup India Funding Analysis Dashboard",
      technologies: ["Power BI", "Excel", "R"],
      description: "Cleaned and transformed public startup funding datasets via ETL processes. Developed interactive business intelligence dashboards to analyze funding trends across different states and sectors.",
      metrics: "Enabled visual comparison of high-growth and underfunded regions.",
      githubLink: "https://github.com/Ashh-2004/startup-india-dashboard",
      liveLink: "https://github.com/Ashh-2004/startup-india-dashboard", // Replace with Power BI / Live dashboard web link
      linkText: "View Dashboard Repo",
      image: ""
    },
    {
      title: "Mental Health Support Chatbot",
      technologies: ["Python", "Gemini API", "Hugging Face", "Discord"],
      description: "Built an academic project chatbot using the Gemini API for generative responses and Hugging Face models for NLP preprocessing. Scraped Reddit data to design intent categories, and deployed the final system as a Discord bot.",
      metrics: "Implemented controlled, non-diagnostic responses in real-time.",
      githubLink: "https://github.com/Ashh-2004",
      liveLink: "https://github.com/Ashh-2004",
      linkText: "View on GitHub",
      image: ""
    },
    {
      title: "AI Customer Sentiment Analysis Pipeline",
      technologies: ["Python", "NLP", "Pandas", "Matplotlib"],
      description: "Extracted e-commerce customer reviews and applied NLP sentiment scoring algorithms to quantify product satisfaction trends and customer sentiment shifts.",
      metrics: "Processed 50,000+ review entries with 92% classification accuracy.",
      githubLink: "https://github.com/Ashh-2004",
      liveLink: "https://github.com/Ashh-2004",
      linkText: "View Project Repo",
      image: ""
    }
  ],
  experience: [
    // To add experience in the future, uncomment the block below and fill in your details!
    /*
    {
      role: "Data Analyst Intern",
      company: "Example Tech Company",
      duration: "Aug 2026 - Present",
      description: "Assisted in cleaning data pipelines and building Power BI dashboards for client reporting."
    }
    */
  ],
  education: [
    {
      degree: "MCA (Master of Computer Applications)",
      institution: "Bangalore Institute of Technology, Bengaluru",
      duration: "2025 - 2027"
    },
    {
      degree: "BCA in Data Analytics",
      institution: "St. Joseph’s University, Bengaluru",
      duration: "2022 - 2025"
    }
  ],
  certifications: [
    "Data Analytics Essentials – Cisco",
    "Hands-on AI with TensorFlow – Infosys",
    "Introduction to MongoDB – MongoDB University",
    "Soft Skill Development – IIT Kharagpur"
  ]
};

// Make accessible globally for direct file:// browsing as well as ES Module exports
if (typeof window !== 'undefined') {
  window.portfolioData = portfolioData;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { portfolioData };
}
