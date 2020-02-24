import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CostCenter } from '../../../model/cost-center.model';
import { CostCenterAdapter } from './cost-center.adapter';
import { B2BSearchConfig } from '../../model/search-config';
import { EntitiesModel } from '../../../model/misc.model';
import { Budget } from '../../../model/budget.model';

@Injectable({
  providedIn: 'root',
})
export class CostCenterConnector {
  constructor(protected adapter: CostCenterAdapter) {}

  get(userId: string, costCenterCode: string): Observable<CostCenter> {
    return this.adapter.load(userId, costCenterCode);
  }

  getList(
    userId: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<CostCenter>> {
    return this.adapter.loadList(userId, params);
  }

  create(userId: string, costCenter: CostCenter): Observable<CostCenter> {
    return this.adapter.create(userId, costCenter);
  }

  update(
    userId: string,
    costCenterCode: string,
    costCenter: CostCenter
  ): Observable<CostCenter> {
    return this.adapter.update(userId, costCenterCode, costCenter);
  }

  getBudgets(
    userId: string,
    costCenterCode: string,
    params?: B2BSearchConfig
  ): Observable<EntitiesModel<Budget>> {
    return this.adapter.loadBudgets(userId, costCenterCode, params);
  }

  assignBudget(
    userId: string,
    costCenterCode: string,
    budgetCode: string
  ): Observable<any> {
    return this.adapter.assignBudget(userId, costCenterCode, budgetCode);
  }

  unassignBudget(
    userId: string,
    costCenterCode: string,
    budgetCode: string
  ): Observable<any> {
    return this.adapter.unassignBudget(userId, costCenterCode, budgetCode);
  }
}
