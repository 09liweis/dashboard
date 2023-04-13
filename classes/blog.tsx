export class Blog {
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
}
