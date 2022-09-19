import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'marvel-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'heros';
  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);

  constructor() { }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe({
      next: (darkMode: boolean | null) => {
        const darkClassName = 'darkMode';
        this.className = darkMode ? darkClassName : '';
      }
    });
  }
}
