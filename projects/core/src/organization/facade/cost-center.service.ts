import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, queueScheduler } from 'rxjs';
import { filter, map, observeOn, take, tap } from 'rxjs/operators';
import { StateWithProcess } from '../../process/store/process-state';
import { LoaderState } from '../../state/utils/loader/loader-state';
import { AuthService } from '../../auth/facade/auth.service';
import { CostCenter } from '../../model/cost-center.model';
import { EntitiesModel } from '../../model/misc.model';
import { StateWithOrganization } from '../store/organization-state';
import { CostCenterActions } from '../store/actions/index';
import {
  getCostCenterState,
  getCostCenterList,
  getAssignedBudgets,
} from '../store/selectors/cost-center.selector';
import { B2BSearchConfig } from '../model/search-config';
import { Budget } from '../../model/budget.model';

@Injectable()
export class CostCenterService {
  constructor(
    protected store: Store<StateWithOrganization | StateWithProcess<void>>,
    protected authService: AuthService
  ) {}

  loadCostCenter(costCenterCode: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new CostCenterActions.LoadCostCenter({ userId, costCenterCode })
      )
    );
  }

  loadCostCenters(params?: B2BSearchConfig) {
    this.withUserId(userId =>
      this.store.dispatch(
        new CostCenterActions.LoadCostCenters({ userId, params })
      )
    );
  }

  private getCostCenterState(costCenterCode: string) {
    return this.store.select(getCostCenterState(costCenterCode));
  }

  private getCostCenterList(
    params
  ): Observable<LoaderState<EntitiesModel<CostCenter>>> {
    return this.store.select(getCostCenterList(params));
  }
  private getBudgetList(
    costCenterCode,
    params
  ): Observable<LoaderState<EntitiesModel<Budget>>> {
    return this.store.select(getAssignedBudgets(costCenterCode, params));
  }

  get(costCenterCode: string): Observable<CostCenter> {
    return this.getCostCenterState(costCenterCode).pipe(
      observeOn(queueScheduler),
      tap(state => {
        if (!(state.loading || state.success || state.error)) {
          this.loadCostCenter(costCenterCode);
        }
      }),
      filter(state => state.success || state.error),
      map(state => state.value)
    );
  }

  getList(params: B2BSearchConfig): Observable<EntitiesModel<CostCenter>> {
    return this.getCostCenterList(params).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<CostCenter>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadCostCenters(params);
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<CostCenter>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  create(costCenter: CostCenter) {
    this.withUserId(userId =>
      this.store.dispatch(
        new CostCenterActions.CreateCostCenter({ userId, costCenter })
      )
    );
  }

  update(costCenterCode: string, costCenter: CostCenter) {
    this.withUserId(userId =>
      this.store.dispatch(
        new CostCenterActions.UpdateCostCenter({
          userId,
          costCenterCode,
          costCenter,
        })
      )
    );
  }

  loadBudgets(costCenterCode, params: B2BSearchConfig) {
    this.withUserId(userId =>
      this.store.dispatch(
        new CostCenterActions.LoadAssignedBudgets({
          userId,
          costCenterCode,
          params,
        })
      )
    );
  }

  getBudgets(
    costCenterCode: string,
    params: B2BSearchConfig
  ): Observable<EntitiesModel<Budget>> {
    return this.getBudgetList(costCenterCode, params).pipe(
      observeOn(queueScheduler),
      tap((process: LoaderState<EntitiesModel<Budget>>) => {
        if (!(process.loading || process.success || process.error)) {
          this.loadBudgets(costCenterCode, params);
        }
      }),
      filter(
        (process: LoaderState<EntitiesModel<Budget>>) =>
          process.success || process.error
      ),
      map(result => result.value)
    );
  }

  assignBudget(costCenterCode: string, budgetCode: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new CostCenterActions.AssignBudget({
          userId,
          costCenterCode,
          budgetCode,
        })
      )
    );
  }

  unassignBudget(costCenterCode: string, budgetCode: string) {
    this.withUserId(userId =>
      this.store.dispatch(
        new CostCenterActions.UnassignBudget({
          userId,
          costCenterCode,
          budgetCode,
        })
      )
    );
  }

  private withUserId(callback: (userId: string) => void): void {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(userId => callback(userId));
  }
}
