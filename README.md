# Readable: A content and comment web app.
<b>Readable</b> is the React & Redux course project, the 2nd project for the React Nanodegree Program @ Udacity. <br/>
Detailed project requirements are available [here](https://github.com/guysagy/readableByReact/blob/master/Readable%20Project%20Overview.docx). <br/>
The [create-react-app tool](https://github.com/facebookincubator/create-react-app) was used to bootstrap this project. <br/>
This README includes instructions for installing, launching and using the application. <br/>

Submitted by Guy Sagy (guysagy@hotamil.com), September 2017. <br/>

## WebApp Installation & Launch Guide
As a pre-condition to run this application on a server machine, [Node.js](https://nodejs.org/) must be installed - please install Node.js if needed. After having Node.js installed, check out the [project code](https://github.com/guysagy/readableByReact). Then: <br/>
(i) in a command prompt, change directory into the project's check out directory, <br/>
(ii) run the command "npm install", and then <br/>
(iii) run the command "npm start". <br/>

This is sufficient to get the web server and application installed, running and launched in the hosting machine's default browser. <br/>

## WebApp Usage Guide
The application's user interface includes a top menu menu bar with the following menu items: Home, Categories, and Posts, each pertaining to a web page described next:

### Home Page
Home page displays the Categories page and Posts page in one page.

### Categories Page
Categories are the subects to which posts relate. The Categories page displays a list of all available Post's Categories. Each category display item is a link to show all Posts that relate to that category.

### Posts Page
Posts page displays a list of all available Posts' title and Posts' metadata, linked to the Post's Details page, and a form to create a new post.

### Posts Details Page
Post details page shows full information for the post, including available comments to the post, and a form to create a new comment to this post.