// Skill data - required skills for each role (hardcoded)
const requiredSkills = {
    frontend: ['HTML', 'CSS', 'JavaScript', 'React'],
    backend: ['Node.js', 'API', 'Database']
};

// Get DOM elements
const form = document.getElementById('skillForm');
const resultsDiv = document.getElementById('results');
const selectedRoleH2 = document.getElementById('selectedRole');
const matchedSkillsUl = document.getElementById('matchedSkills');
const missingSkillsUl = document.getElementById('missingSkills');
const resetBtn = document.getElementById('resetBtn');

// Function to analyze skills
function analyzeSkills() {
    // Get selected role
    const roleSelect = document.getElementById('role');
    const role = roleSelect.value;

    // Get selected skills
    const skillCheckboxes = document.querySelectorAll('input[name="skills"]:checked');
    const userSkills = Array.from(skillCheckboxes).map(cb => cb.value);

    // Validation: Check if role is selected
    if (!role) {
        alert('Please select a job role.');
        return;
    }

    // Validation: Check if at least one skill is selected
    if (userSkills.length === 0) {
        alert('Please select at least one skill.');
        return;
    }

    // Get required skills for the selected role
    const roleSkills = requiredSkills[role];

    // Find matched skills (skills user has that are required)
    const matchedSkills = userSkills.filter(skill => roleSkills.includes(skill));

    // Find missing skills (required skills user doesn't have)
    const missingSkills = roleSkills.filter(skill => !userSkills.includes(skill));

    // Display results
    selectedRoleH2.textContent = 'Selected Role: ' + (role === 'frontend' ? 'Frontend' : 'Backend') + ' Developer';

    // Clear previous results
    matchedSkillsUl.innerHTML = '';
    missingSkillsUl.innerHTML = '';

    // Display matched skills with green color
    if (matchedSkills.length > 0) {
        matchedSkills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            li.classList.add('matched'); // Add class for styling
            matchedSkillsUl.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No matched skills.';
        matchedSkillsUl.appendChild(li);
    }

    // Display missing skills with red color
    if (missingSkills.length > 0) {
        missingSkills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            li.classList.add('missing'); // Add class for styling
            missingSkillsUl.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No missing skills. Great job!';
        missingSkillsUl.appendChild(li);
    }

    // Hide form and show results
    form.style.display = 'none';
    resultsDiv.style.display = 'block';
}

// Function to reset the form
function resetForm() {
    // Reset the form
    form.reset();

    // Hide results and show form
    resultsDiv.style.display = 'none';
    form.style.display = 'block';
}

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    analyzeSkills(); // Call the analyze function
});

// Event listener for reset button
resetBtn.addEventListener('click', resetForm);