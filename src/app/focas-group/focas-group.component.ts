import { Component, OnInit, NgZone, EventEmitter, Output } from '@angular/core';
import { NzMenuItemDirective } from 'ng-zorro-antd/menu';
import { GroupModel, FunctionNode, FunctionDetail } from '../core/model/group-model';
@Component({
  selector: 'app-focas-group',
  templateUrl: './focas-group.component.html',
  styleUrls: ['./focas-group.component.css']
})
export class FocasGroupComponent implements OnInit {
  groupNodes: GroupModel[] = [];
  @Output() groupSelectEvent = new EventEmitter<FunctionNode>();
  constructor(private zone: NgZone) { }

  ngOnInit(): void {
  }
  showData(nodes: any[]) {
    const tempNodes = [];
    nodes.forEach(d => {
      const temp = new GroupModel(d.Title, d.FunctionNodes.length);
      tempNodes.push(temp);
      d.FunctionNodes.forEach(item => {
        const func = new FunctionNode(item.FunctionName, item.ResolveParm, item.IsResolve, item.ResolveSuccess, false);
        func.Detail = new FunctionDetail(item.Detail?.Description);
        temp.functionNodes.push(func);
      });
    });
    this.zone.run(() => {
      this.groupNodes = tempNodes;
    })
    console.debug(this.groupNodes);
  }
  menuClick(data: FunctionNode) {
    
    this.groupSelectEvent?.emit(data);
  }
}
