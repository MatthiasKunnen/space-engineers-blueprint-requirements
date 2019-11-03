import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(
        iconRegistry: MatIconRegistry,
        sanitizer: DomSanitizer,
    ) {
        const addIcons: Array<{
            external?: boolean,
            name: string,
            url: string,
        }> = [
        ];

        addIcons.forEach(i => {
            iconRegistry.addSvgIcon(
                i.name,
                sanitizer.bypassSecurityTrustResourceUrl(i.external === true
                    ? i.url
                    : `/assets/icons/${i.url}.svg`),
            );
        });
    }
}
