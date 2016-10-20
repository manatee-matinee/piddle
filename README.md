# Piddle

> Bill splitting through OCR and Venmo.

## Table of Contents

<!--
1. [Usage](#Usage)
-->
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Roadmap](#roadmap)
1. [Team](#team)
1. [Contributing](#contributing)
1. [API](#API)

<!--
## Usage

> Some usage instructions
-->

## Requirements

- Node 6.9.1
- sqlite3 3.11.0

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Roadmap

View the [project backlog](https://github.com/manatee-matinee/piddle/issues).

## Team

  - __Product Owner__: [Cash Weaver](https://github.com/cashweaver)
  - __Scrum Master__: [Jason Thomas](https://github.com/jftcode)
  - __Development Team Members__: [Luis Villeda](https://github.com/luisevilleda), [David Walsh](https://github.com/rhinodavid)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## API

### POST /api/bill

>Creates a new bill.

#### Resource Information

Response format: JSON
Requires authentication: Yes

#### Parameters

- description (string)
- tax (number)
- tip (number)
- items (Array of item(object))
  - item.description (string)
  - item.price (number)
- payer (userId)


#### Response

- error (object):
  - null
or
  - message (string): description of the error

- data (object):
  - id (string): 4-char id of the bill

### GET /api/bill/:id

>Retrieves a bill.

#### Resource Information

Response format: JSON
Requires authentication: Yes

#### Parameters

- id (string): 4-char id of the bill

#### Response

- error (object):
  - null
or
  - message (string): description of the error

- data (object):
  - id (string)
  - description(string)
  - tax (number)
  - tip (number)
  - items(Array of item(object))
    - item.id (string)
    - item.description (string)
    - item.price (number)
    - item.paid (boolean)
    - item.debtor (object)
      - debtor.id (string)
      - debtor.displayName (string)
      - debtor.profilePictureUrl (string)
  - payer (object)
    - payer.id (string)
    - payer.displayName (string)
    - payer.profilePictureUrl (string)
