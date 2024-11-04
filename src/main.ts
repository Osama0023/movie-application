import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import { registerLicense } from '@syncfusion/ej2-base';

// registerLicense('Your License Key')

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
