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
│  │  ├─ homePage/                   # pre-login page to give you an idea about the website
│  │  ├─ loginPage/                  # login to create an acct or use a google acct
│  │  ├─ signin/                     # Signup page redirect from login page
│  │  ├─ dashboard/                  # User's personalized dashboard after logging in
│  │  ├─ settings/                   # Just a way to adjust userprofile 
│  │  ├─ hiveData/                   # table for each slide and inside each slide each type of bee
│  │  ├─ calendarIntegration/        # uses google cal to manage events  
│  │  └─ analytics/                  # stretch goal - use weather API and google anayltics to check hive data
│  ├─ utils/
│  │  ├─ account/                    # backend calling for CRUD operations regarding users
│  │  ├─ axios/                      # creates axios object that each utility function uses to append URL
│  │  ├─ bees/                       # backend calling for CRUD operations regarding bees
│  │  ├─ calendar/                   # backend calling for CRUD operations regarding calendar
│  │  ├─ hives/                      # backend calling for CRUD operations regarding hives
│  │  ├─ settings/                   # backend calling for CRUD operations regarding changing user info
│  │  ├─ slides/                     # backend calling for CRUD operations regarding slides 
│  │  └─ weather /                   # backend calling for CRUD operations regarding weather
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
    4. There is remniscent code of token auth since I was going that route but switched to email auth (need to clean it up)
    5. Calendar model is linked via settings rather then directly vs the direct link in the beehive model (should probably  switch to one time but wanted practice with both to see pro cons)
    6. In index.css theres padding for the navbar so it doesn't encroach on the page content
    7. 

Refactor
    1. Group hive pages (possibly make it all one page so the user doesnt have to click around so much by make it like a nested table somehow)
    2. Alot of the styling for the hives pages is the same, maybe refactor and just import code into it

To get Answered
    1. Folder structure - Louise tips - Done
    2. UI Styling - Done
    3. How do I include a password to comfirm the user? Find a way around it to just use Token?

Struggles
    1. Poor planning - Multiple unexpected layout issues 
        1A. had to redo my user model to add zip code
        1B. did 3 pages 1 for each aspect of the hive rather then 1 page
        1C. didn't give good forethought on how I would utilize notes and have to create a page/model for it
        1D. didn't think of where to integrate the weather into my web app
    2. Take more time to read API docs (Was convering a zip code to a lat long when I didnt need to)
    3. API authentication - I have a mix of token and email authentication right now because I couldnt get token to work for my Bee API
    4. Deprecated packages (google login with react) and variety of packages options to do it was overwhelming

    
Stretch Goals
    1. Set up some VisionAI so beekeeper can take slide picture and upload to website, and website will indetail break down slide
    2. Use google anayltics to take weather metrics and inputted slide data to show possible correlations 
    3. Deploy website
    5. Set up a secure authentication method for all users and their API calls/their data
    4. Adjust weather API call's so it can get specific information like unit of measurement/differnt countries  
    5. Integrate honey production into hive table

To Do
    1. Fix the settings so it actually updates whatever info it says its updating
    2. Fix the calendar so it adds date on the right date and properly allows deletion and editing 