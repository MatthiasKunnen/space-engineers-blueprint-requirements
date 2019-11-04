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
            blueprintXml: new FormControl(null, Validators.required),
            exportType: new FormControl('ini', Validators.required),
        });
        this.form.valueChanges.pipe(
            takeUntil(this.destroyed),
        ).subscribe(value => this.update(value));
    }

    update({blueprintXml, exportType}: {blueprintXml: string, exportType: 'ini' | 'json'}): void {
        try {
            this.error = null;
            this.export = null;
            this.name = null;
            const blueprint = Blueprint.fromXml(blueprintXml);
            this.name = blueprint.name;
            switch (exportType) {
                case 'ini':
                    this.export = blueprint.exportBlocksAsIni();
                    break;
                case 'json':
                    this.export = blueprint.exportBlocksAsJson();
                    break;
            }
        } catch (e) {
            console.error(e);
            this.error = e.message;
        }
    }
}
