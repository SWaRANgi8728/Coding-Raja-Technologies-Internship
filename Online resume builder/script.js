// Counter variables
let educationCount = 1;
let workExperienceCount = 1;
let skillCount=0;

function addEducationField() {
    educationCount++;
    
    // Create new textarea for input
    var newTextArea = document.createElement('textarea');
    newTextArea.className = 'form-control';
    newTextArea.rows = 3;
    newTextArea.name = 'education';
    newTextArea.id = 'education' + educationCount;
    newTextArea.placeholder = 'Education Details';
    
    // Create new div for textarea
    var newDiv = document.createElement('div');
    newDiv.className = 'mb-3';
    newDiv.appendChild(newTextArea);
    
    //append new div to educationfield
    document.getElementById('educationFields').appendChild(newDiv);
}

function addWorkExpField() {
    workExperienceCount++;
    
    // Create new textarea for input
    var newTextArea = document.createElement('textarea');
    newTextArea.className = 'form-control';
    newTextArea.rows = 3;
    newTextArea.name = 'workexperience';
    newTextArea.id = 'workexperience' + workExperienceCount;
    newTextArea.placeholder = 'Work Experience Details';
    
    // Create new div for textarea
    var newDiv = document.createElement('div');
    newDiv.className = 'mb-3';
    newDiv.appendChild(newTextArea);
    
    // append new div to workExperienceFields
    document.getElementById('workExperienceFields').appendChild(newDiv);
}

function addSkill() {
    skillCount++; 

    var newInput = document.createElement('input'); // Create new input element
    newInput.className = 'form-control';
    newInput.name = 'skill';
    newInput.id = 'skill' + skillCount;
    newInput.placeholder = 'Enter Skill';

    var newDiv = document.createElement('div');
    newDiv.className = 'mb-3';
    newDiv.appendChild(newInput);

    document.getElementById('skillSet').appendChild(newDiv); // append to skillSet
}



function previewResume() {
    // Get values from form fields
    var fullName = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var address = document.getElementById('address').value;
    var objective = document.getElementById('objective').value;
    var projects = document.getElementById('project').value;
    var awards=document.getElementById('award').value;
    var declaration=document.getElementById('declaration').value;
    
   //education entries
   const educationEntries = [];
   for (let i = 1; i <= educationCount; i++) {
       const education = document.getElementById('education' + i);
       if (education) {
           const value=education.value.trim();
         if(value)
           educationEntries.push(value.replace(/\n/g, '<br>'));
       }
   }

//work experience entries
const workExperienceEntries = [];
for (let i = 1; i <= workExperienceCount; i++) {
    const workExperience = document.getElementById('workexperience' + i);
    if (workExperience) {
        const value=workExperience.value.trim();
     if(value)   
        workExperienceEntries.push(value.replace(/\n/g, '<br>'));
    }
}

//skill entries
const skillEntries = [];
for (let i = 1; i <= skillCount; i++) {
    const skill = document.getElementById('skill' + i);
    if (skill) {
       const value = skill.value.trim();
       if(value)
    
        skillEntries.push(value.replace(/\n/g, '<br>'));
    }
}

// Construct the HTML for preview
    var previewContent = `
        <div class="container py-2 shadow">
            <div class="row">
                <div class="col-lg-12  text-center">
                    <div class="container p-2">
                        <p><h3 class="text-center" style="font-weight: 970;">${fullName}</h3></p>
                        <p>${phone}</p>
                        <p>${email}</p>
                        <p>${address}</p>
                        <hr>
                    </div>
                </div>
            </div>    
            <div class="row">    
                <div class="col-lg-12 ">
                     ${objective ? `
                        <h3 class="bg-dark text-white p-2 rounded-bottom text-start">Objective</h3>
                        <p class="p-2">
                            <ul class="text-start">
                                ${objective.split('\n').map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </p>
                        <hr>
                    ` : ''}
                    <!--Education-->
                    <h3 class="bg-dark text-white p-2 rounded-bottom text-start">Education</h3>
                        <p class="p-0">                   
                            <ul class="text-start"> 
                                ${educationEntries.map(entry => `<li>${entry}</li>`).join('')}
                            </ul>
                        </p>
                        <hr>
                    <!--projects-->
                    ${projects ? `
                        <h3 class="bg-dark text-white p-2 rounded-bottom text-start">Projects</h3>
                        <p class="p-2">
                            <ul class="text-start">
                                ${projects.split('\n').map(item => `<li>${item.trim()}</li>`).join('')}
                            </ul>  
                        </p>
                        <hr>
                    ` : ''}
                   <!--work experience-->
                    <h3 class="bg-dark text-white p-2 rounded-bottom text-start">Work Experience</h3>
                        <p class="p-0">
                            <ul class="text-start">
                                ${workExperienceEntries.map(entry => `<li>${entry}</li>`).join('')}
                            </ul>
                        </p>
                        <hr>
                    <!--skills-->
                    <h3 class="bg-dark text-white p-2 rounded-bottom text-start">Skills</h3>
                        <p class="p-0">
                            <ul class="text-start">
                                ${skillEntries.map(entry => `<li>${entry}</li>`).join('')}
                            </ul>
                        </p>
                        <hr>
                    <!--Achievement & Awards-->
                    ${awards ? `
                        <h3 class="bg-dark text-white p-2 rounded-bottom text-start">Acievement & Awards</h3>
                        <p class="p-2">
                            <ul class="text-start">
                                ${awards.split('\n').map(item => `<li>${item.trim()}</li>`).join('')}
                            </ul>  
                        </p>
                        <hr>
                    ` : ''}
                        <!-Declaration-->
                        ${declaration ?`
                        <h3 class="bg-dark text-white p-2 rounded-bottom text-start">Declaration</h3>
                        <p class="p-0">
                           <ul class="text-start">
                                ${declaration.split('\n').map(item => `<li>${item.trim()}</li>`).join('')}
                           </ul>
                        </p>
                        `:''}
                </div>
            </div>
        </div>
    `;

           // Update the preview section
           document.getElementById('resumePreview').innerHTML = previewContent;


            // Show the download btns after preview
            document.getElementById('downloadPdfBtn').style.display = 'inline-block';
           
 }

 document.getElementById('downloadPdfBtn').addEventListener('click', async function() {
    const filename = 'resume.pdf';

    try {
        const element = document.getElementById('resumePreview'); // Get the content to be converted to PDF

        const opt = {
            margin: 0.5,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Convert the content to PDF and save it
        await html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error('Error:', error.message);
    }
});
       
 


















/*document.addEventListener('DOMContentLoaded', function() {
    const resumeForm = document.getElementById('resumeForm');
    const previewContent = document.getElementById('previewContent');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const downloadWordBtn = document.getElementById('downloadWordBtn');

    resumeForm.addEventListener('submit', function(event) {
        event.preventDefault();
       
        // Build resume preview HTML
        let html = `
            <p><strong>Name:</strong> ${resumeForm.fullName.value}</p>
            <p><strong>Email:</strong> ${resumeForm.email.value}</p>
            <p><strong>Phone:</strong> ${resumeForm.phone.value}</p>
            <p><strong>Address:</strong> ${resumeForm.address.value}</p>
            <h3>Education</h3>
             <p><strong>Education:</strong> ${resumeForm.education.value}</p>
           
            <h3>Work Experience</h3>
             <p><strong>Work Experience:</strong> ${resumeForm.workexperience.value}</p>
           
            <h3>Skills</h3>
             <p><strong>Skills:</strong> ${resumeForm.skills.value}</p>
        `;

        previewContent.innerHTML = html;
    });

    

    downloadPdfBtn.addEventListener('click', function() {
        // Code to generate and download PDF
        // Example: Use libraries like jsPDF or pdfmake
        alert('Downloading PDF...');
    });

    downloadWordBtn.addEventListener('click', function() {
        // Code to generate and download Word document
        // Example: Use Blob and FileSaver.js for client-side file download
        alert('Downloading Word document...');
    });
}); */




