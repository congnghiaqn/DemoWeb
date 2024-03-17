import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/components/navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, NavbarComponent, RouterLink, CommonModule, RouterModule]
})
export class AppComponent {
  title = 'DemoWeb';
}
