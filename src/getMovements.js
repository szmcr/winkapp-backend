import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';

const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const TABLE = 'wink_movements';

export const handler = async (event) => {
    const limit = parseInt(event.queryStringParameters?.limit) || 10;
    const lastEvaluatedKey = event.queryStringParameters?.lastEvaluatedKey
        ? JSON.parse(decodeURIComponent(event.queryStringParameters.lastEvaluatedKey))
        : undefined;

    try {
        const result = await dynamoClient.send(new ScanCommand({
            TableName: TABLE,
            Limit: limit,
            ExclusiveStartKey: lastEvaluatedKey,
        }));

        const movements = result.Items.sort((a, b) => new Date(b.date) - new Date(a.date));

        return {
            statusCode: 200,
            body: JSON.stringify({
                movements,
                lastEvaluatedKey: result.LastEvaluatedKey
                    ? encodeURIComponent(JSON.stringify(result.LastEvaluatedKey))
                    : null
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error recuperando los movimientos', error }),
        };
    }
};
