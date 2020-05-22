import { Component, OnInit, Input, NgZone } from '@angular/core';
import { HeaderItemModel, MataTypeEnum, DataVailModel } from '../core/hander-item';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ElectronService } from '../../core/services';

import * as fs from 'fs';
import * as path from 'path';

@Component({
  selector: 'app-laser-process',
  templateUrl: './laser-process.component.html',
  styleUrls: ['./laser-process.component.css']
})
export class LaserProcessComponent implements OnInit {
  nodes: HeaderItemModel[] = [];
  @Input() name: string = '';
  editCache: { [key: number]: { edit: boolean; data: HeaderItemModel } } = {};
  editChildrenCache: { [key: number]: { edit: boolean; data: DataVailModel } } = {};
  maxId = 0;
  savePath = '';

  constructor(private electron: ElectronService, private zone: NgZone) {
    const rootPath = path.dirname(electron.remote.app.getPath('exe'));
    this.savePath = path.join(rootPath, 'Assets', 'Process');

  }

  ngOnInit(): void {
    // this.nodes.push(new HeaderItemModel("NozzleKindCode", "割嘴类型", "Int32", false, "", MataTypeEnum.Combox, false, 0, new DataVailModel(0, 0, 100, false, 0), "NozzleKindCode", 0, false));
    fs.readFile(path.join(this.savePath, this.name), (err, data) => {
      if (err) {
        new Notification('默认文件读取失败', { body: err.message });
        return;
      }
      try {
        const arr = JSON.parse(data.toString());
        this.zone.run(() => {
          this.nodes = [...arr];

          this.nodes.forEach(d => { d.Id = this.maxId++; d.expand = false; });

          this.updateEditCache();
        });

      } catch (e) {
        // Catch Error
        // throw e;
        new Notification('文件格式出错', { body: e });

      }

    });
  }

  saveFile() {
    fs.writeFile(path.join(this.savePath, this.name), JSON.stringify(this.nodes), (err) => {

      if (err) {
        new Notification('文件保存失败', { body: err.message });
        return;
      }
      new Notification('保存成功', { body: this.name + '工艺配置文件保存成功' });

    });
  }
  startEdit(id: number): void {
    this.editCache[id].edit = true;
    this.editChildrenCache[id].edit = false;

  }
  startChildrenEdit(id: number) {
    this.editChildrenCache[id].edit = true;
    this.editCache[id].edit = false;
    this.editChildrenCache[id].data = Object.assign({}, this.editCache[id].data.VailModel);
  }
  cancelChildrenEdit(nodes: HeaderItemModel, id: number) {
    const index = this.nodes.findIndex(item => item.Id === id);
    console.log(this.nodes[index]);
    this.editChildrenCache[id] = {
      data: { ...this.nodes[index].VailModel },
      edit: false
    };
  }
  cancelEdit(id: number): void {
    const index = this.nodes.findIndex(item => item.Id === id);
    this.editCache[id] = {
      data: { ...this.nodes[index] },
      edit: false
    };
  }
  remove(index: number) {
    this.nodes = this.nodes.filter(d => d.Id !== index);
    console.log(this.nodes);
  }
  saveChildrenEdit(nodes: HeaderItemModel, id: number) {
    const index = this.nodes.findIndex(item => item.Id === id);
    Object.assign(this.nodes[index].VailModel, this.editChildrenCache[id].data);
    this.nodes[index].expand = true;
    this.editChildrenCache[id].edit = false;


  }
  saveEdit(id: number): void {
    const index = this.nodes.findIndex(item => item.Id === id);
    Object.assign(this.nodes[index], this.editCache[id].data);
    this.editCache[id].edit = false;
    //  console.log(this.nodes[index]);


  }
  sort(currentIndex: number, pre: number) {
    if (currentIndex + pre < 0 || (currentIndex + pre) >= this.nodes.length) {
      return;
    }
    moveItemInArray(this.nodes, currentIndex, currentIndex + pre);
    let index = 0;
    this.nodes.forEach(d => d.Index = index++);
  }
  addNew() {
    const item = new HeaderItemModel("NewPropName", "", "Int32", true, "", MataTypeEnum.Input, false, 0, new DataVailModel(0, 0, 100, false, 0), "", 0, false);
    item.Id = ++this.maxId;
    this.nodes = [...this.nodes, item];

    this.editCache[item.Id] = {
      edit: false,
      data: { ...item }
    };
    this.editChildrenCache[item.Id] = {
      edit: false,
      data: { ...item.VailModel }
    };
  }
  updateEditCache(): void {
    this.nodes.forEach(item => {
      this.editCache[item.Id] = {
        edit: false,
        data: { ...item }
      };
      this.editChildrenCache[item.Id] = {
        edit: false,
        data: { ...item.VailModel }
      };

    });
  }

}
