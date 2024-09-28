function detectMoonPhase() {
  const dateInput = document.getElementById("date").value;
  if (!dateInput) {
    alert("Please enter a valid date.");
    return;
  }

  const date = new Date(dateInput);
  const moonPhase = getMoonPhase(date);

  displayMoonPhase(moonPhase);
}

// Moon phase calculation based on Lunisolar Calendar Algorithm
function getMoonPhase(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript months are 0-11
  const day = date.getDate();

  // Year correction for Jan and Feb
  if (month < 3) {
    year--;
    month += 12;
  }

  // Formula to calculate moon phase
  const K1 = Math.floor(365.25 * (year + 4716));
  const K2 = Math.floor(30.6 * (month + 1));
  const K3 = Math.floor(Math.floor((year / 100) + 49) * 0.75) - 38;
  const JD = K1 + K2 + day - 1524.5; // Julian date
  const phase = ((JD + 4.867) / 29.53059) % 1; // Moon phase percentage

  return Math.round(phase * 100); // Return phase in percentage (0-100%)
}

// Display moon phase description and image
function displayMoonPhase(phase) {
  const phaseText = document.getElementById("phaseText");
  const moonImage = document.getElementById("moonImage");
  
  if (phase >= 0 && phase <= 5) {
    phaseText.innerText = "New Moon";
    moonImage.src = "assets/new-moon.wepb";
  } else if (phase > 5 && phase <= 25) {
    phaseText.innerText = "Waxing Crescent";
    moonImage.src = "assets/waxing-crescent.webp";
  } else if (phase > 25 && phase <= 45) {
    phaseText.innerText = "First Quarter";
    moonImage.src = "assets/first-quarter.webp";
  } else if (phase > 45 && phase <= 65) {
    phaseText.innerText = "Waxing Gibbous";
    moonImage.src = "assets/waxing-gibbous.webp";
  } else if (phase > 65 && phase <= 85) {
    phaseText.innerText = "Full Moon";
    moonImage.src = "assets/full.webp";
  } else if (phase > 85 && phase <= 95) {
    phaseText.innerText = "Waning Gibbous";
    moonImage.src = "assets/waning-gibbous.webp";
  } else if (phase > 95 && phase <= 115) {
    phaseText.innerText = "Last Quarter";
    moonImage.src = "assets/third-quarter.webp";
  } else {
    phaseText.innerText = "Waning Crescent";
    moonImage.src = "assets/waning_crescent.webp";
  }

  moonImage.style.display = 'block'; // Show the image
}
