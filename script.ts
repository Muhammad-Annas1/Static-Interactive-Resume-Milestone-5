// Get references to the form and display area
const form = document.getElementById('resume-form') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;

const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;

const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;


const generateResumeHTML = (resumeData: {
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  skills: string;
}) => `
  <h2>Editable Resume</h2>
  <h3>Personal Information</h3>
  <p><b>Name:</b> <span contenteditable="true">${resumeData.name}</span></p>
  <p><b>Email:</b> <span contenteditable="true">${resumeData.email}</span></p>
  <p><b>Phone:</b> <span contenteditable="true">${resumeData.phone}</span></p>
  <h3>Education</h3>
  <p contenteditable="true">${resumeData.education}</p>
  <h3>Experience</h3>
  <p contenteditable="true">${resumeData.experience}</p>
  <h3>Skills</h3>
  <p contenteditable="true">${resumeData.skills}</p>
`;


form.addEventListener('submit', (event: Event) => {
  event.preventDefault(); 

  const username = (document.getElementById('username') as HTMLInputElement).value;
  const name = (document.getElementById('name') as HTMLInputElement).value;
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const phone = (document.getElementById('phone') as HTMLInputElement).value;
  const education = (document.getElementById('education') as HTMLTextAreaElement).value;
  const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
  const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

  const resumeData = { name, email, phone, education, experience, skills };
  localStorage.setItem(username, JSON.stringify(resumeData)); // Saving the data locally

  
  resumeDisplayElement.innerHTML = generateResumeHTML(resumeData);

  
  const shareableURL = `${window.location.origin}${window.location.pathname}?username=${encodeURIComponent(username)}`;

 
  shareableLinkContainer.style.display = 'block';
  shareableLinkElement.href = shareableURL;
  shareableLinkElement.textContent = shareableURL;
});

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get('username');
  if (username) {
 
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);
      resumeDisplayElement.innerHTML = generateResumeHTML(resumeData);

      
      form.style.display = 'none';
      shareableLinkContainer.style.display = 'none'; 
    }
  }
});

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
  window.print(); 
});
