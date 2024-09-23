# Open Source Google Forms Alternative

An open-source alternative to Google Forms that allows users to create custom forms, collect responses, and store them efficiently. This project currently supports Google authentication and aims to provide a user-friendly experience for building and managing forms.

## Features
- Create forms with custom questions
- Authenticate users using Google OAuth
- Store responses in Google Sheets or download them as Excel files

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- NPM
- Google OAuth 2.0 credentials (Client ID and Secret)

### Installation

1. **Clone the repository locally**:
   ```bash
   git clone https://github.com/The-Saras/Openforms

2. **CD to root Directory**:
   ```bash
   cd openforms
3. **Install Packages**:
   ```bash
   npm install

4. **Create a .env file: In the root directory of the project, create a .env file. Add the following environment variables with your Google OAuth credentials:**:
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

5. **Run The Project**:
   ```bash
   npm run dev


