import { Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  I18nTestingModule,
  ReturnRequestList,
  OrderReturnRequestService,
} from '@spartacus/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ListNavigationModule } from '../../../../shared/components/list-navigation/list-navigation.module';
import { OrderReturnRequestsComponent } from './order-return-request-list.component';

const mockReturns: ReturnRequestList = {
  returnRequests: [
    {
      code: '1',
      rma: '1',
    },
    {
      code: '2',
      rma: '2',
    },
  ],
  pagination: { totalResults: 1, sort: 'byDate' },
  sorts: [{ code: 'byDate', selected: true }],
};

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockOrderReturnRequestService {
  returns = new BehaviorSubject(mockReturns);

  getOrderReturnRequestList(): Observable<ReturnRequestList> {
    return this.returns;
  }

  loadOrderReturnRequestList(
    _userId: string,
    _pageSize: number,
    _currentPage?: number,
    _sort?: string
  ): void {}

  clearOrderReturnRequestList() {}
}

describe('OrderReturnRequestListComponent', () => {
  let component: OrderReturnRequestsComponent;
  let fixture: ComponentFixture<OrderReturnRequestsComponent>;
  let returnService: MockOrderReturnRequestService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ListNavigationModule, I18nTestingModule],
      declarations: [OrderReturnRequestsComponent, MockUrlPipe],
      providers: [
        {
          provide: OrderReturnRequestService,
          useClass: MockOrderReturnRequestService,
        },
      ],
    }).compileComponents();

    returnService = TestBed.get(OrderReturnRequestService as Type<
      OrderReturnRequestService
    >);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderReturnRequestsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read order return request list', () => {
    let returns: ReturnRequestList;
    component.returnRequests$
      .subscribe(value => {
        returns = value;
      })
      .unsubscribe();
    expect(returns).toEqual(mockReturns);
  });

  it('should set correctly sort code', () => {
    spyOn(returnService, 'loadOrderReturnRequestList').and.stub();

    component.changeSortCode('byOrderNumber');

    expect(component.sortType).toBe('byOrderNumber');
    expect(returnService.loadOrderReturnRequestList).toHaveBeenCalledWith(
      5,
      0,
      'byOrderNumber'
    );
  });

  it('should set correctly page', () => {
    spyOn(returnService, 'loadOrderReturnRequestList').and.stub();

    component.sortType = 'byDate';
    component.pageChange(1);

    expect(returnService.loadOrderReturnRequestList).toHaveBeenCalledWith(
      5,
      1,
      'byDate'
    );
  });

  it('should clear return  requests data when component destroy', () => {
    spyOn(returnService, 'clearOrderReturnRequestList').and.stub();

    component.ngOnDestroy();
    expect(returnService.clearOrderReturnRequestList).toHaveBeenCalledWith();
  });
});
