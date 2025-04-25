export type PageQueryProps = {
  page: string
  limit: string
}

export class PageQuery {
  private _page: number = 1 // Numero da página atual
  private _limit: number = 10
  private _skip: number

  constructor(props: PageQueryProps) {
    this._page = Number.parseInt(props.page)
    this._limit = Number.parseInt(props.limit)
    this._skip = (this._page - 1) * this._limit
  }

  public get skip(): number {
    return this._skip
  }
  public get page(): number {
    return this._page
  }
  public get limit(): number {
    return this._limit
  }

  toJson() {
    const json = {
      page: this._page,
      max_page_size: this._limit,
      skip: this._skip,
    }

    return JSON.stringify(json)
  }

  static calculateTotalPages(totalData: number, limit: number): number {
    return Math.ceil(totalData / limit)
  }
}
