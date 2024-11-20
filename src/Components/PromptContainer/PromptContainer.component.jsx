import { PromptSelector } from "../../store/prompt/prompt.selector.js";
// import "./PromptContainer.Styles.scss"; // Correcting the style import
import { useSelector } from "react-redux";

export const PromptContainer = () => {
  const prompts = useSelector(PromptSelector);

  return (
    <div className="prompt-container">
      {prompts && prompts.length > 0 ? (
        prompts.map((prompt, index) => (
          <div key={index} className="prompt">
            {prompt.prompt}
          </div>
        ))
      ) : (
        <p>No prompts available</p> // Handle empty state gracefully
      )}
    </div>
  );
};
