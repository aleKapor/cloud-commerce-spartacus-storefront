import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { EMPTY, from, Observable } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthService } from '../../../auth/facade/auth.service';
import { SiteContextActions } from '../../../site-context/store/actions/index';
import { makeErrorSerializable } from '../../../util/serialization-utils';
import { CartConnector } from '../../connectors/cart/cart.connector';
import { SaveCartConnector } from '../../connectors/save-cart/save-cart.connecter';
import { CartActions } from '../actions';
import { StateWithMultiCart } from '../multi-cart-state';
import { MultiCartSelectors } from '../selectors';

/**
 * @deprecated since version 1.5
 *
 * spartacus ngrx effects will no longer be a part of public API
 *
 * TODO(issue:#4507)
 */
@Injectable()
export class WishListEffects {
  @Effect()
  createWishList$: Observable<
    CartActions.CreateWishListSuccess | CartActions.CreateWishListFail
  > = this.actions$.pipe(
    ofType(CartActions.CREATE_WISH_LIST),
    map((action: CartActions.CreateWishList) => action.payload),
    switchMap(payload => {
      return this.cartConnector.create(payload.userId).pipe(
        switchMap(cart => {
          return this.saveCartConnector
            .saveCart(
              payload.userId,
              cart.code,
              payload.name,
              payload.description
            )
            .pipe(
              switchMap(saveCartResult => [
                new CartActions.CreateWishListSuccess({
                  cart: saveCartResult.savedCartData,
                  userId: payload.userId,
                }),
              ]),
              catchError(error =>
                from([
                  new CartActions.CreateWishListFail({
                    cartId: cart.code,
                    error: makeErrorSerializable(error),
                  }),
                ])
              )
            );
        })
      );
    })
  );

  @Effect()
  loadWishList$: Observable<
    | CartActions.LoadWishListSuccess
    | CartActions.CreateWishList
    | CartActions.LoadCartFail
  > = this.actions$.pipe(
    ofType(CartActions.LOAD_WISH_LIST),
    map((action: CartActions.LoadWishList) => action.payload),
    concatMap(payload => {
      const { userId, customerId } = payload;
      return this.cartConnector.loadAll(userId).pipe(
        switchMap(carts => {
          if (carts) {
            const wishList = carts.find(
              cart => cart.name === `wishlist${customerId}`
            );
            if (Boolean(wishList)) {
              return [
                new CartActions.LoadWishListSuccess({
                  cart: wishList,
                  userId,
                }),
              ];
            } else {
              return [
                new CartActions.CreateWishList({
                  userId,
                  name: `wishlist${customerId}`,
                }),
              ];
            }
          }
        }),
        catchError(error =>
          from([new CartActions.LoadCartFail(makeErrorSerializable(error))])
        )
      );
    })
  );

  @Effect()
  resetWishList$: Observable<
    CartActions.LoadWishListSuccess | CartActions.LoadCartFail
  > = this.actions$.pipe(
    ofType(
      SiteContextActions.LANGUAGE_CHANGE,
      SiteContextActions.CURRENCY_CHANGE
    ),
    withLatestFrom(
      this.authService.getOccUserId(),
      this.store.pipe(select(MultiCartSelectors.getWishListId))
    ),
    switchMap(([, userId, wishListId]) => {
      if (Boolean(wishListId)) {
        return this.cartConnector.load(userId, wishListId).pipe(
          switchMap(wishList => [
            new CartActions.LoadWishListSuccess({ cart: wishList, userId }),
          ]),
          catchError(error =>
            from([new CartActions.LoadCartFail(makeErrorSerializable(error))])
          )
        );
      }
      return EMPTY;
    })
  );

  constructor(
    private actions$: Actions,
    private cartConnector: CartConnector,
    private saveCartConnector: SaveCartConnector,
    private authService: AuthService,
    private store: Store<StateWithMultiCart>
  ) {}
}
