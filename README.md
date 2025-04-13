# 📱 Cocolisap Detector (WIP)

A mobile app built with **React Native (Expo)** that uses **instance segmentation** to detect *Cocolisap* infestations from captured images. This tool supports field use with role-based access, geolocation tagging, and backend integration for data processing and visualization.

> ⚠️ **Note:** This repository is private and under active development. Not yet ready for public release.

---

## 🔍 Core Features

- 🔐 **Role-Based Access**  
  - Employees: full access (login, camera, dashboard, history)  
  - Non-employees: limited access (basic detection only, no login required)

- 📷 **Image Capture with Expo Camera**
- 🌍 **Geolocation Tagging** (city, region, lat/lon, barangay, postal code)
- 🧠 **Cocolisap Detection** via FastAPI + Instance Segmentation
- 📊 **Data Dashboard** with line and pie charts
- 🗃️ **Detection History Table** (scrollable + “No Data” fallback)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cocolisap-detector.git
cd cocolisap-detector
