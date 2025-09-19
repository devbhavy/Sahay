
<p  align="center">

<img  src="frontend/public/sahay-logo-light.png"  alt="Sahay Logo"  width="200"/>

</p>

  

<p  align="center">

<h1>Sahay</h1>

<h3>A web application for well-being support.</h3>

</p>

  

<p  align="center">

<img  src="https://img.shields.io/badge/License-No%20License-red.svg"  alt="License"/>

<img  src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"  alt="JavaScript"/>

<img  src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"  alt="React"/>

<img  src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"  alt="Node.js"/>

<img  src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"  alt="Vite"/>

<img  src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"  alt="MongoDB"/>

</p>

  

## Description

  

Sahay is a web application designed to provide well-being support through interactive features. It includes a robust backend API for data management and services, coupled with a dynamic frontend user interface offering various tools and resources. The application integrates chat functionalities and psychological assessment tools.

  

## ✨ Features

  

* **User Authentication:** Secure signup and login functionalities.

* **Chat Interface:** Interactive chat system for user engagement.

* **PHQ-9 Questionnaire:** Implementation of the Patient Health Questionnaire-9 for mental health assessment.

* **Gemini AI Integration:** Utilizes Google Gemini services for enhanced functionalities.

* **Dashboard & Profile Management:** Personalized user dashboard and profile settings.

* **Library Resources:** A dedicated page for informational resources.

  

## 🚀 Installation

  

To get Sahay up and running on your local machine, follow these steps:

  

1. **Clone the repository:**

```bash

git clone https://github.com/your-username/Sahay.git # Replace with the actual repository URL

cd Sahay

```

  

2. **Backend Setup:**

Navigate to the `backend` directory, install dependencies, and start the server.

```bash

cd backend

npm install

cp .env.example .env # Configure your environment variables in the .env file

npm start # Or consult package.json for the correct start script

```

  

3. **Frontend Setup:**

Open a new terminal, navigate to the `frontend` directory, install dependencies, and start the development server.

```bash

cd ../frontend

npm install

npm run dev # Or consult package.json for the correct development script

```

  

The frontend application should now be accessible in your browser, typically at `http://localhost:5173`.

  

## 🛠️ Tech Stack

  

* **Languages:** JavaScript, HTML, CSS

* **Backend:** Node.js, Express.js (inferred from structure), Mongoose (ODM for MongoDB)

* **Frontend:** React, Vite

* **Database:** MongoDB (inferred from Mongoose usage)

* **AI Services:** Google Gemini

  

## 📂 Project Structure

  

```

.

├── backend/

│ ├── .env.example

│ └── src/

│ ├── index.js

│ ├── middlewares/

│ │ └── middleware.js

│ ├── mongoose/

│ │ └── mongoose.js

│ ├── routes/

│ │ ├── chat.js

│ │ ├── index.js

│ │ ├── phq9.js

│ │ └── user.js

│ └── services/

│ └── gemini.services.js

└── frontend/

├── public/

│ ├── sahay-logo-light.png

│ └── vite.svg

├── src/

│ ├── App.css

│ ├── App.jsx

│ ├── assets/

│ │ ├── pexels-bri-schneiter-28802-346529.jpg

│ │ ├── react.svg

│ │ └── signup-image.jpg

│ ├── components/

│ │ ├── buttons/

│ │ │ └── signupButton.jsx

│ │ ├── chat/

│ │ │ └── chatDialog.jsx

│ │ └── navbars/

│ │ ├── defaultNavbar.jsx

│ │ └── landingNavbar.jsx

│ ├── index.css

│ ├── main.jsx

│ └── pages/

│ ├── LibraryPage.jsx

│ ├── dashboard.jsx

│ ├── landingPage.jsx

│ ├── loginPage.jsx

│ ├── phq9Page.jsx

│ ├── profile.jsx

│ └── signupPage.jsx

└── vite.config.js

```

  

## 📄 License

  

No license specified.