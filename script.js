async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const message = document.getElementById('message');
    const password = document.getElementById('passwordInput').value;

    if (!fileInput.files.length) {
        message.textContent = 'Please select a file';
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('password', password);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        message.innerHTML = response.ok 
            ? `Upload successful: <a href="${result.url}" target="_blank">${result.url}</a>` 
            : `Upload failed: ${result.error}`;
    } catch (error) {
        message.textContent = 'Upload failed';
    }
}
