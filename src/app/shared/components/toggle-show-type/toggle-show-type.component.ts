import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-toggle-show-type',
  templateUrl: './toggle-show-type.component.html',
  styleUrl: './toggle-show-type.component.scss'
})
export class ToggleShowTypeComponent implements OnInit {
  // @Input() radioName!: string;
  @Output() showTypeEventEmitter = new EventEmitter<string>;
  radioForm!: FormGroup;
  @Output() testEventEmitter = new EventEmitter;
  @Input() carouselTitle!: string;
  constructor() {
  }

  ngOnInit(): void {
    this.radioForm = new FormGroup(
      {
        showType: new FormControl('movie'),
        test: new FormControl('')
      }
    );

    this.listenAndEmit();
  }

  listenAndEmit(){
    this.radioForm.get('showType')?.valueChanges.subscribe(
      value => this.showTypeEventEmitter.emit(value)
    )
  }
}
