import { useEffect, useState } from "react";
import { PromptSelector } from "../../store/prompt/prompt.selector.js";
import "./PromptContainer.styles.scss"; // Correcting the style import
import { useSelector } from "react-redux";

export const PromptContainer = () => {
  const prompts = useSelector(PromptSelector);
  const [localPrompts, setPrompts] = useState([]);

  useEffect(() => {
    setPrompts(prompts);
  }, [prompts]);

  return (
    <div className="prompt-container">
      {localPrompts && localPrompts.length > 0 ? (
        localPrompts.map((prompt, index) => (
          <div key={index} className={`prompt ${prompt.type}`}>
            {prompt.prompt}
          </div>
        ))
      ) : (
        <p>No prompts available</p> // Handle empty state gracefully
      )}
    </div>
  );
};
