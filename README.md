﻿# WINK SINPE APP BACKEND PRUEBA TÉCNICA

Este backend es parte de la prueba técnica de Wink está diseñado para gestionar las operaciones relacionadas con cuentas y movimientos en un sistema de SINPE Móvil. A continuación, se describen los endpoints disponibles para interactuar con el sistema.

## Endpoints

### 1. `GET /account-balance/`

Este endpoint se utiliza para obtener el saldo actual de una cuenta.

#### Ejemplo de solicitud:

```bash
GET /account-balance/
```

#### Respuesta exitosa (200 OK):

```json
{
  "balance": 1000
}
```

### 2. `GET /movements/`

Este endpoint se utiliza para obtener todos los movimientos realizados en el sistema. Los movimientos se devuelven ordenados por fecha de manera descendente.

#### Ejemplo de solicitud:

```bash
GET /movements/
```

#### Respuesta exitosa (200 OK):

```json
{
  "movements": [
    {
      "id": "1",
      "amount": 100,
      "contactName": "Juan Pérez",
      "phoneNumber": "123456789",
      "description": "Pago de factura",
      "type": "SINPE móvil",
      "date": "2024-11-10T12:00:00Z"
    },
    {
      "id": "2",
      "amount": 50,
      "contactName": "María López",
      "phoneNumber": "987654321",
      "description": "Compra de producto",
      "type": "SINPE móvil",
      "date": "2024-11-09T10:00:00Z"
    }
  ]
}
```

### 3. `GET /movements/{id}`

Este endpoint se utiliza para obtener los detalles de un movimiento específico utilizando su `id`.

#### Ejemplo de solicitud:

```bash
GET /movements/1
```

#### Respuesta exitosa (200 OK):

```json
{
  "id": "1",
  "amount": 100,
  "contactName": "Juan Pérez",
  "phoneNumber": "123456789",
  "description": "Pago de factura",
  "type": "SINPE móvil",
  "date": "2024-11-10T12:00:00Z"
}
```

### 4. `POST /movements/`

Este endpoint se utiliza para registrar un nuevo movimiento de dinero en el sistema. Es necesario enviar los datos en el cuerpo de la solicitud (en formato JSON).

#### Ejemplo de solicitud:

```bash
POST /movements/
```

```json
{
  "amount": 200,
  "contactName": "Carlos Gómez",
  "phoneNumber": "555123456",
  "description": "Transferencia",
  "type": "SINPE móvil"
}
```

#### Respuesta exitosa (201 Created):

```json
{
  "message": "Movimiento creado exitosamente",
  "id": "3",
  "balance": 800
}
```

#### Respuesta de error (400 Bad Request):

```json
{
  "message": "Faltan campos requeridos"
}
```

---

## Descripción de las operaciones

### `GET /account-balance/`

Este endpoint devuelve el saldo actual disponible en la cuenta. La respuesta incluirá el valor del saldo en un formato JSON.

### `GET /movements/`

Este endpoint devuelve una lista de todos los movimientos realizados en el sistema, ordenados por la fecha más reciente. Los movimientos incluyen información como el `id`, el `amount`, el `contactName`, el `phoneNumber`, una `description`, el `type` (tipo de transacción), y la fecha de la transacción.

### `GET /movements/{id}`

Este endpoint permite obtener los detalles de un movimiento específico, proporcionado su `id` como parámetro en la URL. La respuesta incluirá todos los detalles de ese movimiento.

### `POST /movements/`

Este endpoint permite registrar un nuevo movimiento. El cuerpo de la solicitud debe incluir los siguientes campos:

- `amount`: Monto del movimiento.
- `contactName`: Nombre del contacto asociado con la transacción.
- `phoneNumber`: Número de teléfono del contacto.
- `description`: Descripción del movimiento.
- `type`: Tipo de transacción, por ejemplo, `SINPE móvil`.

Si los campos son válidos, se creará un nuevo movimiento y se devolverá un `id` generado junto con el saldo actualizado.

---

## Notas

- Todos los endpoints devuelven respuestas en formato JSON.
- Asegúrate de enviar los datos en el formato adecuado para evitar errores.
- La API está protegida por autenticación (si aplica) y solo permite operaciones a usuarios con permisos adecuados.
