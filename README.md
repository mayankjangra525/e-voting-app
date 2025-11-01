🗳️ E-Voting Web App

A simple and interactive E-Voting System built using HTML, CSS, and JavaScript.
It allows an admin to create an election, voters to cast votes, and finally view real-time results.
The system uses localStorage for saving election data — no backend or database required!

🚀 Features

🧑‍💼 Admin Setup Page (index.html)

Set the number of candidates and voters.

Dynamically add candidate names.

Validates for empty or duplicate candidate names.

Saves setup data in browser’s local storage.

🗳️ Voting Page (vote.html)

Displays candidate list from admin setup.

Each voter can select one candidate.

Shows remaining votes after each submission.

Automatically redirects to the results page once all votes are cast.

🏆 Results Page (results.html)

Displays total votes for each candidate.

Announces the winner or shows a tie if applicable.

📁 Project Structure
e-voting-app/
│
├── index.html        # Election setup (Admin page)
├── vote.html         # Voting page
├── results.html      # Results page
├── style.css         # Styling for all pages
└── script.js         # Core logic and functionality

⚙️ How It Works

Setup Phase

Open index.html.

Enter the number of candidates and voters.

Input candidate names.

Click Start Election → redirects to the voting page.

Voting Phase

Each voter selects one candidate.

Votes are stored in localStorage.

After all voters have voted → redirects to the results page.

Result Phase

Opens results.html.

Shows each candidate’s vote count.

Declares the winner (or tie).

🧠 Technologies Used

HTML5 – Structure of the app

CSS3 – Styling and layout

JavaScript (Vanilla) – Logic and interactivity

LocalStorage – Data persistence between pages

🔒 Validation & Error Handling

Checks if all fields are filled correctly.

Prevents duplicate candidate names.

Prevents voting without selection.

Redirects to setup if setup data is missing.

📸 Screens (Optional)

You can include screenshots later like:

Admin Setup Page

Voting Page

Results Page

💡 Future Improvements

Add a login system for voters.

Prevent multiple votes by the same user.

Connect to a real database (Firebase / MongoDB).

Add a timer or election closing feature.

👨‍💻 Developer

Created by: Mayank Jangra
Tech Stack: HTML | CSS | JavaScript


