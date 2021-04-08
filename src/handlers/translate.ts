import { APIGatewayProxyResult } from 'aws-lambda'
import { commonMiddleware } from '../lib/middlewares/commonMiddleware'
import { TranslateService } from './services/translateService'
import { RedisProvider } from '../lib/providers/implementations/RedisProvider'
import createError from 'http-errors'

const translateService = new TranslateService(
  new RedisProvider()
)

async function translate (event: any, context: any): Promise<APIGatewayProxyResult> {
  const { url } = event.pathParameters
  try {
    const subtitle = await translateService.execute(url)
    return {
      statusCode: 200,
      body: subtitle
    }
  } catch (error) {
    console.log(error)
    throw new createError.InternalServerError(error)
  }
}

export const handler = commonMiddleware(translate)
