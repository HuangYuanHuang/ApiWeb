
/* SystemJS module definition */
declare var nodeModule: NodeModule;
interface NodeModule {
  id: string;
}
declare var jQuery: any;
interface $ {
  connection: any;
  //connection: any;
}
interface Window {
  process: any;
  require: any;
}
