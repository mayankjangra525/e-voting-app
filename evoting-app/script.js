// Detect page by URL
const page = window.location.pathname.split("/").pop();

if (page === "index.html") {
  // Admin Setup Page
  const numCandidatesInput = document.getElementById('numCandidates');
  const candidateContainer = document.getElementById('candidateContainer');
  const startBtn = document.getElementById('startElection');

  numCandidatesInput.addEventListener('input', () => {
    const num = parseInt(numCandidatesInput.value) || 0;
    candidateContainer.innerHTML = '';
    for (let i = 1; i <= num; i++) {
      const label = document.createElement('label');
      label.innerText = `Candidate ${i} Name:`;
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'candidate-input';
      input.required = true;
      label.appendChild(input);
      candidateContainer.appendChild(label);
    }
  });

  startBtn.addEventListener('click', () => {
    const numVoters = parseInt(document.getElementById('numVoters').value);
    const candidateInputs = document.querySelectorAll('.candidate-input');
    const candidateNames = Array.from(candidateInputs).map(input => input.value.trim());

    if (!numVoters || candidateNames.some(name => name === '')) {
      alert('Please enter all fields correctly.');
      return;
    }

    const uniqueNames = new Set(candidateNames);
    if (uniqueNames.size !== candidateNames.length) {
      alert('Error: Please enter a different name. Candidate names cannot be the same.');
      return;
    }

    localStorage.setItem('totalVoters', numVoters);
    localStorage.setItem('candidates', JSON.stringify(candidateNames));
    const votes = {};
    candidateNames.forEach(name => votes[name] = 0);
    localStorage.setItem('votes', JSON.stringify(votes));
    localStorage.setItem('votesCast', 0);

    window.location.href = 'vote.html';
  });
}

if (page === "vote.html") {
  const candidateListDiv = document.getElementById('candidateList');
  const voteForm = document.getElementById('voteForm');
  const errorMsg = document.getElementById('errorMsg');

  const candidates = JSON.parse(localStorage.getItem('candidates') || '[]');
  const totalVoters = parseInt(localStorage.getItem('totalVoters') || '0');

  if (!candidates.length || !totalVoters) {
    alert('Election setup not found. Redirecting to setup page.');
    window.location.href = 'index.html';
  }

  candidates.forEach((name) => {
    const label = document.createElement('label');
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'candidate';
    radio.value = name;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(name));
    candidateListDiv.appendChild(label);
  });

  voteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const selectedCandidate = document.querySelector('input[name="candidate"]:checked');
    if (!selectedCandidate) {
      errorMsg.innerText = 'Please select a candidate.';
      return;
    }
    errorMsg.innerText = '';

    const votes = JSON.parse(localStorage.getItem('votes'));
    votes[selectedCandidate.value]++;
    localStorage.setItem('votes', JSON.stringify(votes));

    let votesCast = parseInt(localStorage.getItem('votesCast') || '0');
    votesCast++;
    localStorage.setItem('votesCast', votesCast);

    if (votesCast >= totalVoters) {
      window.location.href = 'results.html';
    } else {
      document.querySelector('input[name="candidate"]:checked').checked = false;
      alert(`Vote recorded! ${totalVoters - votesCast} votes remaining.`);
    }
  });
}

if (page === "results.html") {
  const votes = JSON.parse(localStorage.getItem('votes') || '{}');
  const resultsList = document.getElementById('resultsList');
  const winnerMsg = document.getElementById('winnerMsg');

  if (!Object.keys(votes).length) {
    alert('No voting data found. Redirecting to setup page.');
    window.location.href = 'index.html';
  }

  for (const [candidate, count] of Object.entries(votes)) {
    const li = document.createElement('li');
    li.textContent = `${candidate}: ${count} votes`;
    resultsList.appendChild(li);
  }

  const maxVotes = Math.max(...Object.values(votes));
  const winners = Object.keys(votes).filter(name => votes[name] === maxVotes);

  if (winners.length === 1) {
    winnerMsg.textContent = `Congratulations! The winner is ${winners[0]}!`;
  } else {
    winnerMsg.textContent = `It's a tie between ${winners.join(' and ')}!`;
  }
}