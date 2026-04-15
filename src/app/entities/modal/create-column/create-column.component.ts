import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Column } from '../../../interface/column/column';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { selectAllColumns } from '../../../feature/column/store/selector';
import { createColumnAction } from '../../../feature/column/store/action';
import { v4 as uuidv4 } from 'uuid';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-column',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './create-column.component.html',
  styleUrls: ['./create-column.component.scss'],
})
export class CreateColumnComponent implements OnInit {
  form!: FormGroup;
  columns: Column[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CreateColumnComponent>,
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      typeColum: ['', [Validators.required, Validators.maxLength(255)]],
    });

    this.store.select(selectAllColumns).subscribe((cols) => {
      this.columns = cols;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.form.valid) {
      const currentColumns = this.columns;
      const maxPosition = currentColumns.length
        ? Math.max(...currentColumns.map((c) => c.positionNumber))
        : 0;

      const newColumn: Column = {
        id: uuidv4(),
        typeColum: this.form.value.typeColum.trim(),
        timeCreated: new Date(),
        positionNumber: maxPosition + 1,
      };

      this.store.dispatch(createColumnAction({ column: newColumn }));
      this.dialogRef.close();
    }
  }
}
