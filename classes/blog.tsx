export default class Blog {
  private _id: string;
  private title: string;
  private content: string;
  private created_at: string;
  public constructor(blog: { [key: string]: string }) {
    this.title = blog.title;
    this._id = blog._id;
    this.content = blog.content;
    this.created_at = blog.created_at;
  }
  public getId() {
    return this._id;
  }
  public getTitle() {
    return this.title;
  }
  public getShortContent() {
    return this.content.substring(0, 200).replace(/(<([^>]+)>)/gi, '');
  }
  public getContent() {
    return this.content;
  }
  public getCreatedAt() {
    return this.created_at;
  }
}
