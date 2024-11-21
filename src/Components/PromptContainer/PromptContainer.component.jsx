import { useEffect, useState } from "react";
import { PromptSelector } from "../../store/prompt/prompt.selector.js";
import "./PromptContainer.styles.scss"; // Correcting the style import
import { useSelector } from "react-redux";
import { useRef } from "react";

export const PromptContainer = () => {
  const promptContainerRef = useRef(null);
  const prompts = useSelector(PromptSelector);

  useEffect(() => {
    // Scroll to the bottom of the container whenever userPrompts change
    if (promptContainerRef.current) {
      promptContainerRef.current.scrollTop =
        promptContainerRef.current.scrollHeight;
    }
  }, [prompts]);
  return (
    <div className="prompt-container">
      {prompts && prompts.length > 0 ? (
        prompts.map((prompt, index) => (
          <div key={index} className={`prompt ${prompt.type}`}>
            <p>
              {prompt.type == "user" ? prompt.prompt : prompt.prompt.response}
            </p>
          </div>
        ))
      ) : (
        <p>No prompts available</p> // Handle empty state gracefully
      )}
    </div>
  );
};
