import { TestBed } from '@angular/core/testing';
import { UrlMatcher } from '@angular/router';
import {
  DEFAULT_URL_MATCHER_FACTORY,
  UrlMatcherFactory,
  UrlMatcherService,
} from '@spartacus/core';
import { PRODUCT_LISTING_URL_MATCHER_FACTORY } from './product-listing-url-matcher-factory';

const combinedUrlMatcher: UrlMatcher = () => null;
class MockUrlMatcherService implements Partial<UrlMatcherService> {
  combine = jasmine.createSpy('combine').and.returnValue(combinedUrlMatcher);
}

const mockDefaultUrlMatcher: UrlMatcher = () => null;
const mockDefaultUrlMatcherFactory: UrlMatcherFactory = jasmine
  .createSpy('mockDefaultUrlMatcherFactory')
  .and.returnValue(mockDefaultUrlMatcher);

describe('PRODUCT_LISTING_URL_MATCHER_FACTORY', () => {
  let urlMatcherService: UrlMatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DEFAULT_URL_MATCHER_FACTORY,
          useValue: mockDefaultUrlMatcherFactory,
        },
        {
          provide: UrlMatcherService,
          useClass: MockUrlMatcherService,
        },
      ],
    });
    urlMatcherService = TestBed.inject(UrlMatcherService);
  });

  it('should provide a factory that combines default url matcher and suffix url matcher', () => {
    const factory = TestBed.inject(PRODUCT_LISTING_URL_MATCHER_FACTORY);
    const mockRoute = {};
    const urlMatcher = factory(mockRoute);
    const combinedMatchers = urlMatcherService.combine['calls'].argsFor(0)[0];
    expect(mockDefaultUrlMatcherFactory).toHaveBeenCalledWith(mockRoute);
    expect(combinedMatchers[0]).toBe(mockDefaultUrlMatcher);
    expect(combinedMatchers[1].suffixRouteConfig).toEqual({
      marker: 'c',
      paramName: 'categoryCode',
      precedingParamName: 'param',
    });
    expect(urlMatcher).toBe(combinedUrlMatcher);
  });
});