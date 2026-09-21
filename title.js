// Array containing different titles to cycle through
var titles = [
  "@",
  "@D",
  "@Di",
  "@Dim",
  "@Dimi",
  "@Dimit",
  "@Dimitr",
  "@Dimitri",
  "@Dimitris",
  "@Dimitris G",
  "@Dimitris Gi",
  "@Dimitris Gio",
  "@Dimitris Giou",
  "@Dimitris Giouv",
  "@Dimitris Giouva",
  "@Dimitris Giouvan",
  "@Dimitris Giouvana",
  "@Dimitris Giouvanaki",
  "@Dimitris Giouvanakis",
];

// Function to change the title periodically
function changeTitle() {
  var index = 0; // Initialize index to start from the first title

  // Set interval to change the title every 1000 milliseconds (1 second)
  setInterval(function () {
    // Set the document title to the title at the current index
    document.title = titles[index];
    // Increment the index and use modulo operator to ensure it stays within the bounds of the array
    index = (index + 1) % titles.length;
  }, 1000); // Interval set to 1000 milliseconds (1 second)
}

// Call the function to start changing the title
changeTitle();
