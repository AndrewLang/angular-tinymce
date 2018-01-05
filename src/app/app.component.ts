import { Component, OnInit } from '@angular/core';

declare var tinymce: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  content = 'Html editor content';
  elementId = 'tinymce_editor';

  ngOnInit() {
    tinymce.init({
      skin_url: 'assets/tinymce/skins/lightgray',
      content_css: [
        'assets/css/editor.default.css'
      ],
      selector: `#${this.elementId}`,
      theme: 'modern',
      plugins: [
        // fullscreen wordcount save
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace visualblocks visualchars code ',
        'insertdatetime media nonbreaking table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools codesample bbcode',
        'importcss spellchecker'
      ],
      toolbar1: 'undo redo | cut copy paste pastetext | formatselect fontsizeselect fontselect | bold italic underline | forecolor backcolor | strikethrough superscript subscript blockquote ',
      toolbar2: 'alignleft aligncenter alignright alignjustify | bullist numlist | indent outdent | code searchreplace | link anchor image media |  emoticons codesample hr pagebreak importcss insertdatetime table ',
      image_advtab: true,
      block_formats: 'Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3;Header 4=h4;Header 5=h5;Header 6=h6',
      fontsize_formats: '8pt 10pt 11pt 12pt 13pt 14pt 16pt 18pt 20pt 22pt 24pt 28pt 36pt 48pt 64pt 72pt',
      font_formats: 'Andale Mono=andale mono,times;'
        + 'Arial=arial,helvetica,sans-serif;'
        + 'Arial Black=arial black,avant garde;'
        + 'Book Antiqua=book antiqua,palatino;'
        + 'Comic Sans MS=comic sans ms,sans-serif;'
        + 'Courier New=courier new,courier;'
        + 'Georgia=georgia,palatino;'
        + 'Helvetica=helvetica;'
        + 'Impact=impact,chicago;'
        + 'Microsoft YaHei=Microsoft YaHei;'
        + 'Symbol=symbol;'
        + 'Tahoma=tahoma,arial,helvetica,sans-serif;'
        + 'Terminal=terminal,monaco;'
        + 'Times New Roman=times new roman,times;'
        + 'Trebuchet MS=trebuchet ms,geneva;'
        + 'Verdana=verdana,geneva;'
        + 'Webdings=webdings;'
        + 'Wingdings=wingdings,zapf dingbats',
      textpattern_patterns: [
        { start: '*', end: '*', format: 'italic' },
        { start: '**', end: '**', format: 'bold' },
        { start: '#', format: 'h1' },
        { start: '##', format: 'h2' },
        { start: '###', format: 'h3' },
        { start: '####', format: 'h4' },
        { start: '#####', format: 'h5' },
        { start: '######', format: 'h6' },
        { start: '1. ', cmd: 'InsertOrderedList' },
        { start: '* ', cmd: 'InsertUnorderedList' },
        { start: '- ', cmd: 'InsertUnorderedList' }
      ],
      init_instance_callback: function (editor) {
        tinymce.activeEditor.focus();

        console.log(editor);
      },
      paste_preprocess: function (plugin, args) {

      },
      setup: function (editor) {

      }
    });
  }
}
