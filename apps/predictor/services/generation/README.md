createPlan.py -> async def createPlan(input_data)
input_data (ans.json) - json
1) Случай, когда команда выбрана
{
  "predict_team": 3,
  "task": "мне нужно сделать онлайн-платформу для просмотра и скачивания фильмов",
  "teams": [
    {
      "team": 3,
      "last_end_date": "2026-06-10",
      "stack": "HTML, js, typescript, fast-api, docker",
      "count_frontend": 2,
      "count_backend": 1,
      "count_ml": 1,
      "count_designer": 1,
      "count_devops": 0
    },
    {
      "team": 4,
      "last_end_date": "2026-07-06",
      "stack": "Java, Flutter, Kotlin",
      "count_frontend": 2,
      "count_backend": 1,
      "count_ml": 2,
      "count_designer": 1,
      "count_devops": 1
    }
  ]
}
2) Случай, когда команда не выбрана и есть хотя бы одна команда в базе данных
{
    "predict_team": "",
    "task": "мне нужно сделать онлайн-платформу для просмотра и скачивания фильмов",
    "teams": [
      {
        "team": 3,
        "last_end_date": "2026-06-10",
        "stack": "HTML, js, typescript, fast-api, docker",
        "count_frontend": 2,
        "count_backend": 1,
        "count_ml": 1,
        "count_designer": 1,
        "count_devops": 0
      },
      {
        "team": 4,
        "last_end_date": "2026-07-06",
        "stack": "Java, Flutter, Kotlin",
        "count_frontend": 2,
        "count_backend": 1,
        "count_ml": 2,
        "count_designer": 1,
        "count_devops": 1
      }
    ]
}
3) Случай, когда команда не выбрана и в базе данных НЕТ команд
{
    "predict_team": "",
    "task": "мне нужно сделать онлайн-платформу для просмотра и скачивания фильмов",
    "teams": []
}

Важное замечание! Если у команд не было заявок, то в качестве last_end_date отправляем сегодняшнюю дату!