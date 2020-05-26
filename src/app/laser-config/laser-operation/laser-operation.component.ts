import { Component, OnInit, Input, NgZone } from '@angular/core';
import { OperationModel, DataVailModel } from '../core/hander-item';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ElectronService } from '../../core/services';
import * as path from 'path';
import * as fs from 'fs';

@Component({
  selector: 'app-laser-operation',
  templateUrl: './laser-operation.component.html',
  styleUrls: ['./laser-operation.component.css']
})
export class LaserOperationComponent implements OnInit {
  @Input() nodes: OperationModel[] = [];
  confirmModal?: NzModalRef;

  vailNodes: DataVailModel[] = [];
  editCache: { [key: number]: { edit: boolean; data: OperationModel } } = {};
  editChildrenCache: { [key: number]: { edit: boolean; data: DataVailModel } } = {};

  maxId = 0;
  savePath = '';
  nzScroll = { y: '1600px' };

  constructor(private modal: NzModalService, private electronService: ElectronService, private zone: NgZone) {
    const rootPath = path.dirname(electronService.remote.app.getPath('exe'));
    this.savePath = path.join(rootPath, 'Assets', 'MachineIO', 'MachineOperation.json');
    // if (jQuery('body').width() < 1500) {
    //   this.nzScroll.x = '1800px';

    // }
  }

  ngOnInit(): void {

    this.initData();
  }
  initData() {

    this.electronService.fs.readFile(this.savePath, (err, data) => {
      if (err) {
        new Notification('默认文件读取失败', { body: err.message });
        return;
      }
      try {
        const arr = JSON.parse(data.toString());
        this.zone.run(() => {
          this.nodes = [...arr];
          this.nodes.forEach(d => d.Id = this.maxId++);
          this.nodes.forEach(d => d.Vails.forEach(g => g.Id = this.maxId++));
          this.updateEditCache();
        });
      } catch (e) {
        // Catch Error
        // throw e;
        new Notification('文件格式出错', { body: e });

      }

    });
  }
  changePath() {
    this.electronService.remote.dialog.showOpenDialog({ properties: ['openDirectory'] }).then(res => {
      console.log(res.filePaths);
      if (res.filePaths.length > 0) {
        this.savePath = path.join(res.filePaths[0], 'MachineOperation.json');
        this.initData();

      }
    })
  }
  addRow() {
    const operaNode = new OperationModel(++this.maxId, 'NewName' + this.maxId, '新标题');
    const vailNode = new DataVailModel(0, 0, 100, true, 3);
    vailNode.Id = 100 + this.maxId;
    vailNode.Title = "Title" + this.maxId;
    vailNode.Name = "Name" + this.maxId;
    operaNode.Vails.push(vailNode);
    this.nodes = [...this.nodes, operaNode];
    this.editCache[operaNode.Id] = {
      edit: false,
      data: { ...operaNode }
    };
    this.editChildrenCache[vailNode.Id] = {
      edit: false,
      data: { ...vailNode }
    }
  }

  removeParent(index: number) {
    this.nodes = this.nodes.filter(d => d.Id !== index);
  }
  startEdit(id: number): void {
    // console.log(this.editCache[id]);
    this.editCache[id].edit = true;
  }
  startChildrenEdit(id: number) {
    this.editChildrenCache[id].edit = true;
  }
  cancelEdit(id: number): void {
    const index = this.nodes.findIndex(item => item.Id === id);
    this.editCache[id] = {
      data: { ...this.nodes[index] },
      edit: false
    };
  }
  cancelChildrenEdit(nodes: OperationModel, id: number) {
    const index = nodes.Vails.findIndex(item => item.Id === id);
    this.editChildrenCache[id] = {
      data: { ...nodes.Vails[index] },
      edit: false
    };
  }
  addChildren(node: OperationModel) {
    this.maxId++;
    const vailNode = new DataVailModel(0, 0, 100, true, 3);
    vailNode.Id = 200 + this.maxId;
    vailNode.Title = "Title" + this.maxId;
    vailNode.Name = "Name" + this.maxId;
    node.Vails = [...node.Vails, vailNode];
    node.expand = true;
    this.editChildrenCache[vailNode.Id] = {
      edit: false,
      data: { ...vailNode }
    }
  }
  removeChildren(nodes: OperationModel, id: number) {
    const dd = nodes.Vails.filter(d => d.Id !== id);
    nodes.Vails = [...dd];
  }

  saveEdit(id: number): void {
    const index = this.nodes.findIndex(item => item.Id === id);
    this.editCache[id].data.Vails = this.nodes[index].Vails;
    this.editCache[id].data.expand = this.nodes[index].expand;
    Object.assign(this.nodes[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }
  saveChildrenEdit(nodes: OperationModel, id: number) {
    const index = nodes.Vails.findIndex(item => item.Id === id);
    Object.assign(nodes.Vails[index], this.editChildrenCache[id].data);
    this.editChildrenCache[id].edit = false;


  }
  addNew(index: number) {
    const item = new DataVailModel(0, 0, 100, false, 0);
    item.Id = ++this.maxId;
    this.nodes[index].Vails.push(item);

    this.editChildrenCache[item.Id] = {
      edit: false,
      data: { ...item }
    };
  }
  updateEditCache(): void {
    this.nodes.forEach(item => {
      this.editCache[item.Id] = {
        edit: false,
        data: { ...item }
      };
      item.Vails.forEach(d => {
        this.editChildrenCache[d.Id] = {
          edit: false,
          data: { ...d }
        }
      })
    });
  }
  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: '手动模块配置',
      nzContent: '你确定保存当前配置数据吗？',
      nzOnOk: () => {
        fs.writeFile(this.savePath, JSON.stringify(this.nodes), (err) => {
          if (err) {
            new Notification('文件保存失败', { body: err.message });
            return;
          }
          new Notification('保存成功', { body: '配置文件保存成功' });
        });

      }

    });

  }
}
