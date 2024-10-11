document.getElementById('imageForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('imageFile');
    const format = document.getElementById('format').value;
    const output = document.getElementById('output');
    const downloadLink = document.getElementById('downloadLink');

    if (fileInput.files.length === 0) {
        output.textContent = 'Please choose a file.';
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        
        img.onload = function() {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            let convertedImage;

            // Convert to the selected format
            if (format === 'jpeg') {
                convertedImage = canvas.toDataURL('image/jpeg');
            } else if (format === 'png') {
                convertedImage = canvas.toDataURL('image/png');
            } else if (format === 'gif') {
                convertedImage = canvas.toDataURL('image/gif');
            }

            // Create download link styled as a button
            const link = document.createElement('a');
            link.href = convertedImage;
            link.download = 'converted_image.' + format;
            link.classList.add('button');  // Apply the same button styling
            link.textContent = 'Download ' + format.toUpperCase() + ' Image';
            downloadLink.innerHTML = ''; // Clear previous links
            downloadLink.appendChild(link);
        };
    };

    reader.readAsDataURL(file);
});
