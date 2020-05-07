export class GroupModel {
    public functionNodes: FunctionNode[] = [];
    constructor(public title: string, public count: number) {

    }
}

export class FunctionNode {
    public Detail: FunctionDetail;
    public Arguments: any;
    constructor(public name: string,
        public resolveParm: boolean,
        public isResolve: boolean, public resolveSuccess: boolean, public returnSuccess: boolean) {

    }
}

export class FunctionDetail {
    constructor(public Description: string) {

    }
}