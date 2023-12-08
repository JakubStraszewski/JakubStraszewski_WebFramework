import { TestBed } from '@angular/core/testing';
import { MusicalconcertdbComponent } from './musicalconcertdb.component';

describe('MusicalconcertdbComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MusicalconcertdbComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MusicalconcertdbComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'MusicalConcertDatabase_AngularComponent'`, () => {
    const fixture = TestBed.createComponent(MusicalconcertdbComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('MusicalConcertDatabase_AngularComponent');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MusicalconcertdbComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, MusicalConcertDatabase_AngularComponent');
  });
});
