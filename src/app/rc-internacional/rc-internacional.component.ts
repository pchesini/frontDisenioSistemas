import { Component } from '@angular/core';
import { RciComponent } from '../rci/rci.component';
import { RciService } from '../services/rci.service';

@Component({
  selector: 'app-rc-internacional',
  templateUrl: './rc-internacional.component.html',
  styleUrls: ['./rc-internacional.component.css']
})
export class RcInternacionalComponent {
  
  
  rciList: RciComponent[] = [];

  constructor(private rciService: RciService){}

  ngOnInit(): void {
    this.rciService.getAllRci().subscribe(
      rci => this.rciList = rci
    );
  }


}
