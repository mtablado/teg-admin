export class User {
  // Database id.
  public rowid: string;
  // Backend id ¿Should we remove it?
  public id: string;
  public username: string;
  public name: string;
  public lastname: string;
  public status: string;
  public type: string;

  public toString() {
    return 'rowid: ' + this.rowid
      + ', id: ' + this.id
      + ', username: ' + this.username
      + ', name: ' + this.name
      + ', lastname: ' + this.lastname
      + ', type: ' + this.type
      + ', status: ' + this.status;
  }
}
