import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { OverlayComponent } from './overlay/overlay.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';

export const routes: Routes = [
    { path: '', component: MainContentComponent },
    { path: 'project/:id', component: OverlayComponent },
    { path: 'legal-notice', component: LegalNoticeComponent },
    { path: '**', redirectTo: '' }
];
