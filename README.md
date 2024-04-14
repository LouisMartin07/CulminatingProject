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
    3. hives has its own util folder and page folder to group similiar things 

Refactor
    1. Group hive pages (possibly make it all one page so the user doesnt have to click around so much by make it like a nested table somehow)
    2. Alot of the styling for the hives pages is the same, maybe refactor and just import code into it
    3. try using .then for the token deletion to avoid error (awaits promise to return)

To get Answered
    1. Folder structure - Louise tips
    2. 

Struggles
    1. Poor planning - Multiple unexpected layout issues 
        1A. had to redo my user model to add zip code
        1B. did 3 pages 1 for each aspect of the hive rather then 1 page
        1C. didn't give good forethought on how I would utilize notes and have to create a page/model for it
        1D. didn't think of where to integrate the weather into my web app
    
Stretch Goals
    1. Set up some VisionAI so beekeeper can take slide picture and upload to website, and website will indetail break down slide
    2. Use google anayltics to take weather metrics and inputted slide data to show possible correlations 
    3. Deploy website
    4.   