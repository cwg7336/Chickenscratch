function sampleReq() {
    const files = document.getElementById('files').files;
    const fileCount = files.length;
    let numProcessed = 0;
    let b64blobs = [];

    for (let i = 0; i < fileCount; i++) {
        const file = files[i];
        console.log(file);
        
        const reader = new FileReader();
        reader.addEventListener('loadend', () => {
            const b64 = reader.result;
            b64blobs.splice(i, 0, b64);
            numProcessed += 1;
            if (numProcessed == fileCount) {
                sendReq(b64blobs);
            }
        });
        reader.readAsDataURL(file);  // encodes the file as base64, then calls the loadend event
    }
}

function sendReq(b64blobs) {
    console.log(b64blobs);
    fetch('/api/test', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(b64blobs)
    })
        .then(res => res.blob())
        .then(blob => {
            var file = window.URL.createObjectURL(blob);
            window.open(file, '_blank');
        });
}
