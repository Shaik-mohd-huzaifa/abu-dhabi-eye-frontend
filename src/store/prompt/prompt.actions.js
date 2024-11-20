const PromptActionTypes = {
  UPDATE_PROMPT: "@update/prompt",
};

export const UpdatePrompt = (payload) => {
  return {
    payload: payload,
    type: PromptActionTypes.UPDATE_PROMPT,
  };
};
