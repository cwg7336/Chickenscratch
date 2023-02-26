function sampleReq() {
    fetch('/api/test')
        .then(res => res.blob())
        .then(blob => {
            var file = window.URL.createObjectURL(blob);
            window.open(file, '_blank');
        });
}
