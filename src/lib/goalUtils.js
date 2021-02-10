import eachDayOfInterval from "date-fns/eachDayOfInterval";
import add from "date-fns/add";
import { Pedometer } from "expo-sensors";
import isToday from "date-fns/isToday";
import isPast from "date-fns/isPast";
import endOfDay from "date-fns/endOfDay";
import startOfDay from "date-fns/startOfDay";

export function createDayArray({ completedDays, numberOfDays, createdAt }) {
  const start = new Date(createdAt);
  const end = add(start, { days: numberOfDays - 1 });
  const dates = eachDayOfInterval({
    start,
    end,
  });
  return dates.map((date, index) => {
    return {
      date: date,
      status: index < completedDays,
      steps: 0,
      collectible: isPast(date) || isToday(date),
    };
  });
}

async function getStepsFor({ date }) {
  const start = startOfDay(date);
  const end = endOfDay(date);

  try {
    const { steps } = await Pedometer.getStepCountAsync(start, end);
    return steps;
  } catch (err) {
    console.log(err);
    return 0;
  }
}

async function updateSteps(result, goal, type) {
  let updates = 0;
  const ret = result;
  for (let i = 0; i < result.length; i++) {
    const obj = result[i];
    if (!obj.collectible) {
      break;
    }

    const steps = await getStepsFor(obj);
    obj.steps = steps;
    if (type === "Steps") {
      if (steps > goal.quantity && !obj.status) {
        updates++;
        obj.status = true;
      }
    }
    ret[i] = obj;
  }
  return { dateArray: ret, updates };
}

export async function setDays(goal, type) {
  const result = createDayArray(goal);
  const dateArray = await updateSteps(result, goal, type);

  return dateArray;
}
