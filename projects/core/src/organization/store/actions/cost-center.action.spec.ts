import {
  COST_CENTER_ENTITIES,
  COST_CENTER_LIST,
  COST_CENTER_ASSIGNED_BUDGETS,
} from '../organization-state';
import { CostCenter } from '../../../model/cost-center.model';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { CostCenterActions } from './index';

const costCenterCode = 'testCostCenterId';
const budgetCode = 'testBudgetCode';
const costCenter: CostCenter = {
  code: costCenterCode,
};
const userId = 'xxx@xxx.xxx';
const error = 'anError';
const params = { currentPage: 2 };
const query = '?pageSize=&currentPage=2&sort=';

const pagination = { currentPage: 1 };
const sorts = [{ selected: true, name: 'code' }];
const page = { ids: [costCenterCode], pagination, sorts };

describe('CostCenter Actions', () => {
  describe('LoadCostCenter Actions', () => {
    describe('LoadCostCenter', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadCostCenter({
          userId,
          costCenterCode,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_COST_CENTER,
          payload: { userId, costCenterCode },
          meta: StateEntityLoaderActions.entityLoadMeta(
            COST_CENTER_ENTITIES,
            costCenterCode
          ),
        });
      });
    });

    describe('LoadCostCenterFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadCostCenterFail({
          costCenterCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_COST_CENTER_FAIL,
          payload: { costCenterCode, error },
          meta: StateEntityLoaderActions.entityFailMeta(
            COST_CENTER_ENTITIES,
            costCenterCode,
            error
          ),
        });
      });
    });

    describe('LoadCostCenterSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadCostCenterSuccess([
          costCenter,
        ]);

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_COST_CENTER_SUCCESS,
          payload: [costCenter],
          meta: StateEntityLoaderActions.entitySuccessMeta(
            COST_CENTER_ENTITIES,
            [costCenterCode]
          ),
        });
      });
    });
  });

  describe('LoadCostCenters Actions', () => {
    describe('LoadCostCenters', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadCostCenters({
          userId,
          params,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_COST_CENTERS,
          payload: { userId, params },
          meta: StateEntityLoaderActions.entityLoadMeta(
            COST_CENTER_LIST,
            query
          ),
        });
      });
    });

    describe('LoadCostCentersFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadCostCentersFail({
          params,
          error: { error },
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_COST_CENTERS_FAIL,
          payload: { params, error: { error } },
          meta: StateEntityLoaderActions.entityFailMeta(
            COST_CENTER_LIST,
            query,
            {
              error,
            }
          ),
        });
      });
    });

    describe('LoadCostCentersSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadCostCentersSuccess({
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_COST_CENTERS_SUCCESS,
          payload: { page, params },
          meta: StateEntityLoaderActions.entitySuccessMeta(
            COST_CENTER_LIST,
            query
          ),
        });
      });
    });
  });

  describe('CreateCostCenter Actions', () => {
    describe('CreateCostCenter', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.CreateCostCenter({
          userId,
          costCenter,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.CREATE_COST_CENTER,
          payload: { userId, costCenter },
          meta: StateEntityLoaderActions.entityLoadMeta(
            COST_CENTER_ENTITIES,
            costCenterCode
          ),
        });
      });
    });

    describe('CreateCostCenterFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.CreateCostCenterFail({
          costCenterCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.CREATE_COST_CENTER_FAIL,
          payload: {
            costCenterCode,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            COST_CENTER_ENTITIES,
            costCenterCode,
            error
          ),
        });
      });
    });

    describe('CreateCostCenterSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.CreateCostCenterSuccess(
          costCenter
        );

        expect({ ...action }).toEqual({
          type: CostCenterActions.CREATE_COST_CENTER_SUCCESS,
          payload: costCenter,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            COST_CENTER_ENTITIES,
            costCenterCode
          ),
        });
      });
    });
  });

  describe('UpdateCostCenter Actions', () => {
    describe('UpdateCostCenter', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.UpdateCostCenter({
          userId,
          costCenterCode,
          costCenter,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.UPDATE_COST_CENTER,
          payload: { userId, costCenterCode, costCenter },
          meta: StateEntityLoaderActions.entityLoadMeta(
            COST_CENTER_ENTITIES,
            costCenterCode
          ),
        });
      });
    });

    describe('UpdateCostCenterFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.UpdateCostCenterFail({
          costCenterCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.UPDATE_COST_CENTER_FAIL,
          payload: {
            costCenterCode,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            COST_CENTER_ENTITIES,
            costCenterCode,
            error
          ),
        });
      });
    });

    describe('UpdateCostCenterSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.UpdateCostCenterSuccess(
          costCenter
        );

        expect({ ...action }).toEqual({
          type: CostCenterActions.UPDATE_COST_CENTER_SUCCESS,
          payload: costCenter,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            COST_CENTER_ENTITIES,
            costCenterCode
          ),
        });
      });
    });
  });

  describe('LoadAssignedBudgets Actions', () => {
    describe('LoadAssignedBudgets', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadAssignedBudgets({
          userId,
          costCenterCode,
          params,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_ASSIGNED_BUDGETS,
          payload: { userId, costCenterCode, params },
          meta: StateEntityLoaderActions.entityLoadMeta(
            COST_CENTER_ASSIGNED_BUDGETS,
            costCenterCode + query
          ),
        });
      });
    });

    describe('LoadAssignedBudgetsFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadAssignedBudgetsFail({
          costCenterCode,
          params,
          error,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_ASSIGNED_BUDGETS_FAIL,
          payload: {
            costCenterCode,
            params,
            error,
          },
          meta: StateEntityLoaderActions.entityFailMeta(
            COST_CENTER_ASSIGNED_BUDGETS,
            costCenterCode + query,
            error
          ),
        });
      });
    });

    describe('LoadAssignedBudgetsSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.LoadAssignedBudgetsSuccess({
          costCenterCode,
          page,
          params,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.LOAD_ASSIGNED_BUDGETS_SUCCESS,
          payload: {
            costCenterCode,
            page,
            params,
          },
          meta: StateEntityLoaderActions.entitySuccessMeta(
            COST_CENTER_ASSIGNED_BUDGETS,
            costCenterCode + query
          ),
        });
      });
    });
  });

  describe('AssignBudget Actions', () => {
    describe('AssignBudget', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.AssignBudget({
          userId,
          costCenterCode,
          budgetCode,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.ASSIGN_BUDGET,
          payload: { userId, costCenterCode, budgetCode },
        });
      });
    });

    describe('AssignBudgetFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.AssignBudgetFail({
          costCenterCode,
          budgetCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.ASSIGN_BUDGET_FAIL,
          payload: {
            costCenterCode,
            budgetCode,
            error,
          },
        });
      });
    });

    describe('AssignBudgetSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.AssignBudgetSuccess(null);

        expect({ ...action }).toEqual({
          type: CostCenterActions.ASSIGN_BUDGET_SUCCESS,
          payload: null,
        });
      });
    });
  });

  describe('UnassignBudget Actions', () => {
    describe('UnassignBudget', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.UnassignBudget({
          userId,
          costCenterCode,
          budgetCode,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.UNASSIGN_BUDGET,
          payload: { userId, costCenterCode, budgetCode },
        });
      });
    });

    describe('UnassignBudgetFail', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.UnassignBudgetFail({
          costCenterCode,
          budgetCode,
          error,
        });

        expect({ ...action }).toEqual({
          type: CostCenterActions.UNASSIGN_BUDGET_FAIL,
          payload: {
            costCenterCode,
            budgetCode,
            error,
          },
        });
      });
    });

    describe('UnassignBudgetSuccess', () => {
      it('should create the action', () => {
        const action = new CostCenterActions.UnassignBudgetSuccess(null);

        expect({ ...action }).toEqual({
          type: CostCenterActions.UNASSIGN_BUDGET_SUCCESS,
          payload: null,
        });
      });
    });
  });
});
