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


Notes for Dev's
    1. Used bootstrap for all page styling, and if desired use App & index.css for entire webapp styling 
    2. The Navbar will is based off the userState if someone is logged in or not and changes dispaly based on that  
    3. 

Stretch Goals
    1. Set up some VisionAI so beekeeper can take slide picture and upload to website, and website will indetail break down slide
    2. Use google anayltics to take weather metrics and inputted slide data to show possible correlations 
    3. Deploy website
    4.   