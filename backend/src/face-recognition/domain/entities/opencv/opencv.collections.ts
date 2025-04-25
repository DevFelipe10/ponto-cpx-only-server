export type CollectionOpencvProps = {
  id: string
  name: string
  description: string | null
  count: number
  create_date: Date
  modified_date: Date
}
export class CollectionOpencv {
  constructor(props: CollectionOpencvProps) {
    this.id = props.id
    this.name = props.name
    this.description = props.description
    this.count = props.count
    this.create_date = props.create_date
    this.modified_date = props.modified_date
  }

  id: string
  name: string
  description: string | null
  count: number
  create_date: Date
  modified_date: Date
}
