import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar'; // ✅ Đúng tên class export

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent], // ✅ Đúng tên đã import
  templateUrl: './app.html',
  styleUrls: ['./app.css'], // ✅ Sửa từ styleUrl -> styleUrls
})
export class App {
  protected title = 'angular-su25';
  stkChaGuiTien = '100000 trieu';
}
