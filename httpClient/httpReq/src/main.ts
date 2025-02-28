import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

function loggingInteceptor(request:HttpRequest<unknown>,next:HttpHandlerFn){
    console.log('[Outgoing Request]');
    console.log(request);


    return next(request);

}





bootstrapApplication(AppComponent,{
    providers:[provideHttpClient(withInterceptors([loggingInteceptor]))]
}).catch((err) => console.error(err));
