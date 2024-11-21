import { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdatePrompt } from "../../store/prompt/prompt.reducer";
import { getChatResponse } from "../../utils/API/getChatResponse";
import "./ExamplePrompt.styles.scss";

export const ExamplePrompt = () => {
  const dispatch = useDispatch();

  async function handleSumbit(e) {
    const prompt = e.target.textContent;
    try {
      dispatch(
        UpdatePrompt({ type: "user", prompt: prompt }, "@update/prompt"),
      );
      console.log(prompt);
      const res = await getChatResponse(prompt);
      console.log(res);
      dispatch(UpdatePrompt({ type: "llm", prompt: res }));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="example-prompt-container">
      <h2>Example Prompts</h2>
      <div className="prompts">
        <p onClick={handleSumbit}>
          List out the male traveller who can company me here in abu dhabi like
          people who are here for leasure trip
        </p>
        <p onClick={handleSumbit}>What are the Adventure Places in Abu Dhabi</p>
        <p onClick={handleSumbit}>
          Is there any event in abu dhabi related to traditional cooking
        </p>
        <p onClick={handleSumbit}>
          I would love to see Cultural places in abu Dhabi
        </p>
      </div>
    </div>
  );
};
