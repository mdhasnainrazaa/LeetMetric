document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");

    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");

    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");

    const cardStatsContainer = document.querySelector(".stats-cards");

    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }

        // This regex is for an email address; if you want to check for valid usernames without @ and domain, modify this regex
        const regex = /^[a-zA-Z0-9._%+-]+$/;
        const isMatching = regex.test(username);
        if (!isMatching) {
            alert("Invalid username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`; // Removed extra closing brace
        try {
            searchButton.textContent = "Searching...";
            searchButton.disabled= true;
            const response = await fetch(url); // Added space after 'await'
            if (!response.ok) {
                throw new Error("Unable to fetch the user details");
            }
            const data = await response.json();
            console.log("Logging data:", data);
        } catch (error) {
           statsContainer.innerHTML =`<p> No data found<p>`// Logging the error for debugging
        } finally {
            searchButton.textContent = "Search"; 
            searchButton.disabled= false;// Reset button text after the fetch
        }
    }

    searchButton.addEventListener('click', function() {
        const username = usernameInput.value; // Changed ariaValueMax to value to get input text
        console.log("Logging username:", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});
