import { Component, OnInit, ViewChild } from '@angular/core';
import { LaserProcessComponent } from '../laser-process/laser-process.component';
import { HeaderItemModel, MataTypeEnum, DataVailModel } from '../core/hander-item';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ElectronService } from '../../core/services';

@Component({
  selector: 'app-laser-home',
  templateUrl: './laser-home.component.html',
  styleUrls: ['./laser-home.component.css']
})
export class LaserHomeComponent implements OnInit {
  @ViewChild('cuttingLaser') cuttingLaser: LaserProcessComponent;
  @ViewChild('piercingLaser') piercingLaser: LaserProcessComponent;
  @ViewChild('edgeLaser') edgeLaser: LaserProcessComponent;
  @ViewChild('slopeLaser') slopeLaser: LaserProcessComponent;
  confirmModal?: NzModalRef;
  processNode: ProcessNode[] = [];
  constructor(private modal: NzModalService, private electron: ElectronService) {
    this.processNode.push(new ProcessNode('CuttingProcess.json', this.cuttingLaser));
    this.processNode.push(new ProcessNode('EdgeProcess.json', this.piercingLaser));
    this.processNode.push(new ProcessNode('PiercingProcess.json', this.edgeLaser));
    this.processNode.push(new ProcessNode('SlopeProcess.json', this.slopeLaser));

  }

  ngOnInit(): void {
 
  }
  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '工艺数据配置',
      nzContent: '你确定保存当前工艺配置数据吗？',
      nzOnOk: () => {
        this.processNode.forEach(d => {
          this.electron.ipcRenderer.send('saveConfig', { data: JSON.stringify(d.nodes), path: d.fileName });
        });

        // new Promise((resolve, reject) => {
        //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        // }).catch(() => console.log('Oops errors!'))
      }

    });
  }
}


class ProcessNode {
  nodes: HeaderItemModel[] = [];
  constructor(public fileName: string, private componet: LaserProcessComponent) {
    this.nodes.push(new HeaderItemModel("ENo", "E编号", "Int32", true, "{0:D4}", MataTypeEnum.Input, false, 0, new DataVailModel(0, 0, 100, false, 0), "", 0, false));
    this.nodes.push(new HeaderItemModel("MaterialName", "材料类型", "string", false, "{0:D4}", MataTypeEnum.Input, false, 0, new DataVailModel(0, 0, 100, false, 0), "", 0, false));
    this.nodes.push(new HeaderItemModel("MaterialThickness", "材料厚度(mm)", "double", false, "{0:F2}", MataTypeEnum.Input, false, 0, new DataVailModel(0, 0, 100, true, 3), "", 0, true));
    this.nodes.push(new HeaderItemModel("NozzleKindCode", "割嘴类型", "Int32", false, "", MataTypeEnum.Combox, false, 0, new DataVailModel(0, 0, 100, false, 0), "NozzleKindCode", 0, false));
  }
}