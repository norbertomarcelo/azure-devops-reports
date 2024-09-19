export class Project {
  id: string;
  name: string;
  url: string;
  state: string;
  revision: number;
  visibility: string;
  lastUpdateTime: Date;

  constructor(
    id: string,
    name: string,
    url: string,
    state: string,
    revision: number,
    visibility: string,
    lastUpdateTime: Date
  ) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.state = state;
    this.revision = revision;
    this.visibility = visibility;
    this.lastUpdateTime = lastUpdateTime;
  }

  static fromJSON(json: any): Project {
    return new Project(
      json.id,
      json.name,
      json.url,
      json.state,
      json.revision,
      json.visibility,
      new Date(json.lastUpdateTime)
    );
  }

  static fromJSONArray(jsonArray: any[]): Project[] {
    return jsonArray.map((json) => Project.fromJSON(json));
  }
}
