# 📱 Cocolisap Detector (WIP)

A mobile app built with **React Native (Expo)** that uses YOLOv5 **instance segmentation** to detect *Cocolisap* infestations from captured or uploaded images. This tool supports field use with role-based access, geolocation tagging, and backend integration for data processing and visualization.

> ⚠️ **Note:** This repository is private and under active development. Not yet ready for public release.

---

## 🔍 Core Features

- 🔐 **Role-Based Access**  
  - Employees: full access (login, camera, dashboard, history)  
  - Non-employees: limited access (**No** login required, basic access to dashboard)

- 📷 **Image Capture with Expo Camera**
- 🌍 **Geolocation Tagging** (city, region, country, lat/lon)
- 🧠 **Cocolisap Detection** via FastAPI + Instance Segmentation
- 📊 **Data Dashboard** with line, pie charts, etc.
- 🗃️ **Detection History Table** (scrollable + “No Data” fallback)

---
