import { generateService } from '@umijs/openapi'

generateService({
  requestLibPath: "import request from '../plugins/request.ts'",
  schemaPath: 'http://localhost:8080/api/v2/api-docs',
  serversPath: './src',
})
