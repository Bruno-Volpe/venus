import 'react-image-crop/dist/ReactCrop.css';

// Função auxiliar para calcular dimensões redimensionadas
function calculateDimensions(originalWidth, originalHeight, targetWidth, targetHeight) {
    let width = originalWidth;
    let height = originalHeight;

    if (width > height) {
        if (width > targetWidth) {
            height *= targetWidth / width;
            width = targetWidth;
        }
    } else {
        if (height > targetHeight) {
            width *= targetHeight / height;
            height = targetHeight;
        }
    }

    return { width, height };
}

// Função auxiliar para processar imagem carregada
function processLoadedImage(img, file, targetWidth, targetHeight) {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        calculateDimensions(
            img.width, 
            img.height, 
            targetWidth, 
            targetHeight
        );

        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        canvas.toBlob((blob) => {
            resolve(new File([blob], file.name, { type: file.type }));
        }, file.type);
    });
}

// Função auxiliar para carregar imagem
function loadImage(dataUrl, file, targetWidth, targetHeight) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = async () => {
            try {
                const resizedFile = await processLoadedImage(img, file, targetWidth, targetHeight);
                resolve(resizedFile);
            } catch (error) {
                reject(error);
            }
        };
        
        img.onerror = () => reject(new Error('Falha ao carregar a imagem'));
        img.src = dataUrl;
    });
}

// Função principal refatorada
export default function resizeImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const targetWidth = 300;
        const targetHeight = 300;

        reader.onload = async (event) => {
            try {
                const resizedFile = await loadImage(
                    event.target.result, 
                    file, 
                    targetWidth, 
                    targetHeight
                );
                resolve(resizedFile);
            } catch (error) {
                reject(error);
            }
        };

        reader.onerror = () => reject(new Error('Falha ao ler o arquivo'));
        reader.readAsDataURL(file);
    });
}
