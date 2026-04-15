import { Component, Inject, Signal, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { Column } from '../../../interface/column/column';
import { initialColumnState } from '../../../feature/column/store/state';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatError } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgForOf, CommonModule } from '@angular/common';
import { deleteColumnAction } from '../../../feature/column/store/action';
import { selectAllColumns } from '../../../feature/column/store/selector';

@Component({
  selector: 'app-del-column',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogContent,
    MatDialogTitle,
    MatError,
    MatDialogActions,
    MatButtonModule,
    NgForOf,
  ],
  templateUrl: './del-column.component.html',
  styleUrls: ['./del-column.component.scss'],
})
export class DelColumnComponent implements OnInit {
  columns: Signal<Column[]>;
  columnsForm: FormGroup;
  isSubmitted = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DelColumnComponent>,
    private store: Store,
    private fb: FormBuilder
  ) {
    this.columns = toSignal(this.store.select(selectAllColumns), {
      initialValue: initialColumnState.columns,
    });

    this.columnsForm = this.fb.group({
      selectedColumns: this.fb.array([]),
    });
  }

  get checkboxArray(): FormArray {
    return this.columnsForm.get('selectedColumns') as FormArray;
  }

  get hasSelectedColumns(): boolean {
    return this.checkboxArray.value.some((checked: boolean) => checked);
  }

  ngOnInit() {
    const controls = this.columns().map(
      () => new FormControl(false, Validators.required)
    );
    this.columnsForm.setControl('selectedColumns', this.fb.array(controls));
  }

  onCancel() {
    this.dialogRef.close();
  }

  delSelectColumn() {
    this.isSubmitted = true;
    const selectedValues: boolean[] = this.columnsForm.value.selectedColumns;
    const selectedIndices = selectedValues
      .map((checked, i) => (checked ? i : null))
      .filter((v) => v !== null) as number[];
    if (!selectedIndices.length) {
      return;
    }
    const selectedIds = selectedIndices.map((i) => this.columns()[i].id);
    selectedIds.forEach((id) => {
      this.store.dispatch(deleteColumnAction({ columnId: id }));
    });
    this.dialogRef.close();
  }
}
