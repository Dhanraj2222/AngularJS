// import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
// import { FormsModule, NgForm, NgModel } from '@angular/forms'
// import { debounceTime } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
//   imports:[FormsModule],
// })
// export class LoginComponent {

//   private form = viewChild.required<NgForm>('form');
//   private destroyRef = inject(DestroyRef);

//   constructor(){
//     afterNextRender(() => {
//       const savedForm = window.localStorage.getItem('saved-login-form');

//       if(savedForm){
//         const loadedFormdData  = JSON.parse(savedForm);
//         const savedEmail = loadedFormdData.email;
//         setTimeout(() => {
//           this.form().controls['emails'].setValue(savedEmail);
//         },1);
//       }





//       const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({
//         next: (value) => window.localStorage.setItem('saved-login-form',JSON.stringify({email:value.email})),
//       });

//       this.destroyRef.onDestroy(() => subscription?.unsubscribe());
//     });

//   }


    
  
  
//     onSubmit(FormData: NgForm) {
//       if(FormData.form.invalid){
//         return;
//       }

//       const enterdemail = FormData.form.value.email;
//       const enteredpassword = FormData.form.value.password; 

//       console.log(enterdemail,enteredpassword);

//       FormData.form.reset();
//      }
// }


import { Component } from '@angular/core';
import { AbstractControl, FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';

function mustContainQuestionMark(control:AbstractControl){
  if(control.value.includes('?')){
    return null;
  }

  return { doesNotContainQuestionMark: true};
}

function emailIsUnique(control:AbstractControl){
  if(control.value !== 'test@example.com'){
    return of(null);

  }
  return of({ notUnique: true });
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports:[ReactiveFormsModule]
})
export class LoginComponent {

  form = new FormGroup({
    email : new FormControl('',{
      validators:[Validators.email,
      Validators.required],
    }),
    password: new FormControl('',{
      validators:[ Validators.required,Validators.minLength(6), mustContainQuestionMark,],
      asyncValidators: [emailIsUnique],
    }),
  });

  get emailIsInvalid(){
    return(
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid(){
    return(
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit(){

    const savedForm = window.localStorage.getItem('saved-login-form');

    if(savedForm){
      const loadForm =JSON.parse(savedForm);
    }



    const subscription =this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) =>{
        window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({ email:value.email })
        );
      },
    });
  }

  onSubmit(){
    console.log(this.form)
    const enterdEmail = this.form.value.email;
    const enteredpassword = this.form.value.password;

    console.log(enterdEmail,enteredpassword);
    
  }
}


