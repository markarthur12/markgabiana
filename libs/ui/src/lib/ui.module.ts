import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './banner/banner.component';
import { SlidderComponent } from './slidder/slidder.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    BannerComponent,
    SlidderComponent
  ],
  exports: [
    BannerComponent,
    SlidderComponent
  ],
})
export class UiModule {}
