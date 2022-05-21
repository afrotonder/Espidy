import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Geolocation } from '@capacitor/geolocation';
import { Motion } from '@capacitor/motion';
import { PluginListenerHandle } from '@capacitor/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';
import { Pedometer } from '@awesome-cordova-plugins/pedometer/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  currentSpeed: any;
  currentDist: any;
  distUnit: string ;
  getSpeed: boolean;
  unitList: Array<string>;
  selectedUnit: string;
  // accelHandler: PluginListenerHandle;

  constructor(private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private deviceMotion: DeviceMotion,
    private pd: Pedometer
  ) {
    this.currentSpeed = '0.0';
    this.currentDist = '0.0';
    this.distUnit = 'miles'
    this.getSpeed = false
    this.unitList = ['mph', 'm/s']
    this.selectedUnit = this.unitList[0]

    Pedometer.isDistanceAvailable()
  .then((available: boolean) => {
    console.log('DIMELOOOOOOOOOOOOOOO');
    console.log(available)
  })
  .catch((error: any) => {
    console.log('NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO ');
    console.log(error)
  });

Pedometer.startPedometerUpdates()
   .subscribe((data: IPedometerData) => {
     this.currentDist = data ;
     console.log('pedometer data ', data);
   });

  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');


  }

  ngAfterViewInit() {

    // check if any address is set
    // this.initEspidy()

  }

  async initEspidy() {


    let accelHandler: PluginListenerHandle;
    let myButton = document.getElementById('test')
    // myButton.addEventListener('click', async () => {
    try {
      // await (DeviceMotionEvent as any).requestPermission()

      // await DeviceMotionEvent.requestPermission();
    } catch (e) {
      // Handle error
      this.currentSpeed = 'ERR 1: ' + e
      return;
    }

    accelHandler = await Motion.addListener('accel', event => {
      console.log('Device motion event:', event);

      const accel = JSON.stringify(Math.abs(event.acceleration.x) * 2.23694)

      this.zone.run(() => {
        this.currentSpeed = accel
      });
    });
    // });

    // Stop the acceleration listener
    const stopAcceleration = () => {
      if (accelHandler) {
        accelHandler.remove();
      }
    };

    // Remove all listeners
    const removeListeners = () => {
      Motion.removeAllListeners();
    };


  }

  changeUnits(event) {
    console.log(event);
  }

}
