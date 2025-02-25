import { AfterViewInit, Component, ElementRef, OnInit, output, Output, viewChild, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { ButtonComponent } from '../../../shared/button/button.component';
import { ControlComponent } from "../../../shared/control/control.component";

//for entering newly generated ticket data
@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements OnInit ,AfterViewInit {
// @ViewChild('form') form?:ElementRef<HTMLFormElement>
private form = viewChild.required<ElementRef<HTMLFormElement>>('form');
add = output<{title:string,text:string}>();

ngOnInit(): void {
  console.log('ONinit');
  console.log(this.form().nativeElement);
}

ngAfterViewInit(): void {
  console.log('After View Init');
  console.log(this.form().nativeElement);
}


 
onSubmit(title:string,ticketText:string){
    // console.log(title);
    // console.log(ticketText);\
    this.add.emit({title:title,text:ticketText});
    this.form().nativeElement.reset();
    
}

}
