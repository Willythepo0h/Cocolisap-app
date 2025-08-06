# 📱🔬 Cocolisap Detector (WIP)

**Cocolisap Detector** is a two-part system for detecting *Cocolisap* infestations in the field using **AI-powered instance segmentation (YOLOv5)**. It consists of:

1. **A mobile application** built with **React Native (Expo)** that captures and uploads images, processes them via a cloud backend, and provides a visual dashboard and geolocation tagging.
2. **A hardware prototype** inspired by a **digital microscope**, which runs the same detection software offline for use in remote areas without internet connectivity.

The system is developed in collaboration with the **Philippine Coconut Authority (PCA)**, who provided sample datasets for training and annotation.

> ⚠️ **Note:** This repository is **private** and under **active development**. It is not yet ready for public release.

---

## 📚 Table of Contents

- [🧠 Project Overview](#-project-overview)
- [📱 Mobile Application](#-mobile-application)
- [🔧 Hardware Prototype](#-hardware-prototype)
- [🔍 Core Features](#-core-features)
- [🛠️ Tools & Technologies](#-tools--technologies)
- [🤝 Acknowledgment](#-acknowledgment)

---

## 🧠 Project Overview

The **Cocolisap Detector** project aims to support early detection of *Cocolisap* pests in coconut plantations. It provides tools for both field agents with internet access (via mobile app) and those operating in remote areas (via offline prototype).

- All detection is powered by a custom-trained **YOLOv5 instance segmentation** model.
- Training data was annotated from scratch using **[Roboflow](https://roboflow.com/)**.
- Development tools include **Google Colab**, **FastAPI**, and **VS Code**.

---

## 📱 Mobile Application

A feature-rich mobile app built using **React Native (Expo)** designed for field workers and researchers. It includes:

- Image capture using the device camera
- Upload to a **FastAPI** backend for AI-based segmentation
- Real-time **geolocation tagging**
- Access to a **data dashboard**, **detection history**, and **role-based access control**

> 🛜 **Note:** Requires internet connection for full functionality.

---

## 🔧 Hardware Prototype

A standalone hardware version of the app, designed to **mimic a microscope**. Built for field use where internet connectivity is unreliable or unavailable.

### Key Differences:
- **Offline** detection (no internet required)
- Same YOLOv5-based segmentation
- No dashboard, login, or history features
- Captures and processes images locally
- Ideal for quick detection in remote locations

### 📷 Prototype Images

| Prototype (Front View) | Prototype (Top View) |
|------------------------|----------------------|
| ![Prototype Front](Prototype_Images/Front_Prototype.png) | ![Prototype Top](Prototype_Images/Top_Prototype.png) |
<br></br>
| Prototype (Lateral View) | Prototype (Underside View) |
|------------------------|----------------------|
| ![Prototype Front](Prototype_Images/Front_Prototype.png) | ![Prototype Top](Prototype_Images/Top_Prototype.png) |

---

## 🔍 Core Features

- 🔐 **Role-Based Access**
  - **Employees**: Full access (`Login`, `Camera`, `Dashboard`, `Detection History`)
  - **Non-employees**: Limited access (`No login required`, basic dashboard view)

- 📷 **Image Capture**  
  Using the `Expo Camera` module

- 🌍 **Geolocation Tagging**  
  Captures `City`, `Region`, `Country`, and GPS coordinates

- 🧠 **Cocolisap Detection**  
  Model served via `FastAPI` backend using `YOLOv5` (instance segmentation)

- 📊 **Dashboard Analytics**  
  Line and pie charts summarizing detections

- 🗃️ **Detection History**  
  Scrollable table with timestamp, results, and fallback for no data

---

## 🛠️ Tools & Technologies

- **React Native (Expo)**
- **YOLOv5** (Instance Segmentation)
- **FastAPI** (Python backend)
- **Roboflow** (Image Annotation)
- **Google Colab** (Model training)
- **Visual Studio Code** (Development)

---

## 🤝 Acknowledgment

This project is developed in partnership with the **Philippine Coconut Authority (PCA)**, Quezon City, Philippines, who provided annotated images and domain knowledge.

---
