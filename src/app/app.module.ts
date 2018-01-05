import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { TinymceModule } from 'angular2-tinymce';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // TinymceModule.withConfig({
    //   plugins: [
    //     'advlist autolink lists link image charmap print preview hr anchor pagebreak',
    //     'searchreplace visualblocks visualchars code ',
    //     'insertdatetime media nonbreaking table contextmenu directionality',
    //     'emoticons template paste textcolor colorpicker textpattern imagetools codesample bbcode',
    //     'importcss spellchecker'
    // ]
    // })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
