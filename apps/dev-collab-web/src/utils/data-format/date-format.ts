import moment from 'moment'

export const formatDate = (date: string | null, format?: string) =>
  moment(date).format(format || `DD/MM/YYYY`)
