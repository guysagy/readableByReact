# Readable: A content and comment web app.
<b>Readable</b> is the React & Redux course project, the 2nd project for the React Nanodegree Program @ Udacity. <br/>
Detailed project requirements are available [here](https://github.com/guysagy/readableByReact/blob/master/Readable%20Project%20Overview.docx). <br/>
The [create-react-app tool](https://github.com/facebookincubator/create-react-app) was used to bootstrap this project. <br/>
This README includes instructions for installing, launching and using the application. <br/>

Submitted by Guy Sagy (guysagy@hotamil.com), September 2017. <br/>

## WebApp Installation & Launch Guide
(1) As a pre-condition to run this application on a server machine, [Node.js](https://nodejs.org/) must be installed. Please install [Node.js](https://nodejs.org/) if needed.

(2.a) Check out the [Readable REST API server](https://github.com/udacity/reactnd-project-readable-starter). <br/>
(2.b) In a command prompt change directory into the <checkout-dir>/api-server dir. <br/>
(2.c) Run the command "npm install". This will install project dependencies. <br/>
(2.d) Run the command "npm start". This will run the REST API HTTP server. <br/>

(3.a) Check out the [Readable web-app client-side code](https://github.com/guysagy/readableByReact). <br/>
(3.b) In a command prompt, change directory into the project's check out directory. <br/>
(3.c) Run the command "npm install". This will install project dependencies. <br/>
(3.d) Run the command "npm start". This will run the client-app HTTP server. <br/>

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

## Known bugs:
(i) Forms' input validations are missing. <br/>
(ii) Efficiency issue: Both Posts and Category pages load categories from server, independently. <br/>
(iii) Efficiency issue: 'Posts for Category' loads relevant posts from server, while it could simply filter posts from the complete list of posts. <br/>

## Resources - technical articles referenced while implementing this project:
(i) [React-Boostrap](https://react-bootstrap.github.io/components.html#forms)<br/>
(ii) [Passing values in route (1)](https://stackoverflow.com/questions/27864720/react-router-pass-props-to-handler-component)<br/>
(iii) [Passing values in route (2)](https://jaketrent.com/post/access-route-params-react-router-v4/)<br/>
(iv) [Deep cloning an object](https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript)<br/>
(v) [JavaScript ES6 syntax in Sublime](http://gunnariauvinen.com/getting-es6-syntax-highlighting-in-sublime-text/)<br/>