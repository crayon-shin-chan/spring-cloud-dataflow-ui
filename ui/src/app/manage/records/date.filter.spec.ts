import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecurityServiceMock } from '../../tests/api/security.service.mock';
import { AboutServiceMock } from '../../tests/api/about.service.mock';
import { AppServiceMock } from '../../tests/api/app.service.mock';
import { NotificationServiceMock } from '../../tests/service/notification.service.mock';
import { ContextService } from '../../shared/service/context.service';
import { RecordServiceMock } from '../../tests/api/record.service.mock';
import { DateFilterComponent } from './date.filter';
import { DateTime } from 'luxon';

describe('manage/records/action.filter.ts', () => {

  let component: DateFilterComponent;
  let fixture: ComponentFixture<DateFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DateFilterComponent,
      ],
      imports: [
        FormsModule,
        ClarityModule,
        BrowserAnimationsModule,
      ],
      providers: [
        SecurityServiceMock.provider,
        AboutServiceMock.provider,
        AppServiceMock.provider,
        NotificationServiceMock.provider,
        RecordServiceMock.provider,
        ContextService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFilterComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set the value', async (done) => {
    const dateStart = DateTime.fromFormat('2020-12-01', 'yyyy-MM-dd');
    const dateEnd = DateTime.fromFormat('2020-12-01', 'yyyy-MM-dd');
    component.value = [dateStart, dateEnd];
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.min).toBe(dateStart.toFormat('yyyy-MM-dd'));
    expect(component.max).toBe(dateEnd.toFormat('yyyy-MM-dd'));

    expect(component.value[0].toFormat('yyyy-MM-dd')).toBe(dateStart.toFormat('yyyy-MM-dd'));
    expect(component.value[1].toFormat('yyyy-MM-dd')).toBe(dateEnd.toFormat('yyyy-MM-dd'));

    component.max = '2020-12-15';
    component.change();
    fixture.detectChanges();

    expect(component.min).toBe(dateStart.toFormat('yyyy-MM-dd'));
    expect(component.max).toBe(dateEnd.toFormat('2020-12-15'));

    expect(component.value[0].toFormat('yyyy-MM-dd')).toBe(dateStart.toFormat('yyyy-MM-dd'));
    expect(component.value[1].toFormat('yyyy-MM-dd')).toBe('2020-12-15');
    expect(component.isActive()).toBeTruthy();
    expect(component.accepts()).toBeTruthy();
    done();
  });

});
