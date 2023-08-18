<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>Image Cropping</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <h1 class="page-title">Image Cropping Page</h1>
            <div class="input-container">
                <ion-item>
                    <ion-label position="floating">Crop Width</ion-label>
                    <ion-input type="number" v-model="cropWidth"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label position="floating">Crop Height</ion-label>
                    <ion-input type="number" v-model="cropHeight"></ion-input>
                </ion-item>
                <ion-button expand="block" @click="captureAndCropImage">Capture and Crop Image</ion-button>
            </div>
            <div v-if="isImagesLoaded" class="image-container">
                <div class="image-grid">
                    <div class="original-image">
                        <span class="image-label">Original</span>
                        <span class="image-dimensions">{{ oWidth }}x{{ oHeight }}</span>
                        <img :src="originalImageSrc" alt="Original Image" />
                    </div>
                    <div class="arrow">&rarr;</div>
                    <div class="cropped-image">
                        <span class="image-label">Cropped</span>
                        <span class="image-dimensions">{{ cropWidth }}x{{ cropHeight }}</span>
                        <img :src="croppedImageSrc" alt="Cropped Image" />
                    </div>
                </div>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script setup>
import { ref } from 'vue';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/vue';
import { addMetadataToImage } from './metaData.js'
const cropWidth = ref(300);
const cropHeight = ref(300);
const originalImageSrc = ref('');
const croppedImageSrc = ref('');
const isImagesLoaded = ref(false);
const oWidth = ref(0);
const oHeight = ref(0);

const captureAndCropImage = async () => {
    try {
        const image = await Camera.getPhoto({
            resultType: CameraResultType.Uri

        });

        const imageUrl = image.webPath;

        const image2 = new Image();
        image2.src = imageUrl;
        await image2.decode();
        console.log(image2);

        oWidth.value = image2.width;
        oHeight.value = image2.height;

        originalImageSrc.value = imageUrl;

        let croppedImageUrl = await cropImage(imageUrl);
        croppedImageSrc.value = croppedImageUrl;

        isImagesLoaded.value = true;

        const oImage = await getImageData(imageUrl);
        croppedImageUrl = await addMetadataToImage(oImage, croppedImageUrl);
        croppedImageSrc.value = croppedImageUrl;

        console.log("done");

    } catch (error) {
        console.error('Error capturing or cropping image:', error);
    }
};

const cropImage = async (imageUrl) => {
    console.log("Cropping image");
    const image = new Image();
    image.src = imageUrl;
    await image.decode();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = cropWidth.value;
    canvas.height = cropHeight.value;

    const sourceXOffset = (image.width - cropWidth.value) / 2;
    const sourceYOffset = (image.height - cropHeight.value) / 2;

    // Crop the image in the center
    ctx.drawImage(
        image,
        sourceXOffset,
        sourceYOffset,
        cropWidth.value,
        cropHeight.value,
        0,
        0,
        cropWidth.value,
        cropHeight.value
    );

    const croppedImageUrl = canvas.toDataURL('image/jpeg', 0.9);

    return croppedImageUrl;
};
async function getImageData(imageUrl) {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64DataUrl = reader.result;
                resolve(base64DataUrl);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error fetching or converting the image:', error);
        throw error; // Rethrow the error if needed
    }
}

</script>
  
<style scoped>
.page-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
}

.input-container {
    margin-bottom: 20px;
}

.image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.image-grid {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: 20px;
}

.original-image,
.cropped-image {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-label {
    font-size: 1rem;
    margin-bottom: 10px;
}

.arrow {
    font-size: 1.5rem;
    text-align: center;
}
</style>
  