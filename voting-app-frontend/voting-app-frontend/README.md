# Voting Application Frontend

This is the frontend for the Voting Application, which interacts with the backend to provide users with the ability to vote, view candidates, and manage their profiles.

## Project Structure

```
voting-app-frontend
├── public
│   └── index.html          # Main HTML file
├── src
│   ├── components          # Reusable components
│   │   ├── CandidateList.jsx  # Displays list of candidates
│   │   ├── VoteForm.jsx       # Form to cast votes
│   │   └── UserProfile.jsx     # Displays user profile
│   ├── pages               # Page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Login.jsx       # Login page
│   │   ├── Signup.jsx      # Signup page
│   │   └── AdminPanel.jsx  # Admin management panel
│   ├── App.jsx             # Main application component
│   ├── api                 # API calls
│   │   └── index.js        # API functions
│   ├── styles              # CSS styles
│   │   └── main.css        # Main stylesheet
│   └── utils               # Utility functions
│       └── auth.js         # Authentication utilities
├── package.json            # Project metadata and dependencies
└── .gitignore              # Files to ignore in Git
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd voting-app-frontend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

4. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage

- **Signup:** New users can create an account using the Signup page.
- **Login:** Existing users can log in to their accounts.
- **Vote:** Users can view the list of candidates and cast their votes.
- **Profile:** Users can view and manage their profile information.
- **Admin Panel:** Admin users can manage candidates and view voting statistics.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.