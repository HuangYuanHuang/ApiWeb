import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { LaserProcessComponent } from '../laser-process/laser-process.component';
import { HeaderItemModel, MataTypeEnum, DataVailModel } from '../core/hander-item';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ElectronService } from '../../core/services';
import * as fs from 'fs';
import * as path from 'path';

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
  savePath = '';

  constructor(private modal: NzModalService, private electron: ElectronService, private zone: NgZone) {
    const rootPath = path.dirname(electron.remote.app.getPath('exe'));
    this.savePath = path.join(rootPath, 'Assets', 'Process');
  }

  ngOnInit(): void {

  }
  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '工艺数据配置',
      nzContent: '你确定保存当前工艺配置数据吗？',
      nzOnOk: () => {
        this.cuttingLaser.saveFile();
        this.piercingLaser.saveFile();
        this.edgeLaser.saveFile();
        this.slopeLaser.saveFile();

      }

    });
  }
}

