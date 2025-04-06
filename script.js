function generateQRCode() {
    const qrInput = document.getElementById('qrInput').value;
    const formatSelect = document.getElementById('formatSelect').value;
    const sizeSelect = parseInt(document.getElementById('sizeSelect').value);
    const qrcodeElement = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (qrInput.trim() === "") {
        alert("Будь ласка, введіть текст або URL для створення QR-коду.");
        return;
    }

    if (formatSelect === 'svg') {
        QRCode.toString(qrInput, {
            errorCorrectionLevel: 'H',
            type: 'svg',
            width: sizeSelect
        }, function(err, svg) {
            if (err) throw err;
            qrcodeElement.innerHTML = svg;
            downloadBtn.href = 'data:image/svg+xml;base64,' + btoa(svg);
            downloadBtn.download = 'qrcode.svg';
            downloadBtn.classList.remove('hidden');
        });
    } else {
        QRCode.toDataURL(qrInput, {
            errorCorrectionLevel: 'H',
            type: formatSelect,
            width: sizeSelect
        }, function(err, url) {
            if (err) throw err;
            qrcodeElement.innerHTML = `<img src="${url}" alt="QR Code" class="qrcode__image">`;
            downloadBtn.href = url;
            downloadBtn.download = 'qrcode.' + formatSelect;
            downloadBtn.classList.remove('hidden');
        });
    }
}