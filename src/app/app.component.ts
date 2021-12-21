import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Speedometer', url: '/folder/speedometer', icon: 'speedometer' },
    { title: 'Internet Speed', url: '/folder/speedtest', icon: 'wifi' },
    { title: 'About', url: '/folder/about', icon: 'flash' },
    // { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },

  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
