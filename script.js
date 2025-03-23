async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const passwordInput = document.getElementById('passwordInput');
    const message = document.getElementById('message');

    if (!fileInput.files.length) {
        message.textContent = 'Please select a file';
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('password', passwordInput.value);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        message.textContent = response.ok ? `Upload successful: ${result.url}` : 'Upload failed';
    } catch (error) {
        message.textContent = 'Upload failed';
    }
}
