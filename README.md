Frontend
├─ node_modules/
├─ src/
│  ├─ assets/
│  ├─ components/                    # Reusable UI components
│  │  ├─ Navbar/
│  │  │  ├─ Navbar.jsx               # Navbar component for logged-in users
│  │  │  └─ navbar.css
│  │  └─ ...                         # Other shared components
│  ├─ pages/                         # Each page will have an inidividual .jsx and .css for it
│  │  ├─ HomePage/                   # pre-login page to give you an idea about the website
│  │  ├─ LoginPage/                  # login to create an acct or use a google acct
│  │  ├─ Signin/                     # Signup page redirect from login page
│  │  ├─ Dashboard/                  # User's personalized dashboard after logging in
│  │  ├─ Settings/                   # Just a way to adjust userprofile 
│  │  ├─ HiveData/                   # table for each slide and inside each slide each type of bee/honey/mites
│  │  ├─ CalendarIntegration/        # uses google cal to manage events  
│  │  └─ Analytics/                  # stretch goal - use weather API and google anayltics to check hive data
│  ├─ utils/
│  ├─ App.css
│  ├─ App.jsx
│  ├─ index.css
│  ├─ main.jsx 
│  └─ router.jsx
├─ index.html
├─ package.json
├─ vite.config.js


