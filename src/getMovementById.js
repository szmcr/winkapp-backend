import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';


const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const TABLE = 'wink_movements';

export const handler = async (event) => {

    const { id } = event.pathParameters;

    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Falta el id' }),
        };
    }

    try {
        const result = await dynamoClient.send(new GetCommand({
            TableName: TABLE,
            Key: { id },
        }));

        if (!result.Item) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Movimiento no encontrado' }),
            };
        }

        const movement = result.Item;

        return {
            statusCode: 200,
            body: JSON.stringify(movement),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error recuperando el movimiento', error }),
        };
    }
};