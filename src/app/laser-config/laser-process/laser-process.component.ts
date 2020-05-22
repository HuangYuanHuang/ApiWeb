import { Component, OnInit, Input } from '@angular/core';
import { HeaderItemModel, MataTypeEnum, DataVailModel } from '../core/hander-item';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-laser-process',
  templateUrl: './laser-process.component.html',
  styleUrls: ['./laser-process.component.css']
})
export class LaserProcessComponent implements OnInit {
  @Input() nodes: HeaderItemModel[] = [];
  editCache: { [key: number]: { edit: boolean; data: HeaderItemModel } } = {};
  maxId = 0;
  constructor() { }

  ngOnInit(): void {
    this.nodes.forEach(d => d.Id = this.maxId++);
    this.updateEditCache();
  }
  startEdit(id: number): void {
    // console.log(this.editCache[id]);
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.nodes.findIndex(item => item.Id === id);
    this.editCache[id] = {
      data: { ...this.nodes[index] },
      edit: false
    };
  }
  remove(index: number) {
    this.nodes.splice(index, 1);
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
    this.nodes.push(item);

    this.editCache[item.Id] = {
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
    });
  }

}
