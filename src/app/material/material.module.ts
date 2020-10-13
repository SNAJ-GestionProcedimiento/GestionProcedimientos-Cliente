import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    BrowserModule,
    MatTooltipModule,
    MatDialogModule
  ],

  exports: [
    MatTableModule,
    MatPaginatorModule,
    BrowserModule,
    MatTooltipModule,
    MatDialogModule
  ]
})
export class MaterialModule { }
