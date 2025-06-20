
const appointmentData = [
    {
        name: "Robert",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        disease: "Flu",
        appointmentTime: "2025-02-17 10:00 AM"
    },
    {
        name: "Sarah",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        disease: "Fever",
        appointmentTime: "2025-02-17 11:30 AM"
    },
    {
        name: "John",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        disease: "Cold",
        appointmentTime: "2025-02-17 01:00 PM"
    },
    {
        name: "Robert",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        disease: "Flu",
        appointmentTime: "2025-02-17 10:00 AM"
    },
    {
        name: "Sarah",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        disease: "Fever",
        appointmentTime: "2025-02-17 11:30 AM"
    },
    {
        name: "John",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        disease: "Cold",
        appointmentTime: "2025-02-17 01:00 PM"
    }
];


document.addEventListener('DOMContentLoaded', () => {
    const appointmentListContainer = document.getElementById('appointmentList');

    appointmentData.forEach(patient => {
        const patientDiv = document.createElement('div');
        patientDiv.classList.add('details');
        patientDiv.innerHTML = `
            <img src="${patient.image}" alt="${patient.name}" class="patient-img">
            <div class="patient-info">
                <span class="patient-name">${patient.name}</span>
                <section class="disease">${patient.disease}</section>
                <span class="appointment-time">${patient.appointmentTime}</span>
            </div>
        `;
        appointmentListContainer.appendChild(patientDiv);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const appointmentListContainer = document.getElementById('appointmentTable');

    appointmentData.forEach(patient => {
        const patientDiv = document.createElement('div');
        patientDiv.classList.add('details');
        patientDiv.innerHTML = `
            <img src="${patient.image}" alt="${patient.name}" class="patient-img">
            <div class="patient-info">
                <span class="patient-name">${patient.name}</span>
                <section class="disease">${patient.disease}</section>
                <span class="appointment-time">${patient.appointmentTime}</span>
            </div>
        `;
        appointmentListContainer.appendChild(patientDiv);
    });
});


function searchPatient() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const allPatients = document.querySelectorAll('.details');

    allPatients.forEach(patient => {
        const name = patient.querySelector('.patient-name').innerText.toLowerCase();
        const disease = patient.querySelector('.disease').innerText.toLowerCase();

        if (name.includes(searchQuery) || disease.includes(searchQuery)) {
            patient.style.display = 'flex';
        } else {
            patient.style.display = 'none';
        }
    });
}


//To approve patient appointments
function handleApproval() {
    const checked = document.querySelectorAll('input[name="patientIds"]:checked');
    if (checked.length === 0) {
        alert("Please select at least one patient to approve.");
        return false;
    }
    alert("Patient(s) approved successfully!");
    return true;
}



//Patient Details
document.addEventListener('DOMContentLoaded', () => {
    
    document.getElementById('addPatientBtn').addEventListener('click', async () => {
        const name = document.getElementById('name').value;
        if (!name) {
            alert('Name is required!');
            return;
        }

        const patientData = {
            name: name,
            gender: document.getElementById('gender').value,
            dob: document.getElementById('dob').value,
            contact: document.getElementById('contact').value,
            address: document.getElementById('address').value,
            insurance: document.getElementById('insurance').value,
            medicalHistory: document.getElementById('medicalHistory').value.split(',').map(s => s.trim()),
            currentMedications: document.getElementById('currentMedications').value.split(',').map(s => s.trim()),
            familyHistory: document.getElementById('familyHistory').value.split(',').map(s => s.trim()),
            emergencyContact: {
              name: document.getElementById('emergencyContactName').value,
              relation: document.getElementById('emergencyContactRelation').value,
              phone: document.getElementById('emergencyContactPhone').value
            },
            healthRecords: document.getElementById('healthRecords').value.split(',').map(s => s.trim())
        };
    
        try {
            const res = await fetch('/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(patientData)
            });
    
            const result = await res.json();
            if (res.ok) {
                alert('Patient added successfully!');
                location.reload(); // or append to DOM instead of reloading
            } else {
                alert('Error: ' + result.error);
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong!');
        }
    });
});
