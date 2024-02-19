"use server";

import Question from "@/database/models/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "../shared.types";
import Interaction from "@/database/models/interaction.model";

// TODO: Add JsDoc (documentation to all functions)

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, userId } = params;

    // Update view count for each question
    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingInteraction) {
        return console.log("User has already viwewed this question");
      } else {
        await Interaction.create({
          user: userId,
          action: "view",
          question: questionId,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
}
