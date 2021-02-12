import { Pedometer } from "expo-sensors";
import {
  add,
  isToday,
  isPast,
  endOfDay,
  startOfDay,
  eachDayOfInterval,
} from "date-fns";

// in order to request step data from the Pedometer for each day of the user's goal, we first need to create an array of dates the length of days in their goal.

export function createDayArray({ completedDays, numberOfDays, createdAt }) {
  // using some functions from the date-fns library, we can create an array of dates that starts on the day it was created and ends on the day it was created + the number of days in the goal.
  const start = new Date(createdAt);
  const end = add(start, { days: numberOfDays - 1 });
  const dates = eachDayOfInterval({
    start,
    end,
  });

  // we create an array of objects, where each object contains the date, a placeholder for steps, a completed status and whether we need to try to collect steps from the pedometer. We don't want to request steps for future dates because it doesn't exist.

  return dates.map((date, index) => {
    return {
      date: date,
      status: index < completedDays,
      steps: 0,
      collectible: isPast(date) || isToday(date),
    };
  });
}

async function updateSteps(result, goal, type) {
  // this function takes our array of objects, our goal and goal type and checks to see if we need to request steps for each date.
  let updates = 0;
  const ret = result;
  for (let i = 0; i < result.length; i++) {
    const obj = result[i];
    if (!obj.collectible) {
      break;
    }
    // we call our function that makes the pedometer request for each day.
    const steps = await getStepsFor(obj);
    obj.steps = steps;
    // if it's a steps goal, we check to see if the user's steps for this day are greater than their goal steps and if so, we change that date's status to true and we increment updates count, which we will later use to update the goal in the database.
    if (type === "Steps") {
      if (steps > goal.quantity && !obj.status) {
        updates++;
        obj.status = true;
      }
    }
    ret[i] = obj;
  }

  // we return the updated array of objects, along with the number of updates we need to make for the goal in the database.
  return { dateArray: ret, updates };
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

export async function setDays(goal, type) {
  const result = createDayArray(goal);
  const dateArray = await updateSteps(result, goal, type);

  return dateArray;
}
