import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';


const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const TABLE = 'wink_movements';

export const handler = async (event) => {

    try {
        const result = await dynamoClient.send(new ScanCommand({
            TableName: TABLE,
        }));

        const movements = result.Items.sort((a, b) => new Date(b.date) - new Date(a.date));

        return {
            statusCode: 200,
            body: JSON.stringify({ movements }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error recuperando los movimientos', error }),
        };
    }
};