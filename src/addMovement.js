import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';

const ACCOUNT_TABLE = 'wink_accounts';
const MOVEMENTS_TABLE = 'wink_movements';

const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {

    const accountId = '1';
    const { amount, contactName, phoneNumber, description } = JSON.parse(event.body || '{}');

    if (!amount || !contactName || !phoneNumber) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Faltan campos requeridos' }),
        };
    }

    try {
        const accountResult = await dynamoClient.send(new GetCommand({
            TableName: ACCOUNT_TABLE,
            Key: { id: accountId },
        }));

        const account = accountResult.Item;

        if (!account) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Cuenta no encontrada' }),
            };
        }

        const movement = {
            id: randomUUID(),
            amount,
            contactName,
            phoneNumber,
            description,
            type: "SINPE móvil",
            date: new Date().toISOString(),
        };

        const newBalance = account.balance - amount;

        await Promise.all([
            dynamoClient.send(new PutCommand({
                TableName: MOVEMENTS_TABLE,
                Item: movement,
            })),
            dynamoClient.send(new UpdateCommand({
                TableName: ACCOUNT_TABLE,
                Key: { id: accountId },
                UpdateExpression: 'SET balance = :balance',
                ExpressionAttributeValues: {
                    ':balance': newBalance,
                },
            })),
        ]);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Se ha hecho el SINPE móvil correctamente", balance: newBalance }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Problema realizando el SINPE móvil', error }),
        };
    }

};
