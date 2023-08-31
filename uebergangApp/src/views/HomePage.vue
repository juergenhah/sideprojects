<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Übergang APP</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="content">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Übergang APP</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="feature-list">
        <feature-component featureName="Image Cropping" featureRoute="image-feature" />
        <feature-component featureName="HTML to PDF" featureRoute="pdf-feature" />
        <feature-component featureName="Custom Feature" featureRoute="" />
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import FeatureComponent from './FeatureComponent.vue';
</script>

<style scoped>
.content {
  --ion-safe-area-top: 20px; /* Adjust this as needed */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.feature-list {
  text-align: center;
  padding: 20px;
}

.feature-list feature-component {
  margin-bottom: 20px;
}

.feature-list a {
  text-decoration: none;
  color: #333;
}

.feature-list a:hover {
  color: #007bff;
}

.feature-list strong {
  font-size: 20px;
  line-height: 26px;
}

.feature-list p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}
</style>
