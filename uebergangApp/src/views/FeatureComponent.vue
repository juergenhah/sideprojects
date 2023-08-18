<template>
    <ion-card>
        <ion-card-header>
            <ion-card-title>{{ featureName }}</ion-card-title>
        </ion-card-header>

        <ion-card-content>
            <ion-button @click="navigateToFeature">Go to {{ featureName }} Page</ion-button>
        </ion-card-content>
    </ion-card>
</template>


<script setup>
const props = defineProps({
    featureName: String, 
    featureRoute: String, 
});
import { useRouter } from 'vue-router';
const router = useRouter();
const navigateToFeature = () => {
    console.log("heloo");
    router.push('/'+props.featureRoute );
};
</script>
