import {
    Directive,
    Input,
    ElementRef,
    OnInit,
    OnChanges,
    SimpleChange
} from 'angular2/core';
import * as dragula from 'dragula';
import {DragulaService} from "./dragula.provider.ts";
declare var $:any;

@Directive({
    selector: '[dragula]'
})
export class Dragula implements OnInit, OnChanges {
    @Input('dragula') bag:string;
    @Input() dragulaModel:any;
    private container:any;
    private drake:any;

    constructor(private el:ElementRef, private dragulaService:DragulaService) {
        this.container = el.nativeElement;
    }

    ngOnInit() {
        let bag = this.dragulaService.find(this.bag);
        $(this.container).data('dragulamodeldata', this.dragulaModel);

        if (bag) {
            this.drake = bag.drake;
            this.drake.containers.push(this.container);
        } else {
            this.drake = dragula({
                containers: [this.container],
                revertOnSpill: true
            });
            this.dragulaService.add(this.bag, this.drake);
        }
    }

    ngOnChanges(changes:{[propName:string]:SimpleChange}) {
        if (this.container && this.dragulaModel)
            $(this.container).data('dragulamodeldata', this.dragulaModel);

    }
}
