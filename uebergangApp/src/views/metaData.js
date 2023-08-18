import * as piexif from "piexifjs";

export async function addMetadataToImage(originalImage, newImage) {
    console.log("metadata")
    const exifData = piexif.load(originalImage);
    const exifBytes = piexif.dump(exifData);
    const newImageData = piexif.insert(exifBytes, newImage);
    const exifDataNew = piexif.load(newImageData);
    console.log(exifDataNew);
    return newImageData;
}