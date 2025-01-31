import { Component, ViewChild, Output, EventEmitter, OnInit, AfterViewInit, Input } from '@angular/core';
import { NgxScannerQrcodeComponent, NgxScannerQrcodeModule, NgxScannerQrcodeService, ScannerQRCodeConfig, ScannerQRCodeDevice, ScannerQRCodeResult, ScannerQRCodeSelectedFiles } from 'ngx-scanner-qrcode';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { delay } from 'rxjs';
import { DpiCards } from '../recherche/recherche.component';

interface Data {
  dpis: any[];
  patient_name: string;
}

@Component({
  selector: 'app-scanner',
  imports: [CommonModule, NgxScannerQrcodeModule],
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements AfterViewInit {
 @Input() dpis!: DpiCards[];
    public config: ScannerQRCodeConfig = {
      constraints: {
        video: {
          width: window.innerWidth
        }
      },
    };
   
    public qrCodeResult: ScannerQRCodeSelectedFiles[] = [];
    public qrCodeResult2: ScannerQRCodeSelectedFiles[] = [];
   
    @ViewChild('action') action!: NgxScannerQrcodeComponent;
   
    constructor(private qrcode: NgxScannerQrcodeService) { }
   
    ngAfterViewInit(): void {
      this.action.isReady.pipe(delay(1000)).subscribe(() => {
        this.handle(this.action, 'start');
      });
    }
    
     public async onEvent(e: ScannerQRCodeResult[], action?: any): Promise<void> {
      e?.length && action && action.pause(); // Detect once and pause scan!
   
      let binArrayToString = function(binArray: Uint8Array): string {
        let str = "";
        for (let i = 0; i < binArray.length; i++) {        
        str += String.fromCharCode(parseInt(binArray[i] as unknown as string));
        }
        return str;
        }
      console.log('utf8ArrayToString', binArrayToString(new Uint8Array(e[0].data)));
      await axios
      .get<Data>('http://localhost:8000/recherche/Patient/DPIS', {
        params: { nss: JSON.parse(binArrayToString(new Uint8Array(e[0].data))).nss },
      })
      .then((response) => {
        console.log(response.data);
        alert("patient name: " + response.data.patient_name + " \nnss : " + JSON.parse(binArrayToString(new Uint8Array(e[0].data))).nss );
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error: NSS not found');
      });
    }
   
    public handle(action: any, fn: string): void {
      const playDeviceFacingBack = (devices: ScannerQRCodeDevice[]) => {
        // front camera or back camera check here!
        const device = devices.find(f => (/back|rear|environment/gi.test(f.label))); // Default Back Facing Camera
        action.playDevice(device ? device.deviceId : devices[0].deviceId);
      }
   
      if (fn === 'start') {
        action[fn](playDeviceFacingBack).subscribe((r: any) => console.log(fn, r), alert);
      } else {
        action[fn]().subscribe((r: any) => console.log(fn, r), alert);
      }
    }
   
    public onSelects(files: any): void {
      this.qrcode.loadFiles(files).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        this.qrCodeResult = res;
      });
    }
   
    public onSelects2(files: any): void {
      this.qrcode.loadFilesToScan(files, this.config).subscribe((res: ScannerQRCodeSelectedFiles[]) => {
        console.log(res);
        this.qrCodeResult2 = res;
      });
    }
  }