# <p align="center">Where Is My Bus</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native"></a>
  <a href="#"><img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter"></a>
  <a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a>
  <a href="#"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"></a>
  <a href="#"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"></a>
  <a href="#"><img src="https://img.shields.io/badge/Google_Maps_API-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white" alt="Google Maps API"></a>
</p>

**Where Is My Bus** is a **real-time bus tracking system** designed for students and parents to monitor bus locations and estimated arrival times.  
It includes a **driver app** to update live bus locations and a **student/parent app** to view tracking, ensuring **safety and campus transportation efficiency**.  

---

## 📑 Table of Contents

1. [Key Features](#key-features)  
2. [Installation Guide](#installation-guide)  
3. [Usage](#usage)  
4. [Environment Variables](#environment-variables)  
5. [Project Structure](#project-structure)  
6. [Technologies Used](#technologies-used)  
7. [License](#license)  

---

## 🚀 Key Features

- 📍 **Live Bus Tracking** – Real-time GPS location sharing by drivers  
- 👨‍👩‍👧 **Student & Parent App** – Track bus position & ETA  
- 🚍 **Driver App** – Easy-to-use app for drivers to update location  
- 🔔 **Notifications** – Alerts for arrival or delays *(future)*  
- 📊 **Admin Dashboard** *(future)* – For schools to manage buses & routes  

---

## ⚙️ Installation Guide

1. **Clone the Repository**
```bash
git clone https://github.com/Rashisha14/WhereIsMyBus.git
cd WhereIsMyBus
```

2. **Backend Setup**
```
cd backend
npm install
npm start
```

3. **Driver App Setup**
```
cd driver-app
npm install
npm start
```

4. **Student/Parent App Setup**
```
cd student-parent-app
npm install
npm start
```

## 📱 Usage

1.**Driver App:**

Login and share live location with one tap.
Location auto-updates every few seconds.

2.**Student/Parent App:**

View bus on a map in real time.
Get ETA (estimated time of arrival).
Receive notifications (planned feature).

## 🔑 Environment Variables

**Create a .env file in your backend folder:**

```
PORT=5000
MONGO_URI=<your_mongodb_connection>
FIREBASE_API_KEY=<firebase_api_key>
GOOGLE_MAPS_API_KEY=<google_maps_api_key>
```

## 📂 Project Structure
```

.expo/
BackEnd/
BusTracker/
BusTrackerServer/
FrontEnd/
UserWebSite/
WhereIsMyBus/
WhereIsMyBusFrontEnd/

```


## 🛠 Technologies Used
<p align="left"> <a href="#"><img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native"></a> <a href="#"><img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter"></a> <a href="#"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"></a> <a href="#"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"></a> <a href="#"><img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"></a> <a href="#"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase"></a> <a href="#"><img src="https://img.shields.io/badge/Google_Maps_API-4285F4?style=for-the-badge&logo=googlemaps&logoColor=white" alt="Google Maps API"></a> </p>

Frontend (Apps): React Native / Flutter
Backend: Node.js, Express.js
Database: MongoDB / Firebase
Maps & Location Services: Google Maps API

## 📜 License

MIT License

<p align="left"> <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License"></a> </p>
