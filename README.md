# DevLinks Profile Manager

## Overview

This project allows users to create, manage, and customize their developer profile links using a responsive and intuitive interface. The project offers features such as link management, profile customization, drag-and-drop ordering, form validations, and profile previews.

## Features

### 1. Link Management

- **Create, Read, Update, Delete (CRUD) Links**: Users can easily manage their profile links.
- **Link Previews in Mobile Mockup**: Links are displayed in a mobile mockup for easy visualization.
- **Form Validations**: The form ensures that the URL is correctly formatted for the chosen platform.
- **Drag and Drop Reordering**: Users can reorder links by dragging and dropping them.

### 2. Profile Management

- **Profile Details**: Users can add and update their profile picture, first name, last name, and email.
- **Form Validations**: First and last names are required fields, and the form will validate this before saving.
- **Preview and Share Profile**: Users can preview their profile and copy the profile link to their clipboard.

### 3. Responsive Design

- **Optimal Layouts**: The interface adjusts according to the device's screen size, ensuring a seamless user experience on all devices.
- **Hover and Focus States**: Interactive elements have clear hover and focus states for better accessibility.

### 4. Bonus Features

- **Full-Stack Integration**: Save user details and links to a database, making the project a fully functional web application.
- **User Authentication**: Allow users to create accounts and log in to manage their profiles securely.

## Installation and Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/themystic1/devlinks-profile-manager.git
   cd devlinks-profile-manager
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Development Server:**

   ```bash
   npm run dev
   ```

4. **Build the Project:**

   ```bash
   npm run build
   ```

5. **Start the Production Server:**
   ```bash
   npm start
   ```

## Usage

1. **Add New Links:**

   - Click "Add new link" to create a new link entry.
   - Select the platform and enter the URL.
   - The link preview will be immediately visible in the mobile mockup.

2. **Reorder Links:**

   - Drag and drop links by clicking the two-line hamburger icon at the top left of each link entry.

3. **Update Profile Details:**

   - Add or update your profile picture, first name, last name, and email.
   - Only first name and last name are required.

4. **Preview and Share Profile:**
   - Click on "Preview" to see how your profile will look to others.
   - Copy the profile link to share it with others.

## Expected Behavior

### Links

- **Adding Links:** Clicking "Add new link" should add a new link entry with a platform selector and URL input.
- **Link Previews:** The platform's link should appear in the mobile mockup illustration immediately after adding.
- **Form Validation:** The form will check for the presence of a URL and ensure it matches the required pattern for the platform.
- **Drag and Drop:** Reorder links by dragging and dropping the hamburger icon.

### Profile Details

- **Required Fields:** Only first name and last name are mandatory. If a profile picture or email is missing, appropriate adjustments will be made in the mockup.
- **Image Upload:** You can use the Web API `FileReader` for handling image uploads client-side. For full-stack implementations, consider using Cloudinary or a similar service.

## Community and Support

Need help? [Join our community](https://www.frontendmentor.io/community) and ask questions in the **#help** channel.
