import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { LaserProcessComponent } from '../laser-process/laser-process.component';
import { HeaderItemModel, MataTypeEnum, DataVailModel } from '../core/hander-item';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ElectronService } from '../../core/services';
import * as fs from 'fs';
import * as path from 'path';
import { NzTabComponent } from 'ng-zorro-antd/tabs/ng-zorro-antd-tabs';

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
  dataCache: { [key: number]: { data: any } } = {};
  currentTab: any;

  constructor(private modal: NzModalService, private electron: ElectronService, private zone: NgZone) {
    const rootPath = path.dirname(electron.remote.app.getPath('exe'));
    this.savePath = path.join(rootPath, 'Assets', 'Process');
  }

  ngOnInit(): void {
    this.dataCache[0] = { data: { fileName: 'CuttingProcess.json', title: '切割', index: 0, component: this.cuttingLaser } };
    this.dataCache[1] = { data: { fileName: 'PiercingProcess.json', title: '穿孔', index: 1, component: this.piercingLaser } };
    this.dataCache[2] = { data: { fileName: 'EdgeProcess.json', title: '尖角切割', index: 2, component: this.edgeLaser } };
    this.dataCache[3] = { data: { fileName: 'SlopeProcess.json', title: '功率控制', index: 3, component: this.slopeLaser } };
    this.currentTab = this.dataCache[0].data;
  }
  nzSelectChange(data: { index: number, tab: NzTabComponent }) {
    this.currentTab = this.dataCache[data.index].data;
  }
  changePath() {
    this.electron.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }).then(res => {
      console.log(res.filePaths);
      if (res.filePaths.length > 0) {
        this.savePath = path.join(res.filePaths[0]);
        this.getComponent(this.currentTab.index).initData();
        
      }
    })
  }
  getComponent(index: number): LaserProcessComponent {
    if (index == 0) {
      return this.cuttingLaser;
    }
    if (index == 1) {
      return this.piercingLaser;
    }
    if (index == 2) {
      return this.edgeLaser;
    }
    if (index == 3) {
      return this.slopeLaser;
    }
  }
  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '工艺数据配置',
      nzContent: `你确定保存【${this.currentTab.title}】配置数据吗？`,
      nzOnOk: () => {
        this.getComponent(this.currentTab.index).saveFile();
        // this.cuttingLaser.saveFile();
        // this.piercingLaser.saveFile();
        // this.edgeLaser.saveFile();
        // this.slopeLaser.saveFile();

      }

    });
  }
}

