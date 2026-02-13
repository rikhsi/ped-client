import { computed, Pipe, PipeTransform } from '@angular/core';
import { PrivilegeItem } from '@api/models';
import { AuthService } from '@core/services';
import { differenceInYears } from 'date-fns';

@Pipe({
  name: 'privilegeAge',
  pure: true,
})
export class PrivilegeAgePipe implements PipeTransform {
  // получаем текущего пользователя
  user = computed(() => this.authService.user());

  constructor(private authService: AuthService) {}

  transform(privileges: PrivilegeItem[]): PrivilegeItem[] {
    const currentUser = this.user();
    if (!currentUser) return privileges;

    const age = differenceInYears(new Date(), new Date(currentUser.birthDate));
    const isMale = currentUser.gender; // true = мужчина, false = женщина

    return privileges.filter((privilege) => {
      if (!privilege.retirementAgeLogic) {
        // если нет логики возраста — оставляем
        return true;
      }

      // фильтруем по полу и возрасту
      return isMale ? age >= 55 : age >= 50;
    });
  }
}
