import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MODAL_OPTIONS } from '@constants';
import {
  ContentModal,
  ModalContentComponent,
} from '../modal-content/modal-content.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'ped-landing-footer',
  imports: [TranslocoDirective, NzIconModule, RouterLink],
  templateUrl: './landing-footer.component.html',
  styleUrl: './landing-footer.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingFooterComponent {
  private translocoService = inject(TranslocoService);

  constructor(private modalService: NzModalService) {}

  openMenuModal(title: string, content: string): void {
    this.modalService.create<ModalContentComponent, ContentModal>({
      ...MODAL_OPTIONS,
      nzClassName: 'scale-modal',
      nzContent: ModalContentComponent,
      nzData: {
        title,
        content,
      },
    });
  }

  getAttestationContent(): string {
    const lang = this.translocoService.getActiveLang();

    switch (lang) {
      case 'ru':
        return this.getAttestationContentRu();
      case 'en':
        return this.getAttestationContentEn();
      default:
        return this.getAttestationContentUz();
    }
  }

  getMinistersFundContent(): string {
    const lang = this.translocoService.getActiveLang();

    switch (lang) {
      case 'ru':
        return this.getMinistersFundContentRu();
      case 'en':
        return this.getMinistersFundContentEn();
      default:
        return this.getMinistersFundContentUz();
    }
  }

  getProfessionalCertificateContent(): string {
    const lang = this.translocoService.getActiveLang();

    switch (lang) {
      case 'ru':
        return this.getProfessionalCertificateContentRu();
      case 'en':
        return this.getProfessionalCertificateContentEn();
      default:
        return this.getProfessionalCertificateContentUz();
    }
  }

  // UZBEK VERSIONS
  private getAttestationContentUz(): string {
    return `
      <p><strong>Sarlavha:</strong> Malaka toifasi sinovlarida qatnashish tartibi</p>

      <p><strong>Kimlar qatnasha oladi?</strong><br>
      -Navbatdagi (majburiy) yoki navbatdan tashqari muddatda o'z toifasini oshirmoqchi bo'lgan barcha pedagog xodimlar.</p>

      <p><strong>Talablar va shartlar:</strong> Malaka sinovlari ikki bosqichda amalga oshiriladi. Yakuniy natija 100 ballik tizimda baholanadi:</p>
      <ol>
        <li>Mutaxassislik fani va kasb standarti bo'yicha bilim <strong>(80 ball)</strong>;</li>
        <li>Pedagogik mahoratni baholash <strong>(20 ball)</strong>: Pedagogning faoliyati samaradorligi tahlil qilinadi.</li>
      </ol>

      <p><strong>O'tish ballari:</strong></p>
      <ul>
        <li><strong>Oliy toifa:</strong> 80 ball va undan yuqori;</li>
        <li><strong>Birinchi toifa:</strong> 70 – 79 ball;</li>
        <li><strong>Ikkinchi toifa:</strong> 60 – 69 ball;</li>
        <li><strong>Mutaxassis:</strong> 55 – 59 ball.</li>
      </ul>

      <p><strong>Qanday ariza topshiriladi?</strong></p>
      <ul>
        <li>Arizalar <a href="https://pedagog.uzedu.uz" target="_blank">pedagog.uzedu.uz</a> platformasi yoki Yagona interaktiv davlat xizmatlari portali <a href="https://my.gov.uz" target="_blank">(my.gov.uz)</a> orqali yuboriladi.</li>
        <li>Ro'yxatdan o'tishda shaxsiy ma'lumotlar, ta'lim muassasasi va mutaxassislik fani to'g'ri kiritilishi shart.</li>
      </ul>

      <p><strong>Muhim eslatma:</strong> Xalqaro yoki milliy sertifikatga ega bo'lgan pedagoglar navbatdagi majburiy attestatsiya sinovi turida birinchi bosqich sinovlaridan ozod etiladi va ularga maksimal ball beriladi.</p>
    `;
  }

  private getMinistersFundContentUz(): string {
    return `
      <p>Vazir jamg'armasi ustamasiga talabgorlarni saralash</p>

      <p><strong>Bu nima?</strong> Yuqori malakali pedagoga kadrlarni rag'batlantirish maqsadida har oyda mehnatga haq to'lanishni eng kam miqdorining 5,5 barobarni miqdorida to'landigdan ustama. <strong>To'lov muddati — 9 oy.</strong></p>

      <p><strong>Tanlov talablari:</strong></p>
      <ol>
        <li>Nomzod test sinovida qatnashib, maksimal ballning kamida 86 foizini to'plashi kerak.</li>
      </ol>

      <p><strong>Ariza topshirish tartibi:</strong> Tanlov e'lon qilingan vaqtda <a href="https://pedagog.uzedu.uz" target="_blank">pedagog.uzedu.uz</a> platformasi orqali elektron ariza yuboriladi.</p>
    `;
  }

  private getProfessionalCertificateContentUz(): string {
    return `
      <p><strong>Kasbiy sertifikat nima?</strong><br>
      Pedagogik faoliyat bilan shug'ullanish huquqini beruvchi, muddatsiz va QR-kodli davlat namunasidagi hujjat.</p>

      <p><strong>Kimlar topshirishi mumkin?</strong></p>
      <ul>
        <li>Maktabga ilk bor ishga kirgan oliy ma'lumotli pedagoglar.</li>
        <li>Taqlitli malaka toifasiga ega bo'lmagan (mutaxassis) o'qituvchilar.</li>
      </ul>

      <p><strong>Sinov tartibi va baholash</strong></p>
      <ul>
        <li>Vaqti: Har yili mart–may oylarida.</li>
        <li>Shakli: Kompyutarda test (onlayn).</li>
        <li>Savollar soni: 50 ta (Jami 100 ball).</li>
        <li>O'tish ball: 60 ball va undan yuqori.</li>
      </ul>

      <p><strong>Sinovdan o'ta olmasa nima bo'ladi?</strong></p>
      <ol>
        <li><strong>Qavta imtihon:</strong> Birinchi marta vaqtdan ochun yangi o'quv yili boshlanganida qadar navbatdan tashqari sinov topshirish imkoniyati beriladi.</li>
        <li><strong>Chora:</strong> Navbatdan tashqari sinovda ham yetarli ball to'play olmagan pedagog bilan mehrnat shartnomasi bekor qilinadi.</li>
      </ol>

      <p><strong>Kimlar sinovdan ozod etiladi? To'liq ozod etildiganlar:</strong></p>
      <ul>
        <li>Magistr darajasiga ega mutaxassislar;</li>
        <li>Ilmiy darajaga (PhD, DSc) yoki ilmiy unvonga (dotsent, professor) ega bo'lganlar.</li>
      </ul>

      <p><strong>Vaqtincha ozod etiladiganlar (ma'lum muddatda):</strong></p>
      <ul>
        <li>Homilador ayollar va birinchi tiriklikdan eng kichikroq bola tug'ilganidan so'ng 1 yilgacha);</li>
        <li>3 yoshgacha farzandi bor ayollar;</li>
        <li>Uzog muddatli ta'siri davidslanida yoki o'qishida bo'lganlar (ishga qaytgacha, 6 oygacha).</li>
      </ul>

      <p><strong>Ariza topshirish:</strong> Arizalar <a href="https://pedagog.uzedu.uz" target="_blank">pedagog.uzedu.uz</a> platformasi yoki Yagona interaktiv davlat xizmatlari portali <a href="https://my.gov.uz" target="_blank">(my.gov.uz)</a> orqali yuboriladi.</p>
    `;
  }

  // RUSSIAN VERSIONS
  private getAttestationContentRu(): string {
    return `
      <p><strong>Заголовок:</strong> Порядок участия в квалификационных экзаменах</p>

      <p><strong>Кто может участвовать?</strong><br>
      Все педагогические работники, желающие повысить свою категорию в плановый (обязательный) или внеплановый срок.</p>

      <p><strong>Требования и условия:</strong> Квалификационные экзамены проводятся в два этапа. Итоговый результат оценивается по 100-балльной системе:</p>
      <ol>
        <li>Знание профессионального предмета и профессионального стандарта <strong>(80 баллов)</strong>;</li>
        <li>Оценка педагогического мастерства <strong>(20 баллов)</strong>: анализируется эффективность деятельности педагога.</li>
      </ol>

      <p><strong>Проходные баллы:</strong></p>
      <ul>
        <li><strong>Высшая категория:</strong> 80 баллов и выше;</li>
        <li><strong>Первая категория:</strong> 70 – 79 баллов;</li>
        <li><strong>Вторая категория:</strong> 60 – 69 баллов;</li>
        <li><strong>Специалист:</strong> 55 – 59 баллов.</li>
      </ul>

      <p><strong>Как подать заявку?</strong></p>
      <ul>
        <li>Заявки подаются через платформу <a href="https://pedagog.uzedu.uz" target="_blank">pedagog.uzedu.uz</a> или Единый портал интерактивных государственных услуг <a href="https://my.gov.uz" target="_blank">(my.gov.uz)</a>.</li>
        <li>При регистрации обязательно правильно указать личные данные, образовательное учреждение и профессиональный предмет.</li>
      </ul>

      <p><strong>Важное примечание:</strong> Педагоги, имеющие международный или национальный сертификат, освобождаются от первого этапа экзамена в рамках планового обязательного аттестационного экзамена и получают максимальный балл.</p>
    `;
  }

  private getMinistersFundContentRu(): string {
    return `
      <p>Отбор кандидатов на надбавку фонда министра</p>

      <p><strong>Что это?</strong> Надбавка, выплачиваемая ежемесячно в размере 5,5-кратного минимального размера оплаты труда с целью стимулирования высококвалифицированных педагогических кадров. <strong>Период выплаты — 9 месяцев.</strong></p>

      <p><strong>Требования к конкурсу:</strong></p>
      <ol>
        <li>Кандидат должен участвовать в тестовом экзамене и набрать не менее 86% от максимального балла.</li>
      </ol>

      <p><strong>Порядок подачи заявки:</strong> Электронная заявка подается через платформу <a href="https://pedagog.uzedu.uz" target="_blank">pedagog.uzedu.uz</a> во время объявления конкурса.</p>
    `;
  }

  private getProfessionalCertificateContentRu(): string {
    return `
      <p><strong>Что такое профессиональный сертификат?</strong><br>
      Государственный документ образца с QR-кодом, дающий право на осуществление педагогической деятельности, бессрочный.</p>

      <p><strong>Кто может сдавать?</strong></p>
      <ul>
        <li>Педагоги с высшим образованием, впервые поступающие на работу в школу.</li>
        <li>Учителя, не имеющие квалификационной категории (специалисты).</li>
      </ul>

      <p><strong>Порядок экзамена и оценка</strong></p>
      <ul>
        <li>Время: Ежегодно в марте–мае.</li>
        <li>Форма: Компьютерный тест (онлайн).</li>
        <li>Количество вопросов: 50 (Всего 100 баллов).</li>
        <li>Проходной балл: 60 баллов и выше.</li>
      </ul>

      <p><strong>Что будет, если не сдать экзамен?</strong></p>
      <ol>
        <li><strong>Повторный экзамен:</strong> При первой неудаче предоставляется возможность сдать внеплановый экзамен до начала нового учебного года.</li>
        <li><strong>Мера:</strong> Если педагог не наберет достаточный балл и на внеплановом экзамене, трудовой договор расторгается.</li>
      </ol>

      <p><strong>Кто освобождается от экзамена? Полностью освобождаются:</strong></p>
      <ul>
        <li>Специалисты со степенью магистра;</li>
        <li>Лица, имеющие ученую степень (PhD, DSc) или ученое звание (доцент, профессор).</li>
      </ul>

      <p><strong>Временно освобождаются (на определенный срок):</strong></p>
      <ul>
        <li>Беременные женщины и до 1 года после рождения первого ребенка;</li>
        <li>Женщины с детьми до 3 лет;</li>
        <li>Находящиеся в длительной командировке или на учебе (до возвращения на работу, до 6 месяцев).</li>
      </ul>

      <p><strong>Подача заявки:</strong> Заявки подаются через платформу <a href="https://pedagog.uzedu.uz" target="_blank">pedagog.uzedu.uz</a> или Единый портал интерактивных государственных услуг <a href="https://my.gov.uz" target="_blank">(my.gov.uz)</a>.</p>
    `;
  }

  // ENGLISH VERSIONS
  private getAttestationContentEn(): string {
    return `
      <p><strong>Title:</strong> Procedure for Participating in Qualification Exams</p>

      <p><strong>Who can participate?</strong><br>
      All pedagogical staff wishing to advance their category in scheduled (mandatory) or extraordinary terms.</p>

      <p><strong>Requirements and conditions:</strong> Qualification exams are conducted in two stages. The final result is evaluated on a 100-point scale:</p>
      <ol>
        <li>Knowledge of professional subject and professional standard <strong>(80 points)</strong>;</li>
        <li>Assessment of pedagogical skills <strong>(20 points)</strong>: the effectiveness of the teacher's performance is analyzed.</li>
      </ol>

      <p><strong>Passing scores:</strong></p>
      <ul>
        <li><strong>Highest category:</strong> 80 points and above;</li>
        <li><strong>First category:</strong> 70 – 79 points;</li>
        <li><strong>Second category:</strong> 60 – 69 points;</li>
        <li><strong>Specialist:</strong> 55 – 59 points.</li>
      </ul>

      <p><strong>How to apply?</strong></p>
      <ul>
        <li>Applications are submitted through the <a href="https://pedagog.uzedu.uz" target="_blank">pedagog.uzedu.uz</a> platform or the Unified Portal of Interactive Public Services <a href="https://my.gov.uz" target="_blank">(my.gov.uz)</a>.</li>
        <li>When registering, it is mandatory to correctly enter personal data, educational institution, and professional subject.</li>
      </ul>

      <p><strong>Important note:</strong> Teachers with international or national certificates are exempted from the first stage of the exam in the scheduled mandatory attestation exam and receive the maximum score.</p>
    `;
  }

  private getMinistersFundContentEn(): string {
    return `
      <p>Selection of Candidates for Minister's Fund Allowance</p>

      <p><strong>What is it?</strong> A monthly allowance paid at 5.5 times the minimum wage to encourage highly qualified teaching staff. <strong>Payment period — 9 months.</strong></p>

      <p><strong>Competition requirements:</strong></p>
      <ol>
        <li>The candidate must participate in the test exam and score at least 86% of the maximum score.</li>
      </ol>

      <p><strong>Application procedure:</strong> An electronic application is submitted through the <a href="https://pedagog.uzedu.uz" target="_blank">pedagog.uzedu.uz</a> platform when the competition is announced.</p>
    `;
  }

  private getProfessionalCertificateContentEn(): string {
    return `
      <p><strong>What is a professional certificate?</strong><br>
      A state-issued document with QR code that grants the right to engage in pedagogical activities, valid indefinitely.</p>

      <p><strong>Who can take it?</strong></p>
      <ul>
        <li>Teachers with higher education entering school for the first time.</li>
        <li>Teachers without a qualification category (specialists).</li>
      </ul>

      <p><strong>Exam procedure and assessment</strong></p>
      <ul>
        <li>Time: Annually in March–May.</li>
        <li>Form: Computer test (online).</li>
        <li>Number of questions: 50 (Total 100 points).</li>
        <li>Passing score: 60 points and above.</li>
      </ul>

      <p><strong>What happens if you fail the exam?</strong></p>
      <ol>
        <li><strong>Retake opportunity:</strong> On the first failure, an opportunity is provided to take an additional exam before the start of the new school year.</li>
        <li><strong>Consequence:</strong> If the teacher fails to score enough on the additional exam as well, the employment contract is terminated.</li>
      </ol>

      <p><strong>Who is exempted from the exam? Fully exempted:</strong></p>
      <ul>
        <li>Specialists with a master's degree;</li>
        <li>Persons with a scientific degree (PhD, DSc) or academic title (associate professor, professor).</li>
      </ul>

      <p><strong>Temporarily exempted (for a certain period):</strong></p>
      <ul>
        <li>Pregnant women and up to 1 year after the birth of the first child;</li>
        <li>Women with children under 3 years old;</li>
        <li>Those on long-term business trips or studies (until return to work, up to 6 months).</li>
      </ul>

      <p><strong>Application submission:</strong> Applications are submitted through the <a href="https://pedagog.uzedu.uz" target="_blank">pedagog.uzedu.uz</a> platform or the Unified Portal of Interactive Public Services <a href="https://my.gov.uz" target="_blank">(my.gov.uz)</a>.</p>
    `;
  }
}
