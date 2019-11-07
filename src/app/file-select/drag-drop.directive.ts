import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[appDragDrop]',
})
export class DragDropDirective {

    @Output() fileDropped = new EventEmitter<File>();

    @HostBinding('class.dragging') isDragging = false;

    @HostListener('dragover', ['$event'])
    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer!.dropEffect = 'copy';
        this.isDragging = true;
    }

    @HostListener('dragleave', ['$event'])
     onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging = false;
    }

    @HostListener('drop', ['$event'])
    onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();

        const file = event.dataTransfer!.files[0] as any;
        if (file !== null) {
            this.fileDropped.emit(file);
        }
    }
}
