import {
  Component
} from '@angular/core';
import {
  QRScanner,
  QRScannerStatus
} from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  swiperOpts = {
    allowSlidePrev: false,
    allowSlideNext: false
  };
  showCamera = false;
  showIcon = false;
  showText = true;
  textScanned = 'qrCode';

  constructor(private qrScanner: QRScanner) {
    this.showCamera = false;
    this.showIcon = false;
    this.showText = true;
    this.textScanned = 'qrCode';
  }

  scanCode() {
    this.showCamera = true;
    this.showIcon = true;
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        console.log('Scan en cours...' + JSON.stringify(status));
        const scanSub = this.qrScanner.scan().subscribe((text: any) => {
          console.log('Scanned something', text);
          this.textScanned = text.result;
          this.qrScanner.hide();
          scanSub.unsubscribe();
          this.closeCamera();
          this.showCamera = false;
          this.showIcon = false;
          this.showText = true;
        });
      } else if (status.denied) {
      } else {
      }
    })
    .catch((e: any) => console.log('Error is', e));
  }

  closeCamera() {
    this.showCamera = false;
    this.showIcon = false;
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }

}
