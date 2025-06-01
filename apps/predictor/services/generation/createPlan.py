import os
import json
import asyncio
import logging
import time
from datetime import datetime, timedelta

import pandas as pd
from catboost import CatBoostRegressor
from dotenv import load_dotenv
from langchain_community.llms import YandexGPT
from langchain_core.prompts import ChatPromptTemplate

# Настройка логгирования
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

load_dotenv()

async def load_model():
    model = CatBoostRegressor()
    model.load_model("services/generation/catboost_model.cbm")
    return model

async def predict_time(model, data):
    prediction = model.predict(data)
    return round(prediction[0])

def validate_json_structure(json_data):
    if not isinstance(json_data, list):
        return False
    for item in json_data:
        if not isinstance(item, dict):
            return False
        if not all(key in item for key in ["name", "start_date", "end_date"]):
            return False
        if not all(isinstance(item[key], str) for key in ["name", "start_date", "end_date"]):
            return False
    return True

async def create_chain(template):
    llm = YandexGPT(
        api_key=os.getenv("api_key"),
        folder_id=os.getenv("folder_id"),
        model_name=os.getenv("model_name"),
        model_version=os.getenv("model_version")
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", template),
        ("human", "{question}")
    ])
    return prompt | llm

async def createPlan(input_data):
    logger.info("🔔 Входящий JSON:")
    logger.info(json.dumps(input_data, indent=4, ensure_ascii=False))

    try:
        # ===== БЛОК 1 =====
        if input_data.get('predict_team') == "" and not input_data.get('teams'):
            logger.info("[Блок 1] Используем queryNothingTeam.txt")

            with open('services/generation/queryNothingTeam.txt', 'r', encoding='utf-8') as f:
                template = f.read()

            template = template.replace("__ЗапросЗаказчика__", input_data.get('task', ''))
            template = template.replace("__ДатаНачалаПлана__", datetime.now().strftime("%Y-%m-%d"))
            template = template.replace("{", "{{").replace("}", "}}")

            logger.debug("Промт:\n%s", template)

            chain = await create_chain(template)

            try:
                start = time.time()
                response = await asyncio.wait_for(chain.ainvoke({"question": "Создай план проекта"}), timeout=13)
                logger.info("Ответ от модели:\n%s", response)
                logger.info("Время работы: %.2f сек", time.time() - start)

                result = json.loads(response[4:-4])
                if not validate_json_structure(result.get('project_plan', [])):
                    logger.warning("Неверная структура JSON. Используется пример.")
                    with open('services/generation/ans.json', 'r', encoding='utf-8') as f:
                        result = {"project_plan": json.load(f)["project_plan"]}
                result["predict_team"] = ""
                return result

            except (asyncio.TimeoutError, json.JSONDecodeError) as e:
                logger.error("Ошибка генерации плана: %s", str(e))
                with open('services/generation/ans.json', 'r', encoding='utf-8') as f:
                    return {
                        "predict_team": "",
                        "project_plan": json.load(f)["project_plan"]
                    }

        # ===== БЛОК 2 =====
        if input_data.get('predict_team') and str(input_data['predict_team']).isdigit():
            logger.info("[Блок 2] Используем predict_time + queryTeam.txt")

            model = await load_model()

            selected_team = next((team for team in input_data.get('teams', []) if team['team'] == input_data['predict_team']), None)
            if not selected_team:
                raise ValueError(f"Team {input_data['predict_team']} not found")

            new_data = pd.DataFrame([{
                "id_team": selected_team["team"],
                "count_frontend": selected_team["count_frontend"],
                "count_backend": selected_team["count_backend"],
                "count_ml": selected_team["count_ml"],
                "count_designer": selected_team["count_designer"],
                "count_devops": selected_team["count_devops"],
                "category_task": "Web-приложения"
            }])

            start = time.time()
            predicted_time = await predict_time(model, new_data)
            logger.info("⏳ Прогноз: %s дней (%.2f сек)", predicted_time, time.time() - start)

            with open('services/generation/queryTeam.txt', 'r', encoding='utf-8') as f:
                template = f.read()

            end_date = datetime.strptime(selected_team["last_end_date"], "%Y-%m-%d") + timedelta(days=predicted_time)
            template = template.replace("__СрокПроекта__", str(predicted_time))
            template = template.replace("__ЗапросЗаказчика__", input_data.get("task", ""))
            template = template.replace("__ДатаНачалаПроекта__", selected_team["last_end_date"])
            template = template.replace("__СтекКоманды__", selected_team["stack"])
            template = template.replace("__ДатаКонцаПроекта__", end_date.strftime("%Y-%m-%d"))
            template = template.replace("{", "{{").replace("}", "}}")

            logger.debug("Промт:\n%s", template)

            chain = await create_chain(template)

            try:
                start = time.time()
                response = await asyncio.wait_for(chain.ainvoke({"question": "Создай план проекта"}), timeout=13)
                logger.info("Ответ от модели:\n%s", response)
                logger.info("Время работы: %.2f сек", time.time() - start)

                result = json.loads(response[4:-4])
                if not validate_json_structure(result.get('project_plan', [])):
                    logger.warning("Неверная структура JSON. Используется пример.")
                    with open('services/generation/ans.json', 'r', encoding='utf-8') as f:
                        result = {"project_plan": json.load(f)["project_plan"]}

                result["predict_team"] = input_data["predict_team"]
                return result

            except (asyncio.TimeoutError, json.JSONDecodeError) as e:
                logger.error("Ошибка генерации плана: %s", str(e))
                with open('services/generation/ans.json', 'r', encoding='utf-8') as f:
                    return {
                        "predict_team": input_data["predict_team"],
                        "project_plan": json.load(f)["project_plan"]
                    }

        # ===== БЛОК 3 =====
        logger.info("[Блок 3] Используем queryNotTeam.txt")

        with open('services/generation/queryNotTeam.txt', 'r', encoding='utf-8') as f:
            template = f.read()

        if input_data.get("predict_team") == "":
            teams_list = [
                {"team": t["team"], "stack": t["stack"], "last_end_date": t["last_end_date"]}
                for t in input_data.get("teams", [])
            ]
        else:
            teams_list = [{
                "team": input_data.get("predict_team", 0),
                "stack": input_data.get("stack", ""),
                "last_end_date": input_data.get("last_end_date", "")
            }]

        team_json = json.dumps(teams_list, indent=4, ensure_ascii=False)
        template = template.replace(
            '{\n    "team": 1, \n    "stack": "HTML, js, typescript, fast-api, docker",\n    "last_end_date": "2025-03-06"\n}',
            team_json
        )
        template = template.replace("__ЗапросЗаказчика__", input_data.get("task", ""))
        template = template.replace("{", "{{").replace("}", "}}")

        logger.debug("Промт:\n%s", template)

        chain = await create_chain(template)

        try:
            start = time.time()
            response = await asyncio.wait_for(chain.ainvoke({"question": "Создай план проекта"}), timeout=13)
            logger.info("Ответ от модели:\n%s", response)
            logger.info("Время работы: %.2f сек", time.time() - start)

            result = json.loads(response[4:-4])
            if not validate_json_structure(result.get('project_plan', [])):
                logger.warning("Неверная структура JSON. Используется пример.")
                with open('services/generation/ans.json', 'r', encoding='utf-8') as f:
                    result = {
                        "predict_team": input_data.get("predict_team") or (input_data["teams"][0]["team"] if input_data.get("teams") else ""),
                        "project_plan": json.load(f)["project_plan"]
                    }

            return result

        except (asyncio.TimeoutError, json.JSONDecodeError) as e:
            logger.error("Ошибка генерации плана: %s", str(e))
            with open('services/generation/ans.json', 'r', encoding='utf-8') as f:
                return {
                    "predict_team": input_data.get("predict_team") or (input_data["teams"][0]["team"] if input_data.get("teams") else ""),
                    "project_plan": json.load(f)["project_plan"]
                }

    except Exception as e:
        logger.exception("Критическая ошибка в createPlan()")
        logger.debug("Входные данные при ошибке:\n%s", json.dumps(input_data, indent=4, ensure_ascii=False))
        with open('services/generation/ans.json', 'r', encoding='utf-8') as f:
            return {
                "predict_team": input_data.get("predict_team") or (input_data["teams"][0]["team"] if input_data.get("teams") else ""),
                "project_plan": json.load(f)["project_plan"]
            }
