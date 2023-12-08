import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/musicalconcertdb.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
