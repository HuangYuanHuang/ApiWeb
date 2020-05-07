import { Component, ViewChild } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { FocasGroupComponent } from './focas-group/focas-group.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GroupModel, FunctionNode } from './core/model/group-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hubProxy: any;
  @ViewChild('focasGroup', { static: true }) focasGroup: FocasGroupComponent;
  private currentFunction: FunctionNode;
  constructor(public electronService: ElectronService,
    private translate: TranslateService,
    private message: NzMessageService) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
    this.init();
  }
  init() {

    const script = document.createElement('script');
    script.onload = () => {
      jQuery.connection.hub.url = 'http://localhost:19876/signalr';
      this.hubProxy = jQuery.connection.focasNotice;
      this.hubProxy.client.getServiceInit = (nodes) => {
        this.focasGroup.showData(nodes);
      };
      this.hubProxy.client.getOperationInfo = (node) => {
        if (node.State) {
          this.message.create('success', node.Message);
        } else {
          this.message.create('error', node.Message);
        }
      };
      this.hubProxy.client.getReolveInfo = (node) => {
        this.currentFunction.Detail = node.Detail;
        this.currentFunction.resolveSuccess = true;
        this.currentFunction.Arguments = node.Arguments;
        console.log(this.currentFunction);
      };
      jQuery.connection.hub.start()
        .done(function () { console.log('Now connected, connection ID=' + jQuery.connection.hub.id); })
        .fail(function () { console.log('Could not Connect!'); });
    };
    script.src = 'http://localhost:19876/signalr/hubs';
    document.head.appendChild(script);

  }
  connectCnc(data: any) {
    this.hubProxy?.server.connectCNC(data.Ip, data.Port);
  }
  groupSelectEvent(data: FunctionNode) {
    if (!data.resolveSuccess) {
     
    }
    this.currentFunction = data;
    this.hubProxy?.server.resolveFunction(data?.name);

  }
}
