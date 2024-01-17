import axios, {AxiosResponse} from 'axios'

import {config} from '../config'

export type CoreConnectionResponse = AxiosResponse

export const coreConnection = axios.create({
  baseURL: config.server.url,
})
