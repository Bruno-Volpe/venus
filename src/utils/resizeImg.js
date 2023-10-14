import 'react-image-crop/dist/ReactCrop.css';

export default function resizeImage(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const targetWidth = 300;
                const targetHeight = 300;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > height) {
                        height *= targetWidth / width;
                        width = targetWidth;
                    }
                } else {
                    if (height > targetHeight) {
                        width *= targetHeight / height;
                        height = targetHeight;
                    }
                }

                canvas.width = targetWidth;
                canvas.height = targetHeight;
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                canvas.toBlob((blob) => {
                    resolve(new File([blob], file.name, { type: file.type }));
                }, file.type);
            };
        };

        reader.readAsDataURL(file);
    });
}
