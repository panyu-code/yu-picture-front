import { generateService } from '@umijs/openapi'

generateService({
  requestLibPath: "import axios from '@/plugins/axios.ts'",
  schemaPath: 'http://localhost:8080/api/v2/api-docs',
  serversPath: './src',
})
