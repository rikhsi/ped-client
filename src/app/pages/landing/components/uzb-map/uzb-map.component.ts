import { Component, computed, input } from '@angular/core';

import { TranslocoModule } from '@jsverse/transloco';
import { RegionStatistics } from '@api/models';
import { RegionDataMap } from '@pages/landing/models';

@Component({
  selector: 'ped-uzb-map',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './uzb-map.component.html',
  styleUrls: ['./uzb-map.component.less'],
})
export class UzbMapComponent {
  data = input<RegionStatistics[]>([]);
  selectedRegionKey: string | null = null;
  hoveredRegion: string | null = null;

  // Region name mapping to keys and coordinates
  private regionMapping: RegionDataMap = {
    "Qoraqalpog'iston Respublikasi": { name: 'UZQR', cx: 140, cy: 140 },
    'Xorazm viloyati': { name: 'UZXO', cx: 150, cy: 176 },
    'Navoiy viloyati': { name: 'UZNW', cx: 280, cy: 150 },
    'Buxoro viloyati': { name: 'UZBU', cx: 250, cy: 240 },
    'Samarqand viloyati': { name: 'UZSA', cx: 315, cy: 240 },
    'Jizzax viloyati': { name: 'UZJI', cx: 360, cy: 215 },
    'Sirdaryo viloyati': { name: 'UZSI', cx: 395, cy: 215 },
    'Toshkent viloyati': { name: 'UZTK', cx: 430, cy: 195 },
    'Toshkent shahri': { name: 'UZTO', cx: 407, cy: 180 },
    'Namangan viloyati': { name: 'UZNG', cx: 470, cy: 185 },
    'Andijon viloyati': { name: 'UZAN', cx: 505, cy: 205 },
    "Farg'ona viloyati": { name: 'UZFA', cx: 470, cy: 215 },
    'Qashqadaryo viloyati': { name: 'UZQA', cx: 330, cy: 280 },
    'Surxondaryo viloyati': { name: 'UZSU', cx: 355, cy: 325 },
  };

  private readonly regionNameToKey: Record<string, string> = {
    // Uzbek (original)
    'Qoraqalpog‘iston Respublikasi': "Qoraqalpog'iston Respublikasi",
    'Xorazm viloyati': 'Xorazm viloyati',
    'Navoiy viloyati': 'Navoiy viloyati',
    'Buxoro viloyati': 'Buxoro viloyati',
    'Samarqand viloyati': 'Samarqand viloyati',
    'Jizzax viloyati': 'Jizzax viloyati',
    'Sirdaryo viloyati': 'Sirdaryo viloyati',
    'Toshkent viloyati': 'Toshkent viloyati',
    'Toshkent shahri': 'Toshkent shahri',
    'Namangan viloyati': 'Namangan viloyati',
    'Andijon viloyati': 'Andijon viloyati',
    'Farg‘ona viloyati': "Farg'ona viloyati",
    'Qashqadaryo viloyati': 'Qashqadaryo viloyati',
    'Surxondaryo viloyati': 'Surxondaryo viloyati',

    // Russian
    'Республика Каракалпакстан': "Qoraqalpog'iston Respublikasi",
    'Хорезмская область': 'Xorazm viloyati',
    'Навоийская область': 'Navoiy viloyati',
    'Бухарская область': 'Buxoro viloyati',
    'Самаркандская область': 'Samarqand viloyati',
    'Джизакская область': 'Jizzax viloyati',
    'Сырдарьинская область': 'Sirdaryo viloyati',
    'Ташкентская область': 'Toshkent viloyati',
    'город Ташкент': 'Toshkent shahri',
    'Город Ташкент': 'Toshkent shahri',
    'Наманганская область': 'Namangan viloyati',
    'Андижанская область': 'Andijon viloyati',
    'Ферганская область': "Farg'ona viloyati",
    'Кашкадарьинская область': 'Qashqadaryo viloyati',
    'Сурхандарьинская область': 'Surxondaryo viloyati',

    // English
    'Republic of Karakalpakstan': "Qoraqalpog'iston Respublikasi",
    'Khorezm region': 'Xorazm viloyati',
    'Navoi region': 'Navoiy viloyati',
    'Bukhara region': 'Buxoro viloyati',
    'Samarkand region': 'Samarqand viloyati',
    'Jizzakh region': 'Jizzax viloyati',
    'Syrdarya region': 'Sirdaryo viloyati',
    'Tashkent region': 'Toshkent viloyati',
    'Tashkent city': 'Toshkent shahri',
    'Namangan region': 'Namangan viloyati',
    'Andijan region': 'Andijon viloyati',
    'Fergana region': "Farg'ona viloyati",
    'Kashkadarya region': 'Qashqadaryo viloyati',
    'Surkhandarya region': 'Surxondaryo viloyati',
  };

  regionData = computed<RegionDataMap>(() => {
    const apiData = this.data();
    const result: RegionDataMap = {};

    apiData.forEach((region) => {
      const uzbekKey = this.regionNameToKey[region.regionName];

      if (uzbekKey) {
        const mapping = this.regionMapping[uzbekKey];
        if (mapping) {
          result[mapping.name] = {
            name: region.regionName,
            cx: mapping.cx,
            cy: mapping.cy,
            applications: region.totalCount,
          };
        }
      }
    });

    return result;
  });

  totalApplications = computed(() => {
    return this.data().reduce((sum, region) => sum + region.totalCount, 0);
  });

  get regionEntries() {
    return Object.entries(this.regionData());
  }

  onRegionMouseEnter(key: string | null): void {
    this.hoveredRegion = key;
  }

  onRegionClick(key: string): void {
    this.selectedRegionKey = this.selectedRegionKey === key ? null : key;
  }

  formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  getMarkerColor(key: string): string {
    return this.hoveredRegion === key || this.selectedRegionKey === key
      ? '#64748b'
      : '#334155';
  }

  getLabelBgColor(key: string): string {
    return this.hoveredRegion === key || this.selectedRegionKey === key
      ? '#64748b'
      : '#334155';
  }

  getRegionFill(key: string): string {
    return this.selectedRegionKey === key ? '#56C3DD' : '#A6E1F0';
  }
}
