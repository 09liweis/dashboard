export default class Blog {
  private _id: string;
  private title: string;
  private excerpt: string;
  private content: string;
  private created_at: string;
  private url: string;
  public constructor(blog: { [key: string]: string }) {
    this.title = blog.title;
    this._id = blog._id;
    this.excerpt = blog.excerpt || '';
    this.content = blog.content;
    this.created_at = blog.created_at;
    this.url = blog.url;
  }
  public getId() {
    return this._id;
  }
  public getTitle() {
    return this.title;
  }
  public getUrl() {
    return this.url || this._id;
  }
  public getExcerpt() {
    if (this.excerpt) return this.excerpt;
    return this.content.replace(/(<([^>]+)>)/gi, '').replace(/\s+/g, ' ').trim().substring(0, 280);
  }
  public getShortContent() {
    return this.content.substring(0, 200).replace(/(<([^>]+)>)/gi, '');
  }
  public getDescription() {
    return this.content.replace(/(<([^>]+)>)/gi, '').replace(/\s+/g, ' ').trim().substring(0, 280);
  }
  public getContent() {
    return this.content;
  }
  public getReadingTime() {
    const text = this.content.replace(/(<([^>]+)>)/gi, '');
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    return `${minutes} min read`;
  }
  public getCreatedAt() {
    const dateFormatter = new Intl.DateTimeFormat('en-US').format;
    return dateFormatter(new Date(this.created_at));
  }
  public getFormattedDate() {
    return new Date(this.created_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
