// Get references to the form and display area
var form = document.getElementById('resume-form');
var resumeDisplayElement = document.getElementById('resume-display');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
var generateResumeHTML = function (resumeData) { return "\n  <h2>Editable Resume</h2>\n  <h3>Personal Information</h3>\n  <p><b>Name:</b> <span contenteditable=\"true\">".concat(resumeData.name, "</span></p>\n  <p><b>Email:</b> <span contenteditable=\"true\">").concat(resumeData.email, "</span></p>\n  <p><b>Phone:</b> <span contenteditable=\"true\">").concat(resumeData.phone, "</span></p>\n  <h3>Education</h3>\n  <p contenteditable=\"true\">").concat(resumeData.education, "</p>\n  <h3>Experience</h3>\n  <p contenteditable=\"true\">").concat(resumeData.experience, "</p>\n  <h3>Skills</h3>\n  <p contenteditable=\"true\">").concat(resumeData.skills, "</p>\n"); };
form.addEventListener('submit', function (event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    var resumeData = { name: name, email: email, phone: phone, education: education, experience: experience, skills: skills };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally
    resumeDisplayElement.innerHTML = generateResumeHTML(resumeData);
    var shareableURL = "".concat(window.location.origin).concat(window.location.pathname, "?username=").concat(encodeURIComponent(username));
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            resumeDisplayElement.innerHTML = generateResumeHTML(resumeData);
            form.style.display = 'none';
            shareableLinkContainer.style.display = 'none';
        }
    }
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print();
});
