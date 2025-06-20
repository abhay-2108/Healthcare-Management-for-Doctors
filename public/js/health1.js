// document.addEventListener("DOMContentLoaded", () => {
//     const container = document.querySelector(".cards");
//     const doctorMessageContainer = document.createElement("div");
//     doctorMessageContainer.classList.add("doctor-msg-container");
//     doctorMessageContainer.innerHTML = `
//         <h3 class="title">Doctor's Message</h3>
//         <input type="text" id="patient-name" placeholder="Patient Name" required>
//         <input type="text" id="patient-id" placeholder="Patient Mobile No.." required>
//         <textarea id="doctor-message" placeholder="Write a message..."></textarea>
//         <button class="btn btn-primary" id="send-doctor-message">Send</button>
//         <div class="doctor-messages"></div>
//     `;
//     document.body.appendChild(doctorMessageContainer);

//     if (!container) {
//         console.error("Error: .cards container not found. Make sure it exists in the HTML.");
//         return;
//     }

//     const patients = [
//         { name: "John", id: "123456789", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//         { name: "Alice", id: "987654321", message: "Dolores inventore blanditiis, vero facere soluta accusamus adipisci." },
//         { name: "Michael", id: "112233445", message: "Adipisci perspiciatis laboriosam ad rem nostrum, voluptatem enim minus corporis." },
//         { name: "Emma", id: "556677889", message: "Nesciunt ea iusto! Ex ea eaque optio praesentium labore." },
//         { name: "Daniel", id: "334455667", message: "Rem ad expedita temporibus, sed veritatis voluptate sequi quasi hic." },
//         { name: "Sophia", id: "778899001", message: "Amet totam dicta voluptatem illum deleniti." },
//         { name: "John", id: "123456789", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//         { name: "Alice", id: "987654321", message: "Dolores inventore blanditiis, vero facere soluta accusamus adipisci." },
//         { name: "Michael", id: "112233445", message: "Adipisci perspiciatis laboriosam ad rem nostrum, voluptatem enim minus corporis." },
//         { name: "Emma", id: "556677889", message: "Nesciunt ea iusto! Ex ea eaque optio praesentium labore." },
//         { name: "Daniel", id: "334455667", message: "Rem ad expedita temporibus, sed veritatis voluptate sequi quasi hic." },
//         { name: "Sophia", id: "778899001", message: "Amet totam dicta voluptatem illum deleniti." },
//         { name: "Sophia", id: "778899001", message: "Amet totam dicta voluptatem illum deleniti." },
//         { name: "John", id: "123456789", message: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
//         { name: "Alice", id: "987654321", message: "Dolores inventore blanditiis, vero facere soluta accusamus adipisci." },
//         { name: "Michael", id: "112233445", message: "Adipisci perspiciatis laboriosam ad rem nostrum, voluptatem enim minus corporis." },
//         { name: "Emma", id: "556677889", message: "Nesciunt ea iusto! Ex ea eaque optio praesentium labore." },
//         { name: "Daniel", id: "334455667", message: "Rem ad expedita temporibus, sed veritatis voluptate sequi quasi hic." },
//         { name: "Sophia", id: "778899001", message: "Amet totam dicta voluptatem illum deleniti." },
//     ];

//     patients.forEach(patient => {
//         const card = document.createElement("div");
//         card.classList.add("card");
        
//         card.innerHTML = `
//             <div class="info">
//                 <img src="images/doctor.webp" alt="">
//                 <div class="text">
//                     <p>${patient.name}</p>
//                     <section>${patient.mobile}</section>
//                 </div>
//             </div>
//             <div class="msg">
//                 <p>${patient.message}</p>
//             </div>
//             <div class="approve-reply">
//                 <div class="approve">
//                     <button class="btn btn-success">Approve</button>
//                     <button class="btn btn-danger">Reject</button>
//                 </div>
//             </div>
//             <div class="doctor-response" id="response-${patient.id}"></div>
//         `;
//         container.appendChild(card);
//     });

//     document.getElementById("send-doctor-message").addEventListener("click", () => {
//         const name = document.getElementById("patient-name").value.trim();
//         const id = document.getElementById("patient-id").value.trim();
//         const message = document.getElementById("doctor-message").value.trim();
        
//         if (name === "" || id === "" || message === "") {
//             alert("Please fill in all fields.");
//             return;
//         }

//         const responseContainer = document.getElementById(`response-${id}`);
//         if (responseContainer) {
//             responseContainer.innerHTML = `<p><strong>Doctor:</strong> ${message}</p>`;
//             document.getElementById("doctor-message").value = "";
//         } else {
//             alert("Patient not found.");
//         }
//     });
// });

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.querySelector(".cards");

    // Doctor message form container
    const doctorMessageContainer = document.createElement("div");
    doctorMessageContainer.classList.add("doctor-msg-container");
    doctorMessageContainer.innerHTML = `
        <h3 class="title">Doctor's Message</h3>
        <input type="text" id="patient-name" placeholder="Patient Name" required>
        <input type="text" id="patient-id" placeholder="Patient Mobile No.." required>
        <textarea id="doctor-message" placeholder="Write a message..."></textarea>
        <button class="btn btn-primary" id="send-doctor-message">Send</button>
        <div class="doctor-messages"></div>
    `;
    document.body.appendChild(doctorMessageContainer);

    if (!container) {
        console.error("Error: .cards container not found.");
        return;
    }

    // Fetch messages from DB
    const res = await fetch("/messages");
    const patients = await res.json();

    patients.forEach(patient => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-id", patient._id);

        card.innerHTML = `
            <div class="info">
                <img src="images/doctor.webp" alt="">
                <div class="text">
                    <p>${patient.name}</p>
                    <section>${patient.mobile}</section>  <!-- fixed -->
                </div>
            </div>
            <div class="msg">
                <p>${patient.message}</p>
            </div>
            <div class="approve-reply">
                <div class="approve">
                    <button class="btn btn-successs">Approve</button>
                    <button class="btn btn-dangers">Reject</button>
                </div>
            </div>
            <div class="doctor-response" id="response-${patient._id}"></div>
        `;
        container.appendChild(card);
    });

    // Handle approve/reject
    document.addEventListener("click", async (e) => {
        if (e.target.classList.contains("btn-successs") || e.target.classList.contains("btn-dangers")) {
            const card = e.target.closest(".card");
            const id = card.getAttribute("data-id");

            // Fix fetch URL and method to match backend routes
            const action = e.target.classList.contains("btn-successs") ? "approve" : "reject";

            try {
                const res = await fetch(`/messages/${id}/${action}`, { method: "POST" });  // changed from DELETE

                if (res.ok) {
                    card.remove();
                    alert(`Message ${action}d and removed from system.`);
                } else {
                    const data = await res.json();
                    alert(data.error || "Action failed.");
                }
            } catch (err) {
                console.error(err);
                alert("An error occurred.");
            }
        }
    });

    // Doctor message response
    document.getElementById("send-doctor-message").addEventListener("click", () => {
        const name = document.getElementById("patient-name").value.trim();
        const id = document.getElementById("patient-id").value.trim();
        const message = document.getElementById("doctor-message").value.trim();

        if (!name || !id || !message) {
            alert("Please fill in all fields.");
            return;
        }

        // Find corresponding message container by patient mobile number
        let responseEl = null;
        const cards = document.querySelectorAll(".card");
        cards.forEach(card => {
            const mobileSection = card.querySelector("section");
            if (mobileSection && mobileSection.textContent === id) {
                responseEl = document.getElementById(`response-${card.getAttribute("data-id")}`);
            }
        });

        if (responseEl) {
            responseEl.innerHTML = `<p><strong>Doctor:</strong> ${message}</p>`;
            document.getElementById("doctor-message").value = "";
        } else {
            alert("Patient not found.");
        }
    });
});
