import { Component, OnInit, ViewChild } from '@angular/core';
import { FocasGroupComponent } from '../focas-group/focas-group.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FunctionNode } from '../../core/model/group-model';
declare var jQuery: any;
@Component({
  selector: 'app-focas-home',
  templateUrl: './focas-home.component.html',
  styleUrls: ['./focas-home.component.css']
})
export class FocasHomeComponent implements OnInit {
  hubProxy: any;
  @ViewChild('focasGroup', { static: true }) focasGroup: FocasGroupComponent;
  private currentFunction: FunctionNode;
  constructor(private message: NzMessageService) { }

  ngOnInit(): void {
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
