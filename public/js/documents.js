document.getElementById('upload-button').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const files = document.getElementById('document-upload').files;

    if (!name || files.length === 0) {
        alert('Please enter name and select file(s).');
        return;
    }

    const formData = new FormData();
    formData.append('patientName', name);
    for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
    }

    fetch('/documents/upload', {
        method: 'POST',
        body: formData
    }).then(res => {
        if (res.ok) {
            alert('Uploaded successfully!');
            window.location.reload();
        } else {
            alert('Upload failed.');
        }
    }).catch(err => {
        console.error(err);
        alert('An error occurred.');
    });
});

