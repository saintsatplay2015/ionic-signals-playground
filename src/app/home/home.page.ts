import { Component, 
         signal, 
         WritableSignal, 
         AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonHeader, 
         IonToolbar, 
         IonTitle, 
         IonContent,
         IonItem,
         IonLabel,
         IonAccordion,
         IonAccordionGroup,
     } from '@ionic/angular/standalone';
import { Observable, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, 
            IonToolbar, 
            IonTitle, 
            IonContent, 
            IonItem,
            IonLabel,
            IonAccordion,
            IonAccordionGroup,
            AsyncPipe],
})
export class HomePage implements AfterViewInit {

  
  private remoteUri = 'https://airportsusingbodyscanners.com/sample-test.json';


  public airports: WritableSignal<any> = signal<any | null>(null);
  

  public counter$!: Observable<Array<any>>;


  public counter: WritableSignal<any> = signal<any | null>(null);


  constructor(private http: HttpClient) {}


  ngAfterViewInit(): void {
    this.getBySubscribe();    
    this.getByAsync();
  }


  public get(): Observable<any> {
    return this.http.get<any>(this.remoteUri);
  }


  public getBySubscribe() {
    this.get()
    .subscribe((data) => {
      this.airports.set(data['global-locations']);
      console.log('airports', this.airports());
    });
  }


  public getByAsync() {
      this.counter$ = this.get()
                          .pipe(
                            map((data: any) => {
                              this.counter.set(data['global-locations']);
                              console.log('counter', this.counter());
                              return data;
                            })
                          );      
  }


}
