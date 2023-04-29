# Leetcode API for Company and Difficulty Level based questions

This repository contains code to expose an API to retrieve Leetcode questions based on company tags and difficulty levels.

The API will be available at `http://localhost:5000`.

## Endpoints

### Get Questions by Company

```
GET /api/v1/questions/all
```

Returns a list of all questions.

#### Request Parameters

None

#### Response

```json
[
    {
        "name": "Minimum Consecutive Cards to Pick Up",
        "link": "https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up/",
        "difficulty": "Medium",
        "companies": [
            {
                "company_name": "Google",
                "freq": 1
            }
        ]
    },
    {
        "name": "Remove Digit From Number to Maximize Result",
        "link": "https://leetcode.com/problems/remove-digit-from-number-to-maximize-result/",
        "difficulty": "Easy",
        "companies": [
            {
                "company_name": "Microsoft",
                "freq": 2
            }
        ]
    }
]
```

### Get Questions by Difficulty

```
GET /questions/difficulty/<difficulty>
```

Returns a list of questions that are tagged with the given `difficulty`.

#### Request Parameters

| Parameter | Type   | Required | Description                                   |
| --------- | ------ | -------- | --------------------------------------------- |
| `companies` | string | no | name of companies ',' seperated. |
| `difficulty` | string | no | The difficulty level of the questions to search for (Easy, Medium, Hard). |
| `page` | number | yes | Page number for which data is required(1-n). |
| `limit` | number | yes | Number of entries in the response. |

#### Response

```json
{
    "metadata": {
        "page": 1,
        "limit": 20,
        "totalPage": 30
    },
    "data": []
}
```

## Contributing

Contributions are always welcome! Please see the [contribution guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the [MIT License](LICENSE).