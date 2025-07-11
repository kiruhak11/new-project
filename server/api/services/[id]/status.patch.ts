import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import type { Service } from "~/types";

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody(event);
  const { status } = body;

  if (!status || !["pending", "approved", "rejected"].includes(status)) {
    throw createError({
      statusCode: 400,
      message: "Некорректный статус",
    });
  }

  const dataPath = resolve("./server/data.json");
  const data = JSON.parse(readFileSync(dataPath, "utf-8"));

  const serviceIndex = data.services.findIndex((s: Service) => s.id === id);
  if (serviceIndex === -1) {
    throw createError({
      statusCode: 404,
      message: "Услуга не найдена",
    });
  }

  data.services[serviceIndex].status = status;
  writeFileSync(dataPath, JSON.stringify(data, null, 2));

  return data.services[serviceIndex];
});
