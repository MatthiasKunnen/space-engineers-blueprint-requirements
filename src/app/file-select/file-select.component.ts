import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-file-select',
    templateUrl: './file-select.component.html',
    styleUrls: ['./file-select.component.scss'],
})
export class FileSelectComponent {

    @Output() fileChanged = new EventEmitter<File>();

    selectFile(file: File): void {
        this.fileChanged.emit(file);
    }
}
