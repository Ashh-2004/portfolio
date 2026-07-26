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
    💡 HOW TO ADD A NEW PROJECT (SUPER SIMPLE!):
    ========================================================================
    Just copy and paste the template below into the `projects` list!
    All fields are optional except `title`. If you leave any field out, 
    the portfolio handles it automatically without breaking.

    {
      title: "My New Project Title",
      technologies: ["Python", "Power BI", "SQL"],
      description: "A short description of what this project accomplishes.",
      metrics: "Optional key result (e.g. Improved accuracy by 25%).",
      link: "https://github.com/your-username/your-repo", // GitHub or Live working link
      linkText: "View Code / Live Link", // Optional button text (defaults to 'View Project')
      image: "assets/my-screenshot.png" // Optional image path or leave blank ""
    },
  */

  projects: [
    {
      title: "Telecom Customer Churn Analysis & Prediction",
      technologies: ["Python", "Scikit-learn", "Pandas"],
      description: "Analyzed telecom customer data to identify churn patterns and key retention drivers using statistical analysis. Built a highly accurate churn prediction model to support targeted customer retention strategies.",
      metrics: "Achieved 0.96 ROC-AUC and 90% recall on the prediction model.",
      link: "https://github.com/Ashh-2004",
      linkText: "View on GitHub",
      image: "" // Leave empty for a sleek interactive mockup placeholder, or add image URL/file path
    },
    {
      title: "Startup India Funding Analysis Dashboard",
      technologies: ["Power BI", "Excel", "R"],
      description: "Cleaned and transformed public startup funding datasets via ETL processes. Developed interactive business intelligence dashboards to analyze funding trends across different states and sectors.",
      metrics: "Enabled visual comparison of high-growth and underfunded regions.",
      link: "https://github.com/Ashh-2004/startup-india-dashboard",
      linkText: "View Dashboard Repo",
      image: ""
    },
    {
      title: "Mental Health Support Chatbot",
      technologies: ["Python", "Gemini API", "Hugging Face", "Discord"],
      description: "Built an academic project chatbot using the Gemini API for generative responses and Hugging Face models for NLP preprocessing. Scraped Reddit data to design intent categories, and deployed the final system as a Discord bot.",
      metrics: "Implemented controlled, non-diagnostic responses in real-time.",
      link: "https://github.com/Ashh-2004",
      linkText: "View on GitHub",
      image: ""
    },
    {
      title: "AI Customer Sentiment Analysis Pipeline",
      technologies: ["Python", "NLP", "Pandas", "Matplotlib"],
      description: "Extracted e-commerce customer reviews and applied NLP sentiment scoring algorithms to quantify product satisfaction trends and customer sentiment shifts.",
      metrics: "Processed 50,000+ review entries with 92% classification accuracy.",
      link: "https://github.com/Ashh-2004",
      linkText: "View Project Repo"
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
