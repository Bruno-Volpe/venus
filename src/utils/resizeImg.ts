import 'react-image-crop/dist/ReactCrop.css';


//foi adicionado o parametro filename, observar na hora do uso
export default function resizeImage(file: Blob, fileName: string): Promise<File> {
    return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = (event: ProgressEvent<FileReader>) => {
            if (event.target) {
                const img = new Image();
                img.src = event.target.result as string;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    const targetWidth = 300;
                    const targetHeight = 300;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        height *= targetWidth / width;
                        width = targetWidth;
                    } else {
                        if (height > targetHeight) {
                            width *= targetHeight / height;
                            height = targetHeight;
                        }
                    }

                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    ctx?.drawImage(img, 0, 0, targetWidth, targetHeight);

                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(new File([blob], fileName, { type: file.type }));
                        }
                    }, file.type);
                };
            }
        };

        reader.readAsDataURL(file);
    });
}
