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
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/vue';
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
    featureName: String,
    featureRoute: String,
});

const router = useRouter();
const navigateToFeature = () => {
    if (props.featureRoute !== "")
        router.push('/' + props.featureRoute);
};
</script>
  