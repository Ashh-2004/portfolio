# 🚀 The Ultimate Guide to Your Personal Portfolio

Welcome to your Data Science & Analytics Portfolio! Built with clean HTML, modern Vanilla CSS, and modular JavaScript, this portfolio features a high-contrast brutalist design with seamless Light & Dark modes.

---

## ⚡ 1. Adding a New Project with GitHub & Live Demo Links

All your portfolio data lives in **`portfolio-data.js`**. To add a new project:

1. Open **`portfolio-data.js`**.
2. Scroll to the `projects: [` list.
3. Copy & paste the simple template below inside the list:

```javascript
    {
      title: "My New Analytics Dashboard",
      technologies: ["Python", "SQL", "Power BI"],
      description: "Brief summary of what your project does and what insights it unlocks.",
      metrics: "Optional key result (e.g. Reduced processing time by 40%).",
      
      // Separate GitHub repo link and Live working demo link:
      githubLink: "https://github.com/Ashh-2004/your-repo-name", // GitHub Code Repo
      liveLink: "https://your-live-demo-or-powerbi-url.com", // Live working project (Opened when clicking the image!)
      linkText: "View Code", // Label for GitHub button
      
      image: "assets/dashboard.png" // Screenshot path (or leave "" for auto visual mockup)
    },
```

> [!TIP]
> **Clickable Image Visual**: Setting `liveLink` makes your project's screenshot visual open the **Live Working Project / Power BI Dashboard / Streamlit App** directly when clicked!

---

## 🌗 2. Testing Locally

- **Double Click**: Simply double-click `index.html` in Windows Explorer to open it directly in Chrome, Edge, or Firefox!
- **Local Server**: Run `python -m http.server 8080` in terminal and visit `http://localhost:8080`.

---

## 🌐 3. Free Deployment to GitHub Pages

1. Commit and push your changes to your GitHub repository.
2. Go to **Settings > Pages** in your repo on GitHub.
3. Set **Source** to `main` branch and `/ (root)` folder, then click **Save**.
4. Your site will automatically update at `https://Ashh-2004.github.io/portfolio/`!
