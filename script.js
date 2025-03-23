const CORRECT_PASSWORD = "hawktuah1hack";

function checkPassword() {
    const passwordInput = document.getElementById("passwordInput").value;
    const passwordMessage = document.getElementById("passwordMessage");
    
    if (passwordInput === CORRECT_PASSWORD) {
        document.getElementById("passwordPrompt").style.display = "none";
        document.getElementById("mainContent").classList.remove("hidden");
    } else {
        passwordMessage.textContent = "Incorrect password. Try again.";
    }
}

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const message = document.getElementById('message');

    if (!fileInput.files.length) {
        message.textContent = 'Please select a file';
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        message.innerHTML = response.ok 
            ? `Upload successful: <a href="${result.url}" target="_blank">${result.url}</a>` 
            : 'Upload failed';
    } catch (error) {
        message.textContent = 'Upload failed';
    }
}
