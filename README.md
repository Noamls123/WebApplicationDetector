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
We used MVC architecture (Model, View, Controller).
The **Model** folder has the files that implements the anomaly detection algorithms. It returns a JSON file with 
the anomalies.
The **Controller** folder implements the server code.
The **View** folder implements the code for HTML page that will be presented to the user.


# Required installation and Preparations

1) Recommended work environment: Webstorm, VS-Code.
2) Use this [tutorial](https://expressjs.com/en/starter/installing.html) for the installations required to work with 'express' library.
3) Open the command prompt, and in the project's folder install: express-fileupload
4) [link](https://nodejs.org/en/download/) to install node.js
5) install the library of smallest-enclosing-circle with the command: npm install smallest-enclosing-circle


# Running 
Run the server from the work environment or according to the following instructions:

Open the command-promp and get in the project directory. Then, get in the controller directory.
Use the command: node expServer.js . After that, the server will wait for consumers.
Now, there are two option:
- You can open a page by the adress 'localhost:8080' and upload the csv files. At this option the anomalies will appear at the left side of the page.
- Send an HTTP POST-command to the 'localhost:8080' adress.
In the http POST command enter to the mod argument "reg"-for the regression algorithm and "hybrid"-for the hybrid algorithm, to the train argument the path of the file you would like to learn and to the anomalies the path to the file you would like to detect.
At this option you will get JSON with the anomalies.

The page that will show after opening a browser at the adress 'localhost:8080':

![image](https://github.com/Noamls123/WebApplicationDetector/blob/907cc7af1d17ebee8cd70b91639c04d5b04a7f83/web%20screen.png)


# UML Chart:
Press [here](https://github.com/Noamls123/WebApplicationDetector/blob/main/Selected.png) to get the UML of the main classes.

# Explanation Video:
Press [here](https://youtu.be/2H2qLyv2560) to see our video explanation

# Collaborators
This program was developed by Shaked Arel, Ruth Lofsky, Hadassa Danesh and Noam Sery Levi.

