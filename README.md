

# 🩺 Healthcare Management System for Doctors

The **Healthcare Management System** is a full-featured web application designed to simplify hospital operations for doctors, patients, and administrators. With secure authentication, modular architecture, and an AI-powered chatbot (Medico), the system streamlines medical data management, appointment scheduling, document storage, messaging, and financial tracking.

Built using **Node.js**, **Express.js**, **EJS**, and a well-organized MVC folder structure, this project is ideal for scalable deployment in clinical environments or startups.

![image](https://github.com/user-attachments/assets/1b09cba8-5b2b-4e20-82fb-7f77fbd9a3e7)


![image](https://github.com/user-attachments/assets/3eedc7aa-ee82-4838-95c9-208e40719345)

![image](https://github.com/user-attachments/assets/fd7192c5-1d2b-4b8f-9bc2-6eebd7a91ffd)

![image](https://github.com/user-attachments/assets/7ad852d8-27bd-4602-a3e5-95c228d55eba)

![image](https://github.com/user-attachments/assets/2f41eb3f-fe51-4b11-98cb-c5f271bba5b7)

![image](https://github.com/user-attachments/assets/c6aeaee3-0935-472f-b5d6-ff543d87d9d3)

## 📁 Folder Structure

```
Doctors Website/
├── models/             # MongoDB schemas (patients, doctors, appointments, etc.)
├── routes/             # Express routes for APIs
├── views/              # EJS templates for frontend
├── public/             # Static assets (CSS, JS, images)
├── .env                # Environment variables
├── .gitignore          # Ignored files/folders
├── app.js              # Entry point of the app
├── Dockerfile          # Containerization support
├── package-lock.json
```



## 🚀 Features

* 📅 **Appointment Management**

  * Schedule, view, update, or cancel appointments
  * Real-time doctor availability

* 👨‍⚕️ **Doctor Management**

  * Store doctor profiles, specialization, contact info
  * Doctor visit history

* 🧾 **Medical Documents**

  * Upload and manage patient prescriptions, reports
  * Secure file storage via document routes

* 💊 **Medication Tracker**

  * Manage prescriptions and dosage schedules

* 💬 **Message System**

  * Secure internal communication between doctors and patients

* 💳 **Financial Management**

  * Track invoices, payments, and billing details

* 🧠 **AI Chatbot (Medico)**

  * Google API–powered conversational assistant
  * Emergency instructions, appointment support, financial help

* 🛠️ **Admin Settings**

  * User profile updates, account management

* 📈 **Search & Filter**

  * Easily navigate records by name, date, or ID

* 📦 **Docker Support**

  * Containerize your app with a ready-to-use `Dockerfile`

* 💡 **Error Handling**

  * Custom 404 and 500 pages for better user experience

## 🖥️ Technologies Used

* **Node.js** – JavaScript runtime
* **Express.js** – Backend web framework
* **EJS** – Embedded JavaScript templating engine
* **MongoDB** – NoSQL database (via Mongoose)
* **Google Cloud API** – AI Chatbot integration
* **CSS / Bootstrap** – UI styling
* **Docker** – Deployment containerization


## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/abhay-2108/Healthcare-Management-for-Doctors
   cd Healthcare-Management-for-Doctors
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**
   Create a `.env` file in the root with the following:

   ```env
   PORT=3000
   MONGO_URI=your_mongo_connection_string
   SESSION_SECRET=your_secret_key
   GOOGLE_API_KEY=your_google_api_key
   ```

4. **Start the server**

   ```bash
   node app.js
   ```

5. **Access the app**
   Open your browser at: [http://localhost:3000](http://localhost:3000)

---



## 📄 License

This project is licensed under the [MIT License](LICENSE).

