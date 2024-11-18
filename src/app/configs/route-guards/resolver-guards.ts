import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {ShowSliderService} from "../../shared/services/show-slider.service";


// const showSliderService: ShowSliderService = inject(ShowSliderService);

export const resolveTrending: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(ShowSliderService).getTrending()
};

