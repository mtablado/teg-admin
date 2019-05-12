export class Driver {
  // Database id.
  public rowid: string;
  // Backend id ¿Should we remove it?
  public id: string;
  public username: string;
  public name: string;
  public lastname: string;
  public plate: string;
  public status: string;

  public fullname(): string {
    return this.name + ' ' + this.lastname;
  }

  public toString() {
    return 'rowid: ' + this.rowid
      + ', id: ' + this.id
      + ', username: ' + this.username
      + ', name: ' + this.name
      + ', lastname: ' + this.lastname
      + ', plate: ' + this.plate
      + ', status: ' + this.status;
  }
}
