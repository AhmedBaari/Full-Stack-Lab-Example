# Full Stack WebApp - Lab Examination
Created for the Full Stack Web App Development Lab Examination.

This repository contains a simple full stack web application for waste management. The backend is built with Node.js, Express, and MongoDB, while the frontend is developed using React and Bootstrap.

## Frontend
The frontend is located in the `frontend` directory. It is built with React and styled using Bootstrap.

To run the frontend:
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
    npm install
    ```
3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be accessible at `http://localhost:3000`.

## Backend

The backend is located in the `backend` directory. It is built with Node.js, Express, and MongoDB.

To run the backend:
1. Navigate to the `backend` directory: 
   ```bash
   cd backend
   ```
2. Install the dependencies:
   ```bash
    npm install
    ```
3. Start the server:
   ```bash
    node index.js
    ```

The backend will be accessible at `http://localhost:5000`.

Make sure to have MongoDB running locally or provide a MongoDB connection string in the `MONGODB_URI` variable in `backend/index.js`.

## Files to Learn From
### Frontend
- [`frontend/src/App.js`](https://github.com/AhmedBaari/wastemgmt/blob/bf0973df2d8ebf742560b4b3d72cdbe4fc0e1c80/frontend/src/App.js): Main component file for the frontend.
These files contain the core logic and structure of the application and are good starting points for understanding how the full stack web app is built.

- [`frontend/src/components/AddRecord.js`](https://github.com/AhmedBaari/wastemgmt/blob/bf0973df2d8ebf742560b4b3d72cdbe4fc0e1c80/frontend/src/components/AddRecord.js): Component for adding new waste records.
- [`frontend/src/components/RecordList.js`](https://github.com/AhmedBaari/wastemgmt/blob/bf0973df2d8ebf742560b4b3d72cdbe4fc0e1c80/frontend/src/components/RecordList.js): Component for displaying the list of waste records.


### Backend
- [`backend/index.js`](https://github.com/AhmedBaari/wastemgmt/blob/bf0973df2d8ebf742560b4b3d72cdbe4fc0e1c80/backend/index.js): Main server file for the backend. Contains the Schema, Model, and CRUD routes.