import eachDayOfInterval from "date-fns/eachDayOfInterval";
import add from "date-fns/add";
import { Pedometer } from "expo-sensors";
import isToday from "date-fns/isToday";
import isPast from "date-fns/isPast";
import endOfDay from "date-fns/endOfDay";
import startOfDay from "date-fns/startOfDay";

// in order to request step data from the Pedometer for each day of the user's goal, we first need to create an array of dates the length of days in their goal.

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
      // we don't want to request step data for days in the future because it doesn't exist yet, so we check if a date is in the past or is today.
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
