document.addEventListener("DOMContentLoaded", function () {
  // Get references to DOM elements
  var terminalContainer = document.getElementById("terminal");
  var terminalText = document.getElementById("terminal-text");
  var terminalHint = document.getElementById("terminal-hint");
  var videoBackground = document.getElementById("myVideo");
  var closeButton = document.getElementById("close-button");

  // Initial terminal text content
  var terminalTextContent = [
    "User: unknown",
    "IP: Loading...",
    "System: Loading...", // System information placeholder
    "Bio Loaded",
  ];
  var currentIndex = 0;
  var revealed = false; // whether we've already switched to the profile view

  // Pause background video until the boot sequence is done
  videoBackground.pause();

  // Function to type out terminal text
  function typeWriter() {
    var line =
      currentIndex === 0
        ? getAsciiArt()
        : terminalTextContent[currentIndex - 1];
    var i = 0;

    function typeChar() {
      if (i < line.length) {
        terminalText.textContent += line.charAt(i);
        i++;
        setTimeout(typeChar, 15);
      } else {
        terminalText.textContent += "\n";
        currentIndex++;
        if (currentIndex < terminalTextContent.length + 1) {
          typeWriter();
        } else {
          terminalHint.style.opacity = "1";
          addEventListeners(); // Add event listeners when typing is done
        }
      }
    }

    typeChar();
  }

  // Reveal the profile view inside the SAME window (no new element)
  function revealProfile() {
    if (revealed) return;
    revealed = true;

    terminalHint.style.opacity = "0"; // clear the inline opacity so it doesn't leak into the profile screen
    terminalContainer.classList.add("profile-mode");
    videoBackground.play();

    removeEventListeners(); // Enter/click no longer needed
  }

  // Add event listeners for both key press and click/touch events
  function addEventListeners() {
    document.addEventListener("keydown", handleKeyPress);
    terminalContainer.addEventListener("click", revealProfile); // For touch/click support
  }

  // Remove event listeners
  function removeEventListeners() {
    document.removeEventListener("keydown", handleKeyPress);
    terminalContainer.removeEventListener("click", revealProfile);
  }

  // Handle key press event
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      revealProfile();
    }
  }

  // Handle close button click event
  closeButton.addEventListener("click", function (event) {
    event.stopPropagation(); // don't also trigger the window click handler
    revealProfile();
  });

  // Fetch IP address using API
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      var ipAddress = data.ip;
      terminalTextContent[1] = "IP: " + ipAddress;
      typeWriter();
    })
    .catch((error) => {
      console.error("Error fetching IP address:", error);
      terminalTextContent[1] = "IP: Unable to fetch IP address";
      typeWriter();
    });

  // Extract system information from user agent
  var userAgent = navigator.userAgent;

  // Function to get the operating system name based on user agent
  function getOperatingSystem() {
    if (userAgent.match(/Windows/)) {
      return getWindowsVersion();
    } else if (userAgent.match(/Macintosh/)) {
      return getMacOSVersion();
    } else if (userAgent.match(/Linux/)) {
      return "Linux";
    } else if (userAgent.match(/Android/)) {
      return getAndroidVersion();
    } else if (userAgent.match(/iPhone|iPad|iPod/)) {
      return getiOSVersion();
    } else {
      return "Unknown";
    }
  }

  // Function to map Windows version numbers to their corresponding releases
  function getWindowsVersion() {
    var version = userAgent.match(/Windows NT ([\d.]+)/);
    if (version) {
      version = version[1];
      switch (version) {
        case "5.1":
          return "Windows XP";
        case "6.0":
          return "Windows Vista";
        case "6.1":
          return "Windows 7";
        case "6.2":
          return "Windows 8";
        case "6.3":
          return "Windows 8.1";
        case "10.0":
          return "Windows 10 / 11";
        default:
          return "Windows";
      }
    } else {
      return "Windows";
    }
  }

  // Function to get the macOS version
  function getMacOSVersion() {
    var version = userAgent.match(/Mac OS X ([\d_]+)/);
    if (version) {
      version = version[1].replace(/_/g, ".");
      return "macOS " + version;
    } else {
      return "macOS";
    }
  }

  // Function to get the Android version
  function getAndroidVersion() {
    var version = userAgent.match(/Android ([\d.]+)/);
    if (version) {
      return "Android " + version[1];
    } else {
      return "Android";
    }
  }

  // Function to get the iOS version
  function getiOSVersion() {
    var version = userAgent.match(/OS ([\d_]+)/);
    if (version) {
      version = version[1].replace(/_/g, ".");
      return "iOS " + version;
    } else {
      return "iOS";
    }
  }

  // Get the operating system information
  var operatingSystem = getOperatingSystem();
  terminalTextContent[2] = "System: " + operatingSystem;

  // Center the ASCII art within the terminal window
  terminalText.style.textAlign = "center";

  // Function to generate ASCII art
  function getAsciiArt() {
    return `
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⡿⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⢀⣠⣤⣤⣤⣀⣀⠈⠋⠉⣁⣠⣤⣤⣤⣀⡀⠀⠀
    ⠀⢠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀
    ⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠀
    ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀
    ⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣀
    ⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁⠀
    ⠀⠀⠀⠈⠙⢿⣿⣿⣿⠿⠟⠛⠻⠿⣿⣿⣿⡿⠋⠀⠀⠀
  `;
  }
});
