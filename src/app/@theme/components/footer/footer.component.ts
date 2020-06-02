import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a href="https://w3.ibm.com/bluepages/profile.html?uid=081971838" target="_blank">Miguel Tablado</a></b>
    </span>
    <div class="socials">
      <span>IBM Services for Container Platforms</span>
      <a href="https://github.ibm.com/IMCS4EU/imcs4eu-gda/" target="_blank" class="ion ion-social-github"></a>
      <!--a href="#" target="_blank" class="ion ion-social-facebook"></a>
      <a href="#" target="_blank" class="ion ion-social-twitter"></a>
      <a href="#" target="_blank" class="ion ion-social-linkedin"></a-->
    </div>
  `,
})
export class FooterComponent {
}
