// Import jsdom
const { JSDOM } = require('jsdom');

// Create a new JSDOM instance
const dom = new JSDOM(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Form Submission</title>
    </head>
    <body>
        <form id="contactForm" action="/submit" method="post">
            <!-- form elements -->
        </form>
        <div id="responseMessage"></div>
        <script src="a.js"></script>
    </body>
    </html>
`);

const document = dom.window.document;
const window = dom.window;

// Add event listener to the form
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new window.FormData(form);
    const responseMessage = document.getElementById("responseMessage");

    // Dynamically import node-fetch
    const fetch = (await import('node-fetch')).default;

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Network response was not ok.");
        }
    })
    .then(data => {
        if (data.success) {
            responseMessage.textContent = "Message has been successfully sent.";
            responseMessage.classList.add("text-green-500");
            responseMessage.classList.remove("text-red-500");
        } else {
            responseMessage.textContent = "Message was not sent successfully.";
            responseMessage.classList.add("text-red-500");
            responseMessage.classList.remove("text-green-500");
        }
    })
    .catch(error => {
        responseMessage.textContent = "Message was not sent successfully.";
        responseMessage.classList.add("text-red-500");
        responseMessage.classList.remove("text-green-500");
    });
});

// Simulate form submission
const event = new window.Event('submit', {
    bubbles: true,
    cancelable: true
});

document.getElementById("contactForm").dispatchEvent(event);


