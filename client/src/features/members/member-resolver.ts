import { ResolveFn, Router } from '@angular/router';
import { Member } from '../../types/member';
import { inject } from '@angular/core';
import { EMPTY } from 'rxjs';
import { MemberService } from '../../core/services/member-service';

export const memberResolver: ResolveFn<Member> = (route, state) => {
  const memberService = inject(MemberService);
  const router = inject(Router);
  const memberId = route.paramMap.get('id');

  if (!memberId) {
    router.navigateByUrl('/not-found');
    return EMPTY;
  }

  return memberService.getMember(memberId);
};
