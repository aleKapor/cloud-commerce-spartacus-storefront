import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent, PaginationModule } from './pagination/index';
import { SortingComponent } from './sorting/sorting.component';
import { SearchComponent } from './search/search.component';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    PaginationModule,
  ],
  declarations: [SortingComponent, SearchComponent],
  exports: [SortingComponent, PaginationComponent, SearchComponent],
})
export class ListNavigationModule {}
