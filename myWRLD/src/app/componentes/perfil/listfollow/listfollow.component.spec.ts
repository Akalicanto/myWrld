import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfollowComponent } from './listfollow.component';

describe('ListfollowComponent', () => {
  let component: ListfollowComponent;
  let fixture: ComponentFixture<ListfollowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListfollowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListfollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
