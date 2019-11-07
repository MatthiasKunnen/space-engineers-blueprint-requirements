import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReplaySubject } from 'rxjs';
import {
    takeUntil,
} from 'rxjs/operators';

import { Blueprint } from './blueprint.model';

@Component({
    templateUrl: './requirement-extractor.component.html',
    styleUrls: ['./requirement-extractor.component.scss'],
})
export class RequirementExtractorComponent implements OnDestroy, OnInit {

    error: string | null = null;
    export: string | null = null;
    name: string | null = null;
    form: FormGroup;

    private readonly destroyed = new ReplaySubject<void>(1);

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

    ngOnInit(): void {
        this.form = new FormGroup({
            exportType: new FormControl('ini', Validators.required),
            file: new FormControl(null),
        });
        this.form.valueChanges.pipe(
            takeUntil(this.destroyed),
        ).subscribe(async value => {
            try {
                await this.update(value);
            } catch (e) {
                console.error(e);
                this.error = e.message;
            }
        });
    }

    async update({exportType, file}: {exportType: 'ini' | 'json', file: File}) {
        const reader = new FileReader();
        const fileString: string | null | undefined = await new Promise(((resolve, reject) => {
            reader.onload = () => resolve(reader.result as any);
            reader.onerror = reject;
            reader.readAsText(file);
        }));

        if (fileString == null) {
            this.error = 'Uploaded file is null or undefined';
            return;
        }

        this.error = null;
        this.export = null;
        this.name = null;
        const blueprint = Blueprint.fromXml(fileString);
        this.name = blueprint.name;
        switch (exportType) {
            case 'ini':
                this.export = blueprint.exportBlocksAsIni();
                break;
            case 'json':
                this.export = blueprint.exportBlocksAsJson();
                break;
        }
    }
}
