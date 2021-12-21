import { Component, OnInit, NgZone  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Motion } from '@capacitor/motion';
import { PluginListenerHandle } from '@capacitor/core';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  currentSpeed: any ;
  getSpeed: boolean ;
  // accelHandler: PluginListenerHandle;

  constructor(private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private deviceMotion: DeviceMotion) {
    this.currentSpeed = '0.0';
    this.getSpeed = false

  }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');


  }

  ngAfterViewInit() {

    // check if any address is set
    this.test()

  }
  async test() {
    // capacitor geolocqtion stuff
      // const coordinates = await Geolocation.getCurrentPosition();

      // console.log('Current position:', coordinates);
      // // console.log(spe);
      // const speed = !coordinates.coords.speed === true ? 'NOPE' : coordinates.coords.speed

      // this.currentSpeed = speed //.toFixed(2)
    // capacitor geolocqtion stuff

  //  let myButton = document.getElementById('approveButton')

  //   let accelHandler: PluginListenerHandle;

  //   myButton.addEventListener('click', async () => {
  //     try {
  //       await  (DeviceMotionEvent as any).requestPermission() ;
  //     } catch (e) {
  //       // Handle error
  //       this.currentSpeed = "):"
  //       return;
  //     }

  //     // Once the user approves, can start listening:
  //     accelHandler = await Motion.addListener('accel', event => {
  //       console.log('Device motion event:', event);
  //     });
  //   });


      // try {
      //   await (DeviceMotionEvent as any).requestPermission()
      //   ;
      // } catch (e) {
      //   // Handle error
      //   return;
      // }

      // // Once the user approves, can start listening:
      // accelHandler = await Motion.addListener('accel', event => {
      //   console.log('Device motion event:', event);
      //   this.currentSpeed = event
      //   // console.log(eb);
      // });

      // get current acceleration, whatever the fuck that means
      // this.deviceMotion.getCurrentAcceleration().then(
      //   (acceleration: DeviceMotionAccelerationData) => {
      //     console.log(acceleration)
      //     this.currentSpeed = JSON.stringify(acceleration)
      //   },
      //   (error: any) => console.log(error)
      // );


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

  // Once the user approves, can start listening:
  accelHandler = await Motion.addListener('accel', event => {
    console.log('Device motion event:', event);
        // @ts-ignore

    const accel = JSON.stringify(Math.abs(event.acceleration.x))
    // @ts-ignore
    console.log(accel);
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

  toggleGetSpeed() {
    this.getSpeed = !this.getSpeed ;

    this.test()
  }
}
