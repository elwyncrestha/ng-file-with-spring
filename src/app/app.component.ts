import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FileService } from './file.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public title = 'ng-file-with-spring';
  public fileName = '';
  public findFile = '';
  public alert: {
    value: string;
    type: 'success' | 'danger';
  };

  constructor(private fileService: FileService) {}

  public upload(event) {
    const file = event.target.files[0];

    if (this.isEmpty(file)) {
      this.alert = { value: `File not selected`, type: 'danger' };
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', this.fileName);
    this.fileService.upload(formData).subscribe(
      (res) => {
        this.alert = {
          value: `Successfully uploaded the file ${res.value}`,
          type: 'success',
        };
      },
      (error) => {
        console.error(error);
        this.alert = { value: `Failed to upload file`, type: 'danger' };
      }
    );
  }

  public openFile(): void {
    const link = document.createElement('a');
    link.target = '_blank';
    link.href = `${environment.server}/resources/${this.findFile}`;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  private isEmpty(v: string): boolean {
    return v === undefined || v == null || v === '';
  }
}
