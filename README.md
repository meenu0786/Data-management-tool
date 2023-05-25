# Data Management tool.

Customer has a lot of csv files that contain customer data from running competitions. our job is to build a little tool for them so that they can import these files into a database in a clean and usable format.

#Features:

1. Utilize the user's option to either choose or effortlessly drag and release a CSV file within the front-end interface.
2. Proceed to upload the CSV file on the back-end system.
3. Perform a comprehensive analysis to identify any duplicate entries within the dataset and effectively filter out those instances.
4. Safeguard the resulting refined dataset within the database for future reference.
5. Generate a response providing vital statistics, including the total number of records successfully inserted, the count of duplicate records found within the CSV file, and the count of duplicate records existing within the database.
6. Finally, present the processed data to the front-end interface, ensuring seamless visibility for the user with the help of chart.


#Before local setup

- git clone - https://github.com/meenu0786/Data-management-tool.git
- cd Data-management-tool

#Local-Setup-Steps FE

- cd client
- npm install
- npm start

#Local-Setup-Steps BE

- cd server
- npm install
- node app.js

#Tech Stack for FE:
1. React for UI
2. Javascript for development
3. axios for api request
4. css-modules for design
5. react-dropzone for droping/uploading a csv file

#Tech Stack for BE:
1. Javascript for development
2. Nodejs for backend
3. multer for file upload
4. express for server
5. mongoose for database
6. csv-parser for convert CSV into JSON
