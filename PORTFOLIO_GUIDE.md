# 🚀 The Ultimate Guide to Your Aura AI Portfolio

Welcome to your new Data Science Portfolio! This project was custom-built using HTML, Vanilla CSS, and JavaScript. It implements the "Aura AI Portfolio" design system: a brutalist, high-contrast, premium aesthetic perfectly suited for data analysts, ML engineers, and AI enthusiasts.

The best part? **You never need to touch the HTML or CSS to update your site.** 

This guide will explain everything you need to know, from making simple edits to deploying the site live on the internet for free.

---

## 📝 1. How to Make Edits

Your entire portfolio is data-driven. All of your personal information is stored securely in one single file: `portfolio-data.js`.

### Opening the Data File
1. Open the `portfolio-data.js` file in any text editor (like VS Code, Notepad, etc.).
2. You will see a JavaScript object containing different sections: `personalInfo`, `contact`, `skills`, `projects`, `experience`, `education`, and `certifications`.

### Editing Text (Bio, Titles, Links)
To change your bio, your job title, or your contact links, just find the text inside the quotation marks `""` and replace it. 
*Example:*
```javascript
// Change this:
title: "Data Analyst",
// To this:
title: "Data Scientist & AI Engineer",
```
Save the file, refresh your browser, and the website updates instantly.

### Adding Work Experience
When you land your first role, you can easily add it to the timeline:
1. Locate the `experience: []` array in `portfolio-data.js`.
2. Delete the `/*` and `*/` symbols to uncomment the template.
3. Fill in your role, company, duration, and description.

### Adding Projects & Visuals
To add a new project, simply copy one of the existing project blocks `{ ... }` inside the `projects: []` array and paste it below, filling in the new details.

**Adding Images to Projects:**
1. Save a screenshot of your project (e.g., `dashboard.png`) into this folder (next to `index.html`).
2. In `portfolio-data.js`, find your project and add the `image` property:
```javascript
  title: "My Awesome Dashboard",
  image: "dashboard.png", // Just type the file name here!
```
If you don't have an image, just leave it as `image: ""` and it will default to a sleek text placeholder.

### Updating Your Resume
1. Upload your resume PDF to Google Drive or Dropbox.
2. Make the link public ("Anyone with the link can view").
3. Copy the link.
4. Paste the link into the `resumeLink: ""` property inside `personalInfo`.

---

## 🌐 2. How to Deploy Your Portfolio (For Free)

Since your portfolio is completely static (no backend database), you can host it forever for free using **GitHub Pages**. 

Whenever you make a change to `portfolio-data.js` in the future, you just commit the change to GitHub, and your live website updates automatically within a minute!

### Step 1: Create a GitHub Repository
1. Log into your [GitHub account](https://github.com/Ashh-2004).
2. Create a new repository. A great name is `portfolio` or `ashh-2004.github.io`.
3. Keep the repository **Public**.

### Step 2: Upload Your Files
Upload the following files from this folder directly into your new GitHub repository:
- `index.html`
- `styles.css`
- `main.js`
- `portfolio-data.js`
- (Any images you added, like project screenshots)
Commit the changes.

### Step 3: Turn on GitHub Pages
1. Go to the **Settings** tab of your new repository on GitHub.
2. In the left sidebar menu, click on **Pages**.
3. Under the **Build and deployment** section, look for the **Source** dropdown.
4. Change the branch from `None` to `main` (or `master`). Leave the folder as `/ (root)`.
5. Click **Save**.

### Step 4: Share Your Link!
Within 1-2 minutes, GitHub will build your site. At the top of the GitHub Pages settings page, you will see a message:
> "Your site is live at `https://Ashh-2004.github.io/...`"

Click that link, and share it on your LinkedIn and resume!
