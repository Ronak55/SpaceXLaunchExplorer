# SpaceX Launch Explorer 🚀

A React Native app built with **Expo** that displays a map with the user’s **current location** and allows opening the location in the native Maps application (Google Maps on Android, Apple Maps on iOS).

---

## 📍 Map Implementation and Libraries Used

- **[expo-maps](https://docs.expo.dev/versions/latest/sdk/maps/)**  
  Used to render the map and display a marker at the user’s current location.  

- **[expo-location](https://docs.expo.dev/versions/latest/sdk/location/)**  
  Handles requesting and fetching the device’s current latitude and longitude.  

- **[react-navigation](https://reactnavigation.org/)**  
  Provides navigation setup for the app screens.  

### Features
- Fetches the **user’s current GPS location**.  
- Centers the map on the user’s location.  
- Places a marker on the map at the current location.  
- **Open in Maps** button launches the native Maps app with the coordinates.  

---

## 🔑 Permission Flows and Handling

- On app launch, the app requests **foreground location permission** using `expo-location`.  
- If **granted**, the app fetches the location and displays it on the map.  
- If **denied**, a fallback message is shown and map functionality is disabled gracefully.  

---

## 📸 App Screenshots

![WhatsApp Image 2025-08-17 at 14 17 34 (1)](https://github.com/user-attachments/assets/4603e763-5a7f-4e85-86de-af39873efbdc)
![WhatsApp Image 2025-08-17 at 14 17 34](https://github.com/user-attachments/assets/d8a1ccaa-8692-464b-9382-ebfa4a2fa4b0)
![WhatsApp Image 2025-08-17 at 14 17 35 (1)](https://github.com/user-attachments/assets/e91b8869-62b1-4a7a-b80b-887388863fb8)
![WhatsApp Image 2025-08-17 at 14 17 35 (2)](https://github.com/user-attachments/assets/8ab178e0-3ed4-442d-a7ea-f6eb9b51581f)
![WhatsApp Image 2025-08-17 at 14 17 35](https://github.com/user-attachments/assets/84e9bd15-5bc6-4dd3-91e8-558bd0a354be)

---

## 🚀 Getting Started

### Prerequisites  
- Node.js installed (>= 18.x recommended)  
- Expo Go app installed on your device (iOS/Android)  

### Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/Ronak55/SpaceXLaunchExplorer.git
   cd SpaceXLaunchExplorer
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Run the project:
   ```bash
   npx expo start
   ```
4. Scan the QR code in the terminal using the Expo Go app on your phone.
