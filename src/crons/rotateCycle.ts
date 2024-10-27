import cron from "node-cron";
import { getAllRegions } from "../models/regions";
import {
  getQuestionsByRegion,
  getUnassignedQuestionsByRegion,
} from "../models/questions";
import { createCycle } from "../models/cycles";
import { addDaysWithCurrent } from "../utils/utils";

export const assignQuestions = async () => {
  cron.schedule("0 19 * * 1", async () => {
    // Assuming the server time is set to SGT
    console.log("Running rotation every Monday at 7pm (SGT)");
    const regions = await getAllRegions();
    if (regions) {
      for (const region of regions) {
        let newCycle = region.lastCycle ? region.lastCycle + 1 : 1;

        const question = await getUnassignedQuestionsByRegion(region.id);
        if (question) {
          const currentTimeStamp = new Date().toISOString();
          createCycle({
            cycleNumber: newCycle,
            regionId: region._id,
            questionId: question._id,
            startDate: currentTimeStamp,
            endDate: addDaysWithCurrent(currentTimeStamp, 7).toISOString(),
          });
        }
      }
    }
  });
};
