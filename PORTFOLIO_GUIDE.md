# 🚀 The Ultimate Guide to Your Personal Portfolio

Welcome to your Data Science & Analytics Portfolio! Built with clean HTML, modern Vanilla CSS, and modular JavaScript, this portfolio features a high-contrast brutalist design with seamless Light & Dark modes.

---

## ⚡ 1. Adding a New Project (Super Easy & Fast!)

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
      link: "https://github.com/Ashh-2004/your-repo-name", // Your GitHub or Live Working Link
      linkText: "View Live Project ↗", // Custom button label (default: View Live Project ↗)
      image: "" // Optional screenshot path (e.g. "assets/dashboard.png") or leave "" for auto visual
    },
```

> [!TIP]
> **Clickable Visuals**: Every project visual automatically becomes a clickable thumbnail! Clicking on the project image/mockup directly opens the project link in a new tab.

---

## 🌗 2. Testing Locally

- **Double Click**: You can simply double-click `index.html` in Windows Explorer to open it directly in Chrome, Edge, or Firefox!
- **Local Server**: You can also run `python -m http.server 8000` in terminal and visit `http://localhost:8000`.

---

## 🌐 3. Free Deployment to GitHub Pages

1. Commit and push your changes to your GitHub repository.
2. Go to **Settings > Pages** in your repo on GitHub.
3. Set **Source** to `main` branch and `/ (root)` folder, then click **Save**.
4. Your site will automatically update at `https://Ashh-2004.github.io/...`!
