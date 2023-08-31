<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>HTML to PDF Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <h1 class="page-title">Generate PDF from HTML</h1>
      <ion-button expand="full" class="ion-margin-top" @click="generatePDF">
        Generate basic PDF
      </ion-button>
      <ion-button expand="full" class="ion-margin-top" @click="generateBetterPDF">
        Generate better PDF
      </ion-button>
      <div class="pdf-shell">
        <div class="pdf-container">
          <!-- PDF content here -->
          <div class="pdf-content-item pdf-content-1">Test Div 1</div>
          <div class="pdf-content-item pdf-content-2">Test Div 2</div>
          <div class="pdf-content-item pdf-content-3">Test Div 3
            <div class="pdf-content-item pdf-content-1">Test Div 1 in 3</div>
            <div class="pdf-content-item pdf-content-4">Test Div 4 in 3</div>
            <div class="pdf-content-item pdf-content-4">Test Div 4 in 3</div>
            <div class="pdf-content-item pdf-content-2">Test Div 2 in 3</div>
          </div>
          <div class="pdf-content-item pdf-content-4">Test Div 4
            <div class="pdf-content-item pdf-content-1">Test Div 1 in 4</div>
            <div class="pdf-content-item pdf-content-2">Test Div 2 in 4</div>
          </div>


          <div class="pdf-content-item pdf-content-4">Test Div 4
            <div class="pdf-content-item pdf-content-1">Test Div 1 in 4</div>
            <div class="pdf-content-item pdf-content-2">Test Div 2 in 4</div>
            <div class="pdf-content-item pdf-content-4">Test Div 4 in 4
              <div class="pdf-content-item pdf-content-1">Test Div 1 in 4</div>
              <div class="pdf-content-item pdf-content-2">Test Div 2 in 4

                <div class="pdf-content-item pdf-content-4">Test Div 4 in 2
                  <div class="pdf-content-item pdf-content-1">Test Div 1 in 4</div>
                  <div class="pdf-content-item pdf-content-2">Test Div 2 in 4</div>
                  <div class="pdf-content-item pdf-content-1">Test Div 1 in 4</div>
                  <div class="pdf-content-item pdf-content-3">Test Div 3 in 4</div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </ion-content>
  </ion-page>
</template>
  
<script setup>
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton } from '@ionic/vue';
import html2pdf from "html2pdf.js";

const commonOptions = {
  filename: "output.pdf",
  margin: 1,
  image: { type: "jpeg", quality: 1 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
};


const downloadFile = (blob, fileName, timeoutTime) => {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), timeoutTime);
};


const generatePDF = async () => {
  const pdfContent = document.querySelector(".pdf-container");
  await generateAndSavePDF(pdfContent, "basic-pdf-example", { ...commonOptions });
};

const generateBetterPDF = async () => {
  const pdfContent = document.querySelector(".pdf-container");
  generateAndSavePDF(pdfContent, "better-pdf-example", { ...commonOptions, pagebreak: { mode: "avoid-all" } });
};

const generateContent = async (pages) => {
  const pdfContent = pages[0].map((div) => div.outerHTML).join("");

  const pdfOptions = {
    margin: 10,
    filename: "generated.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { scale: 1 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  return pdfContent;
};


const generateAndSavePDF = async (content, filename, options) => {
  const pdf = await html2pdf().from(content).set(options).save(filename);
};
</script>
  
<style scoped>
.page-title {
  text-align: center;
  margin-bottom: 20px;
}

.pdf-shell {
  border: 1px solid #ddd;
  padding: 10px;
}

.pdf-content-item {
  margin: 10px 0;
  padding: 5px;
  border: 1px solid #ccc;
}

.pdf-content-1 {
  height: 200px;
  background: rgb(255, 208, 119);
}

.pdf-content-2 {
  height: 700px;
  background: blanchedalmond;
}

.pdf-content-3 {
  min-height: 600px;
  background: greenyellow;
}

.pdf-content-4 {
  min-height: 330px;
  background: rgb(197, 151, 240);
}
</style>
  