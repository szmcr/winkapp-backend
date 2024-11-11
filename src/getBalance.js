import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';


const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const ACCOUNT_TABLE = 'wink_accounts';

export const handler = async (event) => {
    const accountId = '1';

    try {
        const result = await dynamoClient.send(new GetCommand({
            TableName: ACCOUNT_TABLE,
            Key: { id: accountId },
        }));

        const account = result.Item;

        return {
            statusCode: 200,
            body: JSON.stringify({ balance: account.balance }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error recuperando el balance de la cuenta', error }),
        };
    }

}