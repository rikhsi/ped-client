import { computed, Pipe, PipeTransform } from '@angular/core';
import { PrivilegeItem } from '@api/models';
import { AuthService } from '@core/services';

const DAYS_IN_YEAR = 365.25;
const REQUIRED_YEARS = 25;

@Pipe({
  name: 'privilegeExperience',
  standalone: true,
})
export class PrivilegeExperiencePipe implements PipeTransform {
  // стаж в ГОДАХ
  private pedExperienceYears = computed(() => {
    const days = this.authService.workExperience()?.pedagogueExperiences ?? 0;

    return Math.floor(days / DAYS_IN_YEAR);
  });

  constructor(private authService: AuthService) {}

  transform(privileges: PrivilegeItem[]): PrivilegeItem[] {
    if (!privileges?.length) {
      return [];
    }

    const years = this.pedExperienceYears();

    return privileges.filter((item) => {
      // если НЕ требует 25 лет — показываем всегда
      if (!item.workExperience25Year) {
        return true;
      }

      // если требует — проверяем стаж
      return years >= REQUIRED_YEARS;
    });
  }
}
