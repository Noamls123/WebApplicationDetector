# WebApplicationDetector

# Brief explanation of the project:

This program implements a web-based for anomaly detection algorithms, to make them accessible to an audience of different
consumers, from regular users to automated services.
The general parts of the program:
1) RESTful API that accessible via HTTP protocol. At this project we use node.js which implements the RESTful API.
2) WEB user application - a web page that is accessible from the browser and the user can upload data-files and find detections in them. 


# Added Features

* Drop boxes - the user will be able to drag files into them. There are two drop boxes, one for train files, and the other for the anomaly files.
* Moving button - the user can choose to use the regression mode or to move the button for choosing the hybrid mode.
* Upload button - after dragging the files into the drop boxes and choosing the wanted detection mode, the user can press this button for
  uploading the files to the anomaly detector. 
 Note: at the left side of the screen will appear a table with the results of the anomalies. 
 
 
# The structure of the folders and the main files of the project


# Required installation and Preparations

1) Recommended work environment: Webstorm, VS-Code.
2) Use this [tutorial](https://expressjs.com/en/starter/installing.html) for the installations required to work with 'express' library.
3) Open the command prompt, and in the project's folder install: express-fileupload
4) [link](https://nodejs.org/en/download/) to install node.js
5) install the library of smallest-enclosing-circle with the command: npm install smallest-enclosing-circle
6) install 'html tablify'


# Running the application
Open the command-promp and get in the project directory. Then, get in the controller directory.
Use the command: node expServer.js . After that, the server will wait for the detection files.
Now, you can open a page by the adress 'localhost:8080' or send HTTP POST-command to the 'localhost:8080' adress.


# UML Chart:
Press [here](https://github.com/Noamls123/WebApplicationDetector/blob/main/Selected.png) to get the UML of the main classes.

# Explanation Video:

# Collaborators
This program was developed by Shaked Arel, Ruth Lofsky, Hadassa Danesh and Noam Sery Levi.

