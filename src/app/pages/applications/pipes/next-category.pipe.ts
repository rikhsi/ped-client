import { Pipe, PipeTransform } from '@angular/core';
import {
  CATEGORY_PRIORITY,
  DiplomaItem,
  EducationLevel,
  MIDDLE_EDUCATION_LEVELS,
  PedagogueCategory,
} from '@api/models';

@Pipe({
  name: 'nextCategory',
})
export class NextCategoryPipe implements PipeTransform {
  transform(value: PedagogueCategory, diploma: DiplomaItem): PedagogueCategory {
    const isMiddleEducation =
      MIDDLE_EDUCATION_LEVELS.has(diploma.educationLevel) &&
      !(
        diploma.educationLevel === EducationLevel.PROFESSIONAL &&
        diploma.diplomaType === 2
      );

    // 1️⃣ Среднее образование → всегда Specialist
    if (isMiddleEducation) {
      return PedagogueCategory.SPECIALIST;
    }

    // 2️⃣ Ищем текущую категорию
    const currentIndex = CATEGORY_PRIORITY.indexOf(value);

    if (currentIndex === -1) {
      return value;
    }

    // 3️⃣ Следующая категория по приоритету
    return CATEGORY_PRIORITY.at(currentIndex + 1) ?? value;
  }
}
