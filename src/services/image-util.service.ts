import { Injectable } from "@angular/core";

@Injectable()
export class ImageUtilService {
  dataUriToBlob(dataURI) {
    var byteString = atob(dataURI.split(",")[1]);
    var mimestring = dataURI
      .split(",")[0]
      .split(":")[1]
      .split(";")[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimestring });
  }

  // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
  blobToDataUri(dataBlob) {
    return new Promise((fulfill, reject) => {
      let reader = new FileReader();
      reader.onerror = reject;
      reader.onload = e => fulfill(reader.result);
      reader.readAsDataURL(dataBlob);
    });
  }
}
