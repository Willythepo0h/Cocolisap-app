# 📱 Cocolisap Detector (WIP)

A mobile application built with **React Native (Expo)** that utilizes **YOLOv5 instance segmentation** to detect *Cocolisap* infestations from captured or uploaded images. Designed for field deployment, the app includes **role-based access control**, **geolocation tagging**, and a **backend for data processing and visualization**.

This project includes both hardware and software components, tailored to meet the goals of supporting pest detection and monitoring in agricultural areas. It is developed in collaboration with the **Philippine Coconut Authority** (PCA) in Quezon City, which provided limited yet essential datasets for image annotation and model training.

All training data was created from scratch using annotation tools like **[Roboflow](https://roboflow.com/)**. Development was carried out using platforms such as **Google Colab** and **VS Code**.

> ⚠️ **Note:** This repository is **private** and currently under **active development**. It is not yet ready for public release.

---

## 🔍 Features

- 🔐 **Role-Based Access**
  - **Employees**: Full access (`Login`, `Camera`, `Dashboard`, `Detection History`)
  - **Non-employees**: Limited access (`No login required`, basic access to dashboard)

- 📷 **Image Capture**  
  Capture pest images using the `Expo Camera` module.

- 🌍 **Geolocation Tagging**  
  Automatically tags detections with:
  - `City`, `Region`, `Country`
  - `Latitude` / `Longitude`

- 🧠 **Cocolisap Detection**  
  Powered by a **YOLOv5** instance segmentation model served through a **FastAPI** backend.

- 📊 **Data Dashboard**  
  Visual analytics with:
  - Line graphs  
  - Pie charts  
  - Summary indicators

- 🗃️ **Detection History**  
  Scrollable table with logs of previous detections, includes:
  - Timestamp, image reference, result, location  
  - `No data` fallback for empty history

---

## 📂 Tools Used

- **React Native (Expo)**
- **YOLOv5** (Instance Segmentation)
- **FastAPI**
- **Roboflow** (Annotation)
- **Google Colab** (Model training)
- **VS Code** (Development)

---

## 🤝 Acknowledgment

Developed in collaboration with the **Philippine Coconut Authority (PCA)**, Quezon City, Philippines.

---

> 💡 *Let me know if you want to add installation steps or a contributor's guide when you're ready to go public.*
