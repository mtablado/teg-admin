export class DriverPosition {

  public id;
  public plate;
  public name;
  public time;
  public latitude;
  public longitude;
  public status;

  public toString() {
    return 'id: ' + this.id
      + ', plate: ' + this.plate
      + ', name: ' + this.name
      + ', time: ' + this.time
      + ', latitude: ' + this.latitude
      + ', longitude: ' + this.longitude
      + ', status: ' + this.status;
  }
}
