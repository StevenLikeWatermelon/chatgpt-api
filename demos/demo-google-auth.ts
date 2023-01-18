import dotenv from 'dotenv-safe'
import { oraPromise } from 'ora'

import { ChatGPTAPIBrowser } from '../src'

dotenv.config()

/**
 * Demo CLI for testing basic functionality using Google auth.
 *
 * ```
 * npx tsx demos/demo.ts
 * ```
 */
async function main() {
  const email = process.env.OPENAI_EMAIL
  const password = process.env.OPENAI_PASSWORD

  const api = new ChatGPTAPIBrowser({
    email,
    password,
    isGoogleLogin: true,
    debug: false,
    minimize: true
  })
  await api.initSession()

  const prompt =
    '机床厂计划全年生产机床480台，实际提前2个月完成全年任务的1.5倍，实际平均每月完成多少台?'

  const res = await api.sendMessage(prompt, {
    onProgress: (partialResponse) => {
      console.log('progress', partialResponse?.response)
    }
  })
  console.log(res.response)

  // close the browser at the end
  // await api.closeSession()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
