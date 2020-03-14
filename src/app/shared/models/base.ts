export class Base {

  private _id: number;

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

}
